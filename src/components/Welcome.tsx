import React from 'react';
import hangman from '../img/arc.png';
import '../css/main.css';

export default function Welcome() {
    return (
        <>
            <div className="wrapper">
                <h1>Welcome to my game</h1>
                <h2>Hangman Game</h2>
                <img src={hangman} alt="Hangman imagen.." width={500} height={500}  />
            </div>
        </>
    );
}
