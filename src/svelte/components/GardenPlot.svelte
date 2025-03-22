<script>
    import { TIMINGS } from "../config.js";
    import { isDaytime } from "../stores.js";
    import { onDestroy } from "svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let progress = 0;
    let harvestProgress = 0;
    export let isGrowing = false;
    export let readyToHarvest = false;
    export let isHarvesting = false;
    let harvestInterval;

    let isDay;
    isDaytime.subscribe((value) => (isDay = value));

    // Create a method to get the current state
    export function getState() {
        return {
            isGrowing,
            readyToHarvest,
            progress,
            isHarvesting,
            harvestProgress,
        };
    }

    export function setState(state) {
        isGrowing = state.isGrowing;
        readyToHarvest = state.readyToHarvest;
        isHarvesting = state.isHarvesting;
        progress = state.progress;
        harvestProgress = state.harvestProgress;

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
        if (isHarvesting) {
            startHarvesting();
        }
    }

    let growthInterval;

    function calculateGrowthIncrement(isDay) {
        // Calculate base increment to complete in GROW_TIME
        const baseIncrement = (100 * 100) / TIMINGS.GROW_TIME; // 100 is the interval time in ms
        return isDay ? baseIncrement : baseIncrement * 0.5; // Half speed at night
    }

    function calculateHarvestIncrement() {
        return (100 * 100) / TIMINGS.HARVEST_TIME;
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

    function startHarvesting() {
        if (harvestInterval) clearInterval(harvestInterval);

        harvestInterval = setInterval(() => {
            harvestProgress += calculateHarvestIncrement();
            if (harvestProgress >= 100) {
                clearInterval(harvestInterval);
                harvestInterval = null;
                isHarvesting = false;
                harvestProgress = 0;
                readyToHarvest = false;
                isGrowing = false;
                progress = 0;
                dispatch("plantComplete");
            }
        }, 100);
    }

    export function harvest() {
        if (!readyToHarvest || isHarvesting) return;

        isHarvesting = true;
        harvestProgress = 0;
        startHarvesting();
    }

    onDestroy(() => {
        if (growthInterval) clearInterval(growthInterval);
        if (harvestInterval) clearInterval(harvestInterval);
    });
</script>

<div class="garden-plot">
    <button
        on:click={plantTea}
        disabled={isGrowing || readyToHarvest || isHarvesting}
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
        <button on:click={harvest} disabled={!readyToHarvest || isHarvesting}>
            {#if isHarvesting}
                Harvesting... ({Math.floor(harvestProgress)}%)
            {:else}
                Harvest Tea
            {/if}
        </button>
        {#if isHarvesting}
            <progress value={harvestProgress} max="100"></progress>
        {/if}
    </div>
</div>
