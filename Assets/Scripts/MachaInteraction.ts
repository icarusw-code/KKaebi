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

export default class MachatInteraction extends ZepetoScriptBehaviour {

    public btnFactory : GameObject;
    private btn : GameObject;
    private turnCheck : bool = false;
    public DestroyBtn: Button;
    private myID : number;

    private color : UnityEngine.Color;
    private isingrcheck: bool = false;
    
    public foodItems : GameObject[];
    public foodItem : GameObject;

    public isOnHand : bool = false;

    randomNumber : number;

    Start() {    
        this.btn = GameObject.Instantiate(this.btnFactory) as GameObject; //재료 생성될때 버튼도 함께 생성
        this.btn.transform.SetParent(GameObject.Find("Canvas_UI").transform); //캔버스 자식으로 생성
        this.btn.GetComponent<ButtonClick>().TurnOffButton(); //버튼일단 꺼주고

        this.DestroyBtn = this.btn.GetComponent<Button>(); 
        this.DestroyBtn.onClick.AddListener(() => { 
            // 물건 드는 동작
            var localPlayer: GameObject = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.gameObject;
            var handPosition = localPlayer.transform.GetChild(0).GetChild(1).GetChild(2).GetChild(0).GetChild(1).GetChild(2).GetChild(1).GetChild(1).GetChild(0).GetChild(1).GetChild(0);
            
            this.randomNumber = Math.floor(UnityEngine.Random.Range(0, this.foodItems.length));
            console.log(this.randomNumber);

            for(let i = 0; i < handPosition.childCount; i++){
                if(i >= 5){
                    GameObject.Destroy(handPosition.GetChild(i).gameObject);

                    console.log("체크 : " + i);
                }
            }
            this.foodItem = GameObject.Instantiate(this.foodItems[this.randomNumber], handPosition) as GameObject;
            // this.foodItem.transform.localScale = new Vector3(0.01, 0.01, 0.01);
            this.foodItem.transform.localPosition = new Vector3(-0.075000003,-0.00300000003,0.00200000009);
            this.foodItem.transform.localEulerAngles = Vector3.zero;
            this.isOnHand = true;
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

}