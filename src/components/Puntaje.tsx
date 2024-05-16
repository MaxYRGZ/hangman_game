import React from "react";

interface PuntajeProps {
    roundsWon: number;
}

const Puntaje: React.FC<PuntajeProps> = ({ roundsWon }: PuntajeProps) => {
    return (
        <div>
            <p>You won in this round. Rounds won: {roundsWon}</p> {/* Muestra roundsWon */}
        </div>
    );
};

export default Puntaje;
