import { useEffect, useState } from "react";
import Card from "./Card";

export default function CardContainer({
  pokemonData,
  shuffleData,
  isOver,
  setIsOver,
  currentScore,
  setCurrentScore,
  highScore,
  setHighScore,
}) {
  const [resetClicks, setResetClicks] = useState(false);
  useEffect(() => {
    if (isOver) {
      setResetClicks(true);
    }
  }, [isOver]);
  return (
    <ul className="card-container">
      {pokemonData.map((pokemon) => {
        return (
          <Card
            key={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            isOver={isOver}
            setIsOver={setIsOver}
            shuffleData={shuffleData}
            currentScore={currentScore}
            setCurrentScore={setCurrentScore}
            highScore={highScore}
            setHighScore={setHighScore}
            resetClicks={resetClicks}
            setResetClicks={setResetClicks}
          />
        );
      })}
    </ul>
  );
}
