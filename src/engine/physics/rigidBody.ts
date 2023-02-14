import { quat, vec3 } from 'gl-matrix';
import { AMMO } from './physicsManager';
import { Shape } from './shape';

export class RigidBody
{
    private _mass: number;
    private _physShape: any; // Ammo Shape
    private _body!: any; // Ammo RigidBody
    private _pos: vec3;
    private _rot: quat;

    constructor(pos:vec3, rot: quat, shape: Shape, mass = 0)
    {
        this._pos = pos;
        this._rot = rot;
        this._physShape = shape.physicalShape;
        this._mass = mass;        
    }

    public initialize()
    {
        const transform = new AMMO.btTransform();
        transform.setIdentity();
        transform.setOrigin(new AMMO.btVector3(this._pos[0], this._pos[1] + 5, this._pos[2]));
        transform.setRotation(new AMMO.btQuaternion(this._rot[0], this._rot[1], this._rot[2], this._rot[3]));
        
        const motionState = new AMMO.btDefaultMotionState(transform);
        const localInertia = new AMMO.btVector3(0, 0, 0);
        this._physShape.calculateLocalInertia(this._mass, localInertia);

        const rbInfo = new AMMO.btRigidBodyConstructionInfo(this._mass, motionState, this._physShape, localInertia);
        this._body = new AMMO.btRigidBody(rbInfo);
    }

    public get body(): any { return this._body; }

}