<script>
    import { TIMINGS, POINTS, TEA, DEBUG } from "../config.js";
    import GardenPlot from "./GardenPlot.svelte";
    import Teapot from "./Teapot.svelte";
    import Shop from "./Shop.svelte";
    import AnimatedStat from "./AnimatedStat.svelte";
    import { timeOfDay, isDaytime, automationPausedStore } from "../stores.js";
    import { onMount, onDestroy } from "svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let lastSavedTime = null;
    let lastActiveTime = Date.now();
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
    let allAutomationsPaused = false;
    let unlockedTeaTypes = {
        green: true,
    };
    let purchaseCount = {
        gardenPlot: 0,
        teapot: 0,
        garden: 0,
        harvest: 0,
        brewmaster: 0,
        cafe: 0,
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

    const getTeacupIconPath = (teaType) => {
        return `../../icons/teacups/${teaType}.png`;
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

    function createToast(
        message = "hiya!",
        points = null,
        type = "default",
        teaType = null,
    ) {
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
            teaType,
        };
        toasts = [...toasts, toast];

        setTimeout(() => {
            toasts = toasts.filter((t) => t.id !== id);
        }, 12000);
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
        console.log("Received purchase event:", event.detail);
        console.log("Cost received:", cost);

        if (item === "gardenPlot") {
            gardenPlots += 1;
            points -= cost;
            purchaseCount.gardenPlot += 1;
        } else if (item === "teapot") {
            teapots += 1;
            points -= cost;
            purchaseCount.teapot += 1;
        } else if (item === "teaType") {
            unlockedTeaTypes[teaType] = true;
            points -= cost;
        } else if (item === "sprite") {
            sprites[spriteType] += 1;
            points -= cost;
            purchaseCount[spriteType] += 1;

            startAutomation();
        }
        purchaseCount = { ...purchaseCount };
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
                createToast(
                    `+${pointsEarned} points!`,
                    pointsEarned,
                    "default",
                    type,
                );
                console.log(`Tea served: ${type}, points: ${pointsEarned}`);
                return;
            }
        }
    }

    function handleGardenPlotPauseChanged(event) {
        const { isPaused, plotId } = event.detail;
        saveGameState();
    }

    function handleTeapotPauseChanged(event) {
        const { isPaused, teapotId } = event.detail;
        saveGameState();
    }

    function handleDeletePlot(event) {
        const { plotId } = event.detail;
        // Make sure we have more than 1 plot before deleting
        if (gardenPlots <= 1) {
            createToast("You need at least one garden plot!", null, "error");
            return;
        }

        // Remove the plot from plotRefs and decrease the count
        plotRefs = plotRefs.filter((_, i) => i !== plotId);
        gardenPlots -= 1;

        // Create new references array with correct indices
        plotRefs = [...Array(gardenPlots)].map((_, i) => plotRefs[i] || null);

        createToast("Garden plot removed", null, "success");
        saveGameState();
    }

    function handleDeleteTeapot(event) {
        const { teapotId } = event.detail;
        // Make sure we have more than 1 teapot before deleting
        if (teapots <= 1) {
            createToast("You need at least one teapot!", null, "error");
            return;
        }

        // Remove the teapot from teapotRefs and decrease the count
        teapotRefs = teapotRefs.filter((_, i) => i !== teapotId);
        teapots -= 1;

        // Create new references array with correct indices
        teapotRefs = [...Array(teapots)].map((_, i) => teapotRefs[i] || null);

        createToast("Teapot removed", null, "success");
        saveGameState();
    }

    function handleRecalibrate() {
        recalibrateTime();
    }

    function startAutomation() {
        // Clear existing intervals
        automationIntervals.forEach((interval) => clearInterval(interval));
        automationIntervals = [];

        // Track working sprites and their timers
        const workingSprites = {
            garden: 0,
            harvest: 0,
            brewmaster: 0,
            cafe: 0,
        };

        // Garden Sprites
        if (sprites.garden > 0) {
            const interval = setInterval(() => {
                if ($isDaytime && workingSprites.garden < sprites.garden) {
                    for (let i = 0; i < plotRefs.length; i++) {
                        const plot = plotRefs[i];
                        if (plot) {
                            const state = plot.getState();
                            // Skip paused plots unless they're currently growing
                            if (state.isPaused && !state.isGrowing) {
                                continue;
                            }
                            if (
                                !state.isGrowing &&
                                !state.readyToHarvest &&
                                !state.isHarvesting
                            ) {
                                workingSprites.garden++;
                                const selectedTeaType =
                                    state.selectedTeaType || "green";
                                plot.plantTea();

                                // Use the tea type's grow time as the cooldown
                                setTimeout(() => {
                                    workingSprites.garden--;
                                }, TEA[selectedTeaType].growTime);

                                // Break after assigning one sprite to a task
                                break;
                            }
                        }
                    }
                }
            }, 500); // Check every half second
            automationIntervals.push(interval);
        }

        // Harvest Sprites
        if (sprites.harvest > 0) {
            const interval = setInterval(() => {
                if ($isDaytime && workingSprites.harvest < sprites.harvest) {
                    for (let i = 0; i < plotRefs.length; i++) {
                        const plot = plotRefs[i];
                        if (plot) {
                            const state = plot.getState();
                            if (state.isPaused) {
                                continue;
                            }
                            if (state.readyToHarvest && !state.isHarvesting) {
                                workingSprites.harvest++;
                                plot.harvest();

                                // Use harvest time from config
                                setTimeout(() => {
                                    workingSprites.harvest--;
                                }, TIMINGS.HARVEST_TIME);

                                // Break after assigning one sprite to a task
                                break;
                            }
                        }
                    }
                }
            }, 500); // Check every half second
            automationIntervals.push(interval);
        }

        // Brewmaster Sprites
        if (sprites.brewmaster > 0) {
            const interval = setInterval(() => {
                // First, validate the current workingSprites count matches reality
                let actuallyBrewing = 0;
                teapotRefs.forEach((teapot) => {
                    if (teapot && teapot.getState().isBrewing) {
                        actuallyBrewing++;
                    }
                });

                // Force sync the count - this is critical
                workingSprites.brewmaster = actuallyBrewing;

                if (
                    $isDaytime &&
                    workingSprites.brewmaster < sprites.brewmaster &&
                    Object.values(harvestedTeas).some((amount) => amount > 0)
                ) {
                    for (let i = 0; i < teapotRefs.length; i++) {
                        const teapot = teapotRefs[i];
                        if (teapot) {
                            const state = teapot.getState();
                            if (state.isPaused && !state.isBrewing) {
                                continue;
                            }
                            if (!state.isBrewing) {
                                workingSprites.brewmaster++;
                                teapot.brewTea();

                                // Store reference to this teapot's DOM element or unique ID
                                // This is more reliable than using the array index
                                const teapotId = i; // Ideally use a more stable identifier

                                // Monitor this specific teapot until it finishes brewing
                                const monitorBrewing = setInterval(() => {
                                    // IMPORTANT: Get the teapot ref again in case it changed
                                    const currentTeapot = teapotRefs[teapotId];
                                    if (currentTeapot) {
                                        const currentState =
                                            currentTeapot.getState();
                                        if (!currentState.isBrewing) {
                                            clearInterval(monitorBrewing);
                                            workingSprites.brewmaster--;
                                            // Log this for debugging
                                            console.log(
                                                `Teapot ${teapotId} finished brewing, ${workingSprites.brewmaster} brewmasters now working`,
                                            );
                                        }
                                    } else {
                                        // Teapot reference no longer valid, clean up
                                        clearInterval(monitorBrewing);
                                        workingSprites.brewmaster--;
                                        console.log(
                                            `Teapot ${teapotId} no longer exists, cleaning up`,
                                        );
                                    }
                                }, 500);

                                break;
                            }
                        }
                    }
                }
            }, 500);
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
                    workingSprites.cafe++;
                    serveTea(); // This will handle one cup

                    // Use serving cooldown from config
                    setTimeout(() => {
                        workingSprites.cafe--;
                    }, TIMINGS.SERVE_COOLDOWN);
                }
            }, 500); // Check every half second
            automationIntervals.push(interval);
        }
    }

    function toggleAllAutomations() {
        allAutomationsPaused = !allAutomationsPaused;
        automationPausedStore.set(allAutomationsPaused);

        // Apply to all garden plots
        plotRefs.forEach((plot) => {
            if (plot) {
                const state = plot.getState();
                // Only change pause state if it's different from the global state
                if (state.isPaused !== allAutomationsPaused) {
                    // Update plot's pause state
                    plot.setState({
                        ...state,
                        isPaused: allAutomationsPaused,
                    });
                }
            }
        });

        // Apply to all teapots
        teapotRefs.forEach((teapot) => {
            if (teapot) {
                const state = teapot.getState();
                // Only change pause state if it's different from the global state
                if (state.isPaused !== allAutomationsPaused) {
                    // Update teapot's pause state
                    teapot.setState({
                        ...state,
                        isPaused: allAutomationsPaused,
                    });
                }
            }
        });

        createToast(
            allAutomationsPaused
                ? "All automations paused!"
                : "All automations resumed!",
            null,
            "info",
        );
    }

    function saveGameState() {
        const gameState = {
            lastSaved: Date.now(),
            lastActiveTime,
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
            purchaseCount,
            allAutomationsPaused,
            plotStates: plotRefs.map((plot) => (plot ? plot.getState() : null)),
            teapotStates: teapotRefs.map((teapot) =>
                teapot ? teapot.getState() : null,
            ),
        };
        try {
            localStorage.setItem("teashopGameState", JSON.stringify(gameState));
            lastSavedTime = new Date();
            localStorage.setItem("cycleStartTime", Date.now().toString());
            createToast("Game saved! 💾", null, "success");
            console.log("Game state saved");
        } catch (e) {
            console.error("Failed to save game state:", e);
            createToast("Error saving!", null, "error");
        }
    }

    function loadGameState() {
        // Checks for testing mode before loading saved state
        if (DEBUG.TESTING_MODE) {
            console.log("Testing mode enabled!");
            points = DEBUG.STARTING_POINTS;

            // Optional: unlock all tea types
            if (DEBUG.UNLOCK_ALL_TEA) {
                Object.keys(TEA).forEach((type) => {
                    unlockedTeaTypes[type] = true;
                });
            }

            // Optional: start with extra plots and teapots
            gardenPlots = 1 + DEBUG.EXTRA_PLOTS;
            teapots = 1 + DEBUG.EXTRA_TEAPOTS;

            createToast("Testing mode active! 🧪", null, "success");
            return;
        }

        const savedState = localStorage.getItem("teashopGameState");
        if (savedState) {
            const gameState = JSON.parse(savedState);
            lastActiveTime = gameState.lastActiveTime;
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
            allAutomationsPaused = gameState.allAutomationsPaused || false;
            automationPausedStore.set(allAutomationsPaused);
            purchaseCount = gameState.purchaseCount || {
                gardenPlot: 0,
                teapot: 0,
                garden: 0,
                harvest: 0,
                brewmaster: 0,
                cafe: 0,
            };
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

            // Reset working sprites counter
            workingSprites = {
                garden: 0,
                harvest: 0,
                brewmaster: 0,
                cafe: 0,
            };

            setTimeout(() => {
                // Apply plot states (including pause state)
                gameState.plotStates.forEach((state, i) => {
                    if (state && plotRefs[i]) {
                        plotRefs[i].setState(state);
                    }
                });

                // Apply teapot states (including pause state)
                gameState.teapotStates.forEach((state, i) => {
                    if (state && teapotRefs[i]) {
                        teapotRefs[i].setState(state);
                    }
                });

                // Update working sprites based on current teapot and plot states
                teapotRefs.forEach((teapot) => {
                    if (teapot && teapot.getState().isBrewing) {
                        // Count brewing teapots toward working brewmaster sprites
                        workingSprites.brewmaster++;
                    }
                });

                plotRefs.forEach((plot) => {
                    if (plot) {
                        const state = plot.getState();
                        if (state.isGrowing) {
                            // Count growing plots toward working garden sprites
                            workingSprites.garden++;
                        }
                        if (state.isHarvesting) {
                            // Count harvesting plots toward working harvest sprites
                            workingSprites.harvest++;
                        }
                    }
                });

                // Clear any existing automation before starting new
                automationIntervals.forEach((interval) =>
                    clearInterval(interval),
                );
                automationIntervals = [];

                // Now restart automation with correct counts
                startAutomation();
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
        purchaseCount = {
            gardenPlot: 0,
            teapot: 0,
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

        createToast("A fresh start...", null, "info");
    }

    function recalibrateTime() {
        // Reset time to sunrise
        currentTime = "sunrise";
        timeOfDay.set(currentTime);
        isDaytime.set(true);

        // Clear any existing intervals
        if (cycleInterval) clearInterval(cycleInterval);
        automationIntervals.forEach((interval) => clearInterval(interval));
        automationIntervals = [];

        // Reset working sprites counter
        workingSprites = {
            garden: 0,
            harvest: 0,
            brewmaster: 0,
            cafe: 0,
        };

        // Restart time cycle
        startDayCycle();

        // Restart automation
        startAutomation();

        createToast("Time recalibrated! ⏱️", null, "success");
    }

    function simulateTimeAdvancement(elapsedMs) {
        // Only do time simulation if enough time passed (e.g. > 5 seconds)
        if (elapsedMs < 5000) return;

        // Create a summary of what happened while away
        let summary = {
            grown: 0,
            harvested: 0,
            brewed: 0,
            served: 0,
            pointsEarned: 0,
            byTeaType: {},
        };

        // Handle day/night cycle transitions
        const quarterDuration = TIMINGS.QUARTER_DURATION;
        const quartersPassed = Math.floor(elapsedMs / quarterDuration);

        if (quartersPassed > 0) {
            // Determine how many day cycles passed and what the current time should be
            const currentIndex = QUARTERS.indexOf(currentTime);
            const newIndex = (currentIndex + quartersPassed) % QUARTERS.length;
            currentTime = QUARTERS[newIndex];
            timeOfDay.set(currentTime);
            isDaytime.set(currentTime !== "night");
        }

        // Skip simulation if it's night time - sprites don't work at night
        if (!$isDaytime) {
            //    createToast("The sprites were sleeping while you were away!");
            return;
        }

        // Calculate available sprites (all sprites if daytime)
        const availableSprites = { ...sprites };

        // 1. Simulate garden sprites planting
        if (availableSprites.garden > 0) {
            // Find available garden plots
            const availablePlots = plotRefs.filter((plot) => {
                if (!plot) return false;
                const state = plot.getState();
                return (
                    !state.isGrowing &&
                    !state.readyToHarvest &&
                    !state.isHarvesting
                );
            });

            // Calculate possible planting cycles
            const gardenCyclesPerSprite = Math.floor(
                elapsedMs / TIMINGS.GARDEN_COOLDOWN,
            );
            const totalPlantingOperations = Math.min(
                availableSprites.garden * gardenCyclesPerSprite,
                availablePlots.length,
            );

            // Simulate planting
            for (let i = 0; i < totalPlantingOperations; i++) {
                if (i < availablePlots.length) {
                    const plot = availablePlots[i];
                    const state = plot.getState();
                    const teaType = state.selectedTeaType || "green";

                    // Calculate if the plant would have grown to completion
                    const growTime = TEA[teaType].growTime;
                    const growCycles = Math.floor(
                        (elapsedMs - i * TIMINGS.GARDEN_COOLDOWN) / growTime,
                    );

                    if (growCycles > 0) {
                        // Plant grew to completion - mark as ready to harvest
                        plot.setState({
                            ...state,
                            isGrowing: false,
                            readyToHarvest: true,
                            progress: 100,
                        });

                        // Update stats
                        summary.grown++;
                        summary.byTeaType[teaType] = summary.byTeaType[
                            teaType
                        ] || { grown: 0, harvested: 0, brewed: 0, served: 0 };
                        summary.byTeaType[teaType].grown++;

                        teaStats.current.ready.byType[teaType] =
                            (teaStats.current.ready.byType[teaType] || 0) + 1;
                        teaStats.current.ready.total++;
                        readyToHarvest++;
                    } else {
                        // Plant is still growing - set appropriate progress
                        const progress = Math.min(
                            100,
                            ((elapsedMs - i * TIMINGS.GARDEN_COOLDOWN) /
                                growTime) *
                                100,
                        );
                        plot.setState({
                            ...state,
                            isGrowing: true,
                            readyToHarvest: false,
                            progress,
                        });
                    }
                }
            }
        }

        // 2. Simulate harvest sprites harvesting
        if (availableSprites.harvest > 0) {
            // Find ready-to-harvest plots
            const readyPlots = plotRefs.filter((plot) => {
                if (!plot) return false;
                const state = plot.getState();
                return state.readyToHarvest && !state.isHarvesting;
            });

            // Calculate possible harvest cycles
            const harvestCyclesPerSprite = Math.floor(
                elapsedMs / TIMINGS.HARVEST_COOLDOWN,
            );
            const totalHarvestOperations = Math.min(
                availableSprites.harvest * harvestCyclesPerSprite,
                readyPlots.length,
            );

            // Simulate harvesting
            for (let i = 0; i < totalHarvestOperations; i++) {
                if (i < readyPlots.length) {
                    const plot = readyPlots[i];
                    const state = plot.getState();
                    const teaType = state.selectedTeaType || "green";

                    // Reset plot state
                    plot.setState({
                        ...state,
                        isGrowing: false,
                        readyToHarvest: false,
                        isHarvesting: false,
                        progress: 0,
                        harvestProgress: 0,
                    });

                    // Add harvested tea
                    harvestedTeas[teaType] = (harvestedTeas[teaType] || 0) + 2;

                    // Update stats
                    summary.harvested += 2;
                    summary.byTeaType[teaType] = summary.byTeaType[teaType] || {
                        grown: 0,
                        harvested: 0,
                        brewed: 0,
                        served: 0,
                    };
                    summary.byTeaType[teaType].harvested += 2;

                    teaStats.current.ready.byType[teaType] = Math.max(
                        (teaStats.current.ready.byType[teaType] || 0) - 1,
                        0,
                    );
                    teaStats.current.ready.total = Math.max(
                        teaStats.current.ready.total - 1,
                        0,
                    );
                    readyToHarvest = Math.max(readyToHarvest - 1, 0);

                    teaStats.current.harvested.byType[teaType] =
                        harvestedTeas[teaType];
                    teaStats.current.harvested.total = Object.values(
                        harvestedTeas,
                    ).reduce((sum, val) => sum + val, 0);

                    teaStats.lifetime.harvested.byType[teaType] =
                        (teaStats.lifetime.harvested.byType[teaType] || 0) + 2;
                    teaStats.lifetime.harvested.total += 2;
                }
            }
        }

        // 3. Simulate brewmaster sprites brewing
        if (availableSprites.brewmaster > 0) {
            // Calculate how many brewing operations could occur
            // Base this on available teapots, harvested tea, and time
            const availableTeapots = teapotRefs.filter((teapot) => {
                if (!teapot) return false;
                return !teapot.getState().isBrewing;
            }).length;

            // Get total harvestable teas
            const totalHarvestedTea = Object.values(harvestedTeas).reduce(
                (sum, val) => sum + val,
                0,
            );

            // Calculate average brew time - in a more complex implementation,
            // you could prioritize faster-brewing tea types
            const availableTeaTypes = Object.keys(harvestedTeas).filter(
                (type) => harvestedTeas[type] > 0,
            );
            const avgBrewTime = availableTeaTypes.length
                ? availableTeaTypes.reduce(
                      (sum, type) => sum + TEA[type].brewTime,
                      0,
                  ) / availableTeaTypes.length
                : 7000; // Default to green tea brew time if no teas available

            const brewCyclesPerSprite = Math.floor(elapsedMs / avgBrewTime);
            const totalBrewOperations = Math.min(
                availableSprites.brewmaster * brewCyclesPerSprite,
                availableTeapots,
                totalHarvestedTea,
            );

            // Distribute brewing across tea types based on availability
            let remainingOperations = totalBrewOperations;
            for (const teaType of availableTeaTypes) {
                // How many of this tea type can we brew?
                const typeOperations = Math.min(
                    remainingOperations,
                    harvestedTeas[teaType],
                );

                if (typeOperations > 0) {
                    // Brew this many teas
                    harvestedTeas[teaType] -= typeOperations;
                    brewedTeas[teaType] =
                        (brewedTeas[teaType] || 0) + typeOperations;
                    brewedTea += typeOperations;

                    // Update stats
                    summary.brewed += typeOperations;
                    summary.byTeaType[teaType] = summary.byTeaType[teaType] || {
                        grown: 0,
                        harvested: 0,
                        brewed: 0,
                        served: 0,
                    };
                    summary.byTeaType[teaType].brewed += typeOperations;

                    teaStats.current.harvested.byType[teaType] =
                        harvestedTeas[teaType];
                    teaStats.current.brewed.byType[teaType] =
                        brewedTeas[teaType];
                    teaStats.current.brewed.total = brewedTea;

                    teaStats.lifetime.brewed.byType[teaType] =
                        (teaStats.lifetime.brewed.byType[teaType] || 0) +
                        typeOperations;
                    teaStats.lifetime.brewed.total += typeOperations;

                    remainingOperations -= typeOperations;
                    if (remainingOperations <= 0) break;
                }
            }
        }

        // 4. Simulate cafe sprites serving
        if (availableSprites.cafe > 0) {
            // Calculate how many serving operations could occur
            const serveCyclesPerSprite = Math.floor(
                elapsedMs / TIMINGS.SERVE_COOLDOWN,
            );
            const totalBrewedTea = Object.values(brewedTeas).reduce(
                (sum, val) => sum + val,
                0,
            );
            const totalServeOperations = Math.min(
                availableSprites.cafe * serveCyclesPerSprite,
                totalBrewedTea,
            );

            // Distribute serving across tea types based on availability
            const availableBrewedTypes = Object.keys(brewedTeas).filter(
                (type) => brewedTeas[type] > 0,
            );
            let remainingOperations = totalServeOperations;

            for (const teaType of availableBrewedTypes) {
                // How many of this tea type can we serve?
                const typeOperations = Math.min(
                    remainingOperations,
                    brewedTeas[teaType],
                );

                if (typeOperations > 0) {
                    // Calculate points earned
                    const pointsPerServe =
                        TEA[teaType].pointValue +
                        sprites.cafe * POINTS.CAFE_SPRITE_BONUS;
                    const typePoints = pointsPerServe * typeOperations;

                    // Serve this many teas
                    brewedTeas[teaType] -= typeOperations;
                    brewedTea -= typeOperations;
                    servedTea += typeOperations;
                    points += typePoints;

                    // Update stats
                    summary.served += typeOperations;
                    summary.pointsEarned += typePoints;
                    summary.byTeaType[teaType] = summary.byTeaType[teaType] || {
                        grown: 0,
                        harvested: 0,
                        brewed: 0,
                        served: 0,
                    };
                    summary.byTeaType[teaType].served += typeOperations;

                    teaStats.current.brewed.byType[teaType] =
                        brewedTeas[teaType];
                    teaStats.current.brewed.total = brewedTea;

                    teaStats.lifetime.served.byType[teaType] =
                        (teaStats.lifetime.served.byType[teaType] || 0) +
                        typeOperations;
                    teaStats.lifetime.served.total += typeOperations;

                    remainingOperations -= typeOperations;
                    if (remainingOperations <= 0) break;
                }
            }
        }

        //  Create toast messages to summarize what happened
        // if (
        //     summary.grown > 0 ||
        //     summary.harvested > 0 ||
        //     summary.brewed > 0 ||
        //     summary.served > 0
        // ) {
        //     createToast(
        //         `While you were away, sprites were busy!`,
        //         null,
        //         "info",
        //     );

        //     if (summary.served > 0) {
        //         createToast(
        //             `Sprites served ${summary.served} cups and earned ${summary.pointsEarned} points!`,
        //         );
        //     }

        //     if (summary.brewed > 0) {
        //         createToast(`Sprites brewed ${summary.brewed} cups of tea.`);
        //     }

        //     if (summary.harvested > 0) {
        //         createToast(
        //             `Sprites harvested ${summary.harvested} units of tea.`,
        //         );
        //     }

        //     if (summary.grown > 0) {
        //         createToast(
        //             `Sprites planted and grew ${summary.grown} plots of tea.`,
        //         );
        //     }
        // }
    }

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            lastActiveTime = Date.now();
            saveGameState();
        } else {
            // When tab becomes visible again
            console.log("Tab visible again, resetting automation");

            // Always clear all intervals first
            automationIntervals.forEach((interval) => clearInterval(interval));
            automationIntervals = [];

            // When coming back to the tab, calculate elapsed time
            const now = Date.now();
            const elapsedMs = now - lastActiveTime;

            // Process game state advancements based on elapsed time
            simulateTimeAdvancement(elapsedMs);

            // Reset working sprites counter
            workingSprites = {
                garden: 0,
                harvest: 0,
                brewmaster: 0,
                cafe: 0,
            };

            // Count actual working states
            teapotRefs.forEach((teapot) => {
                if (teapot && teapot.getState().isBrewing) {
                    // Count brewing teapots toward working brewmaster sprites
                    workingSprites.brewmaster++;
                }
            });

            // Do a full count of what's currently brewing/growing
            let actualBrewingCount = 0;
            teapotRefs.forEach((teapot) => {
                if (teapot && teapot.getState().isBrewing) {
                    actualBrewingCount++;
                }
            });

            // Force the working counts to match reality
            workingSprites.brewmaster = actualBrewingCount;
            console.log(
                `Reset brewmaster count to ${actualBrewingCount} based on actual brewing teapots`,
            );

            plotRefs.forEach((plot) => {
                if (plot) {
                    const state = plot.getState();
                    if (state.isGrowing) {
                        // Count growing plots toward working garden sprites
                        workingSprites.garden++;
                    }
                    if (state.isHarvesting) {
                        // Count harvesting plots toward working harvest sprites
                        workingSprites.harvest++;
                    }
                }
            });

            // Restart automation
            startAutomation();
        }
    });

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
        {purchaseCount}
        {gardenPlots}
        {teapots}
        {sprites}
        on:purchase={handlePurchase}
        on:reset={resetGame}
        on:recalibrate={handleRecalibrate}
        on:toggleAllAutomations={toggleAllAutomations}
    />

    <div class="dropdown">
        <details>
            <summary>Detailed stats</summary>
            <div class="stats-tables">
                <div class="stats-section">
                    <h3>Current</h3>
                    <table class="stats-table">
                        <thead>
                            <tr>
                                <th class="stats-tea-type">Tea Type</th>
                                <th>Can Harvest</th>
                                <th>Can Brew</th>
                                <th>Can Serve</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each Object.entries(TEA) as [type, config]}
                                {#if unlockedTeaTypes[type]}
                                    <tr>
                                        <td class="stats-tea-type"
                                            >{config.name}</td
                                        >
                                        <td>
                                            <AnimatedStat
                                                class="table-stat"
                                                value={teaStats.current.ready
                                                    .byType[type]}
                                            />
                                        </td>
                                        <td>
                                            <AnimatedStat
                                                class="table-stat"
                                                value={teaStats.current
                                                    .harvested.byType[type]}
                                            />
                                        </td>
                                        <td>
                                            <AnimatedStat
                                                class="table-stat"
                                                value={teaStats.current.brewed
                                                    .byType[type]}
                                            />
                                        </td>
                                    </tr>
                                {/if}
                            {/each}
                        </tbody>
                    </table>
                </div>

                <div class="stats-section">
                    <h3>Lifetime</h3>
                    <table class="stats-table">
                        <thead>
                            <tr>
                                <th class="stats-tea-type">Tea Type</th>
                                <th>Grown</th>
                                <th>Harvested</th>
                                <th>Brewed</th>
                                <th>Served</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each Object.entries(TEA) as [type, config]}
                                {#if unlockedTeaTypes[type]}
                                    <tr>
                                        <td class="stats-tea-type"
                                            >{config.name}</td
                                        >
                                        <td>
                                            <AnimatedStat
                                                class="table-stat"
                                                value={teaStats.lifetime.grown
                                                    .byType[type]}
                                            />
                                        </td>
                                        <td>
                                            <AnimatedStat
                                                class="table-stat"
                                                value={teaStats.lifetime
                                                    .harvested.byType[type]}
                                            />
                                        </td>
                                        <td>
                                            <AnimatedStat
                                                class="table-stat"
                                                value={teaStats.lifetime.brewed
                                                    .byType[type]}
                                            />
                                        </td>
                                        <td>
                                            <AnimatedStat
                                                class="table-stat"
                                                value={teaStats.lifetime.served
                                                    .byType[type]}
                                            />
                                        </td>
                                    </tr>
                                {/if}
                            {/each}
                        </tbody>
                    </table>
                </div>
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
                    on:pauseStateChanged={handleGardenPlotPauseChanged}
                    on:deletePlot={handleDeletePlot}
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
                    bind:allAutomationsPaused
                    on:useTea={handleHarvestedTea}
                    on:teaBrewed={handleBrewedTea}
                    on:pauseStateChanged={handleTeapotPauseChanged}
                    on:deleteTeapot={handleDeleteTeapot}
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
            {#if toast.teaType && toast.teaType in TEA}
                <img
                    src="../../icons/teacups/{toast.teaType}.png"
                    alt={TEA[toast.teaType].name}
                    class="toast-teacup-icon"
                />
            {/if}
            {toast.message}
        </div>
    {/each}
</div>
