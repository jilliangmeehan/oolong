import { writable } from "svelte/store";

export const timeOfDay = writable("sunrise");
export const isDaytime = writable(true);
export const automationPausedStore = writable(false);
