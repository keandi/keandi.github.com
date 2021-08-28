import { ClassA } from "./classA.js";

export class ClassB {
    #_PV = {};
    constructor() {
        this.#_PV.a = new ClassA("B");
    }
}