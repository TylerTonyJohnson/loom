import Knot from './Knot';
import { ThreadType, FlowType } from '../enums';

export default class Add extends Knot {
	constructor() {
		super();
	}

    setName() {
        this.name = 'Add';
        this.emblemName = 'add';
    }

	setLoops() {
		this.addLoop('', ThreadType.Number, FlowType.Input);
		this.addLoop('', ThreadType.Number, FlowType.Input);
		this.addLoop('', ThreadType.Number, FlowType.Output);
	}

    setWeavePattern() {
		this.weavePattern = () => {
            this.outLoops[0].value = this.inLoops.reduce((accumulator, loop) => accumulator + loop.value, 0);
        };
	}
} 