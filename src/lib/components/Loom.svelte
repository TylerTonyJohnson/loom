<!-- Logic -->
<script>
	import Tapestry from '$lib/classes/Tapestry.js';
	import Knot from '$lib/components/Knot.svelte';
	import Strand from './Strand.svelte';
	import { onMount } from 'svelte';

	// Parameters
	let offset = { x: 0, y: 0 };
	let zoom = 1;
	let isPanning = false;

	// Setup
	let tapestry;
	if (!tapestry) tapestry = new Tapestry();

	let strand;

	onMount(() => {
		offset.x = window.innerWidth / 4;
		offset.y = window.innerHeight / 4;
	});

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
				removeKnots();
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

	function save(event) {
		console.log(tapestry);
		localStorage.setItem('knots', JSON.stringify(tapestry.knots));
	}

	function load() {
		const oldKnots = tapestry.knots;
		tapestry.knots = JSON.parse(localStorage.getItem('knots'));
		console.log(oldKnots[0].outLoops[0] === tapestry.knots[0].outLoops[0]);
	}

	function handleWheel(event) {
		zoom = Math.max(1, Math.min(10, zoom + event.deltaY * -0.01));
	}

	function removeKnots() {
		tapestry.knots = [];
		console.log('removed knots', tapestry.knots);
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

<!-- Knots and Strands -->
{#each tapestry.knots as knot}
	<Knot {knot} {offset} {zoom} position={knot.position} />
	{#each knot.outLoops as loop}
		{#if loop.binding}
			<Strand startPosition={loop.position} endPosition={loop.binding.position} {offset} {zoom} />
		{/if}
	{/each}
{/each}

<!-- Utilities -->
<svelte:window on:mouseleave={handleMouseLeave} on:mouseup={handleMouseUp} />
<!-- <svelte:window on:wheel={handleWheel} /> -->

<h1 class="zoom-label">ZOOM: {zoom}</h1>
<button class="toolbar" type="button" on:click={save}>Save</button>
<button class="toolbar load" type="button" on:click={load}>Load</button>

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

	.toolbar {
		position: fixed;
		right: 0;
		top: 3rem;
	}

	.toolbar.load {
		top: 5rem;
	}

	.ease {
		transition-property: background-size, scale;
		transition-timing-function: ease-out;
		transition-duration: 0.1s;
	}
</style>
