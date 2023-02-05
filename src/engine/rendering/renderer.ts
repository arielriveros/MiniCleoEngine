import * as THREE from "three";

export class Renderer
{
    private _scene: THREE.Scene;
    private _camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    private _renderer: THREE.WebGLRenderer;
    

    constructor(engineElement: string, scene: THREE.Scene, camera: THREE.PerspectiveCamera | THREE.OrthographicCamera)
    {
        this._scene = scene;
        this._camera = camera;

        this._renderer = new THREE.WebGLRenderer({ antialias: true });
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = THREE.PCFShadowMap; 
        this._renderer.shadowMap.autoUpdate = true;
        //this._renderer.outputEncoding = THREE.sRGBEncoding;
        this._renderer.toneMapping = THREE.ReinhardToneMapping;
        //this._renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this._renderer.toneMappingExposure = 2.8;
        this._renderer.physicallyCorrectLights = true;
        document.getElementById(engineElement)?.appendChild( this._renderer.domElement );

    }

    public initialize(): void
    {

    }

    public update(): void
    {
        this._renderer.render( this._scene, this._camera );
    }

    public resize(): void
    {
        if(this._camera instanceof THREE.PerspectiveCamera)
            this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
    }
}