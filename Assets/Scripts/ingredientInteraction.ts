import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Collider, GameObject, Object,Vector3,Camera, Sprite} from 'UnityEngine';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { Button } from 'UnityEngine.UI';
import ButtonClick from './ButtonClick';
import GameManager from '../TS/GameManager';
import IngredientInfo from '../TS/IngredientInfo';
import QuestManager from './QuestManager';
import Slot from '../TS/Slot';
import * as UnityEngine from 'UnityEngine';
import IngredientBookController from '../TS/IngredientBookController';
import Notifications from './Notifications';
import LanguageChange from './Language/LanguageChange';
import SpawnManager from './SpawnManager';
import SoundManager from './SoundManager';
export default class ingerdientInteraction extends ZepetoScriptBehaviour {

    public btnFactory : GameObject;
    private btn : GameObject;
    private turnCheck : bool = false;
    public DestroyBtn: Button;
    private myID : number;

    public content : GameObject;
    public imageList : Sprite[];
    private color : UnityEngine.Color;
    private isingrcheck: bool = false;
    public IngredientController : GameObject;
    public spawnmanager : GameObject;
    private alreadyCheck : bool = false;
    //
    Start() {    
        this.spawnmanager = GameObject.Find("SpawnManager");
        this.IngredientController= GameObject.Find("UI_Manager");
        this.content = GameObject.Find("Canvas_UI").transform.GetChild(3).GetChild(0).GetChild(0).GetChild(0).gameObject;

        this.myID = this.gameObject.GetComponent<IngredientInfo>().id;

        this.btn = GameObject.Instantiate(this.btnFactory) as GameObject; //재료 생성될때 버튼도 함께 생성
        this.btn.transform.SetParent(GameObject.Find("Canvas_ICON").transform); //캔버스 자식으로 생성
        this.btn.GetComponent<ButtonClick>().TurnOffButton(); //버튼일단 꺼주고

        this.DestroyBtn = this.btn.GetComponent<Button>(); 
        this.DestroyBtn.onClick.AddListener(() => { //먹는 버튼 누르면 먹어지는 동작
            if(QuestManager.getInstance().isNowAccept==false){
                SoundManager.getInstance().PlayBgm("NotificationBgm");
                if(LanguageChange.getInstance().LanguageMode == 1){ //한국어
                    Notifications.getIns().UpLoadText("진행중인 요리가 없습니다. 대왕깨비에게 가보세요!");
                }
                //영어라면
                else if(LanguageChange.getInstance().LanguageMode == 2){ //영어
                    Notifications.getIns().UpLoadText("There are no dishes in progress. Go to the King Kkaebi!");
                }
            }
            if(QuestManager.getInstance().GetIngreCheckDiction.get(this.myID)==true){
                SoundManager.getInstance().PlayBgm("NotificationBgm");
                //한글이라면
                this.alreadyCheck=true;
                if(LanguageChange.getInstance().LanguageMode == 1){ //한국어
                    Notifications.getIns().UpLoadText("이미 획득한 재료입니다");
                }
                //영어라면
                else if(LanguageChange.getInstance().LanguageMode == 2){ //영어
                    Notifications.getIns().UpLoadText("This ingredient has already been acquired.");
                }


                
            }
            //재료(지금 현재 오브젝트)가 지금 퀘스트로 받은 재료들일때만, 그리고 한번도 먹지 않았을경우에만 먹기동작 수행
            for(let i=0; i<QuestManager.getInstance().QuestAcceptIngreNum;i++){
                if(QuestManager.getInstance().QuestAcceptIngreIDArr[i]==this.myID&&QuestManager.getInstance().GetIngreCheckDiction.get(this.myID)==false){
                    //spawnmanager의 리스트에 체크배열에 해당재료의 스폰 넘버값 원소에 먹었다고 전달
                    this.spawnmanager.GetComponent<SpawnManager>().IsSpawnCheckList[this.gameObject.GetComponent<IngredientInfo>().spawnNum]=false;
                    this.DoDestroy();
                    QuestManager.getInstance().GetIngreCheck(this.myID);//먹었음
                    //먹었으니 myquest의 해당 재료 이미지의 투명값을 높여주자
                    //지금 먹은 현재 id에 해당하는 재료 이름을 ingredient book controller 딕셔너리에서 id키값=>음식이름 으로 전환하고 그걸 현재 inventory에서 반복해서 찾아서 투명도
                    SoundManager.getInstance().PlayBgm("IngreGetBgm");
                    this.AddIngredientCount();
                    this.AddIngredientImage();
                    this.IngredientController.GetComponent<IngredientBookController>().IngreBookImageColor();
                    if(QuestManager.getInstance().QuestCompleteCheck()==true){
                        SoundManager.getInstance().PlayBgm("NotificationBgm");
                        if(LanguageChange.getInstance().LanguageMode == 1){ //한국어
                            Notifications.getIns().UpLoadText(QuestManager.getInstance().QuestAcceptFoodName+"의 재료를 전부 모았다! 대왕깨비에게 가서 요리를 부탁하자");
                        }   
                        else if(LanguageChange.getInstance().LanguageMode == 2){ //영어
                            Notifications.getIns().UpLoadText("You collected all the ingredients for "+LanguageChange.getInstance().EnlgishPack.get(QuestManager.getInstance().QuestAcceptFoodName)+"! Let's go ask the King Kkaebi to cook");
                        }
                    }
                    this.isingrcheck=true; //레시피에 해당 재료가 있는것이므로
                }
                if(QuestManager.getInstance().QuestAcceptIngreIDArr[i]!=this.myID&&i==QuestManager.getInstance().QuestAcceptIngreNum-1&&this.isingrcheck==false&&this.alreadyCheck==false){
                    SoundManager.getInstance().PlayBgm("NotificationBgm");
                    if(LanguageChange.getInstance().LanguageMode == 1){ //한국어
                        Notifications.getIns().UpLoadText(QuestManager.getInstance().QuestAcceptFoodName+"에 필요한 재료가 아닙니다");
                    }
                    else if(LanguageChange.getInstance().LanguageMode == 2){ //영어
                        Notifications.getIns().UpLoadText("Not required ingredients for "+LanguageChange.getInstance().EnlgishPack.get(QuestManager.getInstance().QuestAcceptFoodName));
                    } 
                    
                }
            }
            
        });
    }

    Update(){
        if(this.turnCheck==true){ //체크될때만 뜨게함
            this.VisualOnScreen();
        }
    }

    //재료가 플레이어와 닿아있다면
    OnTriggerStay(coll:Collider){
        var localPlayer: GameObject = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.gameObject;
        if(coll.gameObject==localPlayer){
            this.btn.GetComponent<ButtonClick>().TurnOnButton();
            this.turnCheck= true; //들어오면 체크
        }
    }

    OnTriggerExit(coll:Collider){ //플레이어가 나가면
        this.btn.GetComponent<ButtonClick>().TurnOffButton();
        this.turnCheck = false;
    }

    VisualOnScreen(){ //재료 본인 좌표로 버튼위치 스크린계로 이동
        var myPos : Vector3;
        let camera = ZepetoPlayers.instance.ZepetoCamera.camera;
        myPos = camera.WorldToScreenPoint(this.transform.position); //자기 자신의 위치를 스크린 포인트 좌표계로 바꿔줌
        this.btn.transform.position = myPos; //버튼을 계속 오브젝트 좌표(윗줄의 mypos)위에 뜨게함
    }


    public DoDestroy(){
        GameObject.Destroy(this.btn.gameObject);
        GameObject.Destroy(this.gameObject);
    }

    public AddIngredientCount(){
        //자기 자신의 ingrdient info 컴포넌트에서 gamemanager의 countup 함수에id값을 인자로 넘겨줘야된다
        GameManager.getInstance().IngredientCountUP(this.myID);
    }

    public AddIngredientImage()
    {        
        // 재료 이미지 설정
        this.imageList.map((image) =>{
            // 이미지의 이름이 content 자식 이름이랑 같으면 
            // 그리고 내가 먹은거랑 이름이 같으면
            this.content.GetComponentsInChildren<Slot>().map((slot) => {
                if(image.name == slot.gameObject.name && image.name == QuestManager.getInstance().MyQuestIngreDiction.get(this.myID)){
                    //console.log("테스트 " + slot.gameObject.name);
                    slot.gameObject.GetComponent<Slot>().ingredientImage.sprite = image;
                }
            })

        })
    }
}