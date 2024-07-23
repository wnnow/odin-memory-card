import { useEffect, useState } from "react";

import "./App.css";

let didInit = false;

function App() {
  const [pokemonDataList, setPokemonDataList] = useState([]);

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
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // function handleShuffleClick() {
  //   const shuffleArr = shuffleArray(pokemonDataList);
  //   console.log("🚀 ~ handleClick ~ shuffleArr:", shuffleArr);
  //   setPokemonDataList(shuffleArr);
  // }

  console.log(pokemonDataList);

  function capitalizeFirstCharacter(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
  }

  return (
    <>
      <ul>
        {pokemonDataList.map((pokemon) => (
          <li key={pokemon.id}>
            <img src={pokemon.sprites.front_default}></img>
            <div>{capitalizeFirstCharacter(pokemon.name)}</div>
          </li>
        ))}
      </ul>
      <div></div>
    </>
  );
}

export default App;
