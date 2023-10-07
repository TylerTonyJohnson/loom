import { ThreadType, FlowType } from "../enums";

export default class Loop {
    constructor(knot, threadType = ThreadType.Number, flowType = FlowType.Input, name = '') {
        // References
        // this.knot = knot;
        
        // Setup
        this.threadType = threadType;
        this.flowType = flowType;
        this.name = name;
        
        // Runtime
        this.value = null;
        this.binding = null;
    }
}