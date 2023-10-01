import Knot from './Knot';
import { ThreadType, FlowType } from '../enums';

export default class Constant extends Knot {
	constructor() {
		super();
	}

    setName() {
        this.name = 'Constant';
        this.emblemName = '';
    }

	setLoops() {
		this.addLoop('', ThreadType.String, FlowType.Output);
	}
}
