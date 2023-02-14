import { Entity } from "./entity";

export abstract class Component
{
    private _parent!: Entity
    constructor() {}

    public get parent(): Entity { return this._parent; }
    public set parent(parent: Entity) { this._parent = parent; }

    public initialize(): void {}
    public update(): void {}
    public destroy(): void {}
}