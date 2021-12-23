import { useEffect, useState } from 'react';

import './App.css';
import CardGroups from './components/CardGroups';
import Navbar from './components/Navbar';

function App() {
    let [HC1cards, setHC1cards] = useState([]);
    let [HC3cards, setHC3cards] = useState([]);
    let [HC5cards, setHC5cards] = useState([]);
    let [HC6cards, setHC6cards] = useState([]);
    let [HC9cards, setHC9cards] = useState([]);

    // Assigning each card group setter function to respective card
    let card_design_type = {
        HC1: setHC1cards,
        HC3: setHC3cards,
        HC5: setHC5cards,
        HC6: setHC6cards,
        HC9: setHC9cards,
    };

    /**
     * Sorting the card groups in their respective groups
     * @param {Array} cards
     */
    const sortCards = (cards) => {
        cards.forEach((card) => {
            let setCards = card_design_type[card.design_type];
            setCards((curr) => [...curr, card]);
        });
    };

    // Fetching card groups from API
    const fetchData = async () => {
        let url =
            process.env.NODE_ENV === 'development'
                ? '/assets/data.json'
                : process.env.REACT_APP_API_URL;
        fetch(url)
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

    return (
        <div className='App'>
            <Navbar />
            <CardGroups
                HC1CardGroups={HC1cards}
                HC3CardGroups={HC3cards}
                HC5CardGroups={HC5cards}
                HC6CardGroups={HC6cards}
                HC9CardGroups={HC9cards}
            />
        </div>
    );
}

export default App;
