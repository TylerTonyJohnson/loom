<script>
	import { getContext } from 'svelte';

	export let testObject;

	const { offset, zoom, loops, updateKnot } = getContext('loom');

	// Runtime
	let isMoving = false;

	/* 
        Events
    */

	function handleMouseMove(event) {
		if (!isMoving) return;
		testObject.position = {
			x: testObject.position.x + event.movementX,
			y: testObject.position.y + event.movementY
		};
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

	function handleMouseDownCircle(event) {
		switch (event.which) {
			case 1:
				loops.set([testObject]);
				break;
			case 2:
				break;
			case 3:
				break;
		}
	}

	function handleMouseUpCircle(event) {
		switch (event.which) {
			case 1:
				loops.update((oldLoops) => [...oldLoops, testObject]);
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
				if ($loops.length > 0) loops.set([]);
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

	function splesh() {
		console.log('splesh');
		if (testObject.binding) {
			testObject.binding.value = testObject.value;
		}
        updateKnot(testObject.binding);
	}

	export function bind(sourceObject) {
		testObject.binding = sourceObject;
		update();
	}

	export function update() {
		testObject = testObject;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="container"
	style:left="{testObject.position.x + $offset.x}px"
	style:top="{testObject.position.y + $offset.y}px"
	on:mousedown={handleMouseDown}
>
	<div>{testObject.value}</div>
	<div
		class="circle"
		on:mousedown|stopPropagation={handleMouseDownCircle}
		on:mouseup|stopPropagation={handleMouseUpCircle}
		class:full={testObject.binding}
	/>
	<button type="button" on:click={splesh}>SPLESH</button>
</div>

<svelte:window on:mousemove={handleMouseMove} />
<svelte:body on:mouseup={handleMouseUp} on:mouseleave={handleMouseLeave} />

<style>
	.container {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: orange;
		border-radius: 1rem;
		height: 100px;
		width: 100px;
	}

	.circle {
		width: 30px;
		height: 30px;
		background-color: blue;
		border-radius: 50%;
	}

	.circle:hover {
		background-color: purple;
	}

	.full {
		background-color: red;
	}
</style>
