import { FlowType, ThreadType } from "../enums";
import Knot from "./Knot";

export default class Multiply extends Knot {
    constructor() {
        // Create knot with name
        super('Multiply', 'close');

        // Create loops
        this.addLoop(ThreadType.Number, FlowType.Input);
        this.addLoop(ThreadType.Number, FlowType.Input);
        this.addLoop(ThreadType.Number, FlowType.Output);
    }
}