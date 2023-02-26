import { Object3D } from "three";
import * as CANNON from 'cannon-es';

interface vec3 { x: number, y: number, z: number };

export abstract class Entity extends Object3D
{
    private _physicsBody: CANNON.Body | null;
    
    constructor(
        name: string,
        position: vec3,
        rotation: vec3,
        scale: vec3,
        mass: number = 0,
        shape: 'sphere' | 'box' | 'cylinder' = 'box'
        )
    {
        // Object3D Parameter settings
        super();
        this.name = name;
        this.position.set(position.x, position.y, position.z);
        this.rotation.set(rotation.x, rotation.y, rotation.z);
        this.scale.set(scale.x, scale.y, scale.z);

        // Physics Body settings

        // If the body has mass it is dynamic, otherwise it is static and does not have a physics body
        if (mass > 0)
        {
            let physicsShape: CANNON.Shape;

            // TODO: Change hardcoded shapes to be passed in as parameters
            switch (shape)
            {
                case 'sphere':
                    physicsShape = new CANNON.Sphere(1);
                    break;
                case 'box':
                    physicsShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
                    break;
                case 'cylinder':
                    physicsShape = new CANNON.Cylinder(1, 1, 1, 32);
                    break;
            }
            
            this._physicsBody = new CANNON.Body({
                mass: mass,
                shape: physicsShape
            });
            // Set the physics body's position and rotation to match the entity's in initialization
            this._physicsBody.position.set(position.x, position.y, position.z);
            this._physicsBody.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z);
        }
        else
            this._physicsBody = null;
    }

    public initialize() {}

    public update() {
        if (this._physicsBody)
        {
            this.position.copy(this._physicsBody.position as any);
            this.quaternion.copy(this._physicsBody.quaternion as any);
        }
    }

    public destroy()
    {
        this.parent?.remove(this);
    }

    public get physicsBody() { return this._physicsBody; }
}