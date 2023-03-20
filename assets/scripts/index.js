// manipulação do dom

const pokemonList = document.getElementById('pokemon');

const loadMoreButton = document.getElementById('LoadMoreButton');

const limit = 12;
let offset = 0;


// funcão de criação HTML lista

// function converterPokemonToHTML(pokemon){

//     return `
//     <div class="mini-card ${pokemon.type}">
//         <div class="info-mini-card">
//             <h3>${pokemon.name}</h3>
//             ${pokemon.types.map((type)=> `<p class="type ${type}">${type}</p>`).join('')}
//             </div>
//             <div class="img-mini-card">
//             <img src="${pokemon.photo}" alt="${pokemon.name}" />
//         </div>
//     </div>`
// }

// Converter listas para inner no HTMl 

function loadPokemonsItens (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = [])=>{
        const newHTml = pokemons.map((pokemon) =>   `
            <div class="mini-card ${pokemon.type}">
                <div class="info-mini-card">
                    <h3>${pokemon.name}</h3>
                    ${pokemon.types.map((type)=> `<p class="type ${type}">${type}</p>`).join('')}
                    </div>
                    <div class="img-mini-card">
                    <img src="${pokemon.photo}" alt="${pokemon.name}" />
                </div>
            </div>`
            ).join('')

        pokemonList.innerHTML += newHTml;
    })
}

loadPokemonsItens(offset, limit);


loadMoreButton.addEventListener('click', () =>{
    offset += limit;
    loadPokemonsItens(offset, limit);

})


