<script>
    export let name;
    export let getName;
    let btn;

    function getValue() {
        getName(btn.innerText)
    }
</script>

<button
    class="bg-white drop-shadow-[0_5px_3px_rgba(0,0,0,0.20)] p-4 rounded-3xl border-t-[1px] hover:bg-yellow-400 focus:bg-yellow-400"
    bind:this={btn} on:click={getValue}
>{name}</button>