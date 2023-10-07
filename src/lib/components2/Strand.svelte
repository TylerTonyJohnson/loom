<script>
	export let offset = 0;
	export let zoom = 1;
	export let position = { x: 0, y: 0 };
</script>

<div
	id="frame"
	style="
        scale: {zoom};
        left: {position.x + offset.x}px;
        top: {position.y + offset.y}px;  
    "
/>

<style>
	#frame {
		position: absolute;
	}
</style>
