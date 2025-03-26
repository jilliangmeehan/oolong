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
    export let isPaused = false;
    export let teapotId;

    const getTeacupIconPath = (teaType) => {
        return `../../icons/teacups/${teaType}.png`;
    };

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

    function togglePause() {
        isPaused = !isPaused;
        dispatch("pauseStateChanged", { isPaused, teapotId: null });
    }

    function deleteTeapot() {
        if (confirm("Are you sure you want to delete this teapot?")) {
            // Clean up interval before deletion
            if (brewingInterval) clearInterval(brewingInterval);

            dispatch("deleteTeapot", { teapotId });
        }
    }

    onDestroy(() => {
        if (brewingInterval) clearInterval(brewingInterval);
    });

    export function getState() {
        return { isBrewing, progress, currentTeaType, isPaused };
    }

    export function setState(state) {
        isBrewing = state.isBrewing;
        progress = state.progress;
        currentTeaType = state.currentTeaType;
        isPaused = state.isPaused || false;

        if (isBrewing && currentTeaType) {
            startBrewing();
        }
    }
</script>

<div class="teapot" class:brewing={isBrewing} class:paused={isPaused}>
    <button
        on:click={brewTea}
        disabled={isBrewing || !hasTeaAvailable()}
        class:brewing={isBrewing}
    >
        {#if isBrewing && currentTeaType}
            {TEA[currentTeaType].name} ({Math.floor(progress)}%)
        {:else if !hasTeaAvailable()}
            No Tea Available
        {:else}
            Brew Tea
        {/if}
    </button>

    {#if isBrewing}
        <progress value={progress} max="100" />
    {/if}

    {#if isBrewing && currentTeaType}
        <img
            src={getTeacupIconPath(currentTeaType)}
            alt={`${TEA[currentTeaType].name} icon`}
            class="teacup-icon"
        />
    {/if}

    <div class="control-buttons">
        <!-- Pause button -->
        <button
            class="pause-button"
            on:click={togglePause}
            title={isPaused ? "Enable automation" : "Pause automation"}
        >
            {isPaused ? "⏵" : "⏸"}
        </button>

        <!-- Delete button -->
        <button
            class="delete-button"
            on:click={deleteTeapot}
            title="Delete teapot"
        >
            ✕
        </button>
    </div>
</div>
