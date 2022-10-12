import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Button} from "UnityEngine.UI";
import { GameObject } from 'UnityEngine';
import { UIZepetoPlayerControl, ZepetoPlayers } from 'ZEPETO.Character.Controller';

export default class BookBtn extends ZepetoScriptBehaviour {

    public bookIconBtn : Button;
    public book : GameObject;

    isActive : boolean = false;

    private playerController : GameObject;

    Start() {    
        
        this.bookIconBtn.onClick.AddListener(() => {

            this.playerController = ZepetoPlayers.instance.transform.GetChild(4).gameObject;

            // 도감 켜주기
            this.isActive ? this.book.SetActive(false) : this.book.SetActive(true);

            // 컨트롤러 꺼주기
            this.isActive ? this.playerController.SetActive(true) : this.playerController.SetActive(false);

            this.isActive = !this.isActive;
        });


    }

}