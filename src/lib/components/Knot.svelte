<script>
	export let knot;
	export let offset;
	export let zoom;
	let isMoving = false;
	let position = { x: 0, y: 0 };

	// Functions
	function handleMouseMove(event) {
		if (!isMoving) return;
		position = { x: position.x + event.movementX, y: position.y + event.movementY };
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

    function handleSubmit() {
        console.log("submit")
    }
</script>

<div
	class="knot"
	style="
    scale: {zoom};
    left: {position.x}px;
    top: {position.y}px;
    translate: {offset.x}px {offset.y}px;
    "
>
	<!-- Name -->
	<div class="name" class:grabbing={isMoving} on:mousedown={handleMouseDown}>
		{knot.name}
	</div>
	<!-- Contents -->
	{#each knot.contents as contentItem}
		<div class="contents-container">
			<input
				class="contents"
				contenteditable="true"
				bind:value={contentItem}
                on:focus={(event)=> {event.target.select();}}
                on:input={handleSubmit}
				class:string-type={typeof contentItem === 'string'}
				class:number-type={typeof contentItem === 'number'}
			/>
		</div>
	{/each}
</div>

<svelte:window
	on:mouseleave={handleMouseLeave}
	on:mouseup={handleMouseUp}
	on:mousemove={handleMouseMove}
/>

<style>
	.knot {
		position: absolute;
		/* padding: 1em; */
		background-color: darkslategray;
		opacity: 0.9;
		translate: -50% -50%;
		transition-property: scale;
		transition-timing-function: ease-out;
		transition-duration: 0.1s;
		border: solid white 2px;
		border-radius: 1rem;
		overflow: hidden;
	}

	.name {
		background-color: green;
		padding: 0.5rem;
		color: white;
		text-align: center;
		cursor: grab;
	}
	.name.grabbing {
		cursor: grabbing;
	}

	.contents-container {
		background-color: orange;
		padding: 1em;
	}

	.contents {
		background-color: white;
		text-align: center;
	}

	.string-type {
		color: maroon;
	}

	.number-type {
		color: green;
	}
</style>
