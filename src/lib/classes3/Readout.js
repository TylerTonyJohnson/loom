import Knot from './Knot';
import { ThreadType, FlowType } from '../enums';

export default class Readout extends Knot {
	constructor() {
		super();
	}

    setName() {
        this.name = 'Readout';
        this.emblemName = '';
    }

	setLoops() {
		this.addLoop('', ThreadType.String, FlowType.Input);
	}
}