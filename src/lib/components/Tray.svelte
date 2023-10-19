<script>
	import ConstantKnot from '$lib/classes/ConstantKnot.js';
	import OutputKnot from '$lib/classes/OutputKnot.js';
	import MultiKnot from '$lib/classes/MultiKnot.js';
	import MultiInput from '$lib/classes/MultiInput.js';
	import AndKnot from '$lib/classes/AndKnot.js';
	import AddKnot from '$lib/classes/AddKnot.js';
	import AppendKnot from '$lib/classes/AppendKnot.js';
    import TrueKnot from '$lib/classes/TrueKnot.js'
    import FalseKnot from '$lib/classes/FalseKnot.js'
    import {ThreadType} from  '$lib/enums.js';

	let knotTypes = [
		{ type: ConstantKnot, emblem: 'add' },
		{ type: OutputKnot, emblem: 'question_mark' },
		{ type: MultiKnot, emblem: 'add' },
		{ type: MultiInput, emblem: 'add' },
	];

	export let addKnot;

	addKnot(MultiKnot, { x: 50, y: 300 });
	addKnot(MultiInput, { x: 600, y: 300 });
	addKnot(AndKnot, { x: 300, y: 300 });
	addKnot(AddKnot, { x: 400, y: 400 });
	addKnot(AppendKnot, { x: 500, y: 500 });
	addKnot(TrueKnot, { x: 500, y: 500 });
	addKnot(FalseKnot, { x: 500, y: 500 });


</script>

<div id="frame">
	<div class="knot-container">
		{#each knotTypes as knotType}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span class="emblem material-symbols-outlined" on:click={() => addKnot(knotType.type)}
				>{knotType.emblem}</span
			>
		{/each}
	</div>
</div>

<style>
	#frame {
		position: fixed;
		right: 0;
		margin: 1rem;
		border: solid white 2px;
		border-radius: 0.5rem;
		/* background-color: olive; */
	}

	.knot-container {
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		gap: 0.5rem;
	}

	.emblem {
		border-radius: 50%;
		padding: 0.45rem;
		background-color: steelblue;
		color: white;
		box-shadow: rgba(0, 0, 0, 0.5) 0 0 5px;
	}

	.emblem:hover {
		background-color: plum;
	}
</style>
