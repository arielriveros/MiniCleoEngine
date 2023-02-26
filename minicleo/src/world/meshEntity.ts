import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Entity } from "./entity";
import { Group, Mesh, Object3D } from "three";

interface MeshEntityParameters
{
    name?: string;
    position?: { x: number, y: number, z: number };
    rotation?: { x: number, y: number, z: number };
    scale?: { x: number, y: number, z: number };
    modelPath?: string;
    mass?: number;
    shape?: 'sphere' | 'box' | 'cylinder';
}


export class MeshEntity extends Entity
{
    constructor(parameters: MeshEntityParameters)
    {
        super(
            parameters.name || "MeshEntity",
            parameters.position || { x: 0, y: 0, z: 0 },
            parameters.rotation || { x: 0, y: 0, z: 0 },
            parameters.scale || { x: 1, y: 1, z: 1 },
            parameters.mass || 0,
            parameters.shape || 'box'
        );
        if (parameters.modelPath)
            this.loadMesh(parameters.modelPath);
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
        this.add(mesh);
    }

    public initialize() { super.initialize(); }

    public update() { super.update(); }

    public destroy() { super.destroy(); }

    public get mesh() { return this.children[0]; }
}