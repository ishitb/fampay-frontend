import Card from './Card';
import styles from '../styles/HC3.module.css';

const HC3CardGroup = ({ group }) => {
    return (
        <div
            className={`${styles.hc3CardGroup} ${
                group.is_scrollable ? 'is_scrollable' : ''
            }`}
        >
            {group.cards.map((card, index) => (
                <Card card={card} key={index} />
            ))}
        </div>
    );
};

export default HC3CardGroup;
