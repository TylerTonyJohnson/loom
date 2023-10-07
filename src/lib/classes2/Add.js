import { FlowType, ThreadType } from "../enums";
import Knot from "./Knot";

export default class Add extends Knot {
    constructor() {
        // Create knot with name
        super('Add', 'add');

        // Create loops
        this.addLoop(ThreadType.Number, FlowType.Input);
        this.addLoop(ThreadType.Number, FlowType.Input);
        this.addLoop(ThreadType.Number, FlowType.Output);
    }
}