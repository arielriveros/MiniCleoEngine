import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Entity, EntityParameters } from "./entity";
import { AnimationAction, AnimationClip, AnimationMixer, Group, Mesh, Object3D } from "three";
import { vec3 } from "../common/interfaces";

interface MeshEntityParameters extends EntityParameters
{
    modelPath?: string;
    meshPosition?: vec3;
    meshRotation?: vec3;
    meshScale?: vec3;
}

export class MeshEntity extends Entity
{
    private _animations: AnimationClip[] = [];
    private _activeAnimation: AnimationClip | null = null;
    private _clipAction: AnimationAction | undefined = undefined;
    private _mixer: AnimationMixer | null = null;

    constructor(parameters: MeshEntityParameters)
    {
        super(parameters);
        if (parameters.modelPath)
            this.loadMesh(parameters.modelPath);
        
        if (parameters.meshPosition)
            this.rootMesh.position.set(parameters.meshPosition.x, parameters.meshPosition.y, parameters.meshPosition.z);

        if (parameters.meshRotation)
            this.rootMesh.rotation.set(parameters.meshRotation.x, parameters.meshRotation.y, parameters.meshRotation.z);

        if (parameters.meshScale)
            this.rootMesh.scale.set(parameters.meshScale.x, parameters.meshScale.y, parameters.meshScale.z);

        this._mixer = new AnimationMixer(this.rootMesh);
    }

    public loadMesh(modelPath: string)
    {
        const loader = new GLTFLoader();
        loader.load(modelPath, (gltf) =>
        {
            console.log(gltf);
            gltf.animations.forEach((animation) => {
                this._animations.push(animation);
            });
            gltf.scene.traverse(
                (child) => {
                    if ((child as Mesh).isMesh)
                    {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.frustumCulled = false;
                    }
                }
            )
            this.setMesh(gltf.scene);
        });
    }

    public setMesh(mesh: Mesh | Object3D | Group)
    {
        this.rootMesh.remove(...this.rootMesh.children);
        this.rootMesh.add(mesh);
    }

    public initialize() {
        super.initialize();
    }

    public update(deltaTime: number) { 
        super.update(deltaTime);
        if (this._animations.length > 0)
        {
            let activeAnimation = this._animations[0];
            this._clipAction = this._mixer?.clipAction(activeAnimation);
            this._clipAction?.play();
            this._mixer?.update(deltaTime);

        }
    }

    public destroy()
    { 
        super.destroy();
        this.rootMesh.remove(...this.rootMesh.children);
        this.physicsBody?.removeShape(this.physicsBody.shapes[0]);

    }

    public get mesh() { return this.rootMesh; }
}