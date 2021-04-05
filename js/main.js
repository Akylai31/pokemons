const API = 'https://pokeapi.co/api/v2/pokemon';
let nextUrl = null;
let prevUrl = null;

fetchData(API);

function fetchData(url){
    fetch(url)
        .then(res => res.json())
        .then(response => {
            nextUrl = response.next;
            prevUrl = response.previous;
            render(response.results);
        })
};

function render(data){
    console.log(data)
    $('.pokemons-list').html('');
    data.forEach(item => {
        $('.pokemons-list').append(`<li>${item.name}</li>`)
    });
};

$('.previous-btn').on('click', function(){
    if(!prevUrl) return
    fetchData(prevUrl);
});

$('.next-btn').on('click', function(){
    if(!nextUrl) return
    fetchData(nextUrl)
});

$('body').on('click','li', function(e){
    let pokemonName = e.target.innerText;
    fetch(`${API}/${pokemonName}/`)
        .then(res => res.json())
        .then(response => showModal(response))
})

function showModal(pokemon){
    console.log(pokemon)
    $('.pokemon-info').append(`
        <li>
            <img src="${pokemon.sprites.front_default}" alt="pokemon img">
        </li>
        <li>Name: ${pokemon.name}</li>
        <li>Types: ${pokemon.types.map(item => item.type.name)}</li>
        <li>Weight: ${pokemon.weight}</li>
        <li>Height: ${pokemon.height}</li>
    `)

    $('.main-modal').css('display', 'block')
}

$('.btn-close').on('click', function(){
    $('.pokemon-info').html('');
    $('.main-modal').css('display', 'none');
})













///////////////////////////////////////////////////////////////
// EDIT НА LOCAL STORAGE















//////////////////////////////////////////////////////////////////////////////////////////////
//                     CHECK YOURSELF

