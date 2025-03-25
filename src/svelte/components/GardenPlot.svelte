<script>
    import { TIMINGS, TEA } from "../config.js";
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
    export let unlockedTeaTypes = { green: true };
    export let selectedTeaType = "green";
    export let isPaused = false;

    let isDay;
    isDaytime.subscribe((value) => (isDay = value));

    export function getState() {
        return {
            isGrowing,
            readyToHarvest,
            isHarvesting,
            progress,
            harvestProgress,
            selectedTeaType,
            isPaused,
        };
    }

    export function setState(state) {
        isGrowing = state.isGrowing;
        readyToHarvest = state.readyToHarvest;
        isHarvesting = state.isHarvesting;
        progress = state.progress;
        harvestProgress = state.harvestProgress;
        selectedTeaType = state.selectedTeaType || "green";
        isPaused = state.isPaused || false;

        if (isGrowing) {
            if (growthInterval) clearInterval(growthInterval);

            growthInterval = setInterval(() => {
                const increment = calculateGrowthIncrement(isDay);
                progress += increment;
                if (progress >= 100) {
                    clearInterval(growthInterval);
                    growthInterval = null;
                    isGrowing = false;
                    readyToHarvest = true;
                    progress = 100;
                    dispatch("plantReady", { teaType: selectedTeaType });
                }
            }, 100);
        } else if (isHarvesting) {
            startHarvesting();
        }
    }

    let growthInterval;

    function calculateGrowthIncrement(isDay) {
        // Calculate base increment to complete in GROW_TIME
        const baseTime = TEA[selectedTeaType].growTime;
        const baseIncrement = (100 * 100) / baseTime; // 100 is the interval time in ms
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
                progress = 100;
                dispatch("plantReady", { teaType: selectedTeaType });
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
                progress = 0;
                dispatch("plantComplete", { teaType: selectedTeaType });
            }
        }, 100);
    }

    export function harvest() {
        if (!readyToHarvest || isHarvesting) return;

        isHarvesting = true;
        harvestProgress = 0;
        // Make sure readyToHarvest is set to false before dispatching harvestStart
        readyToHarvest = false;
        dispatch("harvestStart", { teaType: selectedTeaType });
        startHarvesting();
    }

    function togglePause() {
        isPaused = !isPaused;
        dispatch("pauseStateChanged", { isPaused, plotId: null });
    }

    onDestroy(() => {
        if (growthInterval) clearInterval(growthInterval);
        if (harvestInterval) clearInterval(harvestInterval);
    });
</script>

<div class="garden-plot" class:paused={isPaused}>
    <div class="garden-box">
        <button
            on:click={plantTea}
            disabled={isGrowing || readyToHarvest || isHarvesting}
            data-growing={isGrowing}
            data-harvestable={readyToHarvest}
        >
            {#if isGrowing}
                Growing Tea... ({Math.floor(progress)}%)
            {:else if readyToHarvest}
                Ready to Harvest!
            {:else}
                Plant {TEA[selectedTeaType].name}
            {/if}
        </button>
        {#if isGrowing || readyToHarvest}
            <progress value={progress} max="100"></progress>
        {/if}
    </div>

    <div class="harvest-box">
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
    <select
        bind:value={selectedTeaType}
        disabled={isGrowing || readyToHarvest || isHarvesting}
    >
        {#each Object.entries(TEA) as [type, config]}
            {#if unlockedTeaTypes[type]}
                <option value={type}>{config.name}</option>
            {/if}
        {/each}
    </select>

    <!-- Pause button -->
    <button
        class="pause-button"
        on:click={togglePause}
        title={isPaused ? "Enable automation" : "Pause automation"}
    >
        {isPaused ? "⏵" : "⏸"}
    </button>
</div>
