import { Level, GameMap, THREE, CANNON, Engine, MeshEntity } from "minicleo";

class GameLevel2 extends Level
{
    constructor()
    {
        super('GameLevel2');
        const gameMap = new GameMap();
        gameMap.background = new THREE.Color(0.25, 0.25, 0.5);

        const camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight, 0.0001, 1000
        );
        camera.position.set(0, 5, 18);

        this.gameMap = gameMap;
        this.camera = camera;

        const hemisLight = new THREE.HemisphereLight(0xffffff, 0x000000, 25);
        this.gameMap.add(hemisLight);

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 32, 32),
            new THREE.MeshBasicMaterial({ color: 0xf5f5f5, side: THREE.DoubleSide })
        );
        plane.rotateX(Math.PI / 2);
        this.gameMap.add(plane);
    }

    public override initialize(): void
    {
        super.initialize();
        Engine.getInputController().mouse.mouseMoveCallback = (event) => {
            
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

        Engine.getInputController().keyboard.onKeyDownCallback = (key) => {
            if(key === 'Space')
            {
                this.addEntity(
                    new MeshEntity({
                        name: 'DamagedHelmet',
                        position: { x: Math.random()/2, y: 15, z: Math.random()/2 },
                        modelPath: 'assets/models/DamagedHelmet.glb',
                        mass: 1,
                        shape: 'sphere'
                    })
                );
            }
        };
    }

    public override update(): void
    {
        super.update();
    }
}

export { GameLevel2 };