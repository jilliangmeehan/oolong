<script>
    import { TEA } from "../config.js";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let points = 0;
    export let unlockedTeaTypes = { green: true };

    const GARDEN_PLOT_COST = 10;
    const TEAPOT_COST = 75;
    const SPRITE_COSTS = {
        garden: 25,
        harvest: 50,
        brewmaster: 100,
        cafe: 500,
    };

    function buyGardenPlot() {
        if (points >= GARDEN_PLOT_COST) {
            dispatch("purchase", {
                item: "gardenPlot",
                cost: GARDEN_PLOT_COST,
            });
        }
    }

    function buyTeapot() {
        if (points >= TEAPOT_COST) {
            dispatch("purchase", {
                item: "teapot",
                cost: TEAPOT_COST,
            });
        }
    }

    function hireSprite(type) {
        if (points >= SPRITE_COSTS[type]) {
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
        if (confirm("Are you sure you want to start over?")) {
            dispatch("reset");
        }
    }
</script>

<div class="dropdown">
    <details>
        <summary>click here to do stuff</summary>
        <h3 class="label">buy upgrades</h3>
        <button
            class="secondary"
            on:click={buyGardenPlot}
            disabled={points < GARDEN_PLOT_COST}
        >
            +1 Garden Plot ({GARDEN_PLOT_COST} points)
        </button>

        <button
            class="secondary"
            on:click={buyTeapot}
            disabled={points < TEAPOT_COST}
        >
            +1 Teapot ({TEAPOT_COST} points)
        </button>

        <h3 class="label">Hire Sprites</h3>
        {#each Object.entries(SPRITE_COSTS) as [type, cost]}
            <button
                class="secondary hire-sprite"
                on:click={() => hireSprite(type)}
                disabled={points < cost}
            >
                {type} Sprite ({cost} points)
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
        <button class="secondary reset-game" on:click={resetGame}
            >Reset game</button
        >
    </details>
</div>
