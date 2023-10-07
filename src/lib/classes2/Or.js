import { FlowType, ThreadType } from "../enums";
import Knot from "./Knot";

export default class Or extends Knot {
    constructor() {
        // Create knot with name
        super('OR', 'question_mark');

        // Create loops
        this.addLoop(ThreadType.Boolean, FlowType.Input);
        this.addLoop(ThreadType.Boolean, FlowType.Input);
        this.addLoop(ThreadType.Boolean, FlowType.Output);
    }
}