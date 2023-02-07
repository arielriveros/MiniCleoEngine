import { Entity, EntityParameters } from "./entity";
import { MeshComponent } from "./meshComponent";

export class Character extends Entity
{
    constructor(Params: EntityParameters = {}, mesh?: THREE.Mesh | THREE.Group)
    {
        super(Params);
        if(mesh)
            this.addComponent(new MeshComponent(mesh));
    }

    public override update(): void
    {
        super.update();
    }
}