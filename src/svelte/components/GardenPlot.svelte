<script>
    import { TIMINGS, PROGRESS_INCREMENT } from "../config.js";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let progress = 0;
    export let isGrowing = false;
    export let readyToHarvest = false;

    // Create a method to get the current state
    export function getState() {
        return { isGrowing, readyToHarvest };
    }

    export function plantTea() {
        if (isGrowing || readyToHarvest) return;

        isGrowing = true;
        readyToHarvest = false;
        progress = 0;

        const interval = setInterval(() => {
            progress += PROGRESS_INCREMENT.GROW;
            if (progress >= 100) {
                clearInterval(interval);
                isGrowing = false;
                readyToHarvest = true;
            }
        }, 100);
    }

    export function harvest() {
        if (!readyToHarvest) return;

        readyToHarvest = false;
        isGrowing = false;
        progress = 0;
        dispatch("plantComplete");
    }
</script>

<div class="garden-plot">
    <button
        on:click={plantTea}
        disabled={isGrowing || readyToHarvest}
        data-growing={isGrowing}
        data-harvestable={readyToHarvest}
    >
        {#if isGrowing}
            Growing... ({progress}%)
        {:else if readyToHarvest}
            Ready to Harvest!
        {:else}
            Plant Tea
        {/if}
    </button>

    {#if isGrowing || readyToHarvest}
        <progress value={progress} max="100"></progress>
    {/if}

    <div>
        <button on:click={harvest} disabled={!readyToHarvest}>
            Harvest Tea</button
        >
    </div>
</div>
