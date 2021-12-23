import CardGroup from './CardGroup';

import styles from '../styles/CardGroups.module.css';

/**
 *
 * @param {{
 *  HC1CardGroups: Array,
 *  HC3CardGroups: Array,
 *  HC5CardGroups: Array,
 *  HC6CardGroups: Array,
 *  HC9CardGroups: Array,
 * }} param0
 */
const CardGroups = ({
    HC1CardGroups,
    HC3CardGroups,
    HC5CardGroups,
    HC6CardGroups,
    HC9CardGroups,
}) => {
    return (
        <div className={`${styles.cardGroups} background-offwhite`}>
            {/* CARD GROUPS */}
            {HC3CardGroups.map((group, index) => (
                <CardGroup key={index} group={group} type='HC3' />
            ))}

            {HC6CardGroups.map((group, index) => (
                <CardGroup key={index} group={group} type='HC6' />
            ))}

            {HC5CardGroups.map((group, index) => (
                <CardGroup key={index} group={group} type='HC5' />
            ))}

            {/* {HC9CardGroups.map((group, index) => (
                <HC9CardGroup key={index} />
            ))} */}

            {/* {HC1CardGroups.map((group, index) => (
                <HC1CardGroup key={index} />
            ))} */}
        </div>
    );
};

export default CardGroups;
