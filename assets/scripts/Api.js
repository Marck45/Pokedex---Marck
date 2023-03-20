const pokeApi = {};

function convertPokemonApiDetailtoPokemon(pokedetail){
  const pokemon = new Pokemon();
  pokemon.name = pokedetail.name;
  pokemon.number = pokedetail.id;

  const types = pokedetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon. types = types;
  pokemon.type = type;

  pokemon.photo = pokedetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonsDetail = (pokemon) => {
  return fetch(pokemon.url).then((response) => response.json())
  .then(convertPokemonApiDetailtoPokemon);
}

pokeApi.getPokemons = (offset = 0, limit = 12) => {
  const ApiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(ApiUrl)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => pokemonsDetails)
    }
