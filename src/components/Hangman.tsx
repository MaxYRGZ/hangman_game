import React, { useState, useEffect } from "react";
import { getRandomWord } from "./utilidades"; // Asegúrate de importar la función getRandomWord desde el archivo correcto
import '../App'; // ¿Quizás falta el nombre del archivo CSS?

// Definición de la interfaz para las props del componente Hangman
interface HangmanProps {
    category: string; // Propiedad que representa la categoría de la palabra
    word: string; // Propiedad que representa la palabra a adivinar
}

// Componente para mostrar el tiempo jugado
const Clock = () => {
    const [count, setCount] = useState(0);
  
    // Efecto para actualizar el contador cada segundo
    useEffect(() => {
      const interval = setInterval(() => {
        setCount(count => count + 1);
      }, 1000);
  
      // Limpiar el intervalo cuando el componente se desmonta
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div>
        <p>Tiempo jugado: {count}</p>
      </div>
    );
};

// Componente Hangman
const Hangman: React.FC<HangmanProps> = ({ category, word }: HangmanProps) => {
    // Estado para la palabra seleccionada
    const [selectedWord, setSelectedWord] = useState<string>(word);

    // Estado para las letras adivinadas, inicializado con la primera letra de la palabra
    const [guessedLetters, setGuessedLetters] = useState<string[]>([word]); 

    // Estado para contar los errores
    const [errorCount, setErrorCount] = useState<number>(0);

    // Estado para controlar si el juego ha comenzado
    const [gameStarted, setGameStarted] = useState<boolean>(false);

    // Efecto para imprimir en consola la palabra seleccionada cuando cambie
    useEffect(() => {
        console.log("Palabra seleccionada:", selectedWord);
    }, [selectedWord]);

    // Función para renderizar la palabra a adivinar con las letras adivinadas mostradas y las no adivinadas ocultas
    const displayWord = selectedWord.split('').map((letter, index) => {
        if (guessedLetters.includes(letter)) {
            return letter; // Si la letra está en las letras adivinadas, se muestra
        } else {
            return '_'; // Si la letra no está en las letras adivinadas, se muestra como '_'
        }
    });

    // Función para manejar el intento de adivinar una letra
    const handleGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
        const letter = e.target.value;
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
            if (!selectedWord.includes(letter)) {
                setErrorCount(prev => prev + 1); // Si la letra no está en la palabra, aumenta el contador de errores
            }
        }
    };

    // Función para reiniciar el juego
    const restartGame = () => {
        const newWord = getRandomWord(category); // Obtener una nueva palabra aleatoria
        setSelectedWord(newWord); // Establecer la nueva palabra seleccionada
        setGuessedLetters([]); // Reinicia las letras
        setErrorCount(0); // Reiniciar el contador de errores
    };

    // Función para comenzar el juego
    const handleStartGame = () => {
        setGameStarted(true); // Establecer que el juego ha comenzado
    };

    // Renderización del componente
    return (
        <div className="marc">
            {!gameStarted && (
                <button onClick={handleStartGame}>Play</button>
            )}
            {gameStarted && (
                <>
                    <h3>Categoría: {category}</h3>
                    <Clock />
                    <p>{displayWord.join(' ')}</p>
                    <input maxLength={1} onChange={handleGuess} />
                    {(displayWord.join('') === selectedWord || errorCount > 5) && (
                        <>
                            <button onClick={restartGame}>Select New Word</button>
                            <p>Cantidad de errores: {errorCount}</p>
                            {displayWord.join('') === selectedWord && (
                                <p>You won in this round</p>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Hangman;