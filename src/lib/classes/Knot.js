import { FlowType } from '../enums';
import Loop from '$lib/classes/Loop.js';
import { writable } from 'svelte/store';

export default class Knot {
	constructor(name = '', emblem = '', position = { x: 0, y: 0 }) {
		// Config
		this.name = name;
		this.emblem = emblem;
        
		// Data
		this.position = new writable(position);
		this.inLoops = [];
		this.outLoops = [];
        this.weave = () => {
            console.log('executing');
        }
	}

	/* 
        Methods
    */

	addLoop(threadType, flowType, name = '', value = null) {
		const loop = new Loop(this, threadType, flowType, name, value);
		switch (flowType) {
			case FlowType.Input:
				this.inLoops.push(loop);
				break;
			case FlowType.Output:
				this.outLoops.push(loop);
				break;
		}
		return loop;
	}
}
