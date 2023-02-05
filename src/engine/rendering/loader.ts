import { Scene } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class Loader
{
    constructor() {}
    
    public static loadFBX(path: string, scene: THREE.Scene): void
    {
        const fbxLoader = new FBXLoader();
        fbxLoader.load(path, ( object ) => {
            object.traverse ( function ( child ) {
                if ((child as THREE.Mesh).isMesh) {
                    const m = (child as THREE.Mesh)
                    m.receiveShadow = true
                    m.castShadow = true
                    m.frustumCulled = false;
                }
                if (((child as THREE.Light)).isLight) {
                        const l = (child as THREE.Light)
                        l.intensity = 0;

                    }
            });
            object.scale.set(0.001, 0.001, 0.001);  
            scene.add( object );
        } );
    }

    public static loadGLTF(path: string, scene: THREE.Scene): void
    {
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(path, (gltf) => {
                gltf.scene.traverse(function (child) {
                    if ((child as THREE.Mesh).isMesh) {
                        const m = (child as THREE.Mesh)
                        m.receiveShadow = true
                        m.castShadow = true
                        m.frustumCulled = false;
                    }
                    /* if (((child as THREE.Light)).isLight) {
                        const l = (child as THREE.Light)
                        l.castShadow = true
                        l.shadow.bias = -.03
                        l.shadow.mapSize.width = 2048
                        l.shadow.mapSize.height = 2048
                    } */
                })
                scene.add(gltf.scene);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
    }
}