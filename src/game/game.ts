
import { InputManager, Level, Loader, THREE } from 'core';
import { Entity } from '../engine/framework/entity';
import { MeshComponent } from '../engine/framework/meshComponent';
import { Sun } from './sun';
import { Cube } from './cube';
import { MovingLight } from './movingPointLight';
import { Player } from './player';
import { PhysicsManager } from 'src/engine/physics/physicsManager';

export class Game 
{
    private _level: Level;
    private _camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    private _spotLight!: THREE.SpotLight;
    private _input!: InputManager;

    constructor()
    {
        this._level = new Level();
        this._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.001, 1000 );
        this._camera.position.set(0, 1, 0);
    }

    public setInput(input: InputManager) { this._input = input; }
    public setLevelPhysics(physics: PhysicsManager) { this._level.physics = physics; }

    public async initialize(): Promise<void>
    {
        const cube = new Cube()
        this._level.addEntity(cube);

        const sponza = new Entity({name: "sponza", position: [0, 0, 0], scale: [1, 1, 1]});
        sponza.addComponent(new MeshComponent(await Loader.loadGLTF('assets/models/sponza.glb')));
        this._level.addEntity(sponza);

        const helmet = new Entity({name: "helmet", position: [-1, 2, 0], scale: [0.5, 0.5, 0.5]});
        helmet.addComponent(new MeshComponent(await Loader.loadGLTF('assets/models/DamagedHelmet.glb')));
        this._level.addEntity(helmet);

        const player = new Player({position: [0, 10, 0]},this._input, this._camera, await Loader.loadGLTF('assets/models/zombie.glb'));
        this._level.addEntity(player);

        // add lights
        const pointLight1 = new MovingLight(0xff0000, [0, 0.5, 0]);
        //const pointLight2 = new MovingLight(0x00ff00, [0, 0.5, 0]);
        //const pointLight3 = new MovingLight(0x0000ff, [0, 0.5, 0]);
        const sun = new Sun();

        this._level.addEntities([sun, pointLight1,/*  pointLight2, pointLight3 */])

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

        const skyBox = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), new THREE.MeshBasicMaterial( { color: 0x89CFF0} ) );
        this._level.scene.add( skyBox );
        
        //const directionalHelper = new THREE.DirectionalLightHelper( this._directionalLight.light, 1 );
        //const shadowFrustrumHelper = new THREE.CameraHelper( this._directionalLight.light.shadow.camera );
        
        //this._level.scene.add( directionalHelper );
        //this._level.scene.add( shadowFrustrumHelper );
        //this._level.scene.add( new THREE.AxesHelper( 5 ));
    }

    public update(deltaTime: number): void
    {
        this.inputListener();
        this._level.update(deltaTime);

        const helmet = this._level.getEntityByName("helmet");
        if(helmet)
            helmet.rotation[1] += 0.01;

        if(this._spotLight)
        {
            this._spotLight.position.x = Math.sin(Date.now() / 1000) * 2;
            this._spotLight.position.z = Math.cos(Date.now() / 1000) * 2;
        }
        
    }
    
    public inputListener(): void
    {
        this._input.OnKeyPress('KeyR', () => {
            this._level.destroyEntityByName("zombie");
        });

        this._input.OnKeyPress('KeyT', () => {
            this._level.destroyEntityByName("helmet");
        });

        this._input.OnKeyPress('KeyY', () => {
            this._level.destroyEntityByName("MovingLight");
        });

        this._input.OnKeyPress('KeyU', () => {
            this._level.destroyEntityByName("sponza");
        });
        
    }

    public get scene(): THREE.Scene { return this._level.scene; }

    public get camera(): THREE.PerspectiveCamera | THREE.OrthographicCamera { return this._camera; }
}