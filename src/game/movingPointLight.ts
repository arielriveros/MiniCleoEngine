import { PointLight } from "../engine/framework/pointLight";

export class MovingLight extends PointLight
{
    _xAmplitude: number = 1;
    _zAmplitude: number = 1;

    constructor(color: number, initialPosition: [number, number, number])
    {
        super(color, 1, 1, 5, false, {name: "MovingLight", position: initialPosition, rotation: [0, 0, 0]});
        this._xAmplitude = Math.random() * 10;
        this._zAmplitude = Math.random() * 2;
    }

    public override update(): void
    {
        super.update();
        this.position[0] = Math.sin(Date.now() / 1000) * this._xAmplitude;
        this.position[2] = Math.cos(Date.now() / 100) * this._zAmplitude;
    }
}