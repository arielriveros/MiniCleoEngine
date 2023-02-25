import { Camera } from "three";
import { GameMap } from "../world/map";
import { InputController } from "../input/inputController";
import { Entity } from "../core";

/**
 * A level is a collection of game objects that are loaded and unloaded together.
 */

export abstract class Level
{
    private _levelName: string;
    private _gameMap!: GameMap;
    private _camera!: Camera;
    private _entities: Array<Entity>;
    
    constructor(levelName: string)
    {
        this._levelName = levelName;
        this._entities = new Array<Entity>();
    }

    public initialize(): void {
        for(let child of this._gameMap.children)
        {
            if(child instanceof Entity)
            {
                child.initialize();
                this._entities.push(child);
            }
        }
    }

    public update(): void
    {
        for(let entity of this._entities)
            entity.update();
    }

    public destroy(): void
    {
        for(let entity of this._entities)
            entity.destroy();
    }

    public addInputController(inputController: InputController): void { }

    public get name() { return this._levelName; }
    public get gameMap() { return this._gameMap; }
    public set gameMap(newMap: GameMap) { this._gameMap = newMap; }
    public get camera() { return this._camera; }
    public set camera(camera: Camera) { this._camera = camera; }
    //public get input() { return this._inputController; }
}