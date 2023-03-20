const pokeApi = {};

pokeApi.getPokemonsDetail = (pokemon) => {
  return fetch(pokemon.url).then((response) => response.json());
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
  const ApiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(ApiUrl)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => pokemonsDetails)
    }
