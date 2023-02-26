import { Object3D } from "three";

interface vec3 { x: number, y: number, z: number };

export abstract class Entity extends Object3D
{
    constructor(name: string, position: vec3, rotation: vec3, scale: vec3) {
        super();
        this.name = name;
        this.position.set(position.x, position.y, position.z);
        this.rotation.set(rotation.x, rotation.y, rotation.z);
        this.scale.set(scale.x, scale.y, scale.z);
    }

    public initialize() {}

    public update() {}

    public destroy()
    {
        this.parent?.remove(this);
    }
}