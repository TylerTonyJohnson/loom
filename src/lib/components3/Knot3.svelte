<script>
	import Loop from './Loop.svelte';

	export let position;
	export let knot;
	export let offset;
	export let zoom;
	let isMoving = false;
	/* 
		Events
	*/
	function handleMouseMove(event) {
		if (!isMoving) return;
		knot.updatePosition({x: event.movementX, y: event.movementY});
	}

	function handleMouseDown(event) {
		switch (event.which) {
			case 1:
				isMoving = true;
				event.target.focus();
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

	function handleSubmit() {
		console.log('submit');
	}

	function handleWeave() {
		knot.weave();
		knot = knot;	// Not sure if this is the best way to do this
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="knot"
	tabindex="0"
	style="
    scale: {zoom};
    left: {$position.x}px;
    top: {$position.y}px;
    translate: {offset.x}px {offset.y}px;
    "
>
	<!-- Name -->
	<div class="name" class:grabbing={isMoving} on:mousedown={handleMouseDown}>
		{knot.name}
	</div>

	<!-- Loops -->
	<div class="loop-container">
		<!-- Inputs -->
		<div class="input-container">
			{#each knot.inLoops as loop}
				<Loop {loop} editable={!loop.binding && knot.outLoops.length > 0} knotPosition={knot.position} {offset} />
			{/each}
		</div>
		<span class="material-symbols-outlined emblem-container">{knot.emblemName}</span>
		<!-- Outputs -->
		<div class="output-container">
			{#each knot.outLoops as loop}
				<Loop {loop} editable={knot.inLoops.length === 0} knotPosition={knot.position} {offset} />
			{/each}
		</div>
	</div>

	<!-- Bottom bumper -->
	<div class="bumper" on:click={handleWeave}>
		<span class="material-symbols-outlined bumper-icon"> expand_more </span>
	</div>
</div>

<svelte:window
	on:mouseleave={handleMouseLeave}
	on:mouseup={handleMouseUp}
	on:mousemove={handleMouseMove}
/>

<style>
	.knot {
		position: absolute;
		display: flex;
		flex-direction: column;
		min-width: 8rem;
		max-width: 16rem;
		translate: -50% -50%;
		transition-property: scale;
		transition-timing-function: ease-out;
		transition-duration: 0.1s;
		/* border: solid white 2px; */
		border-radius: 1rem;
		overflow: hidden;
		background-color: rgba(221, 160, 221, 0.05);
		backdrop-filter: blur(3px) grayscale(50%);
		box-shadow: rgb(247, 168, 247) inset 2px 2px 8px, 
			rgb(74, 49, 74) inset -2px -2px 8px,
			rgba(0, 0, 0, 0.5) 4px 4px 8px;
	}

	.knot:focus-within {
		/* border-color: orange;
		border-width: 3px; */
		outline: orange 3px solid;
	}

	.name {
		min-height: 1rem;
		background-color: rgba(0, 128, 0, 0.8);
		padding: 0.3rem;

		color: white;
		font-size: 1.5rem;
		text-align: center;
		cursor: grab;
		border-radius: 1rem 1rem 0 0 ;
	}
	.name.grabbing {
		cursor: grabbing;
	}

	.shadow {
		box-shadow: rgba(255, 255, 255, 0.5) inset 2px 2px 4px, 
			rgba(0, 0, 0, 0.5) inset -2px -2px 4px;
	}

	.loop-container {
		display: grid;
		grid-template-columns: auto auto auto;
		justify-content: space-between;
		padding: 0.25rem;
		/* background-color: red; */
	}

	.input-container,
	.output-container {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.emblem-container {
		display: flex;
		justify-content: center;
		align-items: center;
		/* background-color: red; */
		color: white;
		width: 2rem;
	}

	.bumper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 1rem;
		background-color: rgba(0, 128, 0, 0.8);
		border-radius: 0 0 1rem 1rem;
	}

	.bumper-icon {
		color: white;
		font-size: 0.75rem;
	}
</style>
