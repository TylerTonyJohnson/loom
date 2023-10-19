<script>
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import { ThreadType } from '$lib/enums.js';
	import Tray from './Tray.svelte';
	import Knot from './Knot.svelte';
	import Strand from './Strand.svelte';

	// Stores
	const offset = writable({ x: 0, y: 0 });
	const zoom = writable(1);
	const loopsToTie = writable([]);
	const selected = writable([]);
	const snapDistance = writable(20);

	setContext('loom', { offset, zoom, loopsToTie, selected, snapDistance, updateKnot });

	// Runtime
	let isPanning = false;
	let mousePosition = { x: 0, y: 0 };

	// Loops to tie
	loopsToTie.subscribe((capturedLoops) => {
		switch (capturedLoops.length) {
			case 0:
				break;
			case 1:
				break;
			case 2:
				tie(capturedLoops[0], capturedLoops[1]);
				loopsToTie.set([]);
				break;
		}
	});

	// Knots
	let knots = [];

	/* 
        Functions
    */

	function addKnot(knotPrototype, position = mousePosition) {
		const newKnot = new knotPrototype(position);
		knots.push(newKnot);
		knots = knots;
		return newKnot;
	}

	function deleteKnots() {
		$selected.forEach((knot) => {
			console.log('deleting ', knot);
			knots.splice(knots.indexOf(knot), 1);
			knots = knots;
		});
        $selected = [];
	}

	function tie(loopA, loopB) {
		if (loopA.knot === loopB.knot) {
			console.log('Loops are same - exiting');
			return;
		}
		if (loopA.flowType === loopB.flowType) {
			console.log('Loops are the same flow type - exiting');
			return;
		}

		// if (loopA.threadType !== loopB.threadType) {
		// 	console.log('Different thread types - exiting');
		// 	return;
		// }
		switch (true) {
			case loopA.threadType === loopB.threadType:
				break;
			case loopA.threadType === ThreadType.None && loopB.threadType !== ThreadType.None:
				loopA.threadType = loopB.threadType;
				console.log('changing A: ', loopA.threadType);
				break;
			case loopA.threadType !== ThreadType.None && loopB.threadType === ThreadType.None:
				loopB.threadType = loopA.threadType;
				console.log('changing B: ', loopB.threadType);
				break;
			case loopA.threadType !== loopB.threadType:
				console.log('Loops have incompatible types');
				return;
		}

		loopA.binding = loopB;
		loopB.binding = loopA;
		updateKnot(loopA.knot);
		updateKnot(loopB.knot);
	}

	function updateKnot(knot) {
		if (knots.includes(knot)) {
			knots[knots.indexOf(knot)] = knots[knots.indexOf(knot)];
		}
	}

	/* 
        Events
    */

	// Mouse events
	function handleMouseMove(event) {
		mousePosition = { x: event.clientX, y: event.clientY };
		if (!isPanning) return;

		offset.update((previousOffset) => {
			return {
				x: previousOffset.x + event.movementX,
				y: previousOffset.y + event.movementY
			};
		});
	}

	function handleMouseDown(event) {
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

	// Key events
	function handleKeyDown(event) {
		const position = { x: mousePosition.x - offset.x, y: mousePosition.y - offset.y };
		switch (event.code) {
			case 'Delete':
				deleteKnots();
				break;
		}
	}

	function handleWheel(event) {
		// zoom.update(oldZoom => {
		//     return Math.max(1, Math.min(10, oldZoom + event.deltaY * -0.01));
		// })
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
		style:background-image="url(Background.svg)"
		style:background-position="{$offset.x}px {$offset.y}px"
		style:background-size="{$zoom * 100}px"
	/>
	<!-- Knots -->
	{#each knots as knot (knot)}
		<Knot {knot} />
		{#each knot.inLoops as loop (loop)}
			{#if loop.binding && loop === loop.binding.binding}
				<Strand startLoop={loop} endLoop={loop.binding} />
			{/if}
		{/each}
	{/each}

	<!-- Strand Helper -->
	<!-- {#if $currentStrand.length > 0}
		<StrandHelper position={mousePosition} />
	{/if} -->

	<Tray {addKnot} />
</div>

<!-- Utilities -->
<svelte:window on:mousemove={handleMouseMove} on:keydown={handleKeyDown} />
<svelte:body on:mouseleave={handleMouseLeave} on:mouseup={handleMouseUp} on:wheel={handleWheel} />

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
	}
</style>
