import { useEffect, useState } from 'react';
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

const Card = ({ card, type }) => {
    return (
        <div
            className={`${styles.card} ${styles[type]}`}
            style={
                type === 'HC3'
                    ? {
                          backgroundColor: card.bg_color,
                          backgroundImage: `url(${card.bg_image.image_url}`,
                      }
                    : {}
            }
            onClick={() => (window.location.href = card.url)}
        >
            {card.icon && (
                <img
                    src={card.icon.image_url}
                    alt='icon'
                    className={`${styles.icon}`}
                />
            )}

            <h1 className={`${styles.title} font-roboto foreground-white`}>
                {card.formatted_title.entities.length > 0 ? (
                    <FormattedText
                        data={card.formatted_title}
                        plain_text={card.title}
                    />
                ) : (
                    card.title
                )}
            </h1>

            {/* <h3
                className={`${styles.description} font-roboto foreground-white`}
            >
                {card.formatted_description.entities.length > 0 ? (
                    <FormattedText
                        data={card.formatted_description}
                        plain_text={card.description}
                    />
                ) : (
                    card.description
                )}
            </h3> */}

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
        </div>
    );
};

export default Card;
