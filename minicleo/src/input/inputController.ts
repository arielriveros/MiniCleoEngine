import { Module } from "../engine/module";
import { MouseManager } from "./mouseManager";

export class InputController extends Module
{
    private _mouseManager: MouseManager;
    constructor()
    {
        super("INPUT_CONTROLLER");
        this._mouseManager = new MouseManager();
    }

    public initialize()
    {
        super.initialize();
        this._mouseManager.initialize();
    }

    public override update()
    {
        super.update();
        this._mouseManager.update();
    }

    public destroy()
    {
        super.destroy();
    }

    public get mouse() { return this._mouseManager; }
}