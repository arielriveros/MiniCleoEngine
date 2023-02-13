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
    }

    public override destroy(): void
    {
        super.destroy();
        this._camera.position.set(0, 0, 0);
        this._camera.rotation.set(0, 0, 0);
        this._camera.parent?.remove(this._camera);
    }

    public moveForward(distance: number): void
    {
        this._camera.translateZ(distance);
    }

    public moveRight(distance: number): void
    {
        this._camera.translateX(distance);
    }

    public moveUp(distance: number): void
    {
        this._camera.translateY(distance);
    }

    public rotateX(angle: number): void
    {
        this._camera.rotateX(angle);
    }

    public rotateY(angle: number): void
    {
        this._camera.rotateY(angle);
    }

    public rotateZ(angle: number): void
    {
        this._camera.rotateZ(angle);
    }

    public lookAt(pos: vec3): void
    {
        this._camera.lookAt(pos[0], pos[1], pos[2]);
    }
}