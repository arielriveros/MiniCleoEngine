import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Entity, EntityParameters } from "./entity";
import { Group, Mesh, Object3D } from "three";
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
    }

    public loadMesh(modelPath: string)
    {
        const loader = new GLTFLoader();
        loader.load(modelPath, (gltf) =>
        {
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

    public initialize() { super.initialize(); }

    public update() { super.update(); }

    public destroy() { super.destroy(); }

    public get mesh() { return this.rootMesh; }
}