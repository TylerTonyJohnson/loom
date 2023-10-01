import Knot from '$lib/classes/Knot.js';
import Add from './Add';
import Constant from './Constant';
import Readout from './Readout';

export default class Tapestry {
	constructor() {
		this.knots = [];

		// Testing
		this.knot1 = this.addKnot(new Constant());
		this.knot1.updatePosition({ x: 50, y: 100 });
		this.knot1.outLoops[0].value = 10;
		this.knot1.name='Emily'

		this.knot2 = this.addKnot(new Constant());
		this.knot2.updatePosition({ x: 50, y: 200 });
		this.knot2.outLoops[0].value = 34;

		this.knot3 = this.addKnot(new Add());
		this.knot3.updatePosition({ x: 300, y: 150 });

		this.knot4 = this.addKnot(new Readout());
		this.knot4.updatePosition({ x: 550, y: 200 });

		// console.log(this.knot1.outLoops[0])
		this.knot1.outLoops[0].tie(this.knot3.inLoops[0]);
		this.knot2.outLoops[0].tie(this.knot3.inLoops[1]);
		this.knot3.outLoops[0].tie(this.knot4.inLoops[0]);
		// this.knot1.outLoops[0].untie(this.knot3.inLoops[0]);
	}

	addKnot(knot = new Knot()) {
		this.knots.push(knot);
		return knot;
	}
}
