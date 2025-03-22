<script>
    export let points = 0;

    const GARDEN_PLOT_COST = 10;
    const TEAPOT_COST = 75;
    const SPRITE_COSTS = {
        garden: 100,
        harvest: 150,
        brewmaster: 250,
        cafe: 500,
    };

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

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

    function resetGame() {
        if (confirm("Are you sure you want to start over?")) {
            dispatch("reset");
        }
    }
</script>

<details class="shop">
    <summary class="shop-title"
        ><h2 class="label">click here to do stuff</h2></summary
    >

    <h3 class="label">buy upgrades</h3>
    <button
        class="secondary buy-upgrade"
        on:click={buyGardenPlot}
        disabled={points < GARDEN_PLOT_COST}
    >
        +1 Garden Plot ({GARDEN_PLOT_COST} points)
    </button>

    <button
        class="secondary buy-upgrade"
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

    <h3 class="label">Other stuff</h3>
    <button class="secondary reset-game" on:click={resetGame}>Reset game</button
    >
</details>
