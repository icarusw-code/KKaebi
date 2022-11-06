import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Collider, GameObject, Object,Vector3,Camera} from 'UnityEngine';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { Button,Text } from 'UnityEngine.UI';
import ButtonClick from './ButtonClick';
import QuestManager from './QuestManager';
import GameManager from '../TS/GameManager';
import LanguageChange from './Language/LanguageChange';
import SoundManager from './SoundManager';
export default class NpcInteraction extends ZepetoScriptBehaviour {
    public btnFactory : GameObject;
    private btn : GameObject;
    private turnCheck : bool = false;
    private turnCheck2 : bool = false;
    public InteractBtn: Button;
    public QuestUI: GameObject;
    public NpcTalkUI: GameObject;
    private playerController : GameObject;

    Start() {    
        
        this.btn = GameObject.Instantiate(this.btnFactory) as GameObject; //재료 생성될때 버튼도 함께 생성
        this.btn.transform.parent = GameObject.Find("Canvas_ICON").transform; //캔버스 자식으로 생성
        this.btn.GetComponent<ButtonClick>().TurnOffButton(); //버튼일단 꺼주고
        
        this.NpcTalkUI.GetComponent<Button>().onClick.AddListener(()=>{ //어떤요리가 만들고싶나 다음에 뜰창
            SoundManager.getInstance().PlayBgm("UIbuttonBgm");
            this.btn.GetComponent<ButtonClick>().TurnOffButton();
            this.NpcTalkUI.SetActive(false);
            this.TurnOnQuestUI();
            
        });

        this.InteractBtn = this.btn.GetComponent<Button>(); 
        this.InteractBtn.onClick.AddListener(() => { //버튼누르면 퀘스트창뜸
            SoundManager.getInstance().PlayBgm("UIbuttonBgm");
            if(QuestManager.getInstance().isNowAccept==false){ //지금 퀘스트 받은 상태가 아닐때만

                this.NpcTalkUI.SetActive(true);
                this.turnCheck2=true;
                this.btn.GetComponent<ButtonClick>().TurnOffButton();
                if(LanguageChange.getInstance().LanguageMode==1){
                //허허 어떤요리가 만들고싶나
                    this.NpcTalkUI.transform.GetChild(1).GetComponent<Text>().text = "허허, 어떤 요리가 만들고 싶나?"; 
                }
                else if (LanguageChange.getInstance().LanguageMode == 2) {
                    //허허 어떤요리가 만들고싶나
                    this.NpcTalkUI.transform.GetChild(1).GetComponent<Text>().text = "What kind of Korean food do you wish to have?";
                }

                this.playerController = ZepetoPlayers.instance.transform.GetChild(4).gameObject;
                this.playerController.SetActive(false);

                //this.TurnOnQuestUI();
                //this.playerController = ZepetoPlayers.instance.transform.GetChild(4).gameObject;
                //this.playerController.SetActive(false);
            }
            else{//받은 상태이고
                if(QuestManager.getInstance().QuestCompleteCheck()==true) {//완료했을경우
                    //요리 만드는 애니메이션 실행
                    
                    QuestManager.getInstance().QuestComplete(); //완료동작수행

                }
                else if(QuestManager.getInstance().QuestCompleteCheck()==false){ //완료못했으면
                    //"재료를 다 모아오지 못했구만"
                }

            }
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
            if(this.turnCheck2==false){
                this.btn.GetComponent<ButtonClick>().TurnOnButton();
            }
            this.turnCheck= true; //들어오면 체크
        }
    }

    OnTriggerExit(coll:Collider){ //플레이어가 나가면
        this.btn.GetComponent<ButtonClick>().TurnOffButton();
        this.turnCheck = false;
        this.turnCheck2=false;
    }

    VisualOnScreen(){ //재료 본인 좌표로 버튼위치 스크린계로 이동
        var myPos : Vector3;
        let camera = ZepetoPlayers.instance.ZepetoCamera.camera;
        myPos = camera.WorldToScreenPoint(this.transform.position); //자기 자신의 위치를 스크린 포인트 좌표계로 바꿔줌
        this.btn.transform.position = myPos; //버튼을 계속 오브젝트 좌표(윗줄의 mypos)위에 뜨게함
    }

    TurnOnQuestUI(){
        this.QuestUI.SetActive(true);
        this.turnCheck=false;
        this.btn.GetComponent<ButtonClick>().TurnOffButton();
        this.turnCheck2=true;
    }

    public TurnOnCharController(){
        this.playerController = ZepetoPlayers.instance.transform.GetChild(4).gameObject;
        this.playerController.SetActive(true); //**플레이어 컨트롤러 다시 풀기**
    }

}