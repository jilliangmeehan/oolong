<script>
    import { TIMINGS, PROGRESS_INCREMENT } from "../config.js";
    export let harvestedPlants = 0;
    let progress = 0;
    let isBrewing = false;
    let brewedTea = 0;

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // Add getState method for sprites
    export function getState() {
        return { isBrewing, brewedTea };
    }

    export function brewTea() {
        if (isBrewing || harvestedPlants < 1) return;

        isBrewing = true;
        progress = 0;

        dispatch("useTea");

        const interval = setInterval(() => {
            progress += PROGRESS_INCREMENT.BREW;
            if (progress >= 100) {
                clearInterval(interval);
                isBrewing = false;
                brewedTea += 1;
                dispatch("teaBrewed");
            }
        }, 100);
    }
</script>

<div class="teapot">
    <button
        on:click={brewTea}
        disabled={isBrewing || (!isBrewing && harvestedPlants < 1)}
    >
        {#if !isBrewing && harvestedPlants < 1}
            Need tea leaves to brew
        {:else if isBrewing}
            Brewing... ({progress}%)
        {:else}
            Brew Tea
        {/if}
    </button>

    {#if isBrewing}
        <progress value={progress} max="100"></progress>
    {/if}
</div>
