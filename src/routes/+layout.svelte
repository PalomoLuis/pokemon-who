<script>
    import "../app.css";
    import reloadIcon from '$lib/images/reload-icon.png';

    // export const prerender = true;

    const reloadWindow = () => {
        location.reload()
    }
</script>

<header class="container max-w-full flex justify-center shadow-lg">
    <div class="header-wrapper container px-4 h-14 flex justify-between items-center">
        <div class="logo">
            <p class="text-xl font-bold uppercase">Pokemon Who?</p>
        </div>
        <ol class="flex justify-between items-center gap-4">
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/">Game</a>
            </li>
            <li>
                <a href="/" on:click={reloadWindow}>
                    <img
                        class="w-10 p-2 border-t-[1px] rounded-full bg-white shadow-md hover:bg-yellow-300"
                        src="{reloadIcon}" alt="reload-icon"
                    >
                </a>
            </li>
        </ol>
    </div>
</header>

<slot />