import { Scene } from 'three';
import { Entity } from './entity';
import { DirectionalLight } from './directionalLight';
import { PointLight } from './pointLight';
import { PhysicsManager } from '../physics/physicsManager';

export class Level
{
    private _scene: Scene;
    private _entities: Entity[];
    private _physics!: PhysicsManager;

    constructor()
    {
        this._scene = new Scene();   
        this._entities = [];
    }

    public get scene(): Scene { return this._scene; }
    public get entities(): Entity[] { return this._entities; }

    public get physics(): PhysicsManager { return this._physics; }
    public set physics(physics: PhysicsManager) { this._physics = physics; }

    public addEntity(entity: Entity): void
    {
        entity.onAddToLevel(this);
        if(entity instanceof DirectionalLight)
            this._scene.add(entity.light);

        if(entity instanceof PointLight)
            this._scene.add(entity.light);
            
        this._entities.push(entity);
    }

    public addEntities(entities: Entity[]): void
    {
        for(let i = 0; i < entities.length; i++)
            this.addEntity(entities[i]);
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

    public addPhysicalBody(body: any)
    {
        if(body)
            this._physics.addBody(body);
    }

    public update(deltaTime: number): void
    {
        for(let i = 0; i < this._entities.length; i++)
            this._entities[i].update();
        this._physics.update(deltaTime);
    }
    
    public destroyEntityByName(entityName: string)
    {
        for(let i = 0; i < this._entities.length; i++)
        {
            if(this._entities[i].name === entityName)
            {
                this._entities[i].destroy();
                this._entities.splice(i, 1);
                break;
            }
        }
    }
}