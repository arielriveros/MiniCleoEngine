import Stats from "stats.js";
import { Renderer } from "./renderer";
import { Game } from "../game/game";


export class Engine
{
    private _stats: Stats;
    private _game: Game;
    private _renderer: Renderer;

    constructor(engineElement: string)
    {
        this._stats = new Stats();
        this._stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( this._stats.dom );
        
        this._game = new Game();
        this._renderer = new Renderer(engineElement, this._game.scene, this._game.camera);
    }

    public initialize(): void
    {
        this._renderer.initialize();
        this._game.initialize();
        this.update();
    }

    /**
     * Updates every frame
     */
    public update(): void
    {
        this._stats.begin();
        this._renderer.update();
        this._game.update();
        this._stats.end();
        requestAnimationFrame(this.update.bind(this));
    }

    public resize(): void
    {
        this._renderer.resize();
    }

}