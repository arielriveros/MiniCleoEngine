import { Engine, Level, Entity, THREE } from 'minicleo';
import { GameMap } from 'minicleo/build/world/map';

class Player extends Entity
{
    constructor()
    {
        super('assets/models/Zombie.glb');
        this.name = "Player";
    }

    public override initialize(): void
    {
        super.initialize();
    }

    public override update(): void
    {
        window.addEventListener('keydown', (event) => {
            if(event.key == 'w')
                this.translateZ(0.001);
            if(event.key == 's')
                this.translateZ(-0.001);
            if(event.key == 'q')
                this.translateX(-0.001);
            if(event.key == 'e')
                this.translateX(0.001);
            if(event.key == 'a')
                this.rotateY(0.001);
            if(event.key == 'd')
                this.rotateY(-0.001);
        });
    }
}

class GameLevel1 extends Level
{
    constructor()
    {
        super('GameLevel1');
        const gameMap = new GameMap();
        
        
        gameMap.background = new THREE.Color(0.25, 0.25, 0.8);

        const height = window.innerHeight;
        const width = window.innerWidth;
        const ratio = width / height;

        const camera = new THREE.PerspectiveCamera(75, ratio, 0.0001, 1000);
        camera.position.z = 5;
        camera.position.y = 2;
        const cube: THREE.Mesh = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshPhysicalMaterial({color: 0x00ff00, roughness: 0.1, metalness: 0.2})
            );
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.position.y = 1.5;
        cube.name = "Cube";
        gameMap.add(cube);

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshPhysicalMaterial({color: 0x00ff00, roughness: 0.1, metalness: 0.2})
        );
        plane.receiveShadow = true;
        plane.rotateX(-Math.PI/2);
        plane.position.y = 0.1;
        plane.name = "Plane";
        //scene.add(plane);

        const sphere: THREE.Mesh = new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 32),
            new THREE.MeshPhysicalMaterial({color: 0x0000ff, roughness: 0.5, metalness: 0.5})
        );
        sphere.name = "Sphere";

        sphere.position.x = 2;
        gameMap.add(sphere);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 20);
        directionalLight.name = "DirectionalLight";
        directionalLight.position.set(1, 20, 0);
        directionalLight.castShadow = true;
        directionalLight.shadow.bias = -0.001
        directionalLight.shadow.mapSize.width = 4096;
        directionalLight.shadow.mapSize.height = 4096;
        const d = 15;
        directionalLight.shadow.camera.top = d;
        directionalLight.shadow.camera.bottom = -d;
        directionalLight.shadow.camera.left = -d;
        directionalLight.shadow.camera.right = d;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 100;
        gameMap.add(directionalLight);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
        hemiLight.position.set(0, 100, 0);
        gameMap.add(hemiLight);


        const player = new Player();
        player.initialize();
        player.position.x = -0.75;
        player.position.z = 2;
        gameMap.add(player);

        const sponza = new Entity('assets/models/Sponza.glb');
        sponza.initialize();
        sponza.castShadow = true;
        sponza.receiveShadow = true;
        sponza.rotateY(Math.PI/2);
        gameMap.add(sponza);

        this.gameMap = gameMap;
        this.camera = camera;

        gameMap.add(camera);

        const pointLightWhite = new THREE.PointLight(0xffffff, 10, 100);
        pointLightWhite.name = "PointLightW";
        pointLightWhite.position.set(0, 0.5, 0);
        gameMap.add(pointLightWhite);
        
        const pointLightRed = new THREE.PointLight(0xff0000, 10, 100);
        pointLightRed.name = "PointLightR";
        pointLightRed.position.set(0, 0.5, 0);
        gameMap.add(pointLightRed);
        

        this.input.mouse.mouseMoveCallback = (event) => {
            if(event.mouseButtons[0] && event.mouseButtons[2])
            {
                this.camera.translateY(-event.deltaY * 0.025);
                this.camera.translateX(event.deltaX * 0.01);
            }

            else if(event.mouseButtons[0])
            {
                this.camera.translateZ(event.deltaY * 0.01);
                this.camera.translateX(event.deltaX * 0.01);
            }

            else if(event.mouseButtons[2])
            {
                this.camera.rotateY(-event.deltaX * 0.01);
            }
        };
    }

    public override update(): void {
        super.update();
        this.gameMap.getObjectByName('Cube')?.rotateY(0.01);
        //this.scene.getObjectByName('Sphere')?.rotateOnAxis(new THREE.Vector3(1, 1, 1), 0.01);

        const ent1 = this.gameMap.getObjectByName('Player') as Entity;
        ent1.update();

        const directionalLight = this.gameMap.getObjectByName('DirectionalLight') as THREE.DirectionalLight;
        directionalLight.position.x = Math.sin(Date.now() / 1000) * 5;
        directionalLight.position.z = Math.cos(Date.now() / 1000) * 10;

        const pointLight = this.gameMap.getObjectByName('PointLightW') as THREE.PointLight;
        pointLight.position.x = Math.sin(Date.now() / 1000) * 5;
        pointLight.position.z = Math.cos(Date.now() / 1000) * 10;

        const pointLight2 = this.gameMap.getObjectByName('PointLightR') as THREE.PointLight;
        pointLight2.position.x = Math.sin(Date.now() / 1000) * -5;
        pointLight2.position.y = Math.cos(Date.now() / 1000) + 0.5;
        pointLight2.position.z = Math.cos(Date.now() / 1000) * -10;

    }
}

const level1 = new GameLevel1();

let engine = new Engine({context: 'game-context', fullscreen: true});
engine.addLevel(level1);
engine.setActiveLevel('GameLevel1');
engine.start();