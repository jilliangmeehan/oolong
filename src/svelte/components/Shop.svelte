<script>
    import { TEA, MAX_LIMITS, PRICES } from "../config.js";
    import { createEventDispatcher } from "svelte";
    import { automationPausedStore } from "../stores.js";
    const dispatch = createEventDispatcher();
    import { onMount } from "svelte";

    export let points = 0;
    export let unlockedTeaTypes = { green: true };
    export let gardenPlots = 1;
    export let teapots = 1;
    export let sprites = {
        garden: 0,
        harvest: 0,
        brewmaster: 0,
        cafe: 0,
    };

    export let allAutomationsPaused = false;
    let pauseStatus;
    automationPausedStore.subscribe((value) => {
        pauseStatus = value;
    });

    // Purchase counters to track how many of each item has been bought
    export let purchaseCount = {
        gardenPlot: 0,
        teapot: 0,
        garden: 0,
        harvest: 0,
        brewmaster: 0,
        cafe: 0,
    };

    $: gardenPlotCount = purchaseCount.gardenPlot;
    $: teapotCount = purchaseCount.teapot;
    $: gardenSpriteCount = purchaseCount.garden;
    $: harvestSpriteCount = purchaseCount.harvest;
    $: brewmasterSpriteCount = purchaseCount.brewmaster;
    $: cafeSpriteCount = purchaseCount.cafe;

    // Calculate current price based on base price and number of purchases
    function getCurrentPrice(basePrice, count) {
        console.log(
            `Calculating price with base=${basePrice}, count=${count}, multiplier=${PRICES.MULTIPLIER}`,
        );
        return Math.floor(basePrice * Math.pow(PRICES.MULTIPLIER, count));
    }

    // Explicitly depend on the individual count variables
    $: GARDEN_PLOT_COST = getCurrentPrice(
        PRICES.BASE.GARDEN_PLOT,
        gardenPlotCount,
    );
    $: TEAPOT_COST = getCurrentPrice(PRICES.BASE.TEAPOT, teapotCount);
    $: SPRITE_COSTS = {
        garden: getCurrentPrice(PRICES.BASE.SPRITE.GARDEN, gardenSpriteCount),
        harvest: getCurrentPrice(
            PRICES.BASE.SPRITE.HARVEST,
            harvestSpriteCount,
        ),
        brewmaster: getCurrentPrice(
            PRICES.BASE.SPRITE.BREWMASTER,
            brewmasterSpriteCount,
        ),
        cafe: getCurrentPrice(PRICES.BASE.SPRITE.CAFE, cafeSpriteCount),
    };

    function buyGardenPlot() {
        if (
            points >= GARDEN_PLOT_COST &&
            gardenPlots < MAX_LIMITS.GARDEN_PLOTS
        ) {
            dispatch("purchase", {
                item: "gardenPlot",
                cost: GARDEN_PLOT_COST,
            });
        }
    }

    function buyTeapot() {
        if (points >= TEAPOT_COST && teapots < MAX_LIMITS.TEAPOTS) {
            dispatch("purchase", {
                item: "teapot",
                cost: TEAPOT_COST,
            });
        }
    }

    function hireSprite(type) {
        if (
            points >= SPRITE_COSTS[type] &&
            sprites[type] < MAX_LIMITS.SPRITES[type]
        ) {
            dispatch("purchase", {
                item: "sprite",
                spriteType: type,
                cost: SPRITE_COSTS[type],
            });
        }
    }

    function unlockTeaType(type) {
        if (points >= TEA[type].cost) {
            dispatch("purchase", {
                item: "teaType",
                teaType: type,
                cost: TEA[type].cost,
            });
        }
    }

    function resetGame() {
        if (
            confirm(
                "Are you sure you want to start over? This will erase all your progress.",
            )
        ) {
            dispatch("reset");
        }
    }

    function recalibrateTime() {
        if (
            confirm(
                "Recalibrating will start the current day over and restart all your automations. Are you sure?",
            )
        ) {
            dispatch("recalibrate");
        }
    }

    function toggleAllAutomations() {
        allAutomationsPaused = !allAutomationsPaused;
        dispatch("toggleAllAutomations");
    }

    onMount(() => {
        console.log(
            "Shop component mounted with automation state:",
            allAutomationsPaused,
        );
    });
</script>

<div class="dropdown">
    <details>
        <summary>click here to do stuff</summary>
        <h3 class="label">buy upgrades</h3>

        <button
            class="secondary"
            on:click={buyGardenPlot}
            disabled={points < GARDEN_PLOT_COST ||
                gardenPlots >= MAX_LIMITS.GARDEN_PLOTS}
        >
            +1 Garden Plot
            {#if gardenPlots >= MAX_LIMITS.GARDEN_PLOTS}
                (Max reached)
            {:else}
                ({GARDEN_PLOT_COST} points) ({gardenPlots}/{MAX_LIMITS.GARDEN_PLOTS})
            {/if}
        </button>

        <button
            class="secondary"
            on:click={buyTeapot}
            disabled={points < TEAPOT_COST || teapots >= MAX_LIMITS.TEAPOTS}
        >
            +1 Teapot
            {#if teapots >= MAX_LIMITS.TEAPOTS}
                (Max reached)
            {:else}
                ({TEAPOT_COST} points) ({teapots}/{MAX_LIMITS.TEAPOTS})
            {/if}
        </button>

        <h3 class="label">Hire Sprites</h3>
        {#each Object.entries(SPRITE_COSTS) as [type, cost]}
            <button
                class="secondary hire-sprite"
                on:click={() => hireSprite(type)}
                disabled={points < cost ||
                    sprites[type] >= MAX_LIMITS.SPRITES[type]}
            >
                {type} Sprite
                {#if sprites[type] >= MAX_LIMITS.SPRITES[type]}
                    (Max reached)
                {:else}
                    ({cost} points) ({sprites[type]}/{MAX_LIMITS.SPRITES[type]})
                {/if}
            </button>
        {/each}

        <h3 class="label">Unlock New Tea</h3>
        {#if unlockedTeaTypes}
            {#each Object.entries(TEA) as [type, config]}
                {#if !unlockedTeaTypes[type]}
                    <button
                        class="secondary unlock-tea"
                        on:click={() => unlockTeaType(type)}
                        disabled={points < config.cost}
                    >
                        {config.name} ({config.cost} points)
                    </button>
                {/if}
            {/each}
        {/if}

        <h3 class="label">Other stuff</h3>
        <button class="secondary" on:click={toggleAllAutomations}>
            {pauseStatus ? "Resume All Automations" : "Pause All Automations"}
        </button>
        <button class="secondary recalibrate-time" on:click={recalibrateTime}>
            Recalibrate Time
        </button>
        <button class="secondary reset-game" on:click={resetGame}
            >Reset game</button
        >
    </details>
</div>
