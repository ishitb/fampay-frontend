import Card from './Card';
import styles from '../styles/CardGroup.module.css';

const CardGroup = ({ group, type }) => {
    return (
        <div
            className={`${styles.CardGroup} ${
                group.is_scrollable && type !== 'HC9' ? 'is_scrollable' : ''
            }`}
        >
            {group.cards.map((card, index) => (
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
