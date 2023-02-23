import { Scene, Camera } from "three";

/**
 * A level is a collection of game objects that are loaded and unloaded together.
 */

export abstract class Level
{
    private _levelName: string;
    private _scene!: Scene;
    private _camera!: Camera;
    
    constructor(levelName: string/* , scene: Scene, camera: Camera */)
    {
        this._levelName = levelName;
    }

    public initialize(): void { }

    public update(): void { }

    public destroy(): void
    {
    }

    public get name() { return this._levelName; }
    public get scene() { return this._scene; }
    public set scene(scene: Scene) { this._scene = scene; }
    public get camera() { return this._camera; }
    public set camera(camera: Camera) { this._camera = camera; }
}