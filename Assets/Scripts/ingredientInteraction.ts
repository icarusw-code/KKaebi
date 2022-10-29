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
import Notification from './Notification';

export default class ingerdientInteraction extends ZepetoScriptBehaviour {

    public btnFactory : GameObject;
    private btn : GameObject;
    private turnCheck : bool = false;
    public DestroyBtn: Button;
    private myID : number;

    public content : GameObject;
    public imageList : Sprite[];
    private color : UnityEngine.Color;
    Start() {    

        this.content = GameObject.Find("Canvas_UI").transform.GetChild(1).GetChild(0).GetChild(0).GetChild(0).gameObject;

        this.myID = this.gameObject.GetComponent<IngredientInfo>().id;

        this.btn = GameObject.Instantiate(this.btnFactory) as GameObject; //재료 생성될때 버튼도 함께 생성
        this.btn.transform.parent = GameObject.Find("Canvas_UI").transform; //캔버스 자식으로 생성
        this.btn.GetComponent<ButtonClick>().TurnOffButton(); //버튼일단 꺼주고

        this.DestroyBtn = this.btn.GetComponent<Button>(); 
        this.DestroyBtn.onClick.AddListener(() => { //먹는 버튼 누르면 먹어지는 동작

            //재료(지금 현재 오브젝트)가 지금 퀘스트로 받은 재료들일때만, 그리고 한번도 먹지 않았을경우에만 먹기동작 수행
            for(let i=0; i<QuestManager.getInstance().QuestAcceptIngreNum;i++){
                if(QuestManager.getInstance().QuestAcceptIngreIDArr[i]==this.myID&&QuestManager.getInstance().GetIngreCheckDiction.get(this.myID)==false){
                    this.DoDestroy();
                    QuestManager.getInstance().GetIngreCheck(this.myID);//먹었음
                    //먹었으니 myquest의 해당 재료 이미지의 투명값을 높여주자


                    this.AddIngredientCount();
                    this.AddIngredientImage();
                }
                else if(QuestManager.getInstance().QuestAcceptIngreIDArr[i]!=this.myID){
                    //Notification.getIns().UpLoadText("하하하");
                }
            }
            if(QuestManager.getInstance().GetIngreCheckDiction.get(this.myID)==true){
                //"이미 해당재료는 획득했습니다.""
            }

            if(QuestManager.getInstance().QuestCompleteCheck()==true){ //재료를 모두 모았을경우
                //"재료를 전부 모았다!"
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
                    console.log("테스트 " + slot.gameObject.name);
                    slot.gameObject.GetComponent<Slot>().ingredientImage.sprite = image;
                }
            })

        })
    }
}