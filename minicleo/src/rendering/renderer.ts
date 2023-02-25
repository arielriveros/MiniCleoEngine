import { Module } from "../engine/module";
import { 
    WebGLRenderer, Scene, Camera,
    PCFSoftShadowMap, ReinhardToneMapping, Vector2, PerspectiveCamera } from "three";

import { LevelManager } from "../level/levelManager";
import { PostProcess } from "./postprocess";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";


export class Renderer extends Module
{
    private _renderContext: HTMLCanvasElement;
    private _renderer: WebGLRenderer;
    private _levelManager: LevelManager;
    private _composer: EffectComposer;
    private _postProcess: PostProcess;

    constructor(context: HTMLCanvasElement, levelManager: LevelManager)
    {
        super("RENDERER");
        this._renderContext = context;
        this._renderer = new WebGLRenderer({
            canvas: this._renderContext,
            alpha: true, 
            logarithmicDepthBuffer: true, 
            precision: "highp", 
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            premultipliedAlpha: false,
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false
        });
        this._renderer.setSize(this._renderContext.width, this._renderContext.height);
        this._renderer.setClearColor(0x000000, 1.0);
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.physicallyCorrectLights = true;

        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = PCFSoftShadowMap;
        this._renderer.shadowMap.autoUpdate = true;
        this._renderer.toneMapping = ReinhardToneMapping;
        this._renderer.toneMappingExposure = 2.3;
        
        this._levelManager = levelManager;
        this._composer = new EffectComposer( this._renderer );

        this._postProcess = new PostProcess(this);
        this._postProcess.enabled = true;
        
        console.log("Renderer constructed");        
    }

    public initialize(): void
    {
        super.initialize();
        this._postProcess.initialize();
        this._postProcess.passes.forEach(pass => {
            this._composer.addPass(pass);
        });
    }

    public override update(): void
    {
        this.render();
    }

    private render(): void
    {
        if(this._postProcess.enabled)
            this._composer.render();
        else
        {
            if(!this._levelManager.activeGameMap || !this._levelManager.activeCamera)
                return;

            this._renderer.render(this._levelManager.activeGameMap, this._levelManager.activeCamera);
        }
    }

    public destroy(): void
    {
        super.destroy();
        console.log("Renderer destroyed");
    }

    public get renderer(): WebGLRenderer { return this._renderer; }
    public get levelManager(): LevelManager { return this._levelManager; }
}