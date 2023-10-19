import { FlowType, ThreadType } from "../enums";
import Knot from "./Knot";

export default class ConstantKnot extends Knot {
    constructor(position) {
        // Create knot
        super('Constant','',position);

        // Create loops
        const loop = this.addLoop(ThreadType.None, FlowType.Output);
        loop.value = 'Output';
    }
}