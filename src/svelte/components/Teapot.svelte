<script>
    import { TIMINGS } from "../config.js";
    import { onDestroy } from "svelte";
    export let harvestedPlants = 0;
    let progress = 0;
    let isBrewing = false;
    let brewedTea = 0;
    let brewingInterval;

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // Add getState method for sprites
    export function getState() {
        return { isBrewing, brewedTea, progress };
    }

    export function setState(state) {
        isBrewing = state.isBrewing;
        brewedTea = state.brewedTea;
        progress = state.progress;

        if (isBrewing) {
            if (brewingInterval) clearInterval(brewingInterval);

            const increment = calculateBrewIncrement();
            brewingInterval = setInterval(() => {
                progress += increment;
                if (progress >= 100) {
                    clearInterval(brewingInterval);
                    brewingInterval = null;
                    isBrewing = false;
                    brewedTea += 1;
                    dispatch("teaBrewed");
                }
            }, 100);
        }
    }

    function calculateBrewIncrement() {
        // Calculate how much progress to add each tick to complete in BREW_TIME
        return (100 * 100) / TIMINGS.BREW_TIME; // 100 is the interval time in ms
    }

    export function brewTea() {
        if (isBrewing || harvestedPlants < 1) return;

        isBrewing = true;
        progress = 0;

        dispatch("useTea");

        // Clear any existing interval just in case
        if (brewingInterval) clearInterval(brewingInterval);
        const increment = calculateBrewIncrement();
        brewingInterval = setInterval(() => {
            progress += increment;
            if (progress >= 100) {
                clearInterval(brewingInterval);
                brewingInterval = null;
                isBrewing = false;
                brewedTea += 1;
                dispatch("teaBrewed");
            }
        }, 100);
    }

    onDestroy(() => {
        if (brewingInterval) {
            clearInterval(brewingInterval);
        }
    });
</script>

<div class="teapot">
    <button
        on:click={brewTea}
        disabled={isBrewing || (!isBrewing && harvestedPlants < 1)}
    >
        {#if !isBrewing && harvestedPlants < 1}
            Need tea leaves to brew
        {:else if isBrewing}
            Brewing... ({Math.floor(progress)}%)
        {:else}
            Brew Tea
        {/if}
    </button>

    {#if isBrewing}
        <progress value={progress} max="100"></progress>
    {/if}
</div>
