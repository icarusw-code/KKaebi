import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Collider, GameObject, Object,Vector3,Camera} from 'UnityEngine';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { Button } from 'UnityEngine.UI';
import ButtonClick from './ButtonClick';
export default class NpcInteraction extends ZepetoScriptBehaviour {
    public btnFactory : GameObject;
    private btn : GameObject;
    private turnCheck : bool = false;
    public InteractBtn: Button;
    public QuestUI: GameObject;
    Start() {    
        this.btn = GameObject.Instantiate(this.btnFactory) as GameObject; //재료 생성될때 버튼도 함께 생성
        this.btn.transform.parent = GameObject.Find("Canvas_UI").transform; //캔버스 자식으로 생성
        this.btn.GetComponent<ButtonClick>().TurnOffButton(); //버튼일단 꺼주고

        this.InteractBtn = this.btn.GetComponent<Button>(); 
        this.InteractBtn.onClick.AddListener(() => { //먹는 버튼 누르면 먹어지는 동작
            this.TurnOnQuestUI();
        });
    }

    Update(){
        if(this.turnCheck==true){ //체크될때만 뜨게함
            this.VisualOnScreen();
        }
    }

    //NPC가 플레이어와 닿아있다면
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

    TurnOnQuestUI(){
        this.QuestUI.SetActive(true);
    }


}