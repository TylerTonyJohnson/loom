import { FlowType, ThreadType } from '../enums';
import Knot from './Knot';

export default class TrueKnot extends Knot {
	constructor(position) {
		// Create knot
		super('Constant', '', position);

		// Create loops
		const loop = this.addLoop(ThreadType.Boolean, FlowType.Output);
		loop.value = true;
	}
}
