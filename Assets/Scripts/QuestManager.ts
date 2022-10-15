import { TouchScreenKeyboard,GameObject,WaitForSeconds } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Button } from 'UnityEngine.UI';
import FoodInfo from './FoodInfo';
import InventoryController from '../TS/InventoryController';
export default class QuestManager extends ZepetoScriptBehaviour {

    //quest 판넬
    public QuestUI : GameObject;

    //퀘스트 음식목록 누를때마다 바뀔 변동 임시값들
    public QuestIngreIDArr : number[]; 
    public QuestIngreNum : number;


    //수락할때 최종값
    public QuestAcceptIngreIDArr : number[];
    public QuestAcceptIngreNum : number;
    public checkAccept : boolean = false;

    //<------------------------------------------------------->//

    public btnsGO : GameObject[];
    public btns : Button[]; //버튼배열은 음식이미지 나온 버튼
    public acceptBtn :  Button; //퀘스트 수락 버튼 (이게 진짜 퀘스트 부여 동작)

    public static instance:QuestManager;
    static getInstance(){
        return this.instance||(this.instance = new this());
    }

    Start() {    
        QuestManager.instance = this;
        this.acceptBtn.gameObject.SetActive(false);
        

        for(let i=0; i<this.btnsGO.Length;i++){
            this.btns[i] = this.btnsGO[i].GetComponent<Button>();
        }
        //버튼 이벤트
        for(let i=0; i<this.btns.Length;i++){
            this.btns[i].onClick.AddListener(() => { //버튼 누를때 마다 해당 음식에 따른 재료 아이디 퀘스트매니저 함수에 전송 (두번째 인자는 재료 종류수)
                console.log("현재 누르고있는 버튼 이름:"+ this.btns[i]);
                this.acceptBtn.gameObject.SetActive(true);
                this.QuestIngreGiveAuthority(this.btnsGO[i].GetComponent<FoodInfo>().idArr, this.btnsGO[i].GetComponent<FoodInfo>().idArr.length);
            });
        }
        this.acceptBtn.onClick.AddListener(()=>{
            console.log("수락완료");
            this.QuestAccept();
        })

    }
    
     //해당 퀘스트를 눌렀을때 재료 아이디값 넣은 배열 불러온다.
     public QuestIngreGiveAuthority(IDArr : number[], idcount: number){ 
        this.QuestIngreNum = idcount; //퀘스트 받은 재료 종류 수도 등록하여 ingridientinteraction할때 쓸것
        for(let i=0;i<idcount;i++){
            this.QuestIngreIDArr[i] = IDArr[i];
        }


        //받은 음식재료의 id에 해당하는 재료만 ingridientinteraction이 가능토록하게 한다.
        

        //해당 음식의 재료가 무엇인지 뜨게한다.
        //this.TurnOnFoodsIngreImage(IDArr);
        
    }
    public QuestAccept(){
        this.QuestAcceptIngreNum = this.QuestIngreNum; //임시값을 수락값으로 확정
        for(let i=0;i<this.QuestAcceptIngreNum;i++){
            this.QuestAcceptIngreIDArr[i] = this.QuestIngreIDArr[i]; //임시값을 수락값으로 확정
        }
        this.checkAccept = true;
        this.QuestUI.SetActive(false); //퀘스트창 끄기
        this.GetComponent<InventoryController>().ClearInventory();
        this.acceptBtn.gameObject.SetActive(false);
        this.StartCoroutine(this.DoCheckAceeptAfterTime());

        this.GetComponent<InventoryController>().SetInventory(this.QuestIngreNum, this.QuestIngreIDArr);

    }

    *DoCheckAceeptAfterTime(){
        yield new WaitForSeconds(0.5);
        this.checkAccept=false;
    }

    public TurnOnFoodsIngreImage(IDArr : number[]){

    }
}