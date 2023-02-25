import { Engine, Level, GameMap, Entity, THREE } from 'minicleo';

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
        Engine.getInputController().keyboard.whileKeyDownCallback = (event) => {
            
            const rate = 0.05;
            if(event.keys[87])
                this.translateZ(rate);
            if(event.keys[83])
                this.translateZ(-rate);
            if(event.keys[69])
                this.translateX(-rate);
            if(event.keys[81])
                this.translateX(rate);
            if(event.keys[65])
                this.rotateY(rate);
            if(event.keys[68])
                this.rotateY(-rate);
        }

        const pointLight = new THREE.PointLight(0xffffff, 8.5, 60);
        pointLight.position.set(0, 1, 0.25);

        this.add(pointLight);
    }

    public override update(): void
    {
        super.update();
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
        camera.position.y = 1.65;
        camera.position.z = -1.25;
        camera.rotateY(Math.PI);
        
        const cube: THREE.Mesh = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshPhysicalMaterial({color: 0x00ff00, roughness: 0.1, metalness: 0.2})
            );
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.position.y = 1.5;
        cube.name = "Cube";
        gameMap.add(cube);

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

        const hemiLight = new THREE.HemisphereLight(0xf9f9f9, 0x444444);
        hemiLight.position.set(0, 100, 0);
        hemiLight.intensity = 0.5;
        gameMap.add(hemiLight);


        const player = new Player();
        player.position.x = -0.75;
        player.position.z = 2;
        gameMap.add(player);
        

        const sponza = new Entity('assets/models/Sponza.glb');
        sponza.castShadow = true;
        sponza.receiveShadow = true;
        sponza.rotateY(Math.PI/2);
        gameMap.add(sponza);

        this.gameMap = gameMap;
        this.camera = camera;

        gameMap.add(camera);

        const pointLightWhite = new THREE.PointLight(0xffffff, 10, 15);
        pointLightWhite.name = "PointLightW";
        pointLightWhite.position.set(0, 0.75, 0);
        gameMap.add(pointLightWhite);
        
        const pointLightRed = new THREE.PointLight(0xff0000, 10, 10);
        pointLightRed.name = "PointLightR";
        pointLightRed.position.set(0, 0.5, 0);
        gameMap.add(pointLightRed);

        const damagedHelmet = new Entity('assets/models/DamagedHelmet.glb');
        damagedHelmet.castShadow = true;

        damagedHelmet.name = "DamagedHelmet";
        damagedHelmet.position.x = 3.5;
        damagedHelmet.position.y = 1;
        damagedHelmet.position.z = 2.5;

        damagedHelmet.scale.x = 0.5;
        damagedHelmet.scale.y = 0.5;
        damagedHelmet.scale.z = 0.5;
        gameMap.add(damagedHelmet);
        
        player.add(camera);
    }

    public override initialize(): void {
        super.initialize();
    }

    public override update(): void {
        super.update();
         
        
        this.gameMap.getObjectByName('Cube')?.rotateY(0.01);
        //this.scene.getObjectByName('Sphere')?.rotateOnAxis(new THREE.Vector3(1, 1, 1), 0.01);

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

        const ent2 = this.gameMap.getObjectByName('DamagedHelmet') as Entity;
        ent2.rotateY(0.01);
    }
}

export { Player, GameLevel1}