// manipulação do dom

const pokemonList = document.getElementById("pokemon");

const loadMoreButton = document.getElementById("LoadMoreButton");

const btnMoreViwer = document.getElementById("btn-more");

const pokemonViwerDex = document.getElementById("pokemon-dex");

const limit = 12;
let offset = 0;

// funcão de criação HTML lista

function loadPokemonsItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHTml = pokemons
      .map(
        (pokemon) => `
        <button class="btn-more" id="btn-more" onclick="pokemonViwer('${
          pokemon.url
        }')" >
            <div id="mini-card-slot" class="mini-card ${pokemon.type}">
                    
                <div class="info-mini-card">
                    <h3>${pokemon.name}</h3>
                    ${pokemon.types
                      .map((type) => `<p class="type ${type}">${type}</p>`)
                      .join("")}
                </div>
                <div class="img-mini-card">
                    <img src="${pokemon.photo}" alt="${pokemon.name}" />
                </div>
                
            </div>
        </button>`
      )
      .join("");

    pokemonList.innerHTML += newHTml;
  }); 
}

loadPokemonsItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  loadPokemonsItens(offset, limit);
});

// função para visualizar status do pokemon

async function pokemonViwer(pokemonURL) {
  const pokemon = await pokeApi.getPokemonsDetail({ url: pokemonURL });
  console.log(pokemon);
  const ViewrHtml = `
  <div class="info-card">
    <div>
      <h3>${pokemon.name}</h3>
      ${pokemon.types
        .map(
          (type) =>
            `<p class="pokemon__details__type ${type}">${type}</p>`
        )
        .join("")}
    </div>
    <div>
      <h3>#0${pokemon.id}</h3>
    </div>
  </div>
  <!-- imagem e dados de posição do pokemon -->
  <div class="img-card">
    <img src="${pokemon.photo}" alt="bulbasaur" />
  </div>
  <!-- buttom de dados do pokemon  -->
  <div class="info-stats ${pokemon.type}">

    <div class="btn-info">
      <button>About</button>
    </div>
    <!-- telas com dados de acordo com buttom selecionado -->
    <div class="card-about">
      <table class="table-stats">
       
        <tr class="info-data">
          <td class="td-label">Height</td>
          <td>${pokemon.height}</td>
        </tr>
        <tr class="info-data">
          <td class="td-label">Weight</td>
          <td>${pokemon.weight / 10}kg</td>
        </tr>
        <tr class="info-data">
          <td class="td-label">Abilities</td>
          ${pokemon.abilities.map((ability) => `<td>${ability}</td>`).join('')}
        </tr>
        <tr class="info-data">
          <td class="td-label">Base Xp</td>
          <td>${pokemon.xp}</td>
        </tr>
      </table>
    </div>
    <div class="base-stats">
      <table class="">${pokemon.stats.map((base, nameBase)=> `
            <tr class="info-data ">
            <td class="td-label">${nameBase}</td>
            <td>${base}</td>
            </tr>`).join('')}`;

  pokemonViwerDex.innerHTML = ViewrHtml;
}
