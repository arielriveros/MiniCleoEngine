import { MeshComponent } from "../engine/framework/meshComponent";
import { Entity } from "../engine/framework/entity";
import * as THREE from "three";

export class Cube extends Entity
{
    constructor()
    {
        super({name: "Cube", position: [0, 0, 0], rotation: [0, 0, 0]});
        const cubeMeshComponent = new MeshComponent(new THREE.Mesh( 
            new THREE.BoxGeometry( 1, 1, 1 ), 
            new THREE.MeshStandardMaterial( {
                color: 0x00ff00,
                roughness: 0.2,
                metalness: 1 
            } ) 
        ));
        cubeMeshComponent.mesh.castShadow = true;
        cubeMeshComponent.mesh.receiveShadow = true;
        this.addComponent(cubeMeshComponent);
    }

    public override update(): void
    {
        super.update();
        this.position[0] = Math.sin(Date.now() / 1000);
        this.position[1] = Math.sin(Date.now() / 2000) + 2;
        this.position[2] = Math.cos(Date.now() / 2000);
        this.rotation[0] += 0.01;
        this.rotation[1] += 0.01;
        this.rotation[2] += 0.01;
        this.scale[0] = Math.sin(Date.now() / 1000)/2 + 0.5;
        this.scale[1] = Math.sin(Date.now() / 1000)/2 + 0.5;
        this.scale[2] = Math.cos(Date.now() / 1000)/2 + 0.5;
    }
}