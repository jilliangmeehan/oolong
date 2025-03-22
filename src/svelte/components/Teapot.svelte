<script>
    import { TIMINGS, PROGRESS_INCREMENT } from "../config.js";
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

        // If it was in the middle of brewing, restart the brewing process
        if (isBrewing) {
            if (brewingInterval) clearInterval(brewingInterval);

            brewingInterval = setInterval(() => {
                progress += PROGRESS_INCREMENT.BREW;
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

    export function brewTea() {
        if (isBrewing || harvestedPlants < 1) return;

        isBrewing = true;
        progress = 0;

        dispatch("useTea");

        // Clear any existing interval just in case
        if (brewingInterval) clearInterval(brewingInterval);

        brewingInterval = setInterval(() => {
            progress += PROGRESS_INCREMENT.BREW;
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
