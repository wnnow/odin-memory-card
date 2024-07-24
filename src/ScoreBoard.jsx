import { useEffect, useState } from "react";

export default function ScoreBoard({ isOver, setIsOver }) {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (isOver) {
      setCurrentScore(0);
      setIsOver(false);
    }
  }, [isOver]);

  return (
    <div className="center">
      <div className="score-container">
        <div>Current Score :</div>
        <div>{currentScore}</div>
      </div>
      <div className="score-container">
        <div>High Score :</div>
        <div>{highScore}</div>
      </div>
    </div>
  );
}
