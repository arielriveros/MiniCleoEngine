import { Module } from "../engine/module";
import { KeyboardManager } from "./keyboardManager";
import { MouseManager } from "./mouseManager";

export class InputController extends Module
{
    private _mouseManager: MouseManager;
    private _keyboardManager: KeyboardManager;

    constructor()
    {
        super("INPUT_CONTROLLER");
        this._mouseManager = new MouseManager();
        this._keyboardManager = new KeyboardManager();
    }

    public initialize()
    {
        super.initialize();
        this._mouseManager.initialize();
        this._keyboardManager.initialize();
    }

    public override update()
    {
        super.update();
        this._mouseManager.update();
        this._keyboardManager.update();
    }

    public destroy()
    {
        super.destroy();
    }

    public get mouse() { return this._mouseManager; }
    public get keyboard() { return this._keyboardManager; }
}