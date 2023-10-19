<script>
	import { getContext } from 'svelte';

	// Imports
	export let startLoop;
	export let endLoop;

	// Context
	const { offset, zoom, loopsToTie, snapDistance, updateKnot } = getContext('loom');

	// Position
	const boundary = 6;
	let startPosition = { x: 10, y: 10 };
	startLoop.position.subscribe((value) => {
		startPosition = { x: value.x, y: value.y };
	});
	let endPosition = { x: 100, y: 100 };
	endLoop.position.subscribe((value) => {
		endPosition = { x: value.x, y: value.y };
	});

	// Translate position into svg
	$: totalLocation = {
		x: Math.min(startPosition.x, endPosition.x) - boundary,
		y: Math.min(startPosition.y, endPosition.y) - boundary
	};

	$: totalSize = {
		x: Math.abs(endPosition.x - startPosition.x) + 2 * boundary,
		y: Math.abs(endPosition.y - startPosition.y) + 2 * boundary
	};

	let color;
	$: {
		switch (true) {
			case startLoop.value === null && endLoop.value === null:
				color = 'white';
				break;
			case startLoop.value === endLoop.value:
				color = 'red';
				break;
			case startLoop.value !== endLoop.value:
				color = 'yellow';
				break;
		}
	}
</script>

<svg
	id="frame"
	style:left="{totalLocation.x + $offset.x}px"
	style:top="{totalLocation.y + $offset.y}px"
	style:width="{totalSize.x}px"
	style:height="{totalSize.y}px"
	xmlns="http://www.w3.org/2000/svg"
>
	<line
		x1="{startPosition.x < endPosition.x ? 0 + boundary : totalSize.x - boundary}px"
		y1="{startPosition.y < endPosition.y ? 0 + boundary : totalSize.y - boundary}px"
		x2="{startPosition.x < endPosition.x ? totalSize.x - boundary : 0 + boundary}px"
		y2="{startPosition.y < endPosition.y ? totalSize.y - boundary : 0 + boundary}px"
		style:stroke={color}
		stroke-width="4"
	/>
</svg>

<style>
	#frame {
		position: absolute;
		/* width: 200px;
		height: 200px; */
		/* border: solid orange 3px; */
		pointer-events: none;
		z-index: 2;
	}
</style>
