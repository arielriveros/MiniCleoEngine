export abstract class Module
{
    private readonly _name: string;
    private _initialized: boolean = false;
    private _destroyed: boolean = false;

    constructor(name: string)
    {
        this._name = name;
    }
    public initialize(): void
    {
        // Prevent double initialization
        if(this._initialized)
            return;
        this._initialized = true;
    }

    public update(): void {}

    public destroy(): void {
        // Prevent double destruction
        if(this._destroyed)
            return;
        this._destroyed = true;
    }

    public get name() { return this._name; }
}