import { GameObject, Quaternion, Transform, Vector3,Collider } from 'UnityEngine';
import { SpawnInfo, ZepetoCharacter, ZepetoCharacterCreator } from 'ZEPETO.Character.Controller'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
export default class FallingRestart extends ZepetoScriptBehaviour {

    public restartPosition : Vector3 = new Vector3(-16, 45, 1);
    Start() {    
          
    }

    OnTriggerEnter(coll:Collider){
        var localPlayer: ZepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        if (coll.gameObject == localPlayer.gameObject) {
            localPlayer.Teleport(this.restartPosition, Quaternion.identity);
        }
    }


}