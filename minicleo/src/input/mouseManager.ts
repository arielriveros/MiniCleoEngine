interface MouseState {
    mouseX: number;
    mouseY: number;
    deltaX: number;
    deltaY: number;
    mouseButtons: Array<boolean>;
}

export class MouseManager
{
    private _currentState: MouseState;
    private _previousState: MouseState | null;

    private _mouseMoveCallback?: (state: MouseState) => void;

    constructor()
    {
        this._currentState = {
            mouseX: 0,
            mouseY: 0,
            deltaX: 0,
            deltaY: 0,
            mouseButtons: new Array<boolean>(3).fill(false)
        };
        this._previousState = null;
    }

    public initialize()
    {
        window.addEventListener("mousemove", (event) => this.onMouseMove(event));
        window.addEventListener("mousedown", (event) => this.onMouseDown(event));
        window.addEventListener("mouseup", (event) => this.onMouseUp(event));
        window.addEventListener("contextmenu", (event) => event.preventDefault());

        // lock the mouse to the center of the screen
        let canvas = document.getElementById('game-context');
        if(canvas)
            canvas.requestPointerLock = canvas.requestPointerLock || (canvas as any).mozRequestPointerLock;
    }

    private reset()
    {
        this._previousState = null;
        window.removeEventListener("mousemove", (event) => this.onMouseMove(event));
        window.removeEventListener("mousedown", (event) => this.onMouseDown(event));
        window.removeEventListener("mouseup", (event) => this.onMouseUp(event));
    }

    private onMouseMove(event: MouseEvent)
    {
        this._currentState.mouseX = event.pageX - window.innerWidth / 2;
        this._currentState.mouseY = event.pageY - window.innerHeight / 2;

        if(this._previousState === null)
            this._previousState = {...this._currentState};
        
        this._currentState.deltaX = this._currentState.mouseX - this._previousState.mouseX;
        this._currentState.deltaY = this._currentState.mouseY - this._previousState.mouseY;

        if(this._mouseMoveCallback)
            this._mouseMoveCallback(this._currentState);
    }

    private onMouseDown(event: MouseEvent)
    {
        this._currentState.mouseButtons[event.button] = true;
    }

    private onMouseUp(event: MouseEvent)
    {
        this._currentState.mouseButtons[event.button] = false;
    }

    public update() {
        this._previousState = {...this._currentState};
    }

    public get mouseX() { return this._currentState.mouseX; }
    public get mouseY() { return this._currentState.mouseY; }
    public get deltaX() { return this._currentState.deltaX; }
    public get deltaY() { return this._currentState.deltaY; }

    public get leftMouseButton() { return this._currentState.mouseButtons[0]; }
    public get middleMouseButton() { return this._currentState.mouseButtons[1]; }
    public get rightMouseButton() { return this._currentState.mouseButtons[2]; }

    public set mouseMoveCallback(callback: (state: MouseState) => void) 
    { 
        this._mouseMoveCallback = callback; 
        this.reset();
        this.initialize();
    }

}