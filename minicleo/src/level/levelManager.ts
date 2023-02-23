import { Module } from "../engine/module";
import { Level } from "./level";

export class LevelManager extends Module
{
    private _levels: Array<Level>;
    private _activeLevel!: Level;

    constructor()
    {
        super("LEVEL_MANAGER");
        this._levels = new Array<Level>();
    }

    public initialize()
    {
        super.initialize();
    }

    public override update()
    {
        super.update();
        if(this._activeLevel)
            this._activeLevel.update();
    }

    public destroy()
    {
        super.destroy();
    }

    public addLevel(level: Level)
    {
        this._levels.push(level);
    }

    public setActiveLevel(levelName?: string): boolean
    {
        if(levelName === undefined && this._levels.length > 0)
        {
            this._activeLevel = this._levels[0];
            return true;
        }

        for(let level of this._levels)
        {
            if(level.name === levelName)
            {
                this._activeLevel = level;
                return true;
            }
        }

        console.error(`Level '${levelName}' does not exist.`);
        return false;
    }

    public get activeLevel() { return this._activeLevel; }
    public get activeGameMap() { return this._activeLevel?.gameMap; }
    public get activeCamera() { return this._activeLevel?.camera; }

}