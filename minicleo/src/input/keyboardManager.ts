import { KeyboardMapping } from "./inputMaps";

interface KeyboardState {
    keys: Array<boolean>;
}

export class KeyboardManager
{
    private _currentState: KeyboardState;
    private _previousState: KeyboardState | null;

    private _keyDownCallback?: (keyCode: string) => void;
    private _keyUpCallback?: (keyCode: string) => void;
    private _whileKeyDownCallback?: (state: KeyboardState) => void;

    constructor()
    {
        this._currentState = {
            keys: new Array<boolean>(256).fill(false)
        };
        this._previousState = null;
    }

    public initialize()
    {
        this.reset();
        window.addEventListener("keydown", (event) => this.onKeyDown(event));
        window.addEventListener("keyup", (event) => this.onKeyUp(event));
    }

    public reset()
    {
        this._previousState = null;
        window.removeEventListener("keydown", (event) => this.onKeyDown(event));
        window.removeEventListener("keyup", (event) => this.onKeyUp(event));
    }

    private onKeyDown(event: KeyboardEvent)
    {
        let keyCode = KeyboardMapping[event.code];
        this._currentState.keys[keyCode] = true;
        if(this._keyDownCallback)
            this._keyDownCallback(event.code);
    }

    private onKeyUp(event: KeyboardEvent)
    {
        let keyCode = KeyboardMapping[event.code];
        this._currentState.keys[keyCode] = false;
        if(this._keyUpCallback)
            this._keyUpCallback(event.code);
    }

    public update()
    {
        this._previousState = {...this._currentState};
        if(this._whileKeyDownCallback)
            this._whileKeyDownCallback(this._currentState);
    }

    public set onKeyDownCallback(callback: (keyCode: string) => void) 
    { 
        this._keyDownCallback = callback; 
    }

    public set onKeyUpCallback(callback: (keyCode: string) => void)
    {
        this._keyUpCallback = callback;
    }

    public set whileKeyDownCallback(callback: (state: KeyboardState) => void)
    {
        this._whileKeyDownCallback = callback;
    }
}