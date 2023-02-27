import { Object3D, Vector3 } from "three";
import * as CANNON from 'cannon-es';

interface vec3 { x: number, y: number, z: number };

export interface EntityParameters
{
    name?: string;
    position?: vec3;
    rotation?: vec3;
    scale?: vec3;
    mass?: number;
    shape?: 'sphere' | 'box' | 'cylinder';
    fixedRotation?: boolean;
}

export abstract class Entity extends Object3D
{
    private _rootMesh: Object3D;
    private _physicsBody: CANNON.Body | null;
    
    constructor(parameters: EntityParameters)    {
        // Object3D Parameter settings
        super();
        this._rootMesh = new Object3D();
        this.name = parameters.name || 'Entity';
        this.position.set(parameters.position?.x || 0, parameters.position?.y || 0, parameters.position?.z || 0);
        this.rotation.set(parameters.rotation?.x || 0, parameters.rotation?.y || 0, parameters.rotation?.z || 0);
        this.scale.set(parameters.scale?.x || 1, parameters.scale?.y || 1, parameters.scale?.z || 1);

        // Physics Body settings

        // If the body has mass it is dynamic, otherwise it is static and does not have a physics body
        if (parameters.mass && parameters.mass > 0)
        {
            let physicsShape: CANNON.Shape;

            // TODO: Change hardcoded shapes to be passed in as parameters
            switch (parameters.shape)
            {
                case 'sphere':
                    physicsShape = new CANNON.Sphere(1);
                    break;
                case 'box':
                    physicsShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
                    break;
                case 'cylinder':
                    physicsShape = new CANNON.Cylinder(0.35, 0.35, 1.75, 8);
                    break;
                default:
                    physicsShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
                    break;
            }
            
            this._physicsBody = new CANNON.Body({
                mass: parameters.mass,
                shape: physicsShape, 
                fixedRotation: parameters.fixedRotation || false
            });

            // Set the physics body's position and rotation to match the entity's in initialization
            const position = parameters.position || { x: 0, y: 0, z: 0 };
            const rotation = parameters.rotation || { x: 0, y: 0, z: 0 };

            this._physicsBody.position.set(position.x, position.y, position.z);
            this._physicsBody.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z);
        }
        else
            this._physicsBody = null;

        this.add(this._rootMesh);
    }

    public initialize() {}

    public update() {
        if (this._physicsBody)
        {
            this.position.copy(this._physicsBody.position as any);
            if(!this._physicsBody.fixedRotation)
                this.quaternion.copy(this._physicsBody.quaternion as any);
        }
    }

    public destroy()
    {
        this.parent?.remove(this);
    }

    public moveForward(speed: number)
    {
        // get forward vector
        const forward = new Vector3();
        this.getWorldDirection(forward);

        if (this._physicsBody)
            this._physicsBody.velocity.set(forward.x * speed, forward.y * speed, forward.z * speed);
            //this._physicsBody.applyImpulse(new CANNON.Vec3(forward.x * speed, forward.y * speed, forward.z * speed));
    }

    public moveRight(speed: number)
    {
        // get forward vector
        const forward = new Vector3();
        this.getWorldDirection(forward);

        // get right vector
        const right = new Vector3();
        right.crossVectors(forward, new Vector3(0, 1, 0));

        if (this._physicsBody)
            //this._physicsBody.applyImpulse(new CANNON.Vec3(right.x * speed, right.y * speed, right.z * speed));
            this._physicsBody.velocity.set(right.x * speed, right.y * speed, right.z * speed);
    }

    public moveUp(speed: number)
    {
        // get forward vector
        const forward = new Vector3();
        this.getWorldDirection(forward);

        // get right vector
        const right = new Vector3();
        right.crossVectors(forward, new Vector3(0, 1, 0));

        // get up vector
        const up = new Vector3();
        up.crossVectors(right, forward);

        if (this._physicsBody)
            this._physicsBody.applyImpulse(new CANNON.Vec3(up.x * speed, up.y * speed, up.z * speed));

    }

    public rotateEntityY(angle: number): void
    {
        if(this._physicsBody)
            this._physicsBody.applyTorque(new CANNON.Vec3(0, angle, 0));
        //return super.rotateY(angle);
    }

    public get rootMesh() { return this._rootMesh; }
    public get physicsBody() { return this._physicsBody; }
}