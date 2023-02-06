import { vec3, quat } from "gl-matrix";
import { Level } from "./level";
import { Component } from "./component";
import { MeshComponent } from "./meshComponent";

interface EntityParameters
{
    name?: string;
    position?: vec3;
    rotation?: vec3;
    scale?: vec3;
}

export class Entity
{
    private _level!: Level;
    private _name!: string;
    private _position: vec3;
    private _rotation: vec3;
    private _scale: vec3;
    private _components: Component[];

    constructor(params: EntityParameters = {})
    {
        this._name = params.name || "Entity";
        this._position = params.position || vec3.create();
        this._rotation = params.rotation || vec3.create();
        this._scale    = params.scale ||vec3.create();
        this._components = [];
    }

    public get name(): string { return this._name; }
    public set name(name: string) { this._name = name; }
    public get position(): vec3 { return this._position; }
    public set position(position: vec3) { this._position = position; }
    public get rotation(): vec3 { return this._rotation; }
    public set rotation(rotation: vec3) { this._rotation = rotation; }
    public get scale(): vec3 { return this._scale; }
    public set scale(scale: vec3) { this._scale = scale; }

    public addComponent(component: Component): void
    {
        this._components.push(component);
        component.parent = this;
    }

    public update(): void
    {
        for(let i = 0; i < this._components.length; i++)
            this._components[i].update();
    }

    public onAddToLevel(level: Level): void
    {
        this._level = level;
        this._components.forEach(component => 
            {
                if(component instanceof MeshComponent)
                    this._level.scene.add(component.mesh);
            });
    }

    public get level(): Level { return this._level; }

}