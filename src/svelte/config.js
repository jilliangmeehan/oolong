export const TIMINGS = {
  // Growing
  GARDEN_COOLDOWN: 1000, // 1 second cooldown for planting
  GROW_TIME: 10000, // Base grow time: 10 seconds to grow

  // Harvest
  HARVEST_TIME: 5000, // 5 seconds to harvest
  HARVEST_COOLDOWN: 1000, // 1 second cooldown for harvesting

  // Brewing
  BREW_TIME: 5000, // 5 seconds to brew

  // Serving
  SERVE_COOLDOWN: 3000, // 3 second cooldown for serving

  // Time cycles
  QUARTER_DURATION: 60000, // 1 minute per day quarter
};

export const POINTS = {
  BASE: 5,
  CAFE_SPRITE_BONUS: 1,
};

export const TEA = {
  green: {
    name: "Green Tea",
    growTime: 10000,
    brewTime: 5000,
    pointValue: 5,
    cost: 0,
  },
  black: {
    name: "Black Tea",
    growTime: 12000,
    brewTime: 5000,
    pointValue: 8,
    cost: 120,
  },
  oolong: {
    name: "Oolong Tea",
    growTime: 17000,
    brewTime: 2000,
    pointValue: 10,
    cost: 250,
  },
  sakura: {
    name: "Sakura Tea",
    growTime: 20000,
    brewTime: 2000,
    pointValue: 15,
    cost: 750,
  },
  // celestial: {
  //   name: "Celestial Tea",
  //   growTime: 10000,
  //   brewTime: 5000,
  //   pointValue: 10,
  //   cost: 2000,
  // },
};
