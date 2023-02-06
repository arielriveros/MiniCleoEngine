import { Scene } from 'three';
import { Entity } from './entity';

export class Level
{
    private _scene: Scene;
    private _entities: Entity[];

    constructor()
    {
        this._scene = new Scene();
        this._entities = [];
    }

    public get scene(): Scene { return this._scene; }
    public get entities(): Entity[] { return this._entities; }

    public addEntity(entity: Entity): void
    {
        entity.level = this;
        this._entities.push(entity);
    }

    public getEntityByName(name: string): Entity | undefined
    {
        for(let i = 0; i < this._entities.length; i++)
        {
            if(this._entities[i].name === name)
                return this._entities[i];
        }
        return undefined;
    }

    public update(): void
    {
        for(let i = 0; i < this._entities.length; i++)
            this._entities[i].update();
    }
    
    
}