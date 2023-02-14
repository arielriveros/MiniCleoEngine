import Ammo from '../../third-party/ammo';

export class PhysicsManager
{
    private _ammo: any | undefined;
    private _world!: any;
    private _bodies: any[] = [];

    constructor() {}

    public async initialize(): Promise<void>
    {
        this._ammo = await Ammo();
        console.log(this._ammo);
        /* Ammo().then((ammo: any) =>
        {
            if(!this._ammo)
                this._ammo = ammo;
            
            console.log(this._ammo);

        }) */
        //this._world.setGravity(new this._ammo.btVector3(0, -10, 0));
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

    public get world(): any
    {
        return this._world;
    }
}