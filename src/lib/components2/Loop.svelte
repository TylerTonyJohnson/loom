<script>
	import { FlowType, ThreadType } from '$lib/enums.js';
	import { currentStrand } from '$lib/stores.js';

	// export let loop;
	// export let knot;
	export let threadType;
	export let flowType;
	export let name;

	// Runtime
	export let self;
	export let value;
	export let binding;

	// Update the loop when strands are connected
	currentStrand.subscribe((strand) => {
		// if (!strand.includes(loop)) return;
		// loop = loop;
	});

	export function conch() {
		console.log('conch');
	}

	/* 
		Events
	*/

	function handleMouseDownValue(event) {
		console.log('changing value');
	}

	function handleMouseDownEyelet(event) {
		console.log('start strand')
		if ($currentStrand.length !== 0) return;
		currentStrand.set([self]);
	}

	function handleMouseUpEyelet(event) {
		console.log('end strand');
		if ($currentStrand.length !== 1) return;
		currentStrand.update((strand) => [...strand, self]);
	}

	function handleMouseUpWindow(event) {
		console.log('reset strand')
		if ($currentStrand.length <= 0) return;
		currentStrand.set([]);
	}

	function handleClick() {
		console.log('click')
		value = 'Frederick';
		// execute();
		// loop.binding = 'gregory';
	}

	/* 
		Methods
	*/
	export let execute = () => {
		// console.log('executing loop ');
		// if (!loop.binding) return;
		// loop.binding.value = loop.value;
		// update();
	};

	export const update = () => {
		// loop = loop;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	id="frame"
	class:input={flowType === FlowType.Input}
	class:output={flowType === FlowType.Output}
	on:click={handleClick}
>
	<!-- {#if loop.value} -->
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="value"
		contenteditable="true"
		on:mousedown|stopPropagation={handleMouseDownValue}
		class:none={threadType === ThreadType.None}
		class:boolean={threadType === ThreadType.Boolean}
		class:number={threadType === ThreadType.Number}
		class:string={threadType === ThreadType.String}
		class:array={threadType === ThreadType.Array}
		class:object={threadType === ThreadType.Object}
	>
		{value}
	</div>
	<!-- {/if} -->
	{#if name}
		<div class="name">{name}</div>
	{/if}
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<svg
		class="eyelet"
		on:mousedown|stopPropagation={handleMouseDownEyelet}
		on:mouseup|stopPropagation={handleMouseUpEyelet}
		class:full={binding}
		class:none={threadType === ThreadType.None}
		class:boolean={threadType === ThreadType.Boolean}
		class:number={threadType === ThreadType.Number}
		class:string={threadType === ThreadType.String}
		class:array={threadType === ThreadType.Array}
		class:object={threadType === ThreadType.Object}
		viewBox="0 0 100 100"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="50" cy="50" r="32" />
	</svg>
</div>

<svelte:window on:mouseup={handleMouseUpWindow} />
<svelte:options accessors />

<style>
	/* Structure */
	#frame {
		display: flex;
		flex-direction: row;
		align-items: center;
		/* height: 1.5rem; */

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
