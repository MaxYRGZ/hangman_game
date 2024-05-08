import React from "react";

interface PuntajeProps {
    roundsWon: number;
    restartGame: () => void;
    incrementRoundsWon: () => void;
}

const Puntaje: React.FC<PuntajeProps> = ({ roundsWon, restartGame, incrementRoundsWon }: PuntajeProps) => {
    const handleNextRoundClick = () => {
        incrementRoundsWon();
        restartGame();
    };

    return (
        <div>
            <p>You won in this round. Rounds won: {roundsWon+1}</p>
            <button onClick={handleNextRoundClick}>Next Round</button>
        </div>
    );
};

export default Puntaje;
