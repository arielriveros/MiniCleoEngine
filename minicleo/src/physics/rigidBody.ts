import { Body } from 'cannon-es';
import { SHAPES } from './shapes';
import { vec3 } from '../common/interfaces';

interface RigidBodyParameters
{
    mass?: number;
    shape?: SHAPES.Shape;
    offset?: vec3;
    fixedRotation?: boolean;
}

export class RigidBody extends Body
{
    private _name!: string;

    constructor( parameters: RigidBodyParameters)
    {
        const mass = parameters.mass || 0;
        const shape = parameters.shape || new SHAPES.Box({x: 1, y: 1, z: 1});
        const offset = parameters.offset || { x: 0, y: 0, z: 0 };
        const fixedRotation = parameters.fixedRotation || false;
        super({ mass: mass, shape: shape, fixedRotation: fixedRotation });
        this.shapeOffsets[0].set(offset.x, offset.y, offset.z);
    }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

}