import { GameObject, Sprite, Transform } from 'UnityEngine';
import { Image } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import QuestManager from '../Scripts/QuestManager';
import IngredientBookController from './IngredientBookController';
import Slot from './Slot'

export default class InventoryController extends ZepetoScriptBehaviour {

    public UIManger : GameObject;

    public slotFactory : GameObject;
    public content : Transform;

    public isChange : boolean;

    public ingredientDict : Map<number, string> = new Map<number, string>();

    Start() 
    {    
        this.ingredientDict = this.UIManger.GetComponent<IngredientBookController>().ingredientDict;

    }

    Update()
    {
        this.isChange = QuestManager.getInstance().checkAccept;

        // 변화가 있을때 
        if(this.isChange)
        {
            // 인벤토리 사이즈 받아오기
            // this.invenSize = QuestManager.getInstance().QuestIngreNum;
            
            // 인베토리 재료 ID목록 가져오기
            // this.invenContentsId = QuestManager.getInstance().QuestAcceptIngreIDArr;
            


        }
    }

    public SetInventory(size : number, invenContentsId : number[])
    {
        for(let i = 0; i < size; i++)
        {
            // 자식으로 생성
            var slot : GameObject;

            slot = GameObject.Instantiate(this.slotFactory, this.content) as GameObject;

            slot.name = this.ingredientDict.get(invenContentsId[i]);

            // 재료 이름 설정
            slot.GetComponent<Slot>().ingredientName.text = this.ingredientDict.get(invenContentsId[i]);

        }

    }

    public ClearInventory()
    {
        console.log("삭제실행");
        for(let i = 0; i < this.content.childCount; i++)
        {
            console.log("삭제중 " + this.content.GetComponentsInChildren<Slot>()[i]);
            GameObject.Destroy(this.content.GetComponentsInChildren<Slot>()[i].gameObject);
        }
    }

}