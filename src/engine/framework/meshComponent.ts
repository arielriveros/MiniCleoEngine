import * as THREE from "three";
import { Component } from "./component";

export class MeshComponent extends Component
{
    private _mesh: THREE.Mesh;

    constructor(mesh: THREE.Mesh)
    {
        super();
        this._mesh = mesh;
    }

    public get mesh(): THREE.Mesh { return this._mesh; }



    public override update(): void
    {
        super.update();
        this._mesh.position.set(this.parent.position[0], this.parent.position[1], this.parent.position[2]);
        //console.log("Parent: [" + this.parent.position.toLocaleString() + "]\n" + "Mesh: [" + this._mesh.position.x + ", " + this._mesh.position.y + ", " + this._mesh.position.z + "]");
        let quat = new THREE.Quaternion(this.parent.rotation[0], this.parent.rotation[1], this.parent.rotation[2], this.parent.rotation[3]);
        this._mesh.rotation.setFromQuaternion(quat.clone());
        this._mesh.scale.set(this.parent.scale[0], this.parent.scale[1], this.parent.scale[2]);
    }


}