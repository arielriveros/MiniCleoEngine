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
        this._mesh.position.set(this.parent.position[0], this.parent.position[1], this.parent.position[2]);
        this._mesh.rotation.set(this.parent.rotation[0], this.parent.rotation[1], this.parent.rotation[2]);
        this._mesh.scale.set(this.parent.scale[0], this.parent.scale[1], this.parent.scale[2]);
    }


}