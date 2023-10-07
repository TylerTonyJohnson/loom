import { FlowType, ThreadType } from "../enums";
import Knot from "./Knot";

export default class Equivalent extends Knot {
    constructor() {
        // Create knot with name
        super('Equivalent', 'Equal');

        // Create loops
        this.addLoop(ThreadType.String, FlowType.Input);
        this.addLoop(ThreadType.String, FlowType.Input);
        
        this.addLoop(ThreadType.Boolean, FlowType.Output);
    }
}