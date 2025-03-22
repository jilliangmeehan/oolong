<script>
    import { TIMINGS } from "../config.js";
    import GardenPlot from "./GardenPlot.svelte";
    import Teapot from "./Teapot.svelte";
    import Shop from "./Shop.svelte";
    import { onMount, onDestroy } from "svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let harvestedPlants = 0;
    let brewedTea = 0;
    let servedTea = 0;
    let points = 0;
    let gardenPlots = 1;
    let teapots = 1;
    let automationIntervals = [];

    let toasts = [];
    let toastId = 0;

    let sprites = {
        harvest: 0,
        brewmaster: 0,
        garden: 0,
        cafe: 0,
    };

    let workingSprites = {
        garden: 0,
        harvest: 0,
        brewmaster: 0,
        cafe: 0,
    };

    // References to components that need automation
    let plotRefs = [];
    let teapotRefs = [];

    // Make arrays reactive to component count changes
    $: {
        plotRefs = [...Array(gardenPlots)].map((_, i) => plotRefs[i] || null);
        console.log("Updated plotRefs:", plotRefs);
    }

    $: {
        teapotRefs = [...Array(teapots)].map((_, i) => teapotRefs[i] || null);
        console.log("Updated teapotRefs:", teapotRefs);
    }

    function createToast() {
        const id = toastId++;
        const x = Math.random() * 40 - 20; // Random x position offset
        const toast = {
            id,
            x,
            y: 0,
            opacity: 1,
            points: 5,
        };
        toasts = [...toasts, toast];

        // Remove the toast after animation
        setTimeout(() => {
            toasts = toasts.filter((t) => t.id !== id);
        }, 2000);
    }

    function serveTea() {
        if (brewedTea >= 1) {
            brewedTea -= 1;
            servedTea += 1;
            points += 5;
            dispatch("teaServed");
            createToast();
        }
    }

    function handlePurchase(event) {
        const { item, cost, spriteType } = event.detail;
        console.log("Purchase:", { item, cost, spriteType });

        if (item === "gardenPlot") {
            gardenPlots += 1;
            points -= cost;
        } else if (item === "teapot") {
            teapots += 1;
            points -= cost;
        } else if (item === "sprite") {
            sprites[spriteType] += 1;
            points -= cost;
            console.log("Updated sprites:", sprites);
            startAutomation();
        }
    }

    function handlePlantComplete() {
        harvestedPlants += 2;
    }

    function handleHarvestedTea() {
        harvestedPlants -= 1;
    }

    function handleBrewedTea() {
        brewedTea += 1;
    }

    function startAutomation() {
        console.log("Starting automation");
        console.log("Current sprites:", sprites);
        console.log("Total plots:", gardenPlots);
        console.log("Total teapots:", teapots);
        console.log("plotRefs length:", plotRefs.length);
        console.log("teapotRefs length:", teapotRefs.length);
        console.log("Full plotRefs array:", plotRefs);
        console.log("Full teapotRefs array:", teapotRefs);

        // Clear existing intervals
        automationIntervals.forEach((interval) => clearInterval(interval));
        automationIntervals = [];

        // Harvest Sprites
        if (sprites.harvest > 0) {
            const interval = setInterval(() => {
                if (workingSprites.harvest < sprites.harvest) {
                    for (let i = 0; i < plotRefs.length; i++) {
                        const plot = plotRefs[i];
                        if (plot) {
                            const state = plot.getState();
                            if (state.readyToHarvest) {
                                workingSprites.harvest += 1;
                                plot.harvest();
                                // Harvesting is instant, but add a small cooldown
                                setTimeout(() => {
                                    workingSprites.harvest -= 1;
                                }, TIMINGS.HARVEST_COOLDOWN);
                                break;
                            }
                        }
                    }
                }
            }, 1000);
            automationIntervals.push(interval);
        }
        // Brewmaster Sprites
        if (sprites.brewmaster > 0) {
            const interval = setInterval(() => {
                if (workingSprites.brewmaster < sprites.brewmaster) {
                    for (let i = 0; i < teapotRefs.length; i++) {
                        const teapot = teapotRefs[i];
                        if (teapot) {
                            const state = teapot.getState();
                            if (!state.isBrewing && harvestedPlants > 0) {
                                workingSprites.brewmaster += 1;
                                teapot.brewTea();
                                // After brewing is done (10 seconds)
                                setTimeout(() => {
                                    workingSprites.brewmaster -= 1;
                                }, TIMINGS.BREW_TIME);
                                break;
                            }
                        }
                    }
                }
            }, 1000);
            automationIntervals.push(interval);
        }
        // Garden Sprites
        if (sprites.garden > 0) {
            const interval = setInterval(() => {
                if (workingSprites.garden < sprites.garden) {
                    for (let i = 0; i < plotRefs.length; i++) {
                        const plot = plotRefs[i];
                        if (plot) {
                            const state = plot.getState();
                            if (!state.isGrowing && !state.readyToHarvest) {
                                workingSprites.garden += 1;
                                plot.plantTea();
                                setTimeout(() => {
                                    workingSprites.garden -= 1;
                                }, TIMINGS.GARDEN_COOLDOWN);
                                break;
                            }
                        }
                    }
                }
            }, 1000);
            automationIntervals.push(interval);
        }
        // Cafe Sprites
        if (sprites.cafe > 0) {
            const interval = setInterval(() => {
                if (workingSprites.cafe < sprites.cafe) {
                    for (let i = 0; i < teapotRefs.length; i++) {
                        const teapot = teapotRefs[i];
                        if (teapot) {
                            const state = teapot.getState();
                            if (state.brewedTea > 0) {
                                workingSprites.cafe += 1;
                                serveTea();
                                // Serving is instant, but add a small cooldown
                                setTimeout(() => {
                                    workingSprites.cafe -= 1;
                                }, TIMINGS.SERVE_COOLDOWN);
                            }
                        }
                    }
                }
            }, 1000);
            automationIntervals.push(interval);
        }
    }

    onMount(() => {
        console.log("Component mounted");
        startAutomation();
    });

    onDestroy(() => {
        automationIntervals.forEach((interval) => clearInterval(interval));
    });
</script>

<div class="teashop-container">
    <div class="stats">
        <p class="label">Points: {points}</p>
        <p class="label">Plants Harvested: {harvestedPlants}</p>
        <p class="label">Tea Brewed: {brewedTea}</p>
        <p class="label">Total Cups Served: {servedTea}</p>
    </div>
    <div class="sprites">
        <p class="label">Harvest Sprites: {sprites.harvest}</p>
        <p class="label">Brewmaster Sprites: {sprites.brewmaster}</p>
        <p class="label">Garden Sprites: {sprites.garden}</p>
        <p class="label">Cafe Sprites: {sprites.cafe}</p>
    </div>

    <Shop {points} on:purchase={handlePurchase} />
    <div class="teashop-garden">
        <h2>Garden</h2>
        <div>
            {#each [...Array(gardenPlots).keys()] as i (i)}
                <GardenPlot
                    on:plantComplete={handlePlantComplete}
                    bind:this={plotRefs[i]}
                    class="garden-plot"
                />
            {/each}
        </div>
    </div>

    <div class="teashop-teapots">
        <h2>Teapots</h2>
        <p class="label">Ready to brew: {harvestedPlants}</p>
        <div>
            {#each [...Array(teapots).keys()] as i (i)}
                <Teapot
                    {harvestedPlants}
                    bind:this={teapotRefs[i]}
                    on:useTea={handleHarvestedTea}
                    on:teaBrewed={handleBrewedTea}
                    class="teapot"
                />
            {/each}
        </div>
        <div class="teashop-serve-container">
            <p class="label">Ready to serve: {brewedTea}</p>
            <div class="toast-container">
                {#each toasts as toast (toast.id)}
                    <div
                        class="toast"
                        style="
                                    --x: {toast.x}px;
                                    --opacity: {toast.opacity};
                                "
                    >
                        +{toast.points} points!
                    </div>
                {/each}
            </div>
            <button
                class="teashop-serve"
                on:click={serveTea}
                disabled={brewedTea < 1}
            >
                Serve Tea</button
            >
        </div>
    </div>
</div>
