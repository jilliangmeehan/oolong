<script>
    export let value = 0;
    export let label = "";

    let displayValue = value;
    let valueToAdd = 0;
    let countInterval;

    $: if (value !== displayValue + valueToAdd) {
        const difference = value - (displayValue + valueToAdd);
        valueToAdd += difference;
        if (!countInterval) {
            countInterval = setInterval(updateValue, 50);
        }
    }

    function updateValue() {
        if (valueToAdd > 0) {
            let increment = Math.max(1, Math.floor(valueToAdd / 10));
            displayValue += increment;
            valueToAdd -= increment;
        } else if (valueToAdd < 0) {
            let decrement = Math.min(-1, Math.floor(valueToAdd / 10));
            displayValue += decrement;
            valueToAdd -= decrement;
        } else {
            clearInterval(countInterval);
            countInterval = null;
        }
    }

    import { onDestroy } from "svelte";
    onDestroy(() => {
        if (countInterval) clearInterval(countInterval);
    });
</script>

<p class="label stat-display" class:animating={valueToAdd !== 0}>
    {label}: {displayValue}
</p>

<style>
    .stat-display {
        transition: color 0.1s;
    }

    .stat-display.animating {
        color: #4caf50;
    }
</style>
