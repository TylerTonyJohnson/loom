<script>
	import Knot from './Knot.svelte';
	import Constant from '$lib/classes2/Constant.js';
	import Add from '$lib/classes2/Add.js';
	import Or from '$lib/classes2/Or.js';
	import Multiply from '$lib/classes2/Multiply.js';
	import Equivalent from '$lib/classes2/Equivalent.js';
	import Display from '$lib/classes2/Display.js';
	import { currentStrand } from '$lib/stores.js';
	import StrandHelper from './StrandHelper.svelte';

	let offset = { x: 0, y: 0 };
	let zoom = 1;
	let isPanning = false;
	let mousePosition = { x: 0, y: 0 };

	/* 
        Data
    */
	let knots = [];

	currentStrand.subscribe((loops) => {
		switch (loops.length) {
			case 0:
				break;
			case 1:
				break;
			case 2:
				tieStrand(loops[0], loops[1]);
				break;
		}
	});

	addKnot(new Constant());

	function addKnot(knot, position = { x: 0, y: 0 }) {
		knot.position = position;
		knots.push(knot);
		knots = knots;
	}

	function deleteKnot(knot) {
		const index = knots.indexOf(knot);
		if (index >= 0) knots.splice(index, 1);
		knots = knots;
	}

	function tieStrand(loop1, loop2) {
		currentStrand.set([]);

		// Prevent tie to self
		if (loop1.knot === loop2.knot) return;

		// Set bindings
		loop1.binding = loop2;
		loop2.binding = loop1;
	}

	/* 
        Events
    */

	function handleMouseMove(event) {
		mousePosition = { x: event.clientX, y: event.clientY };
		if (!isPanning) return;
		offset = { x: offset.x + event.movementX, y: offset.y + event.movementY };
	}

	function handleMouseDown(event) {
		const position = { x: event.clientX - offset.x, y: event.clientY - offset.y };

		switch (event.which) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				isPanning = true;
				break;
		}
	}

	function handleMouseUp(event) {
		switch (event.which) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				isPanning = false;
				break;
		}
	}

	function handleMouseLeave(event) {
		isPanning = false;
	}

	function handleKeyDown(event) {
		const position = { x: mousePosition.x - offset.x, y: mousePosition.y - offset.y };
		switch (event.code) {
			case 'KeyC':
				addKnot(new Constant(), position);
				break;
			case 'KeyA':
				addKnot(new Add(), position);
				break;
			case 'KeyM':
				addKnot(new Multiply(), position);
				break;
			case 'KeyE':
				addKnot(new Equivalent(), position);
				break;
			case 'KeyD':
				addKnot(new Display(), position);
				break;
			case 'KeyO':
				addKnot(new Or(), position);
				break;
		}
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	id="frame"
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
	on:contextmenu|preventDefault
>
	<!-- Background -->
	<div
		id="background"
		style="
            background-image: url(Background.svg);
            background-position:{offset.x}px {offset.y}px;
            background-size: {zoom * 100}px;
        "
	/>

	<!-- Knots -->
	{#each knots as knot}
		<Knot {...knot} {offset} {zoom} {deleteKnot} />
	{/each}

	<!-- Strand Helper -->
	{#if $currentStrand.length > 0}
		<StrandHelper position={mousePosition} />
	{/if}
</div>

<!-- Utilities -->
<svelte:window
	on:mousemove={handleMouseMove}
	on:mouseup={handleMouseUp}
	on:keydown={handleKeyDown}
/>
<svelte:body on:mouseleave={handleMouseLeave} />

<style>
	#frame {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: red;
	}

	#background {
		position: absolute;
		inset: 0px;
		/* cursor: grab; */
	}
</style>
