import * as THREE from "three";

export class DirectionalLight
{
    private _light: THREE.DirectionalLight;

    constructor(color: number, intensity: number)
    {
        this._light = new THREE.DirectionalLight(color, intensity);
        this._light.color.setHSL( 0.1, 1, 0.95 );
        this._light.castShadow = true;
        this._light.shadow.bias = -.003
        this._light.shadow.mapSize.width = 4096;
        this._light.shadow.mapSize.height = 4096;
        const d = 20;
        this._light.shadow.camera.near = d / 1000;
        this._light.shadow.camera.far = d * 10;
        this._light.shadow.camera.left = -d;
        this._light.shadow.camera.right = d;
        this._light.shadow.camera.top = d;
        this._light.shadow.camera.bottom = -d;
    }

    public get light(): THREE.DirectionalLight { return this._light; }
}