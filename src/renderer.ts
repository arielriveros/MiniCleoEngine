import * as THREE from "three";


import { Loader } from "./loader";
import {vec2, vec3, vec4} from "gl-matrix";

export class Renderer
{
    private _scene: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;
    private _pointLight!: THREE.PointLight;
    private _spotLight!: THREE.SpotLight;
    private _directionalLight!: THREE.DirectionalLight;
    private _loader: Loader;

    constructor(engineElement: string)
    {
        this._scene = new THREE.Scene();

        this._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.001, 1000 );
        this._camera.position.set(5, 1.5, 0);
        this._camera.rotation.set(0, 3.14/2, 0);

        this._renderer = new THREE.WebGLRenderer({ antialias: true });
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = THREE.PCFShadowMap; 
        this._renderer.shadowMap.autoUpdate = true;
        //this._renderer.outputEncoding = THREE.sRGBEncoding;
        this._renderer.toneMapping = THREE.ReinhardToneMapping;
        //this._renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this._renderer.toneMappingExposure = 2.4;
        this._renderer.physicallyCorrectLights = true;
        document.getElementById(engineElement)?.appendChild( this._renderer.domElement );

        this._loader = new Loader(this._scene);
    }

    public initialize(): void
    {
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshStandardMaterial( {
            color: 0x00ff00,
            roughness: 0.7,
            metalness: 1 } );
        const cube = new THREE.Mesh( geometry, material );
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.name = "cube";
        cube.position.set(0, 2, -1);

        // this._loader.loadFBX('assets/models/well_FBX.fbx');
        this._loader.loadGLTF('assets/models/sponza.glb');
        this._loader.loadGLTF('assets/models/zombie.glb');
        
        this._scene.add( cube );
        this._scene.add( new THREE.AxesHelper( 5 ));
        // add lights
        this._pointLight = new THREE.PointLight( 0xff0000, 15, 2);
        this._pointLight.position.set( 0, 0.5, 0 );
        this._scene.add( this._pointLight );

        const ambientLight = new THREE.AmbientLight( 0xffffff, 0.005 );
        //this._scene.add( ambientLight );

        const hemisphericLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.5 );
        this._scene.add( hemisphericLight );

        this._spotLight = new THREE.SpotLight( 0xffffff, 1 );
        this._spotLight.position.set( 0, 3, 0 );
        this._spotLight.castShadow = true;
        this._spotLight.shadow.mapSize.width = 2048;
        this._spotLight.shadow.mapSize.height = 2048;
        this._scene.add( this._spotLight );

        this._directionalLight = new THREE.DirectionalLight( 0xffffff, 2);
        this._directionalLight.position.set( 0, 1, 1 );
        this._directionalLight.castShadow = true;

        this._scene.add( this._directionalLight );

        const skyBox = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), new THREE.MeshBasicMaterial( { color: 0x89CFF0} ) );
        skyBox.material.side = THREE.BackSide;
        skyBox.position.set(0, 0, 0);
        skyBox.receiveShadow = false;
        this._scene.add( skyBox );


    }

    public update(): void
    {
        this._renderer.render( this._scene, this._camera );

        window.addEventListener( 'keydown', ( event ) => {
            if(event.key == "w")
                this._camera.translateZ(-0.001);
            else if(event.key == "s")
                this._camera.translateZ(0.001);
            else if(event.key == "a")
                this._camera.position.x -= 0.001;
            else if(event.key == "d")
                this._camera.position.x += 0.0001;
            else if(event.key == "q")
                this._camera.rotation.y += 0.0001;
            else if(event.key == "e")
                this._camera.rotation.y -= 0.0001;
        }, false);

        const cube = this._scene.getObjectByName("cube");
        if(cube)
        {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        }

        if(this._spotLight)
        {
            this._spotLight.position.x = Math.sin(Date.now() / 1000) * 2;
            this._spotLight.position.z = Math.cos(Date.now() / 1000) * 2;
        }

        if(this._pointLight)
        {
            this._pointLight.position.x = Math.sin(Date.now() / 1000) * 10;
        }
    }

    public resize(): void
    {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
    }
}