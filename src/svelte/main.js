import Teashop from "./components/Teashop.svelte";
import { mount } from "svelte"; // Add this import

function initApp() {
  console.log("Initializing app...");
  const target = document.getElementById("teashop");
  console.log("Target element:", target);

  if (target) {
    try {
      const app = mount(Teashop, {
        target: target,
        props: {},
      });
      console.log("Teashop app mounted successfully");
    } catch (error) {
      console.error("Error mounting Teashop:", error);
    }
  } else {
    console.error("Could not find #teashop element");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
