import { Object3D } from "three";

export abstract class Entity extends Object3D
{
    constructor() { super(); }

    public initialize() {}

    public update() {}

    public destroy()
    {
        this.parent?.remove(this);
    }
}