import { checkType } from '../helpers';
import ThreadType from '$lib/enums.js';

export default class Knot {
	constructor() {
		this.position = { x: 0, y: 0 };
		this.name = 'Dolby Surround';

		// Setup
		this.tie('strange');
	}

	/* 
        Methods
    */

	tie(value) {
		this.type = checkType(value);
		if (!this.type) {
			console.log('no known content type');
			return;
		}

		switch (this.type) {
			case ThreadType.Boolean:
				console.log('boolean');
				break;
			case ThreadType.Number:
				console.log('number');
				break;
			case ThreadType.String:
				console.log('string');
				break;
			case ThreadType.Array:
				console.log('array');
				break;
			case ThreadType.Object:
				console.log('object');
				break;
			case ThreadType.Function:
				console.log('function');
				break;
		}

		this.contents = value;
	}
}
