import { useEffect, useState } from 'react';

import './App.css';

function App() {
    let [HC1cards, setHC1cards] = useState([]);
    let [HC3cards, setHC3cards] = useState([]);
    let [HC5cards, setHC5cards] = useState([]);
    let [HC6cards, setHC6cards] = useState([]);
    let [HC9cards, setHC9cards] = useState([]);

    let card_design_type = {
        HC1: setHC1cards,
        HC3: setHC3cards,
        HC5: setHC5cards,
        HC6: setHC6cards,
        HC9: setHC9cards,
    };

    /**
     *
     * @param {Array} cards
     */
    const sortCards = (cards) => {
        cards.forEach((card) => {
            let setCards = card_design_type[card.design_type];
            setCards((curr) => [...curr, card]);
        });
    };

    const fetchData = async () => {
        fetch(process.env.REACT_APP_API_URL)
            .then(async (res) => {
                let cards = await res.json();
                sortCards(cards.card_groups);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        fetchData();

        // eslint-disable-next-line
    }, []);

    return <div className='App'></div>;
}

export default App;
