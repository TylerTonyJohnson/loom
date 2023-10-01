<script>
	export let offset;
	export let zoom;
	export let startPosition;
	export let endPosition;

	const radius = 6;
	const circlePadding = 6;
	// const linePadding = 20;

	$: position = {
		x: Math.min($startPosition.x, $endPosition.x) - circlePadding,
		y: Math.min($startPosition.y, $endPosition.y) - circlePadding
	};
	$: size = {
		x: Math.abs($endPosition.x - $startPosition.x) + 2 * circlePadding,
		y: Math.abs($endPosition.y - $startPosition.y) + 2 * circlePadding
	};
</script>

<div
	class="strand"
	style="
        scale: {zoom};
        left: {position.x}px;
        top: {position.y}px;
        width: {size.x}px;
        height: {size.y}px;
        translate: {offset.x}px {offset.y}px;
    "
>
	<svg
		width="100%"
		height="100%"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<line
			x1={$startPosition.x - position.x}
			y1={$startPosition.y - position.y}
			x2={$endPosition.x - position.x}
			y2={$endPosition.y - position.y}
			stroke="red"
			stroke-width="4"
		/>
        <circle cx={$startPosition.x - position.x} cy={$startPosition.y - position.y} r={radius} fill='white' />
        <circle cx={$endPosition.x - position.x} cy={$endPosition.y - position.y} r={radius} fill='white' />
	</svg>
</div>

<style>
	.strand {
		position: absolute;
		border: lightcyan 2px solid;
		pointer-events: none;
        z-index: 2;
	}
</style>
