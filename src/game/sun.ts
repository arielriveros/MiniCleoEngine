import { DirectionalLight } from "../engine/framework/directionalLight";

export class Sun extends DirectionalLight
{
    constructor()
    {
        super(0xffffff, 25, {name: "Sun", position: [0, 15, 0], rotation: [0, 0, 0]});
    }

    public override update(): void
    {
        super.update();
        this.position[0] = Math.sin(Date.now() / 10000) * 2;
        this.position[2] = Math.cos(Date.now() / 10000) * 2;
    }
}