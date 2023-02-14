import Ammo from '../../third-party/ammo';

const GRAVITY_CONSTANT: number = -9.8;

export let AMMO: any | undefined;

export class PhysicsManager
{
    private _ammo: any | undefined;

    private _world!: any;
    private _bodies: any[] = [];

    private _btTransform: any;

    constructor() {}

    public async initialize(): Promise<void>
    {
        this._ammo = await Ammo();
        AMMO = this._ammo;

        const collisionConfiguration = new this._ammo.btDefaultCollisionConfiguration();
        const dispatcher = new this._ammo.btCollisionDispatcher(collisionConfiguration);
        const overlappingPairCache = new this._ammo.btDbvtBroadphase();
        const solver = new this._ammo.btSequentialImpulseConstraintSolver();
        const softBodySolver = new this._ammo.btDefaultSoftBodySolver();
        

        this._world = new this._ammo.btSoftRigidDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration, softBodySolver);
        this._world.setGravity(new this._ammo.btVector3(0, GRAVITY_CONSTANT, 0));

        // Utility transform
        this._btTransform = new this._ammo.btTransform();
    }

    public update(deltaTime: number): void
    {
        //this._world.stepSimulation(deltaTime, 10);
    }

    public addBody(body: any): void
    {
        this._bodies.push(body);
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