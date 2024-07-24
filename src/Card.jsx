import { useEffect, useState } from "react";

export default function Card({
  image,
  name,

  setIsOver,
  shuffleData,
  currentScore,
  setCurrentScore,
  highScore,
  setHighScore,
  resetClicks,
  setResetClicks,
}) {
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    console.log(`Card for ${name} rendered with isClick: ${isClick}`);
  }, [isClick]);

  useEffect(() => {
    if (resetClicks) {
      setIsClick(false);
      setResetClicks(false);
      setIsOver(false);
    }
  }, [resetClicks]);

  function handleClick() {
    if (isClick) {
      setIsOver(true);
      setCurrentScore(0);
      setIsClick(false);
      shuffleData();
    } else {
      setIsClick(true);
      setCurrentScore(currentScore + 1);
      if (currentScore === highScore) {
        setHighScore(highScore + 1);
      }
      shuffleData();
    }
  }

  function capitalizeFirstCharacter(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
  }

  return (
    <li className="card" onClick={handleClick}>
      <div className="center">
        <img src={image} alt={name} />
      </div>
      <div className="center">{capitalizeFirstCharacter(name)}</div>
    </li>
  );
}
