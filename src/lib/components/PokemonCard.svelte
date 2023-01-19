<script>
    import { onMount } from 'svelte';
    import clickIcon from '$lib/images/click-icon.png';
    import ash from '$lib/images/ash-ketchum.png';
    import reloadIcon from '$lib/images/reload-icon.png';
    import { gsap } from "gsap";
    let canvas;
    let initialX;
    let initialY;
    let pokemonImg;

    export let image;
    let clickMessage = false;
    export let win = false;

    function showClickMessage () {
        clickMessage = true
    }

    function hideClickMessage () {
        clickMessage = false
    }

    onMount(() => {

        const ctx = canvas.getContext('2d');
        ctx.fillRect(0, 0, canvas.height, canvas.width);
        ctx.fillStyle = '#000';

        const dibujar = ( x, y ) => {
            ctx.beginPath();
            ctx.moveTo(initialX, initialY);
            ctx.lineWidth = 70;
            ctx.strokeStyle = '#ffffff';
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.lineTo(x, y);
            ctx.stroke();

            initialX = x;
            initialY = y;
        }

        const mouseDown = event => {
            initialX = event.offsetX;
            initialY = event.offsetY;
            dibujar(initialX, initialY);
            canvas.addEventListener("mousemove", mouseMoving)
        }

        const mouseUp = () => {
            canvas.removeEventListener("mousemove", mouseMoving)
        }

        const mouseMoving = event => {
            dibujar(event.offsetX, event.offsetY);
        };

        canvas.addEventListener('mousedown', mouseDown);
        canvas.addEventListener('mouseup', mouseUp);
        
        hideElement()

    })

    const clearPokemon = () => {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.height, canvas.width);
    }
    
    const winAnimation = () => {
        clearPokemon()
        const tl = gsap.timeline();
        tl.from(['.ash', '.yes'], { duration: 1, opacity: 0}, 'frame1')
        tl.from('.ash', { duration: 1, x: 100 }, 'frame1')
    }

    const hideElement = () => {
        const tl = gsap.timeline();
        tl.to('.loading', { duration: 1, opacity: 0}, 'frame1+=0.5')
        tl.set('.loading', { display: 'none' },  '>+=0.1')
    }
</script>

<style>
    .imgContent {
        cursor: url('../images/click-icon.png') 2 2, pointer;
        width: 400px;
        height: 400px;
    }
    .imgwh-250 {
        width: 250px;
        max-width: 250px;
        height: 250px;
    }
    .img-wrapper {
        width: 250px;
        max-width: 250px;
        height: 250px;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
    }
    .canvas {
        mix-blend-mode: multiply;
        -webkit-mask: var(--cssImg);
        mask: var(--cssImg);
        -webkit-mask-size: 250px 250px;
        mask-size: 250px 250px;
    }
    .pokemon, .canvas {
        user-select: none;
    }
    .click-icon {
        bottom: 10px;
        right: 50px;
        transform: rotate(-35deg);
    }
    .click-message {
        bottom: 58px;
        right: -42px;
        width: 100px;
    }
    .ash {
        bottom: -22px;
        left: -70px;
    }
    .yes {
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
    }
</style>

<div class="pokemonCard md:max-w-lg my-4 p-4 flex flex-col items-center">
    <h3 class="text-3xl font-bold mb-4">Who is this pokemon?</h3>
    <div class="imgContent relative rounded-full mb-4 bg-gradient-to-b from-gray-100 to-white drop-shadow-[0_5px_3px_rgba(0,0,0,0.20)]">
        <div class="img-wrapper absolute">
            <img class="imgwh-250 pokemon absolute top-0 left-0" bind:this={pokemonImg} src="{image}" alt="">
            <canvas
                bind:this={canvas}
                width="250"
                height="250"
                class="imgwh-250 canvas absolute top-0 left-0"
                style:--cssImg={`url(${image})`}
            ></canvas>
        </div>
        <div class="loading imgwh absolute top-0 left-0 bg-white w-[400px] h-[400px] rounded-full flex justify-center items-center animate-spin">
            <img
                src="{reloadIcon}"
                alt="reload-icon"
                class="w-10"
            >
        </div>
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <img
            class="click-icon absolute w-14 p-2 bg-white border border-black rounded-full hover:bg-yellow-300 transition"
            src="{clickIcon}" alt="click-icon"
            on:mouseover={showClickMessage}
            on:mouseout={hideClickMessage}
        >
        {#if clickMessage}
            <span
                class="click-message absolute px-4 py-4 bg-yellow-300 rounded-t-xl rounded-r-xl shadow-xs text-xs">
                Touch the shape and discover the pokemon
            </span>
        {/if}
        {#if win}
            <!-- svelte-ignore missing-declaration -->
            <img
                class="ash absolute w-[200px]"
                src="{ash}" alt="ash-ketchum"
                in:winAnimation
            >
            <span
                class="yes absolute text-5xl font-extrabold"
            >YES!!!</span>
        {/if}
    </div>
</div>