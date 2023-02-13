import { InputManager } from "core";
import { Character } from "../engine/framework/character";
import { CameraComponent } from "../engine/framework/cameraComponent";
import { vec3 } from "gl-matrix";

export class Player extends Character
{
    private _input: InputManager;
    private _camera: CameraComponent;

    constructor(input: InputManager, camera: THREE.Camera, mesh: THREE.Mesh | THREE.Group)
    {
        super({name: "Player"}, mesh);
        this._input = input;
        this._camera = this.addComponent(new CameraComponent(camera, vec3.fromValues(this.position[0], 2, this.position[2] - 2), vec3.fromValues(0, 3.14, 0))) as CameraComponent;
    }

    private handleInput(): void
    {
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

        if(this._input.isMouseMoving())
        {
            let bothPressed: boolean = this._input.isMouseButtonPressed('Left') && this._input.isMouseButtonPressed('Right')
            if(bothPressed)
            {
                let scale = 0.005;
                this._camera.moveRight(this._input.getMouseSpeed()[0] * scale );
                this._camera.moveUp(-this._input.getMouseSpeed()[1] * scale );
            }
            else
            {

                if(this._input.isMouseButtonPressed('Left'))
                {
                    let scale = 0.01;
                    this._camera.moveRight(this._input.getMouseSpeed()[0] * scale);
                    this._camera.moveForward(this._input.getMouseSpeed()[1] * scale);
                }
            
                if(this._input.isMouseButtonPressed('Right'))
                {
                    let scale = 0.025;
                    
                    //this._camera.rotateX(-input.getMouseSpeed()[1] * scale);
                    this._camera.rotateY(-this._input.getMouseSpeed()[0] * scale);

                }
            }
        }
    }

    public override update(): void
    {
        super.update();
        this.handleInput();
        const focus = vec3.fromValues(this.position[0], 2, this.position[2]);
        this._camera.lookAt(focus);
    }
}