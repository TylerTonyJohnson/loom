import Loop from '$lib/classes2/Loop.js';
import { FlowType } from '../enums';

export default class Knot {
	constructor(name = '', emblem = '') {
		this.name = name;
		this.emblem = emblem;
		this.inLoops = [];
		this.outLoops = [];
	}

	addLoop(threadType, flowType, name) {
		const loop = new Loop(this, threadType, flowType, name);
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
