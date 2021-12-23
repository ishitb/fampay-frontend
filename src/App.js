import { useEffect, useState } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';

import CardGroups from './components/CardGroups';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import './App.css';

function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [HC1cards, setHC1cards] = useState([]);
    const [HC3cards, setHC3cards] = useState([]);
    const [HC5cards, setHC5cards] = useState([]);
    const [HC6cards, setHC6cards] = useState([]);
    const [HC9cards, setHC9cards] = useState([]);

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
        setLoading(true);

        Object.keys(card_design_type).forEach((card) => {
            card_design_type[card]([]);
        });

        let url =
            process.env.NODE_ENV === 'development'
                ? '/assets/data.json'
                : process.env.REACT_APP_API_URL;
        fetch(url)
            .then(async (res) => {
                let cards = await res.json();
                sortCards(cards.card_groups);
            })
            .catch((e) => {
                console.log(e);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();

        // eslint-disable-next-line
    }, []);

    return (
        <div className='App'>
            <Navbar />
            <PullToRefresh onRefresh={fetchData}>
                {error ? (
                    <h1 className='error'>
                        We are currently facing come issues. Please try again
                        later
                        <br />
                        <br />
                        <span className='foreground-black'>
                            Pull to refresh!
                        </span>
                    </h1>
                ) : (
                    <CardGroups
                        HC1CardGroups={HC1cards}
                        HC3CardGroups={HC3cards}
                        HC5CardGroups={HC5cards}
                        HC6CardGroups={HC6cards}
                        HC9CardGroups={HC9cards}
                    />
                )}
            </PullToRefresh>
            <Loader loader_shown={loading} />
        </div>
    );
}

export default App;
