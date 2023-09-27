import Knot from '$lib/classes/Knot.js';

export default class Weave {
	constructor() {
		this.knots = [];
        this.addKnot();
	}

	addKnot() {
        this.knots.push(new Knot());
	}
}
