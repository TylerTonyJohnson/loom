<script>
	import Loop from './Loop.svelte';

	//  Imported data
	export let name;
	export let emblem;
	export let inLoops;
	export let outLoops;
	export let position;


	export let offset;
	export let zoom;
	export let deleteKnot;

	// Runtime
	let width;
	let height;
	let isFocused = false;
	let isMoving = false;

	// Snapping
	const snapDistance = 20;

	$: snapHeight = Math.ceil(height / snapDistance) * snapDistance;
	$: snapWidth = Math.ceil(width / snapDistance) * snapDistance;

	$: snapPosition = {
		x: Math.ceil(position.x / snapDistance) * snapDistance,
		y: Math.ceil(position.y / snapDistance) * snapDistance
	};

	/* 
        Data
    */

	let loops = [];

	function execute() {
		loops.forEach((soup) => {
			// soup.execute();
		});
		// knot = knot; // Might not be necessary
	}

	// function addLoop() {}

	// function removeLoop() {}

	/* 
        Events
    */

	function handleMouseMove(event) {
		if (!isMoving) return;
		position = { x: position.x + event.movementX, y: position.y + event.movementY };
		position = position;
	}

	function handleMouseDown(event) {
		switch (event.which) {
			case 1:
				isMoving = true;
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

	function handleKeyDown(event) {
		if (!isFocused) return;
		switch (event.code) {
			case 'Delete':
				deleteKnot(knot);
				break;
			case 'ArrowLeft':
				position.x += -snapDistance;
				break;
			case 'ArrowRight':
				position.x += snapDistance;
				break;
			case 'ArrowUp':
				position.y += -snapDistance;
				break;
			case 'ArrowDown':
				position.y += snapDistance;
				break;
		}
	}

	function handleClickFooter(event) {
		execute();
	}

	function handleFocus(event) {
		isFocused = true;
	}

	function handleBlur(event) {
		isFocused = false;
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	id="frame"
	tabindex="0"
	style:scale={zoom}
	style:left="{snapPosition.x + offset.x}px"
	style:top="{snapPosition.y + offset.y}px"
	style:width="{snapWidth}px"
	style:height="{snapHeight}px"
	bind:clientWidth={width}
	bind:clientHeight={height}
	on:mousedown={handleMouseDown}
	on:focusin={handleFocus}
	on:blur={handleBlur}
	class:grabbing={isMoving}
>
	<div id="header">{name}</div>
	<div id="body">
		<div class="in-loops">
			{#each inLoops as loop}
				<Loop {...loop} />
			{/each}
		</div>
		<div class="out-loops">
			{#each outLoops as loop}
				<Loop {...loop} />
			{/each}
		</div>
		<div class="emblem-container">
			<span class="emblem material-symbols-outlined">{emblem}</span>
		</div>
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div id="footer" on:click={handleClickFooter}>
		<span class="material-symbols-outlined bumper-icon"> expand_more </span>
	</div>
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
		position: absolute;
		display: flex;
		flex-direction: column;
		/* justify-content: space-between; */
		min-width: 8rem;
		max-width: 16rem;
		/* translate: -50% -50%; */

		border-radius: 1rem;
		overflow: hidden;
		cursor: grab;

		color: white;
		background-color: rgba(221, 160, 221, 0.05);
		backdrop-filter: blur(3px) grayscale(50%);
		box-shadow: rgb(247, 168, 247) inset 2px 2px 8px, rgb(74, 49, 74) inset -2px -2px 8px,
			rgba(0, 0, 0, 0.5) 4px 4px 8px;
	}

	#frame:focus-within {
		outline: orange 3px solid;
	}
	#frame.grabbing {
		cursor: grabbing;
	}

	#header {
		/* min-height: 1rem;
		max-height: 3rem; */
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
</style>
