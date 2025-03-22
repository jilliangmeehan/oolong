export const TIMINGS = {
  GROW_TIME: 10000, // 10 seconds to grow
  BREW_TIME: 5000, // 5 seconds to brew
  HARVEST_COOLDOWN: 500, // 0.5 second cooldown for harvesting
  GARDEN_COOLDOWN: 500, // 0.5 second cooldown for planting
  SERVE_COOLDOWN: 500, // 0.5 second cooldown for serving
};

// Convert milliseconds to progress increments (for progress bars)
export const PROGRESS_INCREMENT = {
  GROW: 100 / (TIMINGS.GROW_TIME / 100), // Progress increment per 100ms
  BREW: 100 / (TIMINGS.BREW_TIME / 100), // Progress increment per 100ms
};
