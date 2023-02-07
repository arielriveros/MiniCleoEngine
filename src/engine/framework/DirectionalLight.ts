import * as THREE from "three";
import { Entity, EntityParameters } from "./entity";

export class DirectionalLight extends Entity
{
    private _light: THREE.DirectionalLight;

    constructor(color: number, intensity: number, params: EntityParameters = {})
    {
        super(params);
    
        this._light = new THREE.DirectionalLight(color, intensity);
        this._light.position.set(this.position[0], this.position[1], this.position[2]);
        this._light.rotation.set(this.rotation[0], this.rotation[1], this.rotation[2]);
        this._light.scale.set(this.scale[0], this.scale[1], this.scale[2]);
        this._light.color.setHSL( 0.1, 1, 0.95 );
        this._light.castShadow = true;
        this._light.shadow.bias = -0.001
        this._light.shadow.mapSize.width = 4096;
        this._light.shadow.mapSize.height = 4096;
        const d = 15;
        this._light.shadow.camera.near = d / 1000;
        this._light.shadow.camera.far = d * 10;
        this._light.shadow.camera.left = -d;
        this._light.shadow.camera.right = d;
        this._light.shadow.camera.top = d;
        this._light.shadow.camera.bottom = -d;
    }

    public get light(): THREE.DirectionalLight { return this._light; }

    public override update(): void
    {
        super.update();
        this._light.position.set(this.position[0], this.position[1], this.position[2]);
        this._light.rotation.set(this.rotation[0], this.rotation[1], this.rotation[2]);
        this._light.scale.set(this.scale[0], this.scale[1], this.scale[2]);
    }
}