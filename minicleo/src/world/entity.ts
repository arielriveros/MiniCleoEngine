import { Object3D, Vector3 } from "three";
import { Vec3 } from 'cannon-es';
import { RigidBody } from "../physics/rigidBody";
import { vec3 } from "../common/interfaces";

export interface EntityParameters {
    name?: string;
    position?: vec3;
    rotation?: vec3;
    scale?: vec3;
    rigidBody?: RigidBody;
}

export class Entity extends Object3D {
    private _rootMesh: Object3D;
    private _physicsBody: RigidBody | null;
    private _velocity: Vector3 = new Vector3(); // Velocity as class member

    constructor(parameters: EntityParameters) {
        // Object3D Parameter settings
        super();
        this._rootMesh = new Object3D();
        this.name = parameters.name || 'Entity';
        this.position.set(parameters.position?.x || 0, parameters.position?.y || 0, parameters.position?.z || 0);
        this.rotation.set(parameters.rotation?.x || 0, parameters.rotation?.y || 0, parameters.rotation?.z || 0);
        this.scale.set(parameters.scale?.x || 1, parameters.scale?.y || 1, parameters.scale?.z || 1);

        // Physics Body settings
        if (parameters.rigidBody) {
            this._physicsBody = parameters.rigidBody;
            this._physicsBody.name = this.name;
            this._physicsBody.position.set(parameters.position?.x || 0, parameters.position?.y || 0, parameters.position?.z || 0);
            this._physicsBody.quaternion.setFromEuler(parameters.rotation?.x || 0, parameters.rotation?.y || 0, parameters.rotation?.z || 0);

            // Set the physics body's position and rotation to match the entity's in initialization
            const position = parameters.position || { x: 0, y: 0, z: 0 };
            const rotation = parameters.rotation || { x: 0, y: 0, z: 0 };

            this._physicsBody.position.set(position.x, position.y, position.z);
            this._physicsBody.shapeOffsets[0].set(0, 0, 0);
            this._physicsBody.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z);
        } else {
            this._physicsBody = null;
        }

        this.add(this._rootMesh);
    }

    public initialize() {}

    public update(deltaTime: number) {
        if (this._physicsBody) {
            this.position.copy(this._physicsBody.position as any);
            if (!this._physicsBody.fixedRotation) {
                this.quaternion.copy(this._physicsBody.quaternion as any);
            }

            // Set velocity based on physics body's velocity
            this._velocity.copy(this._physicsBody.velocity as any);
        } else {
            // No physics body, reset velocity
            this._velocity.set(0, 0, 0);
        }
    }

    public destroy() {
        this.parent?.remove(this);
    }

    private applyVelocity(dir: Vector3, speed: number) {
        if (this._physicsBody) {
            this._physicsBody.velocity.set(dir.x * speed, dir.y * speed, dir.z * speed);
        } else {
            this.position.add(dir.multiplyScalar(speed)); // Move position directly if no physics body
        }
    }
    public moveForward(speed: number) {
        // get forward vector
        const forward = new Vector3();
        this.getWorldDirection(forward);

        this.applyVelocity(forward, speed);
    }

    public moveRight(speed: number)
    {
        // get forward vector
        const forward = new Vector3();
        this.getWorldDirection(forward);

        // get right vector
        const right = new Vector3();
        right.crossVectors(forward, new Vector3(0, 1, 0));

        this.applyVelocity(right, speed);
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

        this.applyVelocity(up, speed);
    }

    public rotateEntityY(angle: number): void
    {
        if(this._physicsBody)
            this._physicsBody.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), angle);
        else
            this.rotation.y = angle;
    }

    public get rootMesh() { return this._rootMesh; }
    public get physicsBody() { return this._physicsBody; }
}