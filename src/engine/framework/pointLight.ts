import * as THREE from "three";
import { Entity, EntityParameters } from "./entity";

export class PointLight extends Entity
{
    private _light: THREE.PointLight;

    constructor(color: number, intensity: number, radius: number = 1, decay: number = 2, castShadow: boolean = false, params: EntityParameters = {})
    {
        super(params);
    
        this._light = new THREE.PointLight(color, intensity, radius, decay);
        this._light.position.set(this.position[0], this.position[1], this.position[2]);
        this._light.rotation.set(this.rotation[0], this.rotation[1], this.rotation[2]);
        this._light.scale.set(this.scale[0], this.scale[1], this.scale[2]);
        this._light.castShadow = castShadow;
        this._light.shadow.bias = -0.001
        this._light.shadow.mapSize.width = 4096;
        this._light.shadow.mapSize.height = 4096;
        const d = 15;
        this._light.shadow.camera.near = d / 1000;
        this._light.shadow.camera.far = d * 10;
    }

    public get light(): THREE.PointLight { return this._light; }

    public override update(): void
    {
        super.update();
        this._light.position.set(this.position[0], this.position[1], this.position[2]);
        this._light.rotation.set(this.rotation[0], this.rotation[1], this.rotation[2]);
        this._light.scale.set(this.scale[0], this.scale[1], this.scale[2]);
    }

    public override destroy(): void
    {
        super.destroy();
        this._light.parent?.remove(this._light);
    }
}