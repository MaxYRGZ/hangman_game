import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getRandomWord } from "./utilidades";
import Puntaje from "./Puntaje";

interface HangmanProps {
    category: string;
    word: string;
}

const Hangman: React.FC<HangmanProps> = ({ category, word }: HangmanProps) => {
    const [selectedWord, setSelectedWord] = useState<string>(word);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([word]);
    const [errorCount, setErrorCount] = useState<number>(0);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [roundsWon, setRoundsWon] = useState<number>(0);
    const [showPlayButton, setShowPlayButton] = useState<boolean>(true);

    useEffect(() => {
        console.log("Selected word:", selectedWord);
    }, [selectedWord]);

    const displayWord = selectedWord.split('').map((letter) => {
        if (guessedLetters.includes(letter)) {
            return letter;
        } else {
            return '_';
        }
    });

    const handleGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
        const letter = e.target.value;
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
            if (!selectedWord.includes(letter)) {
                setErrorCount(prevCount => prevCount + 1);
            }
        }
    };

    const restartGame = () => {
        const newWord = getRandomWord(category);
        setSelectedWord(newWord);
        setGuessedLetters([]);
        setErrorCount(0);
        setShowPlayButton(false); // No mostrar el botón "Play" después de reiniciar el juego
    };

    const handleStartGame = () => {
        setGameStarted(true);
        setShowPlayButton(false); // No mostrar el botón "Play" después de iniciar el juego
    };

    const incrementRoundsWon = () => {
        setRoundsWon(prevCount => prevCount + 1); // Incrementa roundsWon en 1
        restartGame(); // Reiniciar el juego automáticamente después de ganar una ronda
    };

    return (
        <div className="marc">
            {!gameStarted && showPlayButton && (
                <button onClick={handleStartGame}>Play</button>
            )}
            {gameStarted && (
                <>
                    <h3>Category: {category}</h3>
                    <p>{displayWord.join(' ')}</p>
                    <input maxLength={1} onChange={handleGuess} />
                    {(displayWord.join('') === selectedWord || errorCount > 5) && (
                        <>
                            <p>Error count: {errorCount}</p>
                            {displayWord.join('') === selectedWord && (
                                <>
                                    <Outlet />
                                    <button onClick={incrementRoundsWon}>Next Round</button> 
                                </>
                            )}
                        </>
                    )}
                </>
            )}
            <Puntaje roundsWon={roundsWon} /> 
        </div>
    );
};

export default Hangman;
