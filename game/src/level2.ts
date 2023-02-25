import { Level, GameMap, THREE, Engine } from "minicleo";

class GameLevel2 extends Level
{
    constructor()
    {
        super('GameLevel2');
        const gameMap = new GameMap();
        gameMap.background = new THREE.Color(0.35, 0.25, 0.5);

        const height = window.innerHeight;
        const width = window.innerWidth;
        const ratio = width / height;

        const camera = new THREE.PerspectiveCamera(75, ratio, 0.0001, 1000);

        this.gameMap = gameMap;
        this.camera = camera;
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
    }
}

export { GameLevel2 };