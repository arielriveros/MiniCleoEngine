import { Camera } from "three";
import { GameMap } from "../world/map";
import { Entity } from '../world/entity';
import { RigidBody } from '../physics/rigidBody';
import { SHAPES } from '../physics/shapes';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger'

/**
 * A level is a collection of game objects that are loaded and unloaded together.
 */

export abstract class Level
{
    private _levelName: string;
    private _gameMap!: GameMap;
    private _camera!: Camera;
    private _entities: Array<Entity>;
    private _physicsWorld!: CANNON.World;
    private _cannonDebugger?: { update: () => void; };

    private _debug: boolean = true;
    
    constructor(levelName: string)
    {
        this._levelName = levelName;
        this._entities = new Array<Entity>();
        this._physicsWorld = new CANNON.World(
            {
                gravity: new CANNON.Vec3(0, -9.82, 0),
                broadphase: new CANNON.NaiveBroadphase(),
                solver: new CANNON.GSSolver(),
            }
        );

        // Fixed basic ground plane
        let groundBody = new RigidBody({mass: 0, shape: new SHAPES.Plane(), fixedRotation: true});
        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        this.physicsWorld.addBody(groundBody);
    }

    public initialize(): void {
        for(let child of this._gameMap.children)
        {
            if(child instanceof Entity)
            {
                child.initialize();
                this._entities.push(child);
                if(child.physicsBody)
                    this.physicsWorld.addBody(child.physicsBody);
            }
        }

        if(this._debug)
            this._cannonDebugger = CannonDebugger(this._gameMap, this._physicsWorld, {});
    }

    public update(): void
    {
        this.physicsWorld.fixedStep();
        for(let entity of this._entities)
            entity.update();
        if(this._cannonDebugger)
            this._cannonDebugger?.update();
        
    }

    public destroy(): void
    {
        for(let entity of this._entities)
            entity.destroy();
    }

    public addEntity(entity: Entity): void
    {
        entity.initialize();
        this._entities.push(entity);
        this._gameMap.add(entity);
        if(entity.physicsBody)
            this.physicsWorld.addBody(entity.physicsBody);
    }

    public removeEntity(entity: Entity): void
    {
        let index = this._entities.indexOf(entity);
        if(index > -1)
        {
            this._entities.splice(index, 1);
            this._gameMap.remove(entity);
            if(entity.physicsBody)
                this.physicsWorld.removeBody(entity.physicsBody);
        }
    }

    public get name() { return this._levelName; }
    public get gameMap() { return this._gameMap; }
    public set gameMap(newMap: GameMap) { this._gameMap = newMap; }
    public get camera() { return this._camera; }
    public set camera(camera: Camera) { this._camera = camera; }
    public get physicsWorld() { return this._physicsWorld; }
}