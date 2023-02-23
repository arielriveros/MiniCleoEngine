import { Module } from "./module";
import { Renderer } from "../rendering/renderer";
import { Level } from "../level/level";
import { LevelManager } from "../level/levelManager";
import Stats from "stats.js";


interface EngineParameters
{
    context: string;
}

/**
 * The engine class is the main class of the engine.
 */
class Engine
{
    private _modules: Array<Module>;
    private _renderer!: Renderer;
    private _levelManager!: LevelManager;
    private _stats: Stats;
    
    constructor(parameters: EngineParameters)
    {
        this._modules = new Array<Module>();

        this._stats = new Stats();
        this._stats.showPanel(0);
        document.body.appendChild(this._stats.dom);

        this.setUp(parameters);
    }

    private setUp(parameters: EngineParameters)
    {
        const renderContext = document.getElementById(parameters.context) as HTMLCanvasElement;
        if(renderContext === null)
            throw new Error(`Render context from id '${parameters.context}' is null: Provide a canvas element with the id '${parameters.context}'.`);
            
        this._levelManager = new LevelManager();
        this._modules.push(this._levelManager);

        this._renderer = new Renderer(renderContext, this._levelManager);
        this._modules.push(this._renderer);

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
        this._stats.begin();
        for(let module of this._modules)
            module.update();
        this._stats.end();

        requestAnimationFrame(this.mainLoop.bind(this));
    }
}

export { Engine };
