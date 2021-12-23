import Card from './Card';
import styles from '../styles/CardGroup.module.css';

/**
 *
 * @param {{
 *  group: {
 *      cards: Array
 *  },
 *  type: String
 * }} param0
 *
 */
const CardGroup = ({ group, type }) => {
    const dismissedCards = JSON.parse(
        window.localStorage.getItem('dismissed-cards'),
    );
    return (
        <div
            className={`${styles.CardGroup} ${
                group.is_scrollable && type !== 'HC9' ? 'is_scrollable' : ''
            }`}
        >
            {group.cards
                .filter((card) => !dismissedCards?.includes(card.name))
                .map((card, index) => (
                    <Card
                        key={index}
                        card={card}
                        type={type}
                        height={card.height}
                    />
                ))}
        </div>
    );
};

export default CardGroup;
