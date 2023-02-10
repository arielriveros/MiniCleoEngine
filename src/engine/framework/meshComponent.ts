import * as THREE from "three";
import { Component } from "./component";

export class MeshComponent extends Component
{
    private _mesh: THREE.Mesh | THREE.Group;

    constructor(mesh: THREE.Mesh | THREE.Group)
    {
        super();
        this._mesh = mesh;
    }

    public get mesh(): THREE.Mesh | THREE.Group { return this._mesh; }



    public override update(): void
    {
        super.update();
    }

    public override destroy(): void
    {
        super.destroy();
        this._mesh.parent?.remove(this._mesh);
    }

}