const API = 'https://pokeapi.co/api/v2/pokemon/' // plus id number: 1

export const prerender = true;

function getRandomNum (num) {
    return Math.floor(Math.random() * num) + 1;
}

export async function load() {
    
    const random = [
        getRandomNum(150),
        getRandomNum(150),
        getRandomNum(150)
    ]

    const pokemon1 = await fetch(`${API}${random[0]}`)
    const pokemon2 = await fetch(`${API}${random[1]}`)
    const pokemon3 = await fetch(`${API}${random[2]}`)
    const pokeData1 = await pokemon1.json();
    const pokeData2 = await pokemon2.json();
    const pokeData3 = await pokemon3.json();
    const data = {
        pokemon1: pokeData1,
        pokemon2: pokeData2,
        pokemon3: pokeData3
    }

    if(pokemon1.status === 200) {
        return data;
    }

    const error = new Error('Thata not fetched');
    throw error.message

}