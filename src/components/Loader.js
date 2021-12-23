import { createPortal } from 'react-dom';

import '../styles/Loader.css';

const Loader = ({ loader_shown }) => {
    return createPortal(
        <div className={`loading ${loader_shown ? 'shown' : ''}`}>
            <div className='blobs'>
                <div className='blob-center'></div>
                <div className='blob'></div>
                <div className='blob'></div>
                <div className='blob'></div>
                <div className='blob'></div>
                <div className='blob'></div>
                <div className='blob'></div>
            </div>
        </div>,
        document.getElementById('loader'),
    );
};

export default Loader;
