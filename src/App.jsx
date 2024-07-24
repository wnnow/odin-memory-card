import { useEffect, useState } from "react";

import "./App.css";
import ScoreBoard from "./ScoreBoard";
import CardContainer from "./CardContainer";

let didInit = false;

function App() {
  const [pokemonDataList, setPokemonDataList] = useState([]);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0%22`)
        .then((response) => response.json())
        .then((data) => {
          const shuffleArr = shuffleArray(data.results);
          return shuffleArr.slice(0, 20);
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
      <h1 className="center header-text">Pokemon Memory Game</h1>
      <h2 className="center instruct-text">
        Try not to click the same pokemon until the last one
      </h2>

      <ScoreBoard />
      <CardContainer
        pokemonData={pokemonDataList}
        isOver={isOver}
        setIsOver={setIsOver}
        shuffleData={handleShuffleClick}
      />
    </>
  );
}

export default App;
