<script>
    import { TIMINGS, PROGRESS_INCREMENT } from "../config.js";
    import { isDaytime } from "../stores.js";
    import { onDestroy } from "svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let progress = 0;
    export let isGrowing = false;
    export let readyToHarvest = false;

    let isDay;
    isDaytime.subscribe((value) => (isDay = value));

    // Create a method to get the current state
    export function getState() {
        return { isGrowing, readyToHarvest, progress };
    }

    export function setState(state) {
        isGrowing = state.isGrowing;
        readyToHarvest = state.readyToHarvest;
        progress = state.progress;

        // If the plant was in the middle of growing, restart the growing process
        if (isGrowing && !readyToHarvest) {
            const interval = setInterval(() => {
                const growthRate = isDay
                    ? PROGRESS_INCREMENT.GROW
                    : PROGRESS_INCREMENT.NIGHT_GROWTH;
                progress += growthRate;
                if (progress >= 100) {
                    clearInterval(interval);
                    isGrowing = false;
                    readyToHarvest = true;
                }
            }, 100);
        }
    }

    // It's also good practice to clean up intervals when the component is destroyed
    let growthInterval;

    export function plantTea() {
        if (isGrowing || readyToHarvest) return;

        isGrowing = true;
        readyToHarvest = false;
        progress = 0;

        // Store the interval reference so we can clear it if needed
        if (growthInterval) clearInterval(growthInterval);

        growthInterval = setInterval(() => {
            const growthRate = isDay
                ? PROGRESS_INCREMENT.GROW
                : PROGRESS_INCREMENT.NIGHT_GROWTH;
            progress += growthRate;
            if (progress >= 100) {
                clearInterval(growthInterval);
                growthInterval = null;
                isGrowing = false;
                readyToHarvest = true;
            }
        }, 100);
    }

    onDestroy(() => {
        if (growthInterval) {
            clearInterval(growthInterval);
        }
    });

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
            Growing... ({Math.floor(progress)}%)
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
