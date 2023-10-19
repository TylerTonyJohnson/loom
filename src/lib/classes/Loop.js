import { writable } from "svelte/store";

export default class Loop {
    constructor(knot, threadType, flowType, name = '', value = null, binding = null) {
        // Reference
        this.knot = knot;

        // Config
        this.threadType = threadType;
        this.flowType = flowType;
        
        // Runtime
        this.name = name;
        this.value = value;
        this.binding = binding;
        this.bindings = new Set();
        this.position = writable({x: 0, y: 0});

        // Display
        // this.isValueVisible = false;
    }
}