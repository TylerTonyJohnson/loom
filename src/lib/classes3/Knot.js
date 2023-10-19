import { checkType, getRandomWord, randomInt } from '../helpers';
import { ThreadType } from '$lib/enums.js';
import { FlowType } from '../enums';
import Loop from './Loop';
import { writable } from 'svelte/store';

export default class Knot {
	constructor(position) {
		this.position = writable({ x: 0, y: 0 });

		this.inLoops = [];
		this.outLoops = [];

		// Setup
		this.setName();
		this.setLoops();
		this.setWeavePattern();

		// this.position.subscribe((value) => {
		// 	this.$position = value;
		// });
	}

	updatePosition(position) {
		this.position.update((oldPosition) => {
			return { x: oldPosition.x + position.x, y: oldPosition.y + position.y };
		});
	}

	setName() {
		this.name = getRandomWord();
		this.emblemName = 'd';
	}

	setLoops() {
		const inputCount = randomInt(0, 4);
		const outputCount = randomInt(0, 4);

		for (let i = 0; i < inputCount; i++) {
			this.addLoop(getRandomWord(), ThreadType.String, FlowType.Input);
		}

		for (let i = 0; i < outputCount; i++) {
			this.addLoop(getRandomWord(), ThreadType.String, FlowType.Output);
		}
	}

	setWeavePattern() {
		this.weavePattern = () => {
			console.log('weaving');
		};
	}

	/* 
        Methods
    */

	weave() {
		this.updateInputs();
		this.weavePattern();
	}

	addLoop(name, type, flowType) {
		const newLoop = new Loop(this, name, type, flowType);

		switch (flowType) {
			case FlowType.Input:
				this.inLoops.push(newLoop);
				break;
			case FlowType.Output:
				this.outLoops.push(newLoop);
				break;
		}
	}

	/* 
		Utilities
	*/

	updateInputs() {
		this.inLoops.forEach((loop) => {
			loop.sync();
		});
	}
}
