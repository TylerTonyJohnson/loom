import { FlowType, ThreadType } from "../enums";
import Knot from "./Knot";

export default class MultiInput extends Knot {
    constructor(position) {
        // Create knot
        super('Multi Input','',position);

        // Create loops
        const loop1 = this.addLoop(ThreadType.None, FlowType.Input);
        const loop2 = this.addLoop(ThreadType.Boolean, FlowType.Input);
        const loop3 = this.addLoop(ThreadType.Number, FlowType.Input);
        const loop4 = this.addLoop(ThreadType.String, FlowType.Input);
    }
}