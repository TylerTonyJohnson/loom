import { FlowType, ThreadType } from "../enums";
import Knot from "./Knot";

export default class MultiKnot extends Knot {
    constructor(position) {
        // Create knot
        super('Multi','',position);

        // Create loops
        const loop1 = this.addLoop(ThreadType.None, FlowType.Output);
        loop1.value = 'Cold';
        const loop2 = this.addLoop(ThreadType.Boolean, FlowType.Output);
        loop2.value = true;
        const loop3 = this.addLoop(ThreadType.Number, FlowType.Output);
        loop3.value = 54;
        const loop4 = this.addLoop(ThreadType.String, FlowType.Output);
        loop4.value = 'String';
    }
}