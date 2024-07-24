import Card from "./Card";

export default function CardContainer({
  pokemonData,
  shuffleData,
  isOver,
  setIsOver,
}) {
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
          />
        );
      })}
    </ul>
  );
}
