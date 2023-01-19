<script>
    import PokemonCard from "$lib/components/PokemonCard.svelte";
    import sort from "$lib/utils/sort";
    const ImageAPI = 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/'; // plus id: "001.png"
    export let data

    const { pokemon1, pokemon2, pokemon3 } = data;
    const { name, id } = pokemon1;
    const names = {
        "name1": name,
        "name2": pokemon2.name,
        "name3": pokemon3.name
    };
    const orderButtons = sort(3);
    let win = false;

    let image = String(id).length === 1
        ? `00${id}`
        : String(id).length === 2
        ? `0${id}` : id

    let btnTarget = 'name';

    function getValue (e) {
        btnTarget = {
            target: e.target,
            name: e.target.innerText
        }
        if(btnTarget.name === names.name1) {
            console.log('you win')
            win = true;
            e.target.classList.remove('bg-white')
            e.target.classList.add('bg-yellow-300')
        } else {
            console.log('you loose')
            e.target.classList.remove('bg-white')
            e.target.classList.add('bg-red-300')
        }
    }

</script>

<div class="content p-4">
    <div class="flex justify-center">
        <PokemonCard {win} image={`${ImageAPI}${image}.png`} />
    </div>
    <div class="flex justify-center gap-4">
        {#each orderButtons as item}
            <button
                class="bg-white drop-shadow-[0_5px_3px_rgba(0,0,0,0.20)]
                    p-4 rounded-3xl border-t-[1px]
                    hover:bg-yellow-300"
                on:click={getValue}
            >{names['name' + item]}</button>
        {/each}
    </div>
</div>
