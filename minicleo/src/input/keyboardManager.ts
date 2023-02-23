import { KeyboardMapping } from "./inputMaps";

interface KeyboardState {
    keys: Array<boolean>;
}

export class KeyboardManager
{
    private _currentState: KeyboardState;
    private _previousState: KeyboardState | null;

    private _keyDownCallback?: (keyCode: string) => void;
    private _keyUpCallback?: (state: KeyboardState) => void;

    constructor()
    {
        this._currentState = {
            keys: new Array<boolean>(256).fill(false)
        };
        this._previousState = null;
    }

    public initialize()
    {
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
            this._keyUpCallback(this._currentState);
    }

    public update()
    {
        this._previousState = {...this._currentState};
    }

    public set onKeyDownCallback(callback: (keyCode: string) => void) 
    { 
        this.reset();
        this._keyDownCallback = callback; 
        this.initialize();
    }



}