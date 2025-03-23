<script>
    import { TIMINGS, POINTS, TEA } from "../config.js";
    import GardenPlot from "./GardenPlot.svelte";
    import Teapot from "./Teapot.svelte";
    import Shop from "./Shop.svelte";
    import AnimatedStat from "./AnimatedStat.svelte";
    import { timeOfDay, isDaytime } from "../stores.js";
    import { onMount, onDestroy } from "svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let lastSavedTime = null;
    let grownPlants = 0;
    let readyToHarvest = 0;
    let harvestedTeas = { green: 0 };
    let brewedTea = 0;
    let brewedTeas = { green: 0 };
    let nextServed = null;
    let servedTea = 0;
    let points = 0;
    let gardenPlots = 1;
    let teapots = 1;
    let currentTime = "sunrise";
    let cycleInterval;
    let automationIntervals = [];
    let unlockedTeaTypes = {
        green: true,
    };

    let teaStats = {
        current: {
            ready: { total: 0, byType: {} },
            harvested: { total: 0, byType: {} },
            brewed: { total: 0, byType: {} },
        },
        lifetime: {
            grown: { total: 0, byType: {} },
            harvested: { total: 0, byType: {} },
            brewed: { total: 0, byType: {} },
            served: { total: 0, byType: {} },
        },
    };

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

    let plotRefs = [];
    let teapotRefs = [];

    $: {
        plotRefs = [...Array(gardenPlots)].map((_, i) => plotRefs[i] || null);
        console.log("Updated plotRefs:", plotRefs);
    }

    $: {
        teapotRefs = [...Array(teapots)].map((_, i) => teapotRefs[i] || null);
        console.log("Updated teapotRefs:", teapotRefs);
    }

    $: {
        teaStats = {
            current: {
                ready: {
                    total: 0,
                    byType: {},
                    ...(teaStats?.current?.ready || {}),
                },
                harvested: {
                    total: 0,
                    byType: {},
                    ...(teaStats?.current?.harvested || {}),
                },
                brewed: {
                    total: 0,
                    byType: {},
                    ...(teaStats?.current?.brewed || {}),
                },
            },
            lifetime: {
                grown: {
                    total: 0,
                    byType: {},
                    ...(teaStats?.lifetime?.grown || {}),
                },
                harvested: {
                    total: 0,
                    byType: {},
                    ...(teaStats?.lifetime?.harvested || {}),
                },
                brewed: {
                    total: 0,
                    byType: {},
                    ...(teaStats?.lifetime?.brewed || {}),
                },
                served: {
                    total: 0,
                    byType: {},
                    ...(teaStats?.lifetime?.served || {}),
                },
            },
        };
    }

    $: {
        nextAvailable = { type: null, amount: 0 };

        for (const [type, amount] of Object.entries(brewedTeas)) {
            if (amount > 0) {
                nextAvailable = { type, amount };
                break;
            }
        }
    }

    function createToast(message = "hiya!", points = null, type = "default") {
        const id = toastId++;
        const x = Math.random() * 40 - 20;
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

        setTimeout(() => {
            toasts = toasts.filter((t) => t.id !== id);
        }, 2000);
    }

    function startDayCycle() {
        const savedState = localStorage.getItem("teashopGameState");
        if (savedState) {
            const gameState = JSON.parse(savedState);
            currentTime = gameState.currentTime || "sunrise";
        }

        timeOfDay.set(currentTime);
        isDaytime.set(currentTime !== "night");

        if (cycleInterval) clearInterval(cycleInterval);
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

    function handlePurchase(event) {
        const { item, cost, spriteType, teaType } = event.detail;

        if (item === "gardenPlot") {
            gardenPlots += 1;
            points -= cost;
        } else if (item === "teapot") {
            teapots += 1;
            points -= cost;
        } else if (item === "teaType") {
            unlockedTeaTypes[teaType] = true;
            points -= cost;
        } else if (item === "sprite") {
            sprites[spriteType] += 1;
            points -= cost;
            console.log("Updated sprites:", sprites);
            startAutomation();
        }
    }

    function handlePlantReady(event) {
        const { teaType } = event.detail;
        readyToHarvest++;

        teaStats.current.ready.byType[teaType] = Math.max(
            (teaStats.current.ready.byType[teaType] || 0) + 1,
            0,
        );
        teaStats.current.ready.total = Math.max(readyToHarvest, 0);
    }

    function handlePlantComplete(event) {
        const { teaType } = event.detail;
        harvestedTeas[teaType] = (harvestedTeas[teaType] || 0) + 2;

        teaStats.current.harvested.byType[teaType] = harvestedTeas[teaType];
        teaStats.current.harvested.total = Object.values(harvestedTeas).reduce(
            (sum, val) => sum + val,
            0,
        );

        teaStats.lifetime.grown.byType[teaType] =
            (teaStats.lifetime.grown.byType[teaType] || 0) + 2;
        teaStats.lifetime.grown.total += 2;
        teaStats.lifetime.harvested.byType[teaType] =
            (teaStats.lifetime.harvested.byType[teaType] || 0) + 2;
        teaStats.lifetime.harvested.total += 2;
    }

    function handleHarvestStart(event) {
        const { teaType } = event.detail;
        readyToHarvest = Math.max(readyToHarvest - 1, 0); // Add safeguard
        console.log(
            `Harvest started: ${teaType}, total ready: ${readyToHarvest}`,
        );

        // Update ready stats with safeguard
        teaStats.current.ready.byType[teaType] = Math.max(
            (teaStats.current.ready.byType[teaType] || 0) - 1,
            0,
        );
        teaStats.current.ready.total = readyToHarvest;
    }

    function handleHarvestedTea(event) {
        const { teaType } = event.detail;
        if (harvestedTeas[teaType] > 0) {
            harvestedTeas[teaType]--;
            harvestedTeas = { ...harvestedTeas };

            // Update current harvested stats
            teaStats.current.harvested.byType[teaType] = harvestedTeas[teaType];
            teaStats.current.harvested.total = Object.values(
                harvestedTeas,
            ).reduce((sum, val) => sum + val, 0);
        }
    }

    function handleBrewedTea(event) {
        const { teaType } = event.detail;
        brewedTeas[teaType] = (brewedTeas[teaType] || 0) + 1;
        brewedTeas = { ...brewedTeas };
        brewedTea += 1;

        // Update current stats
        teaStats.current.brewed.byType = { ...brewedTeas };
        teaStats.current.brewed.total = brewedTea;

        // Update lifetime stats
        teaStats.lifetime.brewed.byType[teaType] =
            (teaStats.lifetime.brewed.byType[teaType] || 0) + 1;
        teaStats.lifetime.brewed.total += 1;
    }

    function serveTea() {
        for (const [type, amount] of Object.entries(brewedTeas)) {
            if (amount > 0) {
                const pointsEarned =
                    TEA[type].pointValue +
                    sprites.cafe * POINTS.CAFE_SPRITE_BONUS;

                brewedTeas[type]--;
                brewedTea--;
                servedTea++;
                points += pointsEarned;

                // Update current brewed stats
                teaStats.current.brewed.byType[type] = brewedTeas[type];
                teaStats.current.brewed.total = Object.values(
                    brewedTeas,
                ).reduce((sum, val) => sum + val, 0);

                // Update lifetime stats
                teaStats.lifetime.served.byType[type] =
                    (teaStats.lifetime.served.byType[type] || 0) + 1;
                teaStats.lifetime.served.total += 1;

                dispatch("teaServed");
                createToast(`+${pointsEarned} points!`, pointsEarned);
                console.log(`Tea served: ${type}, points: ${pointsEarned}`);
                return;
            }
        }
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
                                setTimeout(() => {
                                    workingSprites.harvest -= 1;
                                }, TIMINGS.HARVEST_TIME); // Harvest time is constant
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
                    Object.values(harvestedTeas).some((amount) => amount > 0)
                ) {
                    for (let i = 0; i < teapotRefs.length; i++) {
                        const teapot = teapotRefs[i];
                        if (teapot) {
                            const state = teapot.getState();
                            if (!state.isBrewing) {
                                workingSprites.brewmaster += 1;
                                teapot.brewTea();
                                // Wait for the type of tea being brewed
                                const checkAndRelease = setInterval(() => {
                                    const currentState = teapot.getState();
                                    if (currentState.currentTeaType) {
                                        clearInterval(checkAndRelease);
                                        setTimeout(() => {
                                            workingSprites.brewmaster -= 1;
                                        }, TEA[currentState.currentTeaType].brewTime);
                                    }
                                }, 100);
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
                            // Add isHarvesting check to prevent planting while harvesting
                            if (
                                !state.isGrowing &&
                                !state.readyToHarvest &&
                                !state.isHarvesting
                            ) {
                                workingSprites.garden += 1;
                                const selectedTeaType =
                                    state.selectedTeaType || "green";
                                plot.plantTea();
                                setTimeout(() => {
                                    workingSprites.garden -= 1;
                                }, TEA[selectedTeaType].growTime);
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
            readyToHarvest,
            harvestedTeas,
            unlockedTeaTypes,
            brewedTea,
            brewedTeas,
            nextServed,
            servedTea,
            teaStats,
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
            readyToHarvest = gameState.readyToHarvest || 0;
            harvestedTeas = gameState.harvestedTeas || { green: 0 };
            unlockedTeaTypes = gameState.unlockedTeaTypes || { green: true };
            brewedTea = gameState.brewedTea;
            brewedTeas = gameState.brewedTeas || { green: 0 };
            nextServed = gameState.nextServed || "green";
            servedTea = gameState.servedTea;
            points = gameState.points;
            gardenPlots = gameState.gardenPlots;
            teapots = gameState.teapots;
            sprites = gameState.sprites;
            currentTime = gameState.currentTime || "sunrise";
            timeOfDay.set(currentTime);
            isDaytime.set(currentTime !== "night");
            teaStats = gameState.teaStats || {
                current: {
                    ready: { total: 0, byType: {} },
                    harvested: { total: 0, byType: {} },
                    brewed: { total: 0, byType: {} },
                },
                lifetime: {
                    grown: { total: 0, byType: {} },
                    harvested: { total: 0, byType: {} },
                    brewed: { total: 0, byType: {} },
                    served: { total: 0, byType: {} },
                },
            };

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
        readyToHarvest = 0;
        harvestedTeas = { green: 0 };
        brewedTeas = { green: 0 };
        unlockedTeaTypes = { green: true };
        brewedTea = 0;
        nextServed = null;
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
        teaStats = {
            current: {
                ready: { total: 0, byType: {} },
                harvested: { total: 0, byType: {} },
                brewed: { total: 0, byType: {} },
            },
            lifetime: {
                grown: { total: 0, byType: {} },
                harvested: { total: 0, byType: {} },
                brewed: { total: 0, byType: {} },
                served: { total: 0, byType: {} },
            },
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
                    progress: 0,
                    currentTeaType: null,
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

<div class="teashop">
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
        <div>
            <AnimatedStat label="Points" value={points} />
            <AnimatedStat
                label="Ready to harvest"
                value={teaStats.current.ready.total}
            />
            <AnimatedStat
                label="Ready to brew"
                value={teaStats.current.harvested.total}
            />
            <AnimatedStat label="Ready to serve" value={brewedTea} />
        </div>
        <div>
            <AnimatedStat label="Garden Sprites" value={sprites.garden} />
            <AnimatedStat label="Harvest Sprites" value={sprites.harvest} />
            <AnimatedStat
                label="Brewmaster Sprites"
                value={sprites.brewmaster}
            />
            <AnimatedStat label="Cafe Sprites" value={sprites.cafe} />
        </div>
        <div>
            <AnimatedStat label="Garden Plots" value={gardenPlots} />
            <AnimatedStat label="Teapots" value={teapots} />
            <!-- Keep the save indicator as is -->
            {#if lastSavedTime}
                <p class="label save-indicator">
                    Saved at {lastSavedTime.toLocaleTimeString([], {
                        timeStyle: "short",
                    })}
                </p>
            {/if}
            <button class="secondary save-game" on:click={saveGameState}>
                Save Game
            </button>
        </div>
    </div>

    <Shop
        {points}
        {unlockedTeaTypes}
        on:purchase={handlePurchase}
        on:reset={resetGame}
    />

    <div class="dropdown">
        <details>
            <summary>Detailed stats</summary>
            <div>
                {#each Object.entries(TEA) as [type, config]}
                    {#if unlockedTeaTypes[type]}
                        <div class="tea-type-inventory">
                            <h2>{config.name}</h2>
                            <AnimatedStat
                                class="stat"
                                label="Ready to harvest"
                                value={teaStats.current.ready.byType[type]}
                            />
                            <AnimatedStat
                                class="stat"
                                label="Ready to brew"
                                value={teaStats.current.harvested.byType[type]}
                            />
                            <AnimatedStat
                                class="stat"
                                label="Ready to serve"
                                value={teaStats.current.brewed.byType[type]}
                            />
                            <AnimatedStat
                                class="stat"
                                label="Grown"
                                value={teaStats.lifetime.grown.byType[type]}
                            />
                            <AnimatedStat
                                class="stat"
                                label="Harvested"
                                value={teaStats.lifetime.harvested.byType[type]}
                            />
                            <AnimatedStat
                                class="stat"
                                label="Brewed"
                                value={teaStats.lifetime.brewed.byType[type]}
                            />
                            <AnimatedStat
                                class="stat"
                                label="Served"
                                value={teaStats.lifetime.served.byType[type]}
                            />
                        </div>
                    {/if}
                {/each}
            </div>
        </details>
    </div>

    <div class="teashop-garden">
        <h2>Garden</h2>
        <div class="teashop-grid">
            {#each [...Array(gardenPlots).keys()] as i (i)}
                <GardenPlot
                    {unlockedTeaTypes}
                    on:plantReady={handlePlantReady}
                    on:harvestStart={handleHarvestStart}
                    on:plantComplete={handlePlantComplete}
                    bind:this={plotRefs[i]}
                    class="garden-plot"
                />
            {/each}
        </div>
    </div>

    <div class="teashop-teapots">
        <h2>Teapots</h2>
        <div class="tea-inventory">
            <p class="label">
                <AnimatedStat
                    label="Ready to brew"
                    value={teaStats.current.harvested.total}
                />
            </p>
        </div>
        <div class="teashop-grid">
            {#each [...Array(teapots).keys()] as i (i)}
                <Teapot
                    {harvestedTeas}
                    bind:this={teapotRefs[i]}
                    on:useTea={handleHarvestedTea}
                    on:teaBrewed={handleBrewedTea}
                    class="teapot"
                />
            {/each}
        </div>
    </div>

    <div class="teashop-serve">
        <p class="label">
            <AnimatedStat label="Ready to serve" value={brewedTea} />
        </p>
        <button class="secondary" on:click={serveTea} disabled={brewedTea < 1}>
            {#if brewedTea >= 1}
                Serve Tea
            {:else if brewedTea < 1}
                No Tea Available
            {:else}
                Serve Tea
            {/if}
        </button>
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
