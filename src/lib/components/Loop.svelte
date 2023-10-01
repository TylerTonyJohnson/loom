<script>
	import { FlowType } from '$lib/enums.js';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';

	export let loop;
	export let editable;
    export let offset;
	export let knotPosition;
	let loopElement;

	knotPosition.subscribe((value) => {
		updatePosition();
	});

    onMount(() => {
        updatePosition();
    })
    // afterUpdate(() => {
    //     updatePosition();
    // })

	function updatePosition() {
		if (!loopElement) return;
		const rect = loopElement.getBoundingClientRect();
		loop.position.set({
			x: (rect.right - rect.left) / 2 + rect.left - offset.x,
			y: (rect.bottom - rect.top) / 2 + rect.top - offset.y
		});
	}
</script>

<div
	class="loop"
	class:input={loop.flowType === FlowType.Input}
	class:output={loop.flowType === FlowType.Output}
>
	{#if loop.name}
		<div class="name" contenteditable={editable}>{loop.name}</div>
	{/if}
	{#if loop.value}
		<div class="value" contenteditable={editable}>{loop.value}</div>
	{/if}
	<svg
		class="eyelet"
		class:full={loop.binding}
		bind:this={loopElement}
		on:click={updatePosition}
		viewBox="0 0 100 100"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="50" cy="50" r="45" />
	</svg>
</div>

<style>
	.loop {
		display: flex;
		height: 1.5rem;
		flex-direction: row;
		align-items: center;
	}

	.loop > * {
		margin: 0.25rem;
	}

	.input {
		/* background-color: plum; */
		justify-content: start;
	}

	.output {
		/* background-color: lightseagreen; */
		justify-content: end;
	}

	.name,
	.value {
		color: white;
	}

	.input .eyelet {
		order: 1;
	}
	.input .value {
		order: 2;
	}
	.input .name {
		order: 3;
	}

	.output .name {
		order: 1;
	}
	.output .value {
		order: 2;
	}
	.output .eyelet {
		order: 3;
	}

	.string {
		color: darkolivegreen;
	}

	.number {
		color: blueviolet;
	}

	.eyelet {
		height: 1rem;
		width: 1rem;
		fill: none;
		stroke: white;
		stroke-width: 10;

		/* background-color: red; */
	}

	.eyelet:hover {
		fill: orange;
	}

	.eyelet.full {
		fill: red;
	}
</style>
