<script>
    import { TIMINGS } from "../config.js";
    import GardenPlot from "./GardenPlot.svelte";
    import Teapot from "./Teapot.svelte";
    import Shop from "./Shop.svelte";
    import { timeOfDay, isDaytime } from "../stores.js";
    import { onMount, onDestroy } from "svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let lastSavedTime = null;
    let harvestedPlants = 0;
    let brewedTea = 0;
    let servedTea = 0;
    let points = 0;
    let gardenPlots = 1;
    let teapots = 1;
    let currentTime = "sunrise";
    let timeInterval;
    let automationIntervals = [];

    let toasts = [];
    let toastId = 0;

    let sprites = {
        garden: 0,
        harvest: 0,
        brewmaster: 0,
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

    function createToast(message = "hiya!", points = null, type = "default") {
        const id = toastId++;
        const x = Math.random() * 40 - 20; // Random x position offset
        const toast = {
            id,
            x,
            y: 0,
            opacity: 1,
            points,
            message,
            type,
        };
        toasts = [...toasts, toast];

        // Remove the toast after animation
        setTimeout(() => {
            toasts = toasts.filter((t) => t.id !== id);
        }, 2000);
    }

    function startDayCycle() {
        let quarters = ["sunrise", "day", "sunset", "night"];
        let quarterIndex = 0;

        function updateQuarter() {
            currentTime = quarters[quarterIndex];
            timeOfDay.set(currentTime);
            isDaytime.set(currentTime !== "night");
            quarterIndex = (quarterIndex + 1) % quarters.length;

            if (currentTime === "sunrise") {
                createToast("The sun is rising!", null, "sunrise");
            } else if (currentTime === "sunset") {
                createToast("The sun is setting!", null, "sunset");
            } else if (currentTime === "night") {
                createToast("Shh...sprites are sleeping...", null, "night");
            }
        }

        updateQuarter();

        timeInterval = setInterval(updateQuarter, TIMINGS.QUARTER_DURATION);
    }

    function serveTea() {
        if (brewedTea >= 1) {
            brewedTea -= 1;
            servedTea += 1;
            points += 5;
            dispatch("teaServed");
            createToast("+5 points!", 5);
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
        // Clear existing intervals
        automationIntervals.forEach((interval) => clearInterval(interval));
        automationIntervals = [];

        // Harvest Sprites
        if (sprites.harvest > 0) {
            const interval = setInterval(() => {
                if ($isDaytime && workingSprites.harvest < sprites.harvest) {
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
                if (
                    $isDaytime &&
                    workingSprites.brewmaster < sprites.brewmaster
                ) {
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
                if ($isDaytime && workingSprites.garden < sprites.garden) {
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
                if ($isDaytime && workingSprites.cafe < sprites.cafe) {
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

    function saveGameState() {
        const gameState = {
            lastSaved: Date.now(),
            currentTime,
            harvestedPlants,
            brewedTea,
            servedTea,
            points,
            gardenPlots,
            teapots,
            sprites,
            plotStates: plotRefs.map((plot) => (plot ? plot.getState() : null)),
            teapotStates: teapotRefs.map((teapot) =>
                teapot ? teapot.getState() : null,
            ),
        };
        try {
            localStorage.setItem("teashopGameState", JSON.stringify(gameState));
            lastSavedTime = new Date();
            createToast("Game saved! 💾", null, "success"); // New save notification
            console.log("Game state saved");
        } catch (e) {
            console.error("Failed to save game state:", e);
            createToast("Error saving!", null, "error"); // Error notification
        }
    }

    function loadGameState() {
        const savedState = localStorage.getItem("teashopGameState");
        if (savedState) {
            const gameState = JSON.parse(savedState);
            harvestedPlants = gameState.harvestedPlants;
            brewedTea = gameState.brewedTea;
            servedTea = gameState.servedTea;
            points = gameState.points;
            gardenPlots = gameState.gardenPlots;
            teapots = gameState.teapots;
            sprites = gameState.sprites;
            currentTime = gameState.currentTime || "sunrise";
            timeOfDay.set(currentTime);
            isDaytime.set(currentTime !== "night");

            setTimeout(() => {
                gameState.plotStates.forEach((state, i) => {
                    if (state && plotRefs[i]) {
                        if (state.isGrowing) plotRefs[i].plantTea();
                        if (state.readyToHarvest) {
                            plotRefs[i].readyToHarvest = true;
                            plotRefs[i].progress = 100;
                        }
                    }
                });

                gameState.teapotStates.forEach((state, i) => {
                    if (state && teapotRefs[i]) {
                        if (state.isBrewing) teapotRefs[i].brewTea();
                        if (state.brewedTea > 0)
                            teapotRefs[i].brewedTea = state.brewedTea;
                    }
                });
            }, 100);

            console.log("Games loaded");
        }
    }

    onMount(() => {
        console.log("Component mounted");
        loadGameState();
        startAutomation();
        startDayCycle();

        const autosaveInterval = setInterval(saveGameState, 30000); // Save every 30 seconds
        automationIntervals.push(autosaveInterval);

        // Save game state when the page is hidden (user switches tabs)
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                saveGameState();
            }
        });

        // Save game state before the page is unloaded
        window.addEventListener("beforeunload", () => {
            saveGameState();
        });
    });

    onDestroy(() => {
        automationIntervals.forEach((interval) => clearInterval(interval));
        clearInterval(timeInterval);
        document.removeEventListener("visibilitychange", saveGameState);
        window.removeEventListener("beforeunload", saveGameState);
    });
</script>

<div class="teashop-container">
    <div
        class="time-indicator"
        class:sunrise={currentTime === "sunrise"}
        class:day={currentTime === "day"}
        class:sunset={currentTime === "sunset"}
        class:night={currentTime === "night"}
    >
        <p class="label">Current Time: {currentTime}</p>
    </div>
    <div class="game-data">
        <div class="stats">
            <p class="label">Points: {points}</p>
            <p class="label">Plants Harvested: {harvestedPlants}</p>
            <p class="label">Tea Brewed: {brewedTea}</p>
            <p class="label">Total Cups Served: {servedTea}</p>
        </div>
        <div class="sprites">
            <p class="label">Garden Sprites: {sprites.garden}</p>
            <p class="label">Harvest Sprites: {sprites.harvest}</p>
            <p class="label">Brewmaster Sprites: {sprites.brewmaster}</p>
            <p class="label">Cafe Sprites: {sprites.cafe}</p>
        </div>
        <div class="stats">
            <p class="label">Garden Plots: {gardenPlots}</p>
            <p class="label">Teapots: {teapots}</p>
            {#if lastSavedTime}
                <p class="label save-indicator">
                    Saved at {lastSavedTime.toLocaleTimeString([], {
                        timeStyle: "short",
                    })}
                </p>
            {/if}
            <button class="secondary save-game" on:click={saveGameState}
                >Save Game</button
            >
        </div>
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
                        class="toast {toast.type}"
                        style="
                                    --x: {toast.x}px;
                                    --opacity: {toast.opacity};
                                "
                    >
                        {toast.message}
                    </div>
                {/each}
            </div>
            <button
                class="secondary teashop-serve"
                on:click={serveTea}
                disabled={brewedTea < 1}
            >
                Serve Tea</button
            >
        </div>
    </div>
</div>
