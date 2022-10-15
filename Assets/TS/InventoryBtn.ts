import { GameObject } from 'UnityEngine';
import { Button } from 'UnityEngine.UI'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import ButtonClick from '../Scripts/ButtonClick';

export default class InventoryBtn extends ZepetoScriptBehaviour {

    public invenBtn : Button;
    public exitBtn : Button;
    public inventoryUI : GameObject;

    isActive : boolean = false;

    Start() {    

        // 인벤토리 아이콘 눌렀을 떄
        this.invenBtn.onClick.AddListener(() => {
            
            this.isActive = !this.isActive;
            // 인벤토리 UI 켜주기
            this.inventoryUI.SetActive(this.isActive);
            
        });

        // X버튼 눌렀을때
        this.exitBtn.onClick.AddListener(() => {

            this.isActive = false;
            this.inventoryUI.SetActive(false);
        })
        


    }

}