import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Entity } from "./entity";
import { Mesh } from "three";

export class MeshEntity extends Entity
{
    constructor()
    {
        super();
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
            this.add(gltf.scene);
        });
    }

    public setMesh(mesh: Mesh)
    {
        this.parent?.remove(this);
        this.add(mesh);
    }

    public initialize() { super.initialize(); }

    public update() { super.update(); }

    public destroy() { super.destroy(); }

    public get mesh() { return this.children[0]; }
}