<script>
    import { TIMINGS, POINTS } from "../config.js";
    import GardenPlot from "./GardenPlot.svelte";
    import Teapot from "./Teapot.svelte";
    import Shop from "./Shop.svelte";
    import { timeOfDay, isDaytime } from "../stores.js";
    import { onMount, onDestroy } from "svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let lastSavedTime = null;
    let grownPlants = 0;
    let harvestedPlants = 0;
    let brewedTea = 0;
    let servedTea = 0;
    let points = 0;
    let gardenPlots = 1;
    let teapots = 1;
    let currentTime = "sunrise";
    let cycleInterval;
    let automationIntervals = [];
    const QUARTERS = ["sunrise", "day", "sunset", "night"];

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
        // First, try to load saved time
        const savedState = localStorage.getItem("teashopGameState");
        if (savedState) {
            const gameState = JSON.parse(savedState);
            currentTime = gameState.currentTime || "sunrise";
        }

        // Update stores with current time
        timeOfDay.set(currentTime);
        isDaytime.set(currentTime !== "night");

        // Clear any existing interval
        if (cycleInterval) clearInterval(cycleInterval);

        // Start the cycle from current time
        cycleInterval = setInterval(() => {
            const currentIndex = QUARTERS.indexOf(currentTime);
            const nextIndex = (currentIndex + 1) % QUARTERS.length;
            currentTime = QUARTERS[nextIndex];

            timeOfDay.set(currentTime);
            isDaytime.set(currentTime !== "night");

            if (currentTime === "sunrise") {
                createToast("The sun is rising!", null, "sunrise");
            } else if (currentTime === "sunset") {
                createToast("The sun is setting!", null, "sunset");
            } else if (currentTime === "night") {
                createToast("Shh...sprites are sleeping...", null, "night");
            }

            // Save state whenever time changes
            saveGameState();
        }, TIMINGS.QUARTER_DURATION);
    }

    function serveTea() {
        if (brewedTea >= 1) {
            let spriteBonus = sprites.cafe * POINTS.CAFE_SPRITE_BONUS;
            let pointsEarned = POINTS.BASE + spriteBonus;

            brewedTea -= 1;
            servedTea += 1;
            points += pointsEarned;
            dispatch("teaServed");
            createToast(`+${pointsEarned} points!`, pointsEarned);
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

    function handleGrowingComplete() {
        grownPlants += 1;
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
                            if (state.readyToHarvest && !state.isHarvesting) {
                                workingSprites.harvest += 1;
                                plot.harvest();
                                // Wait for harvest to complete
                                setTimeout(() => {
                                    workingSprites.harvest -= 1;
                                }, TIMINGS.HARVEST_TIME);
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
                    workingSprites.brewmaster < sprites.brewmaster &&
                    harvestedPlants > 0
                ) {
                    for (let i = 0; i < teapotRefs.length; i++) {
                        const teapot = teapotRefs[i];
                        if (teapot) {
                            const state = teapot.getState();
                            if (!state.isBrewing) {
                                // Only check if the teapot isn't already brewing
                                workingSprites.brewmaster += 1;
                                teapot.brewTea();
                                // After brewing is done
                                setTimeout(() => {
                                    workingSprites.brewmaster -= 1;
                                }, TIMINGS.BREW_TIME);
                                break; // Exit the loop after starting one pot
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
                                }, TIMINGS.GROW_TIME);
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
                if (
                    $isDaytime &&
                    workingSprites.cafe < sprites.cafe &&
                    brewedTea > 0
                ) {
                    // Check brewedTea > 0
                    workingSprites.cafe += 1;
                    serveTea(); // This will handle one cup
                    // Serving is instant, but add a small cooldown
                    setTimeout(() => {
                        workingSprites.cafe -= 1;
                    }, TIMINGS.SERVE_COOLDOWN);
                }
            }, 1000);
            automationIntervals.push(interval);
        }
    }

    function saveGameState() {
        const gameState = {
            lastSaved: Date.now(),
            currentTime,
            grownPlants,
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
            localStorage.setItem("cycleStartTime", Date.now().toString());
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
            grownPlants = gameState.grownPlants;
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
                        plotRefs[i].setState(state);
                    }
                });

                gameState.teapotStates.forEach((state, i) => {
                    if (state && teapotRefs[i]) {
                        teapotRefs[i].setState(state);
                    }
                });
            }, 100);

            console.log("Game loaded");
        }
    }

    function resetGame() {
        localStorage.removeItem("teashopGameState");

        harvestedPlants = 0;
        brewedTea = 0;
        servedTea = 0;
        points = 0;
        gardenPlots = 1;
        teapots = 1;
        sprites = {
            garden: 0,
            harvest: 0,
            brewmaster: 0,
            cafe: 0,
        };
        workingSprites = {
            garden: 0,
            harvest: 0,
            brewmaster: 0,
            cafe: 0,
        };

        // Reset all garden plots
        plotRefs.forEach((plot) => {
            if (plot) {
                plot.setState({
                    isGrowing: false,
                    readyToHarvest: false,
                    progress: 0,
                });
            }
        });

        // Reset all teapots
        teapotRefs.forEach((teapot) => {
            if (teapot) {
                teapot.setState({
                    isBrewing: false,
                    brewedTea: 0,
                    progress: 0,
                });
            }
        });

        automationIntervals.forEach((interval) => clearInterval(interval));
        automationIntervals = [];
        startAutomation();

        currentTime = "sunrise";
        timeOfDay.set(currentTime);
        isDaytime.set(true);

        // Clear and restart time cycle
        if (cycleInterval) clearInterval(cycleInterval);
        startDayCycle();

        createToast("A fresh start!");
    }

    onMount(() => {
        console.log("Component mounted");
        loadGameState();
        startDayCycle();
        startAutomation();

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
        if (cycleInterval) clearInterval(cycleInterval);
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

    <Shop {points} on:purchase={handlePurchase} on:reset={resetGame} />
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
            <button
                class="secondary teashop-serve"
                on:click={serveTea}
                disabled={brewedTea < 1}
            >
                Serve Tea</button
            >
        </div>
    </div>
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
</div>
