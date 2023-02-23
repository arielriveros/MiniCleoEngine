import { Camera } from "three";
import { GameMap } from "../world/map";

/**
 * A level is a collection of game objects that are loaded and unloaded together.
 */

export abstract class Level
{
    private _levelName: string;
    private _gameMap!: GameMap;
    private _camera!: Camera;
    
    constructor(levelName: string)
    {
        this._levelName = levelName;
    }

    public initialize(): void { }

    public update(): void { }

    public destroy(): void
    {
    }

    public get name() { return this._levelName; }
    public get gameMap() { return this._gameMap; }
    public set gameMap(newMap: GameMap) { this._gameMap = newMap; }
    public get camera() { return this._camera; }
    public set camera(camera: Camera) { this._camera = camera; }
}