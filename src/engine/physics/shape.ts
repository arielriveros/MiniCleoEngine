import { AMMO } from "./physicsManager";

type ShapeType = 'box' | 'sphere' | 'cylinder' | 'capsule';
interface BaseOptions
{
    margin?: number;
}

interface BoxOptions extends BaseOptions
{
    width?: number;  // x
    height?: number; // y
    depth?: number;  // z
    margin?: number;
}

interface SphereOptions extends BaseOptions
{
    radius: number;
}

interface CylinderOptions extends BaseOptions
{
    radius: number;
    height: number;
}

interface CapsuleOptions extends BaseOptions
{
    radius: number;
    height: number;
}

type ShapeOptions = BoxOptions | SphereOptions | CylinderOptions | CapsuleOptions;
export class Shape
{
    private _type: ShapeType;
    
    private _shape: any;
    
    constructor(type: ShapeType, options: ShapeOptions = {})
    {
        this._type = type;
        switch (this._type) {
            case 'box':
                const height = (options as BoxOptions).height || 1;
                const width  = (options as BoxOptions).width  || 1;
                const depth  = (options as BoxOptions).depth  || 1;
                this._shape = new AMMO.btBoxShape(new AMMO.btVector3(width || 1, height || 1, depth || 1));
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
        this._shape.setMargin(options.margin || 0.04);
    }

    /**
     * Returns a shape usable by Ammo.js
     */
    public get physicalShape(): any { return this._shape; }
}

export { BoxOptions, SphereOptions, CylinderOptions, CapsuleOptions, ShapeOptions, ShapeType };