
import { Camera, PlaneGeometry, Scene, Vector2, WebGLRenderer } from "three";
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { Pass } from "three/examples/jsm/postprocessing/EffectComposer";
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { SSRPass } from 'three/examples/jsm/postprocessing/SSRPass.js';
import { AdaptiveToneMappingPass } from 'three/examples/jsm/postprocessing/AdaptiveToneMappingPass.js';
import { ReflectorForSSRPass } from 'three/examples/jsm/objects/ReflectorForSSRPass.js';
import { Renderer } from "./renderer";

export class PostProcess
{
    private _enabled: boolean = true;
    private _renderer: Renderer;
    private _scene!: Scene;
    private _camera!: Camera;
    private _passes: Array<Pass>;

    constructor(renderer: Renderer)
    {
        this._renderer = renderer;
        this._passes = new Array<Pass>();
    }

    public initialize()
    {
        this._scene = this._renderer.levelManager.activeScene;
        this._camera = this._renderer.levelManager.activeCamera;

        this.initSSAO();
        this.initBloom();
        this.initDepthOfField();
        this.initScreenSpaceReflections();        
        this.initAdaptiveToneMapping();
        
    }

    private initSSAO()
    {
        const ssaoParams = {
            kernelRadius: 16,
            kernelSize: 32,
            minDistance: 0.001,
            maxDistance: 0.1
        }

        let ssaoPass = new SSAOPass(
            this._scene,
            this._camera,
            window.innerWidth,
            window.innerHeight
        );
        ssaoPass.kernelRadius = ssaoParams.kernelRadius;
        ssaoPass.kernelSize = ssaoParams.kernelSize;
        ssaoPass.minDistance = ssaoParams.minDistance;
        ssaoPass.maxDistance = ssaoParams.maxDistance;

		this._passes.push(ssaoPass);
    }

    private initBloom()
    {
        const bloomParams = {
            exposure: 0.23,
            bloomStrength: 0.3,
            bloomThreshold: 0.15,
            bloomRadius: 0.1
        };

        const bloomPass = new UnrealBloomPass( new Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
		bloomPass.threshold = bloomParams.bloomThreshold;
		bloomPass.strength = bloomParams.bloomStrength;
		bloomPass.radius = bloomParams.bloomRadius;

        this._passes.push(bloomPass);
    }

    private initDepthOfField()
    {
        const bokehPass = new BokehPass( this._scene, this._camera, {
            focus: 1.5,
			aperture: 0.001,
			maxblur: 0.0025
        } );

        this._passes.push(bokehPass);
    }

    private initScreenSpaceReflections()
    {
        let geometry = new PlaneGeometry( 1, 1 );
		let groundReflector = new ReflectorForSSRPass( geometry, {
				clipBias: 0.0003,
				textureWidth: window.innerWidth,
				textureHeight: window.innerHeight,
				color: 0x888888,
				useDepthTexture: true,
			} );
			groundReflector.material.depthWrite = false;
			groundReflector.rotation.x = - Math.PI / 2;
			groundReflector.visible = false;
        this._scene.add( groundReflector );
        
        let ssrPass = new SSRPass( {
            renderer: this._renderer.renderer,
			scene: this._scene,
			camera: this._camera,
			width: innerWidth,
			height: innerHeight,
			groundReflector: null,
			selects: null
			} );
        ssrPass.thickness = 0.0018;
        ssrPass.isInfiniteThick = false;
        ssrPass.opacity = 0.1;
        groundReflector.fresnel = true;

        //this._composer.addPass( ssrPass );
    }

    private initAdaptiveToneMapping()
    {
        let adaptiveToneMapping = new AdaptiveToneMappingPass();
        adaptiveToneMapping.adaptive = true;
        adaptiveToneMapping.enabled = true;
        adaptiveToneMapping.resolution = 1024;
        adaptiveToneMapping.setMiddleGrey(0.6);
        adaptiveToneMapping.setAdaptionRate(3);
        adaptiveToneMapping.setMaxLuminance(16);
        this._passes.push(adaptiveToneMapping);
    }
    
    public get enabled(): boolean { return this._enabled; }
    public set enabled(value: boolean) { this._enabled = value; }

    public get passes(): Array<Pass> { return this._passes; }
}