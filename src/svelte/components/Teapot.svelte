<script>
    import { TEA } from "../config.js";
    import { onDestroy } from "svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let harvestedTeas = {};
    let progress = 0;
    let isBrewing = false;
    let currentTeaType = null;
    let brewingInterval;

    function hasTeaAvailable() {
        return Object.values(harvestedTeas).some((amount) => amount > 0);
    }

    function startBrewing() {
        let selectedType = null;

        // Find the first available tea type
        for (const [type, amount] of Object.entries(harvestedTeas)) {
            if (amount > 0) {
                selectedType = type;
                break;
            }
        }

        if (!selectedType) {
            console.log("No tea available");
            isBrewing = false;
            return;
        }

        // Dispatch event to notify tea is being used
        dispatch("useTea", { teaType: selectedType });

        currentTeaType = selectedType;
        console.log(`Starting to brew ${TEA[currentTeaType].name}`);

        // Clear any existing interval
        if (brewingInterval) clearInterval(brewingInterval);

        // Start new brewing interval
        brewingInterval = setInterval(() => {
            progress += 1;

            if (progress >= 100) {
                clearInterval(brewingInterval);
                brewingInterval = null;
                dispatch("teaBrewed", { teaType: currentTeaType });
                isBrewing = false;
                progress = 0;
                currentTeaType = null;
            }
        }, TEA[selectedType].brewTime / 100);
    }

    export function brewTea() {
        if (isBrewing || !hasTeaAvailable()) {
            console.log(
                "Cannot brew:",
                isBrewing ? "already brewing" : "no tea available",
            );
            return;
        }
        progress = 0;
        isBrewing = true;
        startBrewing();
    }

    onDestroy(() => {
        if (brewingInterval) clearInterval(brewingInterval);
    });

    export function getState() {
        return { isBrewing, progress, currentTeaType };
    }

    export function setState(state) {
        isBrewing = state.isBrewing;
        progress = state.progress;
        currentTeaType = state.currentTeaType;

        if (isBrewing && currentTeaType) {
            startBrewing();
        }
    }
</script>

<div class="teapot" class:brewing={isBrewing}>
    <button
        on:click={brewTea}
        disabled={isBrewing || !hasTeaAvailable()}
        class:brewing={isBrewing}
    >
        {#if isBrewing && currentTeaType}
            {TEA[currentTeaType].name}... ({Math.floor(progress)}%)
        {:else if !hasTeaAvailable()}
            No Tea Available
        {:else}
            Brew Tea
        {/if}
    </button>

    {#if isBrewing}
        <progress value={progress} max="100" />
    {/if}
</div>
