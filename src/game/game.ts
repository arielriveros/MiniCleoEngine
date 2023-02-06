
import { InputManager, Level, Loader, THREE } from 'core';
import { DirectionalLight } from '../engine/framework/DirectionalLight';

export class Game 
{
    private _level: Level;
    private _camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    private _pointLight!: THREE.PointLight;
    private _spotLight!: THREE.SpotLight;
    private _directionalLight!: DirectionalLight;

    constructor()
    {
        this._level = new Level();
        this._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.001, 1000 );
        this._camera.position.set(5, 1.5, 0);
        this._camera.rotation.set(0, 3.14/2, 0);
    }

    public initialize(): void
    {
        const cube = new THREE.Mesh( 
            new THREE.BoxGeometry( 1, 1, 1 ), 
            new THREE.MeshStandardMaterial( {
                color: 0x00ff00,
                roughness: 0.7,
                metalness: 1 
            } ) 
        );
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.name = "cube";
        cube.position.set(0, 2, -1);

        Loader.loadGLTF('assets/models/sponza.glb', this._level.scene);
        Loader.loadGLTF('assets/models/zombie.glb', this._level.scene);
        
        this._level.scene.add( cube );
        this._level.scene.add( new THREE.AxesHelper( 5 ));
        // add lights
        this._pointLight = new THREE.PointLight( 0xff0000, 15, 2);
        this._pointLight.position.set( 0, 0.5, 0 );
        this._level.scene.add( this._pointLight );

        const ambientLight = new THREE.AmbientLight( 0xffffff, 0.005 );
        //this._scene.add( ambientLight );

        const hemisphericLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
        this._level.scene.add( hemisphericLight );

        this._spotLight = new THREE.SpotLight( 0xffffff, 1 );
        this._spotLight.position.set( 0, 3, 0 );
        this._spotLight.castShadow = true;
        this._spotLight.shadow.mapSize.width = 1024;
        this._spotLight.shadow.mapSize.height = 1024;
        this._level.scene.add( this._spotLight );

        this._directionalLight = new DirectionalLight( 0xffffff, 10);
        this._directionalLight.light.position.set( 0, 5, 0 );
        
        const directionalHelper = new THREE.DirectionalLightHelper( this._directionalLight.light, 1 );
        const shadowFrustrumHelper = new THREE.CameraHelper( this._directionalLight.light.shadow.camera );


        this._level.scene.add( this._directionalLight.light );
        this._level.scene.add( directionalHelper );
        this._level.scene.add( shadowFrustrumHelper );

        const skyBox = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), new THREE.MeshBasicMaterial( { color: 0x89CFF0} ) );
        skyBox.material.side = THREE.BackSide;
        skyBox.position.set(0, 0, 0);
        skyBox.receiveShadow = false;
        this._level.scene.add( skyBox );

    }

    public update(): void
    {
        const cube = this._level.scene.getObjectByName("cube");
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

        if(this._directionalLight)
        {
            this._directionalLight.light.position.x = Math.sin(Date.now() / 10000) * 2;
            this._directionalLight.light.position.z = Math.cos(Date.now() / 10000) * 2;
        }
    }
    
    public inputListener(input: InputManager): void
    {
        if(input.isMouseMoving())
        {
            let bothPressed: boolean = input.isMouseButtonPressed('Left') && input.isMouseButtonPressed('Right')
            if(bothPressed)
            {
                let scale = 0.005;
                this._camera.translateX(input.getMouseSpeed()[0] * scale );
                this._camera.translateY(-input.getMouseSpeed()[1] * scale );
            }
            else
            {

                if(input.isMouseButtonPressed('Left'))
                {
                    let scale = 0.01;
                    this._camera.translateX(input.getMouseSpeed()[0] * scale);
                    this._camera.translateZ(input.getMouseSpeed()[1] * scale);
                }
            
                if(input.isMouseButtonPressed('Right'))
                {
                    let scale = 0.025;
                    //this._camera.rotation.order = 'XYZ';
                    //this._camera.rotation.order = 'XZY';
                    //this._camera.rotation.order = 'YXZ';
                    //this._camera.rotation.order = 'YZX';
                    //this._camera.rotation.order = 'ZXY';
                    //this._camera.rotation.order = 'ZYX';

                    
                    this._camera.rotateY(-input.getMouseSpeed()[0] * scale);
                    //this._camera.rotateX(-input.getMouseSpeed()[1] * scale);

                }
            }
        }
    }

    public get scene(): THREE.Scene { return this._level.scene; }

    public get camera(): THREE.PerspectiveCamera | THREE.OrthographicCamera { return this._camera; }
}