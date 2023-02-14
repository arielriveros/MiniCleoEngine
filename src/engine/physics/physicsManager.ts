import Ammo from '../../third-party/ammo';
import { Entity } from '../framework/entity';
import { RigidBodyComponent } from '../framework/rigidBodyComponent';

const GRAVITY_CONSTANT: number = -9.8;

export let AMMO: any | undefined;

export class PhysicsManager
{
    private _ammo: any | undefined;

    private _world!: any;
    private _bodies: Entity[] = [];

    private _btTransform: any;

    constructor() {}

    public async initialize(): Promise<PhysicsManager>
    {
        this._ammo = await Ammo();

        return new Promise(
            (resolve, reject) =>
            {
                AMMO = this._ammo;

                const collisionConfiguration = new this._ammo.btSoftBodyRigidBodyCollisionConfiguration();
                const dispatcher = new this._ammo.btCollisionDispatcher(collisionConfiguration);
                const overlappingPairCache = new this._ammo.btDbvtBroadphase();
                const solver = new this._ammo.btSequentialImpulseConstraintSolver();
                const softBodySolver = new this._ammo.btDefaultSoftBodySolver();
                

                this._world = new this._ammo.btSoftRigidDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration, softBodySolver);
                this._world.setGravity(new this._ammo.btVector3(0, GRAVITY_CONSTANT, 0));
                this._world.getWorldInfo().set_m_gravity(new this._ammo.btVector3(0, GRAVITY_CONSTANT, 0));


                if(this._ammo)
                    resolve(this);
                else
                    reject("PhysicsManager: Ammo is not loaded");
            }
        )
    }

    public update(deltaTime: number): void
    {
        this._world.stepSimulation(deltaTime, 10);
        this._bodies.forEach((entity: Entity) => {
            const motionState: any = (entity.getComponent('RigidBodyComponent') as RigidBodyComponent)?.motionState;
            if (motionState)
            {
                console.log(motionState)
                const transform = new this._ammo.btTransform();
                motionState.getWorldTransform(transform);
                const position: any = transform.getOrigin();
                const rotation: any = transform.getRotation();
                entity.position[0]  = position.x();
                entity.position[1]  = position.y();
                entity.position[2]  = position.z();
                //body.quaternion.set(rotation.x(), rotation.y(), rotation.z(), rotation.w());
            }
        });
    }

    public addBody(entity: Entity): void
    {
        this._bodies.push(entity);
        const body: any = (entity.getComponent('RigidBody') as RigidBodyComponent)?.body;
        this._world.addRigidBody(body);
    }

    public removeBody(body: any): void
    {
        const index: number = this._bodies.indexOf(body);
        if (index !== -1)
        {
            this._bodies.splice(index, 1);
            this._world.removeRigidBody(body);
        }
    }

    /**
     * Returns the physical world where the physics simulations are running
     */
    public get physicalWorld(): any
    {
        return this._world;
    }
    
    public get btTransform(): any
    {
        return this._btTransform;
    }
}