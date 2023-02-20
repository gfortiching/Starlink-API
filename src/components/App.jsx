import React, { useRef } from 'react';
import '/src/styles/layout.css';
import Header from './Header';
import Api from './Api';
import Scroll from './Scroll';
import ScrollToTop from "./ScrollToTop";

function App() {

    const top = useRef(null);

    return(
        <>
            <Header />
            <section ref={top}><Api /></section>
            <span onClick={() => Scroll(top)}><ScrollToTop /></span>
        </>
    )
}

export default App;