import Card from './Card';
import styles from '../styles/HC6.module.css';

const HC6CardGroup = ({ group }) => {
    return (
        <div
            className={`${styles.hc6CardGroup} ${
                group.is_scrollable ? 'is_scrollable' : ''
            }`}
        >
            {group.cards.map((card, index) => (
                <Card card={card} key={index} type='HC6' />
            ))}
        </div>
    );
};

export default HC6CardGroup;
