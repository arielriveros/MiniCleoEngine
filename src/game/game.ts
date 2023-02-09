
import { InputManager, Level, Loader, THREE } from 'core';
import { DirectionalLight } from '../engine/framework/DirectionalLight';
import { Entity } from '../engine/framework/entity';
import { MeshComponent } from '../engine/framework/meshComponent';
import { Character } from '../engine/framework/character';
import { Sun } from './sun';
import { Cube } from './cube';

export class Game 
{
    private _level: Level;
    private _camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    private _pointLight!: THREE.PointLight;
    private _spotLight!: THREE.SpotLight;

    constructor()
    {
        this._level = new Level();
        this._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.001, 1000 );
        this._camera.position.set(5, 1.5, 0);
        this._camera.rotation.set(0, 3.14/2, 0);
    }

    public async initialize(): Promise<void>
    {
        const cube = new Cube()
        this._level.addEntity(cube);

        const sponza = new Entity({name: "sponza", position: [0, 0, 0], scale: [1, 1, 1]});
        sponza.addComponent(
            new MeshComponent(
                await Loader.loadGLTF('assets/models/sponza.glb')
            )
        );
        this._level.addEntity(sponza);

        const helmet = new Entity({name: "helmet", position: [-1, 2, 0], scale: [0.5, 0.5, 0.5]});
        helmet.addComponent(
            new MeshComponent(
                await Loader.loadGLTF('assets/models/DamagedHelmet.glb')
            )
        );
        this._level.addEntity(helmet);

        const zombie = new Character({name: "zombie", position: [0, 0, 0], scale: [1, 1, 1]}, await Loader.loadGLTF('assets/models/zombie.glb'));
        this._level.addEntity(zombie);
        
        this._level.scene.add( new THREE.AxesHelper( 5 ));
        // add lights
        this._pointLight = new THREE.PointLight( 0xff0000, 15, 2);
        this._pointLight.position.set( 0, 0.5, 0 );
        this._level.scene.add( this._pointLight );

        const ambientLight = new THREE.AmbientLight( 0xffffff, 0.005 );
        //this._scene.add( ambientLight );

        const hemisphericLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.5 );
        this._level.scene.add( hemisphericLight );

        this._spotLight = new THREE.SpotLight( 0xffffff, 1 );
        this._spotLight.position.set( 0, 3, 0 );
        this._spotLight.castShadow = true;
        this._spotLight.shadow.mapSize.width = 1024;
        this._spotLight.shadow.mapSize.height = 1024;
        this._level.scene.add( this._spotLight );

        
        //const directionalHelper = new THREE.DirectionalLightHelper( this._directionalLight.light, 1 );
        //const shadowFrustrumHelper = new THREE.CameraHelper( this._directionalLight.light.shadow.camera );
        
        //this._level.scene.add( directionalHelper );
        //this._level.scene.add( shadowFrustrumHelper );

        const sun = new Sun();
        this._level.addEntity(sun);

        const skyBox = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), new THREE.MeshBasicMaterial( { color: 0x89CFF0} ) );
        skyBox.material.side = THREE.BackSide;
        skyBox.position.set(0, 0, 0);
        skyBox.receiveShadow = false;
        this._level.scene.add( skyBox );

    }

    public update(): void
    {
        this._level.update();

        const helmet = this._level.getEntityByName("helmet");
        if(helmet)
            helmet.rotation[1] += 0.01;

        if(this._spotLight)
        {
            this._spotLight.position.x = Math.sin(Date.now() / 1000) * 2;
            this._spotLight.position.z = Math.cos(Date.now() / 1000) * 2;
        }

        if(this._pointLight)
            this._pointLight.position.x = Math.sin(Date.now() / 1000) * 10;

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
                    this._camera.rotation.order = 'YZX';
                    //this._camera.rotation.order = 'ZXY';
                    //this._camera.rotation.order = 'ZYX';

                    
                    //this._camera.rotateX(-input.getMouseSpeed()[1] * scale);
                    this._camera.rotateY(-input.getMouseSpeed()[0] * scale);

                }
            }
        }
    }

    public get scene(): THREE.Scene { return this._level.scene; }

    public get camera(): THREE.PerspectiveCamera | THREE.OrthographicCamera { return this._camera; }
}