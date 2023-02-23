import { Mesh, Object3D, Material, DoubleSide } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class Entity extends Object3D
{
    private _modelPath: string;

    constructor(modelPath: string)
    {
        super();
        this._modelPath = modelPath;
    }

    public initialize()
    {
        const loader = new GLTFLoader();
        loader.load(this._modelPath, (gltf) =>
        {
            gltf.scene.traverse(
                (child) => {
                    if ((child as THREE.Mesh).isMesh)
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

    public update()
    {
        
    }

    public destroy()
    {
        this.parent?.remove(this);
    }
}