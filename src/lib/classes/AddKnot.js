import { FlowType, ThreadType } from '../enums';
import Knot from './Knot';

export default class AddKnot extends Knot {
	constructor(position) {
		// Create knot
		super('Add', '', position);

		// Create loops
		const input1 = this.addLoop(ThreadType.Number, FlowType.Input);
		const input2 = this.addLoop(ThreadType.Number, FlowType.Input);
		const output1 = this.addLoop(ThreadType.Number, FlowType.Output);
	}
	weave = () => {
		this.outLoops[0].value = this.inLoops[0].value + this.inLoops[1].value;
	};
}
