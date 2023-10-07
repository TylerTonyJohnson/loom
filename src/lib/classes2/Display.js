import { FlowType, ThreadType } from "../enums";
import Knot from "./Knot";

export default class Display extends Knot {
    constructor() {
        // Create knot with name
        super('Display');

        // Create loops
        const loop = this.addLoop(ThreadType.None, FlowType.Input);
        loop.value = 'Input';
    }
}