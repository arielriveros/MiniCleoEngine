import { vec3 } from "gl-matrix";
import { Component } from "./component";

export class CameraComponent extends Component
{
    private _camera: THREE.Camera;

    constructor(camera: THREE.Camera, position?: vec3, rotation?: vec3)
    {
        super();
        this._camera = camera;
        position ? this._camera.position.set(position[0], position[1], position[2]) : this._camera.position.set(0, 0, 0);
        rotation ? this._camera.rotation.set(rotation[0], rotation[1], rotation[2]) : this._camera.rotation.set(0, 0, 0);
    }

    public get camera(): THREE.Camera { return this._camera; }

    public override update(): void
    {
        super.update();
        this._camera.lookAt(this.parent.position[0], this.parent.position[1] + 2, this.parent.position[2]);
    }

    public override destroy(): void
    {
        super.destroy();
        this._camera.position.set(0, 0, 0);
        this._camera.rotation.set(0, 0, 0);
        this._camera.parent?.remove(this._camera);
    }
}