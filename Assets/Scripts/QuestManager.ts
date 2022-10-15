import { TouchScreenKeyboard,GameObject,WaitForSeconds } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import * as UnityEngine from 'UnityEngine'
import { Button } from 'UnityEngine.UI';
import FoodInfo from './FoodInfo';
import InventoryController from '../TS/InventoryController';
export default class QuestManager extends ZepetoScriptBehaviour {
    //quest 판넬
    public QuestUI : GameObject;
    //맡은 퀘스트 보는 UI관련
    public myQuestBtn: Button;
    





    //퀘스트 음식목록 누를때마다 바뀔 변동 임시값들
    public QuestIngreIDArr : number[]; 
    public QuestIngreNum : number;
    public QuestFoodName: string;

    //수락할때 최종값
    public QuestAcceptIngreIDArr : number[];
    public QuestAcceptIngreNum : number;
    public QuestAcceptFoodName: string;
    public checkAccept : boolean = false;
    public isGetIngre : boolean[];

    //<------------------------------------------------------->//

    public btnsGO : GameObject[];
    public btns : Button[]; //버튼배열은 음식이미지 나온 버튼
    public acceptBtn :  Button; //퀘스트 수락 버튼 (이게 진짜 퀘스트 부여 동작)
    public isNowAccept: boolean = false; //퀘스트를 현재 받은상태인지

    //퀘스트 포기 및 완료관련
    public giveUpBtn : Button;
    //public CompleteBtn: Button;

    //퀘스트창 닫기 버튼
    public exitBtn: Button;


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
                this.QuestIngreGiveAuthority(this.btnsGO[i].GetComponent<FoodInfo>().idArr, this.btnsGO[i].GetComponent<FoodInfo>().idArr.length,this.btnsGO[i].GetComponent<FoodInfo>().foodname);
            });
        }
        this.acceptBtn.onClick.AddListener(()=>{
            console.log("수락완료");
            this.QuestAccept();
        })

    }
    
     //해당 퀘스트를 눌렀을때 재료 아이디값 넣은 배열 불러온다.
     public QuestIngreGiveAuthority(IDArr : number[], idcount: number, foodname: string){ 
        this.QuestIngreNum = idcount; //퀘스트 받은 재료 종류 수도 등록하여 ingridientinteraction할때 쓸것
        this.QuestFoodName= foodname;
        for(let i=0;i<idcount;i++){
            this.QuestIngreIDArr[i] = IDArr[i];
        }
        //해당 음식의 재료가 무엇인지 뜨게한다.
        //this.TurnOnFoodsIngreImage(IDArr);
        
    }

    //퀘스트 수락, 사실상 퀘스트에 필요한 데이터들을 부여
    public QuestAccept(){
        this.QuestAcceptIngreNum = this.QuestIngreNum; //임시값을 수락값으로 확정
        this.QuestAcceptFoodName = this.QuestFoodName;
        for(let i=0;i<this.QuestAcceptIngreNum;i++){
            this.QuestAcceptIngreIDArr[i] = this.QuestIngreIDArr[i]; //임시값을 수락값으로 확정
        }
        this.checkAccept = true;
        this.QuestUI.SetActive(false); //퀘스트창 끄기
        this.GetComponent<InventoryController>().ClearInventory();

        this.acceptBtn.gameObject.SetActive(false);
        this.StartCoroutine(this.DoCheckAceeptAfterTime());
        this.isNowAccept = true;
        this.GetComponent<InventoryController>().SetInventory(this.QuestIngreNum, this.QuestIngreIDArr);


        this.isGetIngre = new Array(this.QuestAcceptIngreNum);
    }

    *DoCheckAceeptAfterTime(){
        yield new WaitForSeconds(1);
        this.checkAccept=false;
    }

    public TurnOnFoodsIngreImage(IDArr : number[]){

    }

    //퀘스트 포기
    public QuestGiveUp(){

        //퀘스트 안받은상태로 전환
        this.isNowAccept = false;
        //인벤토리 비우기

        //부여된 퀘스트 재료 id배열이랑 크기도 초기화
        this.QuestAcceptIngreIDArr = new Array();
        this.QuestAcceptIngreNum = 0;
    }

    //퀘스트 완료
    public QuestComplete(){
        //퀘스트 안받은상태로 전환
        this.isNowAccept = false;

        var foodCount : number = UnityEngine.PlayerPrefs.GetInt(this.QuestAcceptFoodName);
        foodCount++;
        // Playerpref에 레시피 음식이름 키값으로 저장, 완료횟수
        UnityEngine.PlayerPrefs.SetInt(this.QuestAcceptFoodName,foodCount);
        //인벤토리 비우기

        //부여된 퀘스트 재료 id배열이랑 크기도 초기화
        this.QuestAcceptIngreIDArr = new Array();
        this.QuestAcceptIngreNum = 0;
    }


    //현재 유저가 퀘스트 진행중일때 퀘스트에 해당하는 재료를 먹었는지 안먹었는지 체크
    public GetIngreCheck(){

        //진행중일때
        if(this.isNowAccept==true){
            //먹는 동작 자체를 이미 한개먹었다면 못하게 할것이므로

            //배열 전체를 돌면서 

        }
    }



}