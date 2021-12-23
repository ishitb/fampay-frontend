import Card from './Card';
import styles from '../styles/CardGroup.module.css';

const CardGroup = ({ group, type }) => {
    return (
        <div
            className={`${styles.CardGroup} ${
                group.is_scrollable ? 'is_scrollable' : ''
            }`}
        >
            {group.cards.map((card, index) => (
                <Card card={card} key={index} type={type} />
            ))}
        </div>
    );
};

export default CardGroup;
