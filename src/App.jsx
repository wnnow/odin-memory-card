import { useEffect, useState } from "react";

import "./App.css";
import ScoreBoard from "./ScoreBoard";
import CardContainer from "./CardContainer";

let didInit = false;

function App() {
  const [pokemonDataList, setPokemonDataList] = useState([]);
  const [isOver, setIsOver] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [tempHighScore, setTempHighScore] = useState(0);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0%22`)
        .then((response) => response.json())
        .then((data) => {
          const shuffleArr = shuffleArray(data.results);
          return shuffleArr.slice(0, 14);
          // return data.results;
        })
        .then((pokemonArray) => {
          const promises = pokemonArray.map((pokemon) =>
            fetch(pokemon.url).then((response) => response.json())
          );
          return Promise.all(promises);
        })
        .then((pokemonDetails) => setPokemonDataList(pokemonDetails))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, []);

  function shuffleArray(array) {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  function handleShuffleClick() {
    const shuffleArr = shuffleArray(pokemonDataList);
    setPokemonDataList(shuffleArr);
  }

  console.log(pokemonDataList);

  return (
    <>
      <h1 className="center header-text">Pokémon Memory Game</h1>
      <h2 className="center instruct-text">
        Click on each Pokémon without clicking the same one twice to achieve the
        highest score.
      </h2>
      <h2 className="center instruct-text">
        If you click the same Pokémon twice, the game will reset.
      </h2>

      <ScoreBoard
        currentScore={currentScore}
        setCurrentScore={setCurrentScore}
        highScore={highScore}
        setHighScore={setHighScore}
      />
      <CardContainer
        pokemonData={pokemonDataList}
        isOver={isOver}
        setIsOver={setIsOver}
        shuffleData={handleShuffleClick}
        currentScore={currentScore}
        setCurrentScore={setCurrentScore}
        highScore={highScore}
        setHighScore={setHighScore}
        tempHighScore={tempHighScore}
        setTempHighScore={setTempHighScore}
      />
    </>
  );
}

export default App;
