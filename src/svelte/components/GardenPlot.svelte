<script>
    import { TIMINGS } from "../config.js";
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

        if (isGrowing && !readyToHarvest) {
            if (growthInterval) clearInterval(growthInterval);

            growthInterval = setInterval(() => {
                const increment = calculateGrowthIncrement(isDay);
                progress += increment;
                if (progress >= 100) {
                    clearInterval(growthInterval);
                    growthInterval = null;
                    isGrowing = false;
                    readyToHarvest = true;
                }
            }, 100);
        }
    }

    // It's also good practice to clean up intervals when the component is destroyed
    let growthInterval;

    function calculateGrowthIncrement(isDay) {
        // Calculate base increment to complete in GROW_TIME
        const baseIncrement = (100 * 100) / TIMINGS.GROW_TIME; // 100 is the interval time in ms
        return isDay ? baseIncrement : baseIncrement * 0.5; // Half speed at night
    }

    export function plantTea() {
        if (isGrowing || readyToHarvest) return;

        isGrowing = true;
        readyToHarvest = false;
        progress = 0;

        if (growthInterval) clearInterval(growthInterval);

        growthInterval = setInterval(() => {
            const increment = calculateGrowthIncrement(isDay);
            progress += increment;
            if (progress >= 100) {
                clearInterval(growthInterval);
                growthInterval = null;
                isGrowing = false;
                readyToHarvest = true;
            }
        }, 100); // Update every 100ms
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
