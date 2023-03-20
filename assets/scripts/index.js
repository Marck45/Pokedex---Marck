// manipulação do dom

const pokemonList = document.getElementById('pokemon');


// funcão de criação HTML lista

function convertePokemonTypesToHTML(pokemenTypes){
    return pokemenTypes.map((typeSlot) => `<p>${typeSlot.type.name}</p>`)
}

function converterPokemonToHTML(pokemon){

    return `
    <div class="mini-card">
        <div class="info-mini-card">
            <h3>${pokemon.name}</h3>
            ${convertePokemonTypesToHTML(pokemon.types).join(' ')}
            </div>
            <div class="img-mini-card">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        </div>
    </div>`
}

// Converter listas para inner no HTMl 

pokeApi.getPokemons().then((pokemons = [])=>{
    const newHTml = pokemons.map(converterPokemonToHTML).join('');
    pokemonList.innerHTML = newHTml;
})






