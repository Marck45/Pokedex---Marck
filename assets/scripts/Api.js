const pokeApi = {};

function convertPokemonApiDetailtoPokemon(pokedetail){
  const pokemon = new Pokemon(pokedetail);
  pokemon.name = pokedetail.name;
  pokemon.number = pokedetail.id;
  pokemon.id = pokedetail.id;
  const types = pokedetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  

  const abilities = pokedetail.types.map((abilitySlot) => abilitySlot.type.name);
  const [ability] = abilities;
  pokemon.abilities = abilities;
  pokemon.ability = ability;

  const nameStats = pokedetail.stats.map((nameBaseSlot)=> nameBaseSlot.stat.name);
  const nameBase = nameStats;
  const stats = pokedetail.stats.map((statsSlot)=> statsSlot.base_stat);
  const [base] = stats;

  pokemon.attribut = nameBase.map((value, index) => [value, stats[index]]); 
  
  pokemon.stats = stats;
  pokemon.base = base;
  pokemon.nameBase = nameBase;


  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokedetail.sprites.other.dream_world.front_default;
  pokemon.weight = pokedetail.weight;
  pokemon.height = pokedetail.height;
  pokemon.xp = pokedetail.base_experience;

  return pokemon;
}

pokeApi.getPokemonsDetail = async (pokemon) => {
  const response = await fetch(pokemon.url);
  const pokedetail = await response.json();
  return convertPokemonApiDetailtoPokemon(pokedetail);
}

pokeApi.getPokemons = async (offset = 0, limit = 12) => {
  const ApiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  const response = await fetch(ApiUrl);
  const jsonBody = await response.json();
  const pokemons = jsonBody.results;
  const detailRequest = pokemons.map(pokeApi.getPokemonsDetail);
  const pokemonsDetails = await Promise.all(detailRequest);
  return pokemonsDetails;
  }
