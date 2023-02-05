import { Scene } from 'three';

export class Level
{
    private _scene: Scene;

    constructor()
    {
        this._scene = new Scene();
    }

    public get scene(): Scene { return this._scene; }
    
}