export const TIMINGS = {
  GROW_TIME: 10000, // 10 seconds to grow
  BREW_TIME: 5000, // 5 seconds to brew
  HARVEST_COOLDOWN: 500, // 0.5 second cooldown for harvesting
  GARDEN_COOLDOWN: 500, // 0.5 second cooldown for planting
  SERVE_COOLDOWN: 500, // 0.5 second cooldown for serving
  QUARTER_DURATION: 60000, // 1 minute per day quarter
};

// Convert milliseconds to progress increments (for progress bars)
export const PROGRESS_INCREMENT = {
  GROW: 1,
  BREW: 1,
  NIGHT_GROWTH: 0.5,
};
