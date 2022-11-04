import { GameObject, Time, Transform, Vector3 } from 'UnityEngine';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class KkaebiController extends ZepetoScriptBehaviour {

    public maxDistance : number = 3;
    public speed : number  = 20;
    dir : Vector3;
    myPlayer : Transform;

    Start() {    

        this.myPlayer = ZepetoPlayers.instance.ZepetoCamera.cameraParent;

    }

    Update(){
        
        this.dir = new Vector3(this.myPlayer.transform.position.x, 0, this.myPlayer.transform.position.z) - new Vector3(this.transform.position.x, 0, this.transform.position.z);
        var dist = this.dir.magnitude;
        this.dir.Normalize();

        if(dist > this.maxDistance)
        {
            this.transform.position += this.dir * this.speed * Time.deltaTime;
        }

        this.transform.forward = this.dir;

    }

}