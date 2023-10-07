import { FlowType, ThreadType } from "../enums";
import Knot from "./Knot";

export default class Constant extends Knot {
    constructor() {
        // Create knot with name
        super('Constant');

        // Create loops
        const loop = this.addLoop(ThreadType.None, FlowType.Output);
        loop.value = 'Output'
    }
}