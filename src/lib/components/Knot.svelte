<script>
	import { getContext } from 'svelte';
	import Loop from '$lib/components/Loop.svelte';

	export let knot;

	const { offset, zoom, loopsToTie, selected, snapDistance, updateKnot } = getContext('loom');

	// Update position from knot data
	let position;
	knot.position.subscribe((knotPosition) => {
		position = knotPosition;
	});

	let isSelected;
	selected.subscribe((selectedArray) => {
		isSelected = Array.from(selectedArray).includes(knot);
	});

	// Runtime
	let width;
	let height;
	let isFocused = false;
	let isMoving = false;
	let outLoopFlows = [];
	let inLoopFlows = [];

	// Snapping

	$: snapHeight = Math.ceil(height / $snapDistance) * $snapDistance;
	$: snapWidth = Math.ceil(width / $snapDistance) * $snapDistance;

	$: snapPosition = {
		x: Math.ceil(position.x / $snapDistance) * $snapDistance,
		y: Math.ceil(position.y / $snapDistance) * $snapDistance
	};

	/* 
		Methods
	*/

	function execute() {
		knot.weave();
		updateKnot(knot);
	}

	function flowInLoops() {
		inLoopFlows.forEach((flowFunction) => {
			flowFunction();
		});
	}

	function flowOutLoops() {
		outLoopFlows.forEach((flowFunction) => {
			flowFunction();
		});
	}

	/* 
		Events
	*/
	function handleMouseMove(event) {
		if (!isMoving) return;
		$selected.forEach((individualKnot) => {
			individualKnot.position.update((oldPosition) => {
				const x = oldPosition.x + event.movementX;
				const y = oldPosition.y + event.movementY;
				return { x: x, y: y };
			});
		});
		// updateKnot(knot);
	}

	function handleMouseDown(event) {
		switch (event.which) {
			case 1:
				isMoving = true;
				if (isSelected) break;
				switch (event.shiftKey) {
					case false:
						selected.set([knot]);
						break;
					case true:
						selected.update((oldSelected) => [...oldSelected, knot]);
						break;
				}
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
				isMoving = false;
				break;
			case 2:
				break;
			case 3:
				break;
		}
	}

	function handleMouseLeave(event) {
		isMoving = false;
	}

	function handleClickFooter(event) {
		flowInLoops();
		execute();
		flowOutLoops();
	}

	function handleKeyDown(event) {
		// 	if (!isFocused) return;
		// 	switch (event.code) {
		// 		case 'Delete':
		// 			break;
		// 		case 'ArrowLeft':
		// 			position.x += -snapDistance;
		// 			break;
		// 		case 'ArrowRight':
		// 			position.x += snapDistance;
		// 			break;
		// 		case 'ArrowUp':
		// 			position.y += -snapDistance;
		// 			break;
		// 		case 'ArrowDown':
		// 			position.y += snapDistance;
		// 			break;
		// 	}
	}

	function handleFocus(event) {
		isFocused = true;
	}

	function handleBlur(event) {
		isFocused = false;
	}

	function handleMouseDownWindow() {
		selected.set([]);
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	id="frame"
	style:scale={$zoom}
	style:left="{snapPosition.x + $offset.x}px"
	style:top="{snapPosition.y + $offset.y}px"
	bind:clientWidth={width}
	bind:clientHeight={height}
	on:mousedown|stopPropagation={handleMouseDown}
	on:focusin={handleFocus}
	on:blur={handleBlur}
	class:grabbing={isMoving}
	class:selected={isSelected}
>
	<div id="header">{knot.name}</div>
	<div id="body">
		<div class="in-loops">
			{#each knot.inLoops as loop, i}
				<Loop {loop} bind:flow={inLoopFlows[i]} />
			{/each}
		</div>
		<div class="out-loops">
			{#each knot.outLoops as loop, i}
				<Loop {loop} bind:flow={outLoopFlows[i]} />
			{/each}
		</div>
		<div class="emblem-container">
			<span class="emblem material-symbols-outlined">{knot.emblem}</span>
		</div>
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div id="footer" on:click={handleClickFooter}>
		<span class="material-symbols-outlined bumper-icon"> expand_more </span>
	</div>
</div>

<!-- Utilities -->
<svelte:window
	on:mousemove={handleMouseMove}
	on:mousedown={handleMouseDownWindow}
	on:mouseup={handleMouseUp}
	on:keydown={handleKeyDown}
/>

<svelte:body on:mouseleave={handleMouseLeave} />

<style>
	#frame {
		position: absolute;
		display: flex;
		flex-direction: column;

		min-width: 8rem;
		/* max-width: 16rem; */

		border-radius: 1rem;
		overflow: hidden;
		cursor: grab;

		color: white;
		background-color: rgba(221, 160, 221, 0.05);
		backdrop-filter: blur(3px) grayscale(50%);
		box-shadow: rgb(247, 168, 247) inset 2px 2px 8px, rgb(74, 49, 74) inset -2px -2px 8px,
			rgba(0, 0, 0, 0.5) 4px 4px 8px;
	}

	#header {
		width: 100%;
		height: 40px;
		padding: 0.3rem;

		font-size: 1.5rem;
		text-align: center;

		background-color: green;
		opacity: 0.8;
		border-radius: 1rem 1rem 0 0;
	}

	#body {
		display: grid;
		grid-template-columns: auto auto auto;
		grid-template-areas: 'in-loops emblem out-loops';
		justify-content: space-between;
		padding: 0.25rem;
		flex-grow: 1;
		/* box-shadow: inset red 0 0 10px; */
	}

	.in-loops {
		display: flex;
		flex-direction: column;
		grid-area: in-loops;
		/* background-color: orange; */
	}

	.out-loops {
		display: flex;
		flex-direction: column;
		grid-area: out-loops;
		/* background-color: teal; */
	}

	.emblem-container {
		display: flex;
		justify-content: center;
		align-items: center;
		grid-area: emblem;
	}

	#footer {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 20px;
		width: 100%;
		cursor: pointer;
		margin-bottom: 0px;

		background-color: green;
		opacity: 0.8;
	}

	.selected {
		outline: orange 3px solid;
	}
</style>
