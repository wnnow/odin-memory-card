import { useState } from "react";

export default function Card({ image, name, isOver, setIsOver, shuffleData }) {
  const [isClick, setIsClick] = useState(false);

  function handleClick() {
    if (isClick) {
      setIsOver(true);
    }
    setIsClick(true);
    shuffleData();
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
