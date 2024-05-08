import React from 'react';
import Hangman from './components/Hangman';
import Welcome from './components/Welcome';
import { getRandomCategory, getRandomWord } from './components/utilidades';

const App: React.FC = () => {
    const selectedCategory: string = getRandomCategory();
    const selectedWord: string = getRandomWord(selectedCategory);

    return (
        <div className="App">
            <Welcome />
            <Hangman category={selectedCategory} word={selectedWord} />
        </div>
    );
}

export default App;
