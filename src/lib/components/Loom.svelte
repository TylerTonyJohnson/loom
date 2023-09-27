<!-- Logic -->
<script>
	import Weave from '$lib/classes/Weave.js';
	import Knot from '$lib/components/Knot.svelte';

	// Parameters
	let offset = { x: 0, y: 0 };
	let zoom = 1;
	let isPanning = false;

	// Setup
	const weave = new Weave();

	/* 
        Functions
    */

	function handleMouseMove(event) {
		if (!isPanning) return;
		offset = { x: offset.x + event.movementX, y: offset.y + event.movementY };
	}

	function handleMouseDown(event) {
		switch (event.which) {
			case 1:
				isPanning = true;
				break;
			case 2:
				break;
			case 3:
				break;
		}
	}

	function handleMouseUp(event) {
		switch (event.which) {
			case 1:
				isPanning = false;
				break;
			case 2:
				break;
			case 3:
				break;
		}
	}

	function handleMouseLeave(event) {
		isPanning = false;
	}

	function handleWheel(event) {
		zoom = Math.max(1, Math.min(10, zoom + event.deltaY * -0.01));
	}
</script>

<!-- Structure -->

<!-- 
    BACKGROUND
 -->
<div
	class="background ease"
	style="
        background-image: url(Background.svg);
        background-position: {offset.x}px {offset.y}px;
        background-size: {zoom * 100}px;
        "
	class:grabbing={isPanning}
	on:mousemove={handleMouseMove}
	on:mousedown={handleMouseDown}
/>

<!-- Knots -->
{#each weave.knots as knot}
	<Knot {knot} {offset} {zoom} />
{/each}

<!-- Utilities -->
<svelte:window on:mouseleave={handleMouseLeave} on:mouseup={handleMouseUp} />
<!-- <svelte:window on:wheel={handleWheel} /> -->

<h1 class="zoom-label">ZOOM: {zoom}</h1>

<h1
	class="name ease"
	style="
    left: {offset.x}px; 
    top: {offset.y}px;
    scale: {zoom};
"
>
	LOOM
</h1>

<!-- Style -->
<style>
	.background {
		position: absolute;
		width: 100%;
		height: 100%;
		cursor: grab;
	}

	.background.grabbing {
		cursor: grabbing;
	}

	.name {
		position: absolute;
		translate: -50% -50%;
		border: solid black 2px;
		border-radius: 1em;
		padding: 0.3em;
		background-color: crimson;
	}

	.zoom-label {
		position: fixed;
		right: 0;
		top: 0;
	}

	.ease {
		transition-property: background-size, scale;
		transition-timing-function: ease-out;
		transition-duration: 0.1s;
	}
</style>
