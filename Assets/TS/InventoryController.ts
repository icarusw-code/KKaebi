import { GameObject, PlayerPrefs, Sprite, Transform } from 'UnityEngine';
import { Image } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import QuestManager from '../Scripts/QuestManager';
import IngredientBookController from './IngredientBookController';
import QuestIngre from '../Scripts/QuestIngre';
import Slot from './Slot'
import LanguageChange from '../Scripts/Language/LanguageChange';
export default class InventoryController extends ZepetoScriptBehaviour {

    public UIManger : GameObject;

    public slotFactory : GameObject;
    public content : Transform;

    public isChange : boolean;

    public ingredientDict : Map<number, string> = new Map<number, string>();

    Start() 
    {   

        this.ingredientDict = this.UIManger.GetComponent<IngredientBookController>().ingredientDict;
        //김치나 찹쌀떡을 보유했었다면 시작할때 불러올거임
        if(PlayerPrefs.GetInt("김치보유함")==1){
            let ingreFood : GameObject;
            ingreFood = GameObject.Instantiate(this.slotFactory,this.content) as GameObject;
            ingreFood.name = QuestManager.getInstance().myQuestFoodImgIngre[0].name;
            if (LanguageChange.getInstance().LanguageMode == 1) { //한글
                
                ingreFood.GetComponent<QuestIngre>().ingredientName.text = QuestManager.getInstance().myQuestFoodImgIngre[0].name;
                
            }
            else if (LanguageChange.getInstance().LanguageMode == 2) { //영어
                ingreFood.GetComponent<QuestIngre>().ingredientName.text = LanguageChange.getInstance().EnlgishPack.get(QuestManager.getInstance().myQuestFoodImgIngre[0].name);
            }
            ingreFood.GetComponent<QuestIngre>().ingredientImage.sprite = QuestManager.getInstance().myQuestFoodImgIngre[0];
        }
        if(PlayerPrefs.GetInt("찹쌀떡보유함")==1){
            let ingreFood : GameObject;
            ingreFood = GameObject.Instantiate(this.slotFactory,this.content) as GameObject;
            ingreFood.name = QuestManager.getInstance().myQuestFoodImgIngre[1].name;
                if (LanguageChange.getInstance().LanguageMode == 1){ //한글
                    ingreFood.GetComponent<QuestIngre>().ingredientName.text = QuestManager.getInstance().myQuestFoodImgIngre[1].name;
                }
                else if (LanguageChange.getInstance().LanguageMode == 2){ //영어
                    ingreFood.GetComponent<QuestIngre>().ingredientName.text = LanguageChange.getInstance().EnlgishPack.get(QuestManager.getInstance().myQuestFoodImgIngre[1].name);  
                }
                ingreFood.GetComponent<QuestIngre>().ingredientImage.sprite = QuestManager.getInstance().myQuestFoodImgIngre[1];
        }
        //PlayerPrefs.SetInt("찹쌀떡보유함",0);
        //위에 두줄 임시임
        
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
        var ingreFood : GameObject;
        //3성음식일때는 2성재료도 추가로 instantiate해야됨
        /*if(QuestManager.getInstance().QuestAcceptFoodName=="팥빙수"){
            ingreFood = GameObject.Instantiate(this.slotFactory, this.content) as GameObject;
            ingreFood.name = QuestManager.getInstance().myQuestFoodImgIngre[0].name;

            ingreFood.GetComponent<QuestIngre>().ingredientName.text = QuestManager.getInstance().myQuestFoodImgIngre[0].name;
            ingreFood.GetComponent<QuestIngre>().ingredientImage.sprite = QuestManager.getInstance().myQuestFoodImgIngre[0];
        }
        else if(QuestManager.getInstance().QuestAcceptFoodName=="붕어찜"||QuestManager.getInstance().QuestAcceptFoodName=="부대찌개"){
            ingreFood = GameObject.Instantiate(this.slotFactory, this.content) as GameObject;
            ingreFood.name = QuestManager.getInstance().myQuestFoodImgIngre[1].name;

            ingreFood.GetComponent<QuestIngre>().ingredientName.text = QuestManager.getInstance().myQuestFoodImgIngre[1].name;
            ingreFood.GetComponent<QuestIngre>().ingredientImage.sprite = QuestManager.getInstance().myQuestFoodImgIngre[1];
        }*/

        for(let i = 0; i < size; i++)
        {
            // 자식으로 생성
            var slot : GameObject;
            
            slot = GameObject.Instantiate(this.slotFactory, this.content) as GameObject;

            slot.name = this.ingredientDict.get(invenContentsId[i]);

            // 재료 이름 설정
            if (LanguageChange.getInstance().LanguageMode == 1){
                slot.GetComponent<Slot>().ingredientName.text = this.ingredientDict.get(invenContentsId[i]);
            }
            else if (LanguageChange.getInstance().LanguageMode == 2){
                slot.GetComponent<Slot>().ingredientName.text = LanguageChange.getInstance().EnlgishPack.get(this.ingredientDict.get(invenContentsId[i]));
            }

        }

    }

    public ClearInventory()
    {
        console.log("삭제실행");
        for(let i = 0; i < this.content.childCount; i++)
        {
            console.log("삭제중 " + this.content.GetComponentsInChildren<Slot>()[i]);

            //2성 음식이 만들어져 있으면 지우지않음
            if(this.content.GetComponentsInChildren<Slot>()[i].gameObject.name=="김치"){
                if(PlayerPrefs.GetInt("김치보유함")==1){
                }
                else{ //완료할때 소모
                    GameObject.Destroy(this.content.GetComponentsInChildren<Slot>()[i].gameObject);
                }
            }
            else if(this.content.GetComponentsInChildren<Slot>()[i].gameObject.name=="찹쌀떡"){
                if(PlayerPrefs.GetInt("찹쌀떡보유함")==1){
                }
                else{ //완료할때 소모
                    GameObject.Destroy(this.content.GetComponentsInChildren<Slot>()[i].gameObject);
                }
            }
            else{
                GameObject.Destroy(this.content.GetComponentsInChildren<Slot>()[i].gameObject);
            }
        }
    }

}