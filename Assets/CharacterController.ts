import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { SpawnInfo, ZepetoPlayers } from "ZEPETO.Character.Controller";

export default class CharacterController extends ZepetoScriptBehaviour {

    Start() {
        ZepetoPlayers.instance.CreatePlayerWithZepetoId("", "", new SpawnInfo(), true);
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            let _player = ZepetoPlayers.instance.LocalPlayer;
        })

    }

}