import Stats from "stats.js";
import { Renderer } from "./rendering/renderer";
import { InputManager } from './input/manager';
import { Game } from "../game/game";
import { PhysicsManager } from "./physics/physicsManager";
import { Clock } from "three";


export class Engine
{
    private _stats: Stats;
    private _clock: Clock;
    private _game: Game;
    private _renderer: Renderer;
    private _input: InputManager;
    private _physics: PhysicsManager;

    constructor(engineElement: string)
    {
        this._stats = new Stats();
        this._stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( this._stats.dom );
        
        this._clock = new Clock();
        this._physics = new PhysicsManager();
        this._game = new Game();
        this._renderer = new Renderer(engineElement, this._game.scene, this._game.camera);
        this._input = new InputManager();
    }

    public async initialize(): Promise<void>
    {
        this._input.initialize();
        this._renderer.initialize();
        this._game.setLevelPhysics(await this._physics.initialize());
        this._game.setInput(this._input);
        this._game.initialize();

        this.update();
    }

    /**
     * Updates every frame
     */
    public update(): void
    {
        this._stats.begin();   
        const deltaTime = this._clock.getDelta();

        this._game.update(deltaTime);
        this._renderer.update();

        this._stats.end();

        requestAnimationFrame(this.update.bind(this));
    }

    public resize(): void
    {
        this._renderer.resize();
    }

}