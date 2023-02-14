import { Shape } from '../physics/shape';
import { Component } from "./component";
import { RigidBody } from '../physics/rigidBody';
import { quat } from 'gl-matrix';

export class RigidBodyComponent extends Component
{
    private _rigidBody: RigidBody

    constructor(shape: Shape, mass = 0)
    {
        super();
        //const q = quat.fromEuler(quat.create(), this.parent.rotation[0], this.parent.rotation[1], this.parent.rotation[2]);
        //this._rigidBody = new RigidBody(this.parent.position, q, shape, mass);
        this._rigidBody = new RigidBody([0, 5, 0], quat.create(), shape, mass);
    }

    public override initialize()
    {
        this._rigidBody.initialize();
        this._rigidBody.body.setActivationState(4);
    }

    public get body(): RigidBody { return this._rigidBody; }

    public get motionState(): any { return this._rigidBody.body.getMotionState(); }

}