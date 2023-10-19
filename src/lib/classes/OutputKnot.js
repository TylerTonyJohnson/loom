import { FlowType, ThreadType } from "../enums";
import Knot from "./Knot";

export default class OutputKnot extends Knot {
    constructor(position) {
        // Create knot
        super('Output','',position);

        // Create loops
        const loop = this.addLoop(ThreadType.None, FlowType.Input);
    }
}