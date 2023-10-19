import { writable } from 'svelte/store';
import { FlowType } from '../enums';

export default class Loop {
	constructor(knot, name = '', type, flowType) {
		this.knot = knot;
		this.name = name;
		this.dataType = type;
		this.flowType = flowType;
		this.binding = null;
		this.value = null;
        this.position = writable({x: 0, y: 0});
	}

	/* 
        Methods
    */

	tie(otherLoop) {
		this.binding = otherLoop;
		otherLoop.binding = this;
	}

	untie(otherLoop) {
		otherLoop.binding = null;
		this.binding = null;
	}

	sync() {
		if (!this.binding) return;

		switch (this.flowType) {
			case FlowType.Input:
				this.value = this.binding.value;
				break;
			case FlowType.Output:
				this.binding.value = this.value;
				break;
		}
	}
}
