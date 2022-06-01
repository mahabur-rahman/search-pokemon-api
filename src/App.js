import React, { useEffect, useState } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });
  const [pokemonChosen, setPokemonChosen] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // handleSearch
  const handleSearch = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${inputText}`).then((res) => {
      setPokemon({
        name: inputText,
        species: res.data.species.name,
        img: res.data.sprites.front_default,
        hp: res.data.stats[0].base_stat,
        attack: res.data.stats[1].base_stat,
        defense: res.data.stats[2].stat.name,
        type: res.data.types[0].type.name,
      });

      setPokemonChosen(true);
    });
  };

  return (
    <div className="m-4">
      <h2 className="mb-3 text-center text-dark display-4 fw-bold">PokeMon</h2>
      <input
        type="text"
        placeholder="Search.."
        className="form-control"
        value={inputText}
        onChange={handleInputChange}
      />
      <button className="mt-3 btn btn-dark" onClick={handleSearch}>
        Search Pokemon
      </button>

      <h1 className="mt-5 display-5 text-primary">
        <pre>
          Name : {!pokemonChosen ? "Please choose a pokemon" : inputText}
        </pre>
      </h1>
      <img src={pokemon.img} alt={inputText}></img>
      <pre>Type :{pokemon.type}</pre>
      <pre>Defense :{pokemon.defense}</pre>
      <pre>HP :{pokemon.hp}</pre>
      <pre>attack :{pokemon.attack}</pre>
    </div>
  );
};

export default App;
