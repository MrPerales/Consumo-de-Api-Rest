let id = Math.floor(Math.random()*1010)//1012 limit
const container=document.querySelector('.container');
const POKEAPI = `https://pokeapi.co/api/v2/pokemon`;


function randomPoke(){  //reload the page 

    location.reload();
}

//console.log(id);

async function FetchData(urlApi) {
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const poke =await FetchData(`${POKEAPI}/${id}`);
        //build the page
        const viewPoke = `
        <figure class="imgPoke">
            <img src="${poke.sprites.front_default}" alt="${poke.species.name}">
        </figure>
        <div>
            <div class="description">
                <p class="name">${poke.species.name.toUpperCase()}</p>
                <p class="generation">N.° ${poke.id}</p>
                <p class="generation">Types: ${poke.types.map((item)=>item.type.name).join('-').toUpperCase()}</p>
            </div>
         </div>`;
        container.innerHTML=viewPoke;


    } catch (error) {
        throw Error(error);
    }
})();