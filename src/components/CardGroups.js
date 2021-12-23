import HC1CardGroup from './HC1CardGroup';
import HC3CardGroup from './HC3CardGroup';
import HC5CardGroup from './HC5CardGroup';
import HC6CardGroup from './HC6CardGroup';
import HC9CardGroup from './HC9CardGroup';

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
                <HC3CardGroup key={index} group={group} />
            ))}

            {HC6CardGroups.map((group, index) => (
                <HC6CardGroup key={index} group={group} />
            ))}

            {/* {HC5CardGroups.map((group, index) => (
                <HC5CardGroup key={index} />
            ))} */}

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
