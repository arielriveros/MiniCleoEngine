import { Engine, Level, GameMap, Entity, RigidBody, SHAPES, THREE, MeshEntity } from 'minicleo';

class Player extends MeshEntity
{
    constructor()
    {
        super({
            name: 'Player',
            position: { x: 1, y: 1.75/2, z: 10 },
            rotation: { x: 0, y: Math.PI, z: 0 },
            modelPath: 'assets/models/Zombie.glb',
            rigidBody: new RigidBody({
                mass: 20,
                shape: new SHAPES.Cylinder(0.5, 0.5, 1.75, 16),
                fixedRotation: true}),
            meshPosition: { x: 0, y: -0.88, z: 0 },
        });
    }
    
    public override initialize(): void
    {
        super.initialize();
        Engine.getInputController().keyboard.whileKeyDownCallback = (event) => {
            const movementRate = 50;
            const rotationRate = 0.05;
            if(event.keys[87])
                this.moveForward(movementRate);
            if(event.keys[83])
                this.moveForward(-movementRate);
            if(event.keys[69])
                this.moveRight(movementRate);
            if(event.keys[81])
                this.moveRight(-movementRate);
            if(event.keys[65])
                this.rotateY(rotationRate);
            if(event.keys[68])
                this.rotateY(-rotationRate);
        }

        const pointLight = new THREE.PointLight(0xffffff, 8.5, 60);
        pointLight.position.set(0, 1, 0.25);

        this.add(pointLight);
    }

    public override update(deltaTime: number): void
    {
        super.update(deltaTime);
    }
}

class Cube extends MeshEntity
{
    private _colors: THREE.Color[] = [];
    private _index: number;
    private _cubeMesh: THREE.Mesh;

    constructor(size: number, position: {x: number, y: number, z: number})
    {
        super({
            name: 'Cube',
            position: position,
            scale: { x: size, y: size, z: size },
            rigidBody: new RigidBody({
                mass: 0.5,
                shape: new SHAPES.Box({ x: size/2, y: size/2, z: size/2})
            })
        })

        this._colors = [
            new THREE.Color(0xff0000),
            new THREE.Color(0x00ff00),
            new THREE.Color(0x0000ff),
            new THREE.Color(0xffff00),
            new THREE.Color(0xff00ff),
            new THREE.Color(0x00ffff)
        ];

        this._index = Math.floor(Math.random() * this._colors.length);
        let color = this._colors[this._index];
        this._cubeMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshPhysicalMaterial({color: color,roughness: 0.1, metalness: 0.2})
        )
        this._cubeMesh.castShadow = true;
        this._cubeMesh.receiveShadow = true;
        this.setMesh(this._cubeMesh);

        
    }

    public override initialize(): void
    {
        super.initialize();
        this.physicsBody?.addEventListener('collide', (event: { body: { name: any; }; }) => {
            if(event.body.name === 'Player')
                this.onPlayerCollision();
        });
        setInterval(() => {
            this.destroy();
        }, 3000);
    }

    private onPlayerCollision(): void
    {
        this._index++;
        this._cubeMesh.material = new THREE.MeshPhysicalMaterial({color: this._colors[this._index % this._colors.length ], roughness: 0.1, metalness: 0.2});
    }
}

class GameLevel1 extends Level
{
    constructor()
    {
        super('GameLevel1');
        const gameMap = new GameMap();
        gameMap.background = new THREE.Color(0.25, 0.25, 0.8);

        const camera = new THREE.PerspectiveCamera(
                75, 
                window.innerWidth / window.innerHeight, 
                0.0001, 
                1000
            );
        camera.position.x = -0.5;
        camera.position.y = 1;
        camera.position.z = -2.25;
        camera.rotateY(Math.PI);

        this.gameMap = gameMap;
        this.camera = camera;
        
        this.initLights();

        this.addEntity(new Cube(1, { x: 0, y: 0, z: 0 }));

        const player = new Player();
        player.add(camera);
        this.addEntity(player);
        
        this.addEntity(
            new MeshEntity({
                name: 'Sponza',
                rotation: { x: 0, y: Math.PI/2, z: 0 },
                scale: { x: 2, y: 2, z: 2 },
                modelPath: 'assets/models/Sponza.glb'
            })
        );

        this.addEntity(
            new MeshEntity({
                name: 'DamagedHelmet',
                position: { x: 3.5, y: 1, z: 2.5 },
                scale: { x: 0.5, y: 0.5, z: 0.5 },
                modelPath: 'assets/models/DamagedHelmet.glb',
                rigidBody: new RigidBody({
                    mass: 1,
                    shape: new SHAPES.Sphere(0.5)
                }),
                meshPosition: { x: 0, y: 0, z: 0.35 },
            })
        );

        this.addEntity(
            new MeshEntity({
                name: 'DamagedHelmet',
                position: { x: 0, y: 3, z: 5 },
                scale: { x: 1, y: 1, z: 1 },
                modelPath: 'assets/models/DamagedHelmet.glb',
                rigidBody: new RigidBody({
                    mass: 1,
                    shape: new SHAPES.Sphere(1)
                }),
                meshPosition: { x: 0, y: 0, z: 0.35 },
            })
        );
    }

    public override initialize(): void {
        super.initialize();
        setInterval(() => {
            this.addEntity(new Cube(
                Math.random() + 0.1, {
                x: -Math.random() + 2, 
                y: Math.random() * 15, 
                z: -Math.random() + 2 }
            ));
        }, 100);
    }

    public override update(deltaTime: number): void {
        super.update(deltaTime);
        this.updateLights();
    }

    private initLights()
    {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
        directionalLight.name = "DirectionalLight";
        directionalLight.position.set(1, 20, 0);
        directionalLight.castShadow = true;
        directionalLight.shadow.bias = -0.001
        directionalLight.shadow.mapSize.width = 4096;
        directionalLight.shadow.mapSize.height = 4096;
        const d = 30;
        directionalLight.shadow.camera.top = d;
        directionalLight.shadow.camera.bottom = -d;
        directionalLight.shadow.camera.left = -d;
        directionalLight.shadow.camera.right = d;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 100;
        this.gameMap.add(directionalLight);

        const hemiLight = new THREE.HemisphereLight(0xf9f9f9, 0x444444);
        hemiLight.position.set(0, 100, 0);
        hemiLight.intensity = 0.5;
        this.gameMap.add(hemiLight);
        
        const pointLightWhite = new THREE.PointLight(0xffffff, 10, 15);
        pointLightWhite.name = "PointLightW";
        pointLightWhite.position.set(0, 0.75, 0);
        this.gameMap.add(pointLightWhite);
        
        const pointLightRed = new THREE.PointLight(0xff0000, 10, 10);
        pointLightRed.name = "PointLightR";
        pointLightRed.position.set(0, 0.5, 0);
        this.gameMap.add(pointLightRed);
    }

    private updateLights()
    {
        const directionalLight = this.gameMap.getObjectByName('DirectionalLight') as THREE.DirectionalLight;
        directionalLight.position.x = Math.sin(Date.now() / 1000) * 5;
        directionalLight.position.z = Math.cos(Date.now() / 1000) * 10;

        const pointLight = this.gameMap.getObjectByName('PointLightW') as THREE.PointLight;
        pointLight.position.x = Math.sin(Date.now() / 1000) * 3;
        pointLight.position.z = Math.cos(Date.now() / 1000) * 10;

        const pointLight2 = this.gameMap.getObjectByName('PointLightR') as THREE.PointLight;
        pointLight2.position.x = Math.sin(Date.now() / 1000) * -5;
        pointLight2.position.y = Math.cos(Date.now() / 100) + 0.75;
        pointLight2.position.z = Math.cos(Date.now() / 1000) * -10;
    }
}

export { Player, GameLevel1}