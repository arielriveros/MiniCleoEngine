import * as CANNON from 'cannon-es';
import { vec3 } from '../common/interfaces';

export namespace SHAPES
{
    export type Shape = Sphere | Box | Cylinder | Plane | Trimesh;

    export class Sphere extends CANNON.Sphere
    {
        constructor(radius: number) { super(radius); }
    }
    
    export class Box extends CANNON.Box
    {
        constructor(size: vec3)
        {
            super(new CANNON.Vec3(size.x, size.y, size.z));
        }
    }
    
    export class Cylinder extends CANNON.Cylinder
    {
        constructor(radiusTop: number, radiusBottom: number, height: number, numSegments: number)
        {
            super(radiusTop, radiusBottom, height, numSegments);
        }
    }
    
    export class Plane extends CANNON.Plane
    {
        constructor() { super(); }
    }
    
    export class Trimesh extends CANNON.Trimesh
    {
        constructor(vertices: number[], indices: number[])
        {
            super(vertices, indices);
        }
    }
}
