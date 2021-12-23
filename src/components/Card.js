import { useEffect, useState } from 'react';
import useLongPress from '../hooks/useLongPress';
import styles from '../styles/Card.module.css';

/**
 *
 * @param {{
 *  data: {
 *      text: String,
 *      entities: []
 * }
 * }} param0
 *
 */
const FormattedText = ({ data, plain_text }) => {
    const [result, setResult] = useState(plain_text);

    const format = () => {
        let contents = data.text.split(' ');

        data.entities.forEach((entity) => {
            // Finding the {} in text to replace with formatted text
            const content_to_replace = contents.findIndex((element) =>
                element.startsWith('{}'),
            );

            // Setting all styles for the entity
            let format_styles = '';
            Object.keys(entity).forEach((key) => {
                if (key !== 'text') {
                    format_styles += `${key}: ${entity[key]};`;
                }
            });

            // Replacing the content with the formatted text
            contents[content_to_replace] = contents[content_to_replace].replace(
                '{}',
                `<span style='${format_styles}'>${entity.text}</span>`,
            );
        });

        // Combining the formatted contents into one string
        setResult(contents.join(' '));
    };

    useEffect(() => {
        format();
        // eslint-disable-next-line
    }, []);

    return <span dangerouslySetInnerHTML={{ __html: result }}></span>;
};

const CardContent = ({ card, type, height, ...extra }) => {
    // Specific Styles for Cards
    let customStyles = {
        HC3: {
            backgroundImage: card.bg_gradient
                ? `linear-gradient(${
                      card.bg_gradient?.angle ? card.bg_gradient?.angle : 0
                  }deg, ${card.bg_gradient?.colors?.join(', ')})`
                : `url(${card.bg_image?.image_url}`,
            backgroundColor: card.bg_color,
        },
        HC5: {
            backgroundColor: card.bg_color,
            '--aspect-ratio': card.bg_color?.aspect_ratio,
            backgroundImage: `linear-gradient(${
                card.bg_gradient?.angle ? card.bg_gradient?.angle : 0
            }deg, ${card.bg_gradient?.colors?.join(', ')})`,
        },
        HC9: {
            height: height,
            backgroundImage: `linear-gradient(${
                card.bg_gradient?.angle ? card.bg_gradient?.angle : 0
            }deg, ${card.bg_gradient?.colors?.join(', ')})`,
        },
        HC1: {
            backgroundColor: card.bg_color ? card.bg_color : '#FBAF03',
            backgroundImage: `linear-gradient(${
                card.bg_gradient?.angle ? card.bg_gradient?.angle : 0
            }deg, ${card.bg_gradient?.colors?.join(', ')})`,
        },
        HC6: {
            backgroundImage: `linear-gradient(${
                card.bg_gradient?.angle ? card.bg_gradient?.angle : 0
            }deg, ${card.bg_gradient?.colors?.join(', ')})`,
        },
    };

    return (
        <div
            className={`${styles.card} ${styles[type]}`}
            style={customStyles[type]}
            onClick={() => (window.location.href = card.url)}
            {...extra}
        >
            {card.icon && (
                <img
                    src={card.icon.image_url}
                    alt='icon'
                    className={`${styles.icon}`}
                />
            )}

            <div className={`${styles.cardText}`}>
                {card.title && (
                    <h1
                        className={`${styles.title} font-roboto foreground-white`}
                    >
                        {card.formatted_title?.entities.length > 0 ? (
                            <FormattedText
                                data={card.formatted_title}
                                plain_text={card.title}
                            />
                        ) : (
                            card.title
                        )}
                    </h1>
                )}
                {card.description && type !== 'HC6' && (
                    <h3
                        className={`${styles.description} font-roboto foreground-white`}
                    >
                        {card.formatted_description?.entities.length > 0 ? (
                            <FormattedText
                                data={card.formatted_description}
                                plain_text={card.description}
                            />
                        ) : (
                            card.description
                        )}
                    </h3>
                )}
            </div>

            {/* Call To Actions */}
            {card.cta &&
                card.cta.map((action, index) => (
                    <a
                        className={`${styles.cta} font-roboto`}
                        key={index}
                        href={action.url}
                        style={{
                            backgroundColor: action.bg_color,
                            color: action.text_color,
                        }}
                    >
                        {action.text}
                    </a>
                ))}

            {/* Arrow For HC6 */}
            {type === 'HC6' && (
                <img
                    src='/assets/images/arrow.svg'
                    alt='arrow'
                    className={`${styles.arrow}`}
                />
            )}

            {/* Background Image for HC5 */}
            {['HC5', 'HC9'].includes(type) && (
                <img src={card.bg_image?.image_url} alt='HC5' />
            )}
        </div>
    );
};

const Card = ({ card, type, height }) => {
    // eslint-disable-next-line
    const [dismissedCards, setDismissedCards] = useState([]);

    // Long Press Action
    const [pressed, setPressed] = useState(false);
    const [remindLater, setRemindLater] = useState(false);
    const [dismiss, setDismiss] = useState(false);

    const onLongPress = () => {
        setPressed(true);
    };

    const defaultOptions = {
        isPreventDefault: true,
        delay: 300,
    };
    const longPressEvent = useLongPress(
        type === 'HC3' ? onLongPress : null,
        null,
        defaultOptions,
    );

    const dismissCard = () => {
        setDismiss(true);

        window.localStorage.setItem(
            'dismissed-cards',
            JSON.stringify([...dismissedCards, card.name]),
        );
    };

    useEffect(() => {
        let curr_dismissed_cards =
            window.localStorage.getItem('dismissed-cards');
        setDismissedCards(
            curr_dismissed_cards ? JSON.parse(curr_dismissed_cards) : [],
        );

        // eslint-disable-next-line
    }, []);

    return type === 'HC3' ? (
        <div
            className={`${styles.hc6Container} ${
                pressed ? styles.pressed : ''
            } background-white`}
            style={{
                display: (remindLater || dismiss) && 'none',
            }}
        >
            <section className={`${styles.longPressActions}`}>
                <button
                    className={`${styles.button} background-offwhite foreground-black`}
                    onClick={() => {
                        setRemindLater(true);
                    }}
                >
                    <img src='/assets/images/bell.png' alt='bell' />
                    remind later
                </button>
                <button
                    className={`${styles.button} background-offwhite foreground-black`}
                    onClick={dismissCard}
                >
                    <img src='/assets/images/dismiss.png' alt='dismiss' />
                    dismiss now
                </button>
            </section>
            <CardContent
                {...longPressEvent}
                card={card}
                type={type}
                height={height}
            />
        </div>
    ) : (
        <CardContent card={card} type={type} height={height} />
    );
};

export default Card;
