import { InputManager } from "core";
import { Character } from "../engine/framework/character";
import { CameraComponent } from "../engine/framework/cameraComponent";
import { vec3 } from "gl-matrix";

export class Player extends Character
{
    private _input: InputManager;

    constructor(input: InputManager, camera: THREE.Camera, mesh: THREE.Mesh | THREE.Group)
    {
        super({name: "Player"}, mesh);
        this._input = input;
        this.addComponent(new CameraComponent(camera, vec3.fromValues(this.position[0], 2, this.position[2] - 2), vec3.fromValues(0, 3.14, 0)));
    }

    public override update(): void
    {
        super.update();
        if(this._input.isKeyDown('KeyW'))
        {
            this.moveForward(0.05);
        }

        if(this._input.isKeyDown('KeyS'))
        {
            this.moveForward(-0.05);
        }

        if(this._input.isKeyDown('KeyA'))
        {
            this.moveRight(-0.05);
        }

        if(this._input.isKeyDown('KeyD'))
        {
            this.moveRight(0.05);
        }

        if(this._input.isKeyDown('KeyQ'))
        {
            this.rotateY(0.05);
        }

        if(this._input.isKeyDown('KeyE'))
        {
            this.rotateY(-0.05);
        }
    }
}