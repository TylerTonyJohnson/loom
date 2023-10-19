<script>
	import { getContext, onMount } from 'svelte';
	import { FlowType, ThreadType } from '$lib/enums.js';

	// Context
	const { offset, loopsToTie, updateKnot } = getContext('loom');

	// Imports
	export let loop;
    console.log(loop);

	// Position
	let eyeletElement;
	loop.knot.position.subscribe(() => {
		if (eyeletElement) updatePosition();
	});

	function updatePosition() {
		const rect = eyeletElement.getBoundingClientRect();
		loop.position.set({
			x: rect.left + rect.width / 2 - $offset.x,
			y: rect.top + rect.height / 2 - $offset.y
		});
	}

	onMount(() => {
		updatePosition();
	});

	/* 
		Events
	*/

	function handleMouseDownEyelet(event) {
		switch (event.which) {
			case 1:
				if ($loopsToTie.length !== 0) return;
				loopsToTie.set([loop]);
				break;
			case 2:
				break;
			case 3:
				clearBinding();
				break;
		}
	}

	function handleMouseUpEyelet(event) {
		if ($loopsToTie.length !== 1) return;
		loopsToTie.update((strand) => [...strand, loop]);
	}

	function handleMouseUpWindow(event) {
		if ($loopsToTie.length <= 0) return;
		loopsToTie.set([]);
	}

	function handleClick(event) {
		flow();
	}

	/* 
		Methods
	*/

	export function flow() {
		switch (loop.flowType) {
			case FlowType.Input:
				pull();
				break;
			case FlowType.Output:
				push();
				break;
		}
	}

	function clearBinding() {
		if (!loop.binding) return;
		loop.binding.binding = null;
		loop.binding = null;
		updateKnot(loop.knot);
	}

	function push() {
		if (loop.bindings.size < 1) return;
		loop.binding.value = loop.value;
		updateKnot(loop.binding.knot);
	}

	function pull() {
		if (loop.binding.size < 1) return;
		loop.value = loop.binding.value;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	id="frame"
	class:input={loop.flowType === FlowType.Input}
	class:output={loop.flowType === FlowType.Output}
	on:click={handleClick}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	{#if loop.value !== null && loop.value !== undefined}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="value"
			contenteditable="true"
			class:none={loop.threadType === ThreadType.None}
			class:boolean={loop.threadType === ThreadType.Boolean}
			class:number={loop.threadType === ThreadType.Number}
			class:string={loop.threadType === ThreadType.String}
			class:array={loop.threadType === ThreadType.Array}
			class:object={loop.threadType === ThreadType.Object}
		>
			{loop.value}
		</div>
	{/if}
	{#if loop.name}
		<div class="name">{loop.name}</div>
	{/if}
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<svg
		class="eyelet"
		on:mousedown|stopPropagation={handleMouseDownEyelet}
		on:mouseup|stopPropagation={handleMouseUpEyelet}
		bind:this={eyeletElement}
		class:full={loop.binding}
		class:none={loop.threadType === ThreadType.None}
		class:boolean={loop.threadType === ThreadType.Boolean}
		class:number={loop.threadType === ThreadType.Number}
		class:string={loop.threadType === ThreadType.String}
		class:array={loop.threadType === ThreadType.Array}
		class:object={loop.threadType === ThreadType.Object}
		viewBox="0 0 100 100"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="50" cy="50" r="32" />
	</svg>
</div>

<svelte:window on:mouseup={handleMouseUpWindow} />

<style>
	/* Structure */
	#frame {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 0.8rem;
	}

	#frame > * {
		margin: auto 0.2rem;
	}

	.input {
		justify-content: start;
	}
	.output {
		justify-content: end;
	}

	.input .eyelet,
	.output .name {
		order: 1;
	}
	.input .value,
	.output .value {
		order: 2;
	}
	.input .name,
	.output .eyelet {
		order: 3;
	}

	/* Value */
	.value {
		border: solid 2px rgba(255, 255, 255, 0.5);
		border-radius: 0.5rem;
		padding: 0 0.25rem;
		cursor: text;
		/* font-weight: bold; */
	}

	/* Eyelet */
	.eyelet {
		height: 1.5rem;
		fill: none;
		stroke: white;
		stroke-width: 10;
		cursor: pointer;
	}
	.eyelet:hover {
		fill: orange;
	}
	.eyelet.full {
		fill: red;
	}

	/* Value colors by value type */
	.value.none {
		color: white;
	}
	.value.boolean {
		color: salmon;
	}
	.value.number {
		color: indianred;
	}
	.value.string {
		color: springgreen;
	}
	.value.array {
		color: goldenrod;
	}
	.value.object {
		color: slateblue;
	}

	/* Eyelet colors by value type */
	.eyelet.none {
		stroke: white;
	}
	.eyelet.boolean {
		stroke: salmon;
	}
	.eyelet.number {
		stroke: indianred;
	}
	.eyelet.string {
		stroke: springgreen;
	}
	.eyelet.array {
		stroke: goldenrod;
	}
	.eyelet.object {
		stroke: slateblue;
	}
</style>
