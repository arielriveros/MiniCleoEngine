import { Module } from "./module";
import { Renderer } from "../rendering/renderer";
import { Level } from "../level/level";
import { LevelManager } from "../level/levelManager";
import Stats from "stats.js";
import { InputController } from "../input/inputController";


interface EngineParameters
{
    context: string;
    fullscreen: boolean;
}

/**
 * The engine class is the main class of the engine.
 */
class Engine
{
    private _modules: Array<Module>;
    private _renderer!: Renderer;
    private _levelManager!: LevelManager;
    //private _inputController!: InputController;
    private _stats: Stats;
    private _renderContext: HTMLCanvasElement;
    static _inputController: InputController;
    
    constructor(parameters: EngineParameters)
    {
        this._modules = new Array<Module>();

        this._stats = new Stats();
        this._stats.showPanel(0);
        document.body.appendChild(this._stats.dom);

        this._renderContext = document.getElementById(parameters.context) as HTMLCanvasElement;

        this.setUp(parameters);
    }

    private setUp(parameters: EngineParameters)
    {
        
        if(this._renderContext === null)
            throw new Error(`Render context from id '${parameters.context}' is null: Provide a canvas element with the id '${parameters.context}'.`);
            
        if(parameters.fullscreen)
        {
            let width = window.innerWidth;
            let height = window.innerHeight;

            console.log(`Width: ${width}, Height: ${height}`);
            this._renderContext.style.display = "flex";
            this._renderContext.style.width = width.toString() + "px";
            this._renderContext.style.height = height.toString() + "px";
            this._renderContext.width = width;
            this._renderContext.height = height;
            
        }
        this._levelManager = new LevelManager();
        this._modules.push(this._levelManager);

        this._renderer = new Renderer(this._renderContext, this._levelManager);
        this._modules.push(this._renderer);

        Engine._inputController = new InputController();
        Engine._inputController.initialize();
    }

    /**
     * Starts the engine and initializes all sub-modules.
     */
    public start()
    {
        for(let module of this._modules)
            module.initialize();

        this.mainLoop();
    }

    public stop()
    {
        for(let module of this._modules)
            module.destroy();

        this._modules = new Array<Module>();
    }

    public addLevel(level: Level)
    {
        this._levelManager.addLevel(level);
    }

    public setActiveLevel(levelName?: string)
    {
        const result: boolean = this._levelManager.setActiveLevel(levelName);
        if(!result)
            throw new Error(`Level '${levelName}' not found.`);
    }

    private mainLoop()
    {
        Engine._inputController.update();
        this._stats.begin();
        for(let module of this._modules)
            module.update();
        this._stats.end();

        requestAnimationFrame(this.mainLoop.bind(this));
    }

    public static getInputController(): InputController
    {
        return this._inputController;
    }
}

export { Engine };
