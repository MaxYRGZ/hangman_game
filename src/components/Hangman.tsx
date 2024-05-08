import React, { useState, useEffect } from "react";
import { getRandomWord } from "./utilidades";
import Puntaje from "./Puntaje"; // Importa el componente Puntaje
import '../App';

// Definition of the interface for the Hangman component props
interface HangmanProps {
    category: string; // Property representing the word category
    word: string; // Property representing the word to guess
}

// Component to display the elapsed time
const Clock = () => {
    const [count, setCount] = useState(0);

    // Effect to update the counter every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count => count + 1);
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <p>Time played: {count}</p>
        </div>
    );
};

// Hangman Component
const Hangman: React.FC<HangmanProps> = ({ category, word }: HangmanProps) => {
    // State for the selected word
    const [selectedWord, setSelectedWord] = useState<string>(word);

    // State for guessed letters, initialized with the first letter of the word
    const [guessedLetters, setGuessedLetters] = useState<string[]>([word]);

    // State to count errors
    const [errorCount, setErrorCount] = useState<number>(0);

    // State to control if the game has started
    const [gameStarted, setGameStarted] = useState<boolean>(false);

    // State for the rounds won counter
    const [roundsWon, setRoundsWon] = useState<number>(0);

    // Effect to log the selected word to the console when it changes
    useEffect(() => {
        console.log("Selected word:", selectedWord);
    }, [selectedWord]);

    // Function to render the word to guess with guessed letters shown and unguessed ones hidden
    const displayWord = selectedWord.split('').map((letter, index) => {
        if (guessedLetters.includes(letter)) {
            return letter; // If the letter is in the guessed letters, show it
        } else {
            return '_'; // If the letter is not in the guessed letters, show it as '_'
        }
    });

    // Function to handle guessing a letter
    const handleGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
        const letter = e.target.value;
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
            if (!selectedWord.includes(letter)) {
                setErrorCount(prev => prev + 1); // If the letter is not in the word, increase the error count
            }
        }
    };

    // Function to restart the game
    const restartGame = () => {
        const newWord = getRandomWord(category); // Get a new random word
        setSelectedWord(newWord); // Set the new selected word
        setGuessedLetters([]); // Reset guessed letters
        setErrorCount(0); // Reset error count
    };

    // Function to start the game
    const handleStartGame = () => {
        setGameStarted(true); // Set that the game has started
    };

  

    // Function to increment rounds won
    const incrementRoundsWon = () => {
        setRoundsWon(prev => prev + 1);
    };

    // Component rendering
    return (
        <div className="marc">
            {!gameStarted && (
                <button onClick={handleStartGame}>Play</button>
            )}
            {gameStarted && (
                <>
                    <h3>Category: {category}</h3>
                    <Clock />
                    <p>{displayWord.join(' ')}</p>
                    <input maxLength={1} onChange={handleGuess} />
                    {(displayWord.join('') === selectedWord || errorCount > 5) && (
                        <>
                            <p>Error count: {errorCount}</p>
                            {displayWord.join('') === selectedWord && (
                                <>
                                    <Puntaje roundsWon={roundsWon} restartGame={restartGame} incrementRoundsWon={incrementRoundsWon} />
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Hangman;
