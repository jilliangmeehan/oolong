export const DEBUG = {
  TESTING_MODE: true,
  STARTING_POINTS: 10000,
  UNLOCK_ALL_TEA: true, // Optional: unlock all tea types
  EXTRA_PLOTS: 7, // Optional: start with extra garden plots
  EXTRA_TEAPOTS: 3, // Optional: start with extra teapots
};

export const TIMINGS = {
  // Growing
  GARDEN_COOLDOWN: 3000, // 3 second cooldown for planting

  // Harvest
  HARVEST_TIME: 5000, // 5 seconds to harvest
  HARVEST_COOLDOWN: 3000, // 3 second cooldown for harvesting

  // Brewing
  BREWMASTER_COOLDOWN: 3000, // 3 second cooldown for brewmasters

  // Serving
  SERVE_COOLDOWN: 3000, // 3 second cooldown for serving

  // Time cycles
  QUARTER_DURATION: 60000, // 1 minute per day quarter
};

export const POINTS = {
  BASE: 5,
  CAFE_SPRITE_BONUS: 1,
};

export const MAX_LIMITS = {
  GARDEN_PLOTS: 24,
  TEAPOTS: 12,
  SPRITES: {
    garden: 24,
    harvest: 24,
    brewmaster: 12,
    cafe: 10,
  },
};

export const PRICES = {
  BASE: {
    GARDEN_PLOT: 10,
    TEAPOT: 40,
    SPRITE: {
      GARDEN: 25,
      HARVEST: 50,
      BREWMASTER: 75,
      CAFE: 500,
    },
  },
  // How much prices increase with each purchase (1.2 = 20% increase)
  MULTIPLIER: 1.2,
};

export const TEA = {
  green: {
    name: "Green Tea",
    growTime: 12000,
    brewTime: 7000,
    pointValue: 5,
    cost: 0,
  },
  black: {
    name: "Black Tea",
    growTime: 20000,
    brewTime: 7000,
    pointValue: 8,
    cost: 120,
  },
  jasmine: {
    name: "Jasmine Tea",
    growTime: 8000,
    brewTime: 4000,
    pointValue: 4,
    cost: 200,
  },
  oolong: {
    name: "Oolong Tea",
    growTime: 20000,
    brewTime: 4000,
    pointValue: 10,
    cost: 350,
  },
  sakura: {
    name: "Sakura Tea",
    growTime: 10000,
    brewTime: 14000,
    pointValue: 15,
    cost: 750,
  },
  matcha: {
    name: "Matcha Tea",
    growTime: 15000,
    brewTime: 10000,
    pointValue: 18,
    cost: 1200,
  },
  mystical: {
    name: "Mystical Tea",
    growTime: 45000,
    brewTime: 15000,
    pointValue: 50,
    cost: 3000,
  },
  // celestial: {
  //   name: "Celestial Tea",
  //   growTime: 14000,
  //   brewTime: 6000,
  //   pointValue: 25,
  //   cost: 2000,
  // },
};
