import { GameObject, Quaternion, Transform, Vector3 } from 'UnityEngine';
import { SpawnInfo, ZepetoCharacter, ZepetoCharacterCreator } from 'ZEPETO.Character.Controller'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class NPCManager extends ZepetoScriptBehaviour {

    public npcPosition : Transform;

    Start() {    
        ZepetoCharacterCreator.CreateByZepetoId("kkeabi", new SpawnInfo(), (character : ZepetoCharacter) => {
            character.Teleport(this.npcPosition.position, Quaternion.Euler(0, -180, 0));
            character.gameObject.transform.forward = this.npcPosition.forward;
        });
    }

}