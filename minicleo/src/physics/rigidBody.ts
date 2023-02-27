import { Body } from 'cannon-es';
import { SHAPES } from './shapes';

export class RigidBody extends Body
{
    constructor(
        mass = 0, 
        shape: SHAPES.Shape = new SHAPES.Box({x: 1, y:1, z:1}), 
        fixedRotation = false)
    {
        super({ mass: mass, shape: shape, fixedRotation: fixedRotation });
    }
}