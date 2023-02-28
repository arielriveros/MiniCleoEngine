export class Performance
{
    private _previousTime: number;
    private _time: number;

    public constructor()
    {
        this._previousTime = 0;
        this._time = 0;
    }

    public get previousTime(): number { return this._previousTime; }
    public get time(): number { return this._time; }

    public measure(): number
    {
        if(!this._previousTime)
        {
            this._previousTime = performance.now();
            this._time = 0;
        }
        let delta = (performance.now() - this._previousTime);
        this._previousTime = performance.now();
        this._time = delta;
        return delta;
    }
}