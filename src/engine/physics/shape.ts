import { AMMO } from "./physicsManager";

type ShapeType = 'box' | 'sphere' | 'cylinder' | 'capsule';
interface BoxOptions
{
    width: number;  // x
    height: number; // y
    depth: number;  // z
}

interface SphereOptions
{
    radius: number;
}

interface CylinderOptions
{
    radius: number;
    height: number;
}

interface CapsuleOptions
{
    radius: number;
    height: number;
}

type ShapeOptions = BoxOptions | SphereOptions | CylinderOptions | CapsuleOptions;
export class Shape
{
    private _type: ShapeType;
    private _shape: any;
    
    constructor(type: ShapeType, options: ShapeOptions)
    {
        this._type = type;
        switch (this._type) {
            case 'box':
                let boxOptions: BoxOptions = options as BoxOptions;
                this._shape = new AMMO.btBoxShape(new AMMO.btVector3(boxOptions.width, boxOptions.height, boxOptions.depth));
                break;
            case 'sphere':
                let sphereOptions: SphereOptions = options as SphereOptions;
                this._shape = new AMMO.btSphereShape(sphereOptions.radius);
                break;
            case 'cylinder':
                let cylinderOptions: CylinderOptions = options as CylinderOptions;
                this._shape = new AMMO.btCylinderShape(new AMMO.btVector3(cylinderOptions.radius, cylinderOptions.height, cylinderOptions.radius));
                break;
            case 'capsule':
                let CapsuleOptions: CapsuleOptions = options as CapsuleOptions;
                this._shape = new AMMO.btCapsuleShape(CapsuleOptions.radius, CapsuleOptions.height);
                break;

            default:
                this._shape = new AMMO.btBoxShape(new AMMO.btVector3(1, 1, 1));
                break;
        }
    }

    /**
     * Returns a shape usable by Ammo.js
     */
    public get shape(): any { return this._shape; }
}