import { TouchScreenKeyboard,GameObject,WaitForSeconds,Transform,Sprite} from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import * as UnityEngine from 'UnityEngine'
import { Button, Image,Text } from 'UnityEngine.UI';
import FoodInfo from './FoodInfo';
import InventoryController from '../TS/InventoryController';
import IngredientBookController from '../TS/IngredientBookController';
import QuestIngre from './QuestIngre';
import { QuestionDotToken } from 'typescript';
export default class QuestManager extends ZepetoScriptBehaviour {
    //quest 판넬
    public QuestUI : GameObject;

    //퀘스트 창에서 음식들 클릭할때마다 바뀌는 재료와 이미지들 관련
    public MainQuestContentTransform: Transform;


    //맡은 퀘스트 보는 UI관련
    public myQuestScreen: GameObject;
    public myQuestXScreen: GameObject;
    public myQuestBtn: Button;
    public MyQuestExitBtn: Button;
    public myQuestUI: GameObject;
    public myQuestIngreFactory: GameObject;
    public myQuestContentTransform: Transform;
    public MyQuestFoodImg: Image;
    public MyQuestFoodTxt: Text;
    public UIManger : GameObject;
    public MyQuestIngreDiction : Map<number,string> = new Map<number,string>();
    public QuestIngreImageList : Sprite[]; //여따 인벤토리 이미지 리스트랑 똑같이 넣어줘야됨!!!꼭
    public myQuestFoodImgIngre: Sprite[];


    //퀘스트 음식목록 누를때마다 바뀔 변동 임시값들
    public LeftPanel: GameObject;
    public QuestIngreIDArr : number[]; 
    public QuestIngreNum : number;
    public QuestFoodName: string;
    public MainQuestFoodImg: Image;
    public MainQuestFoodTxt: Text;
    public FoodImageList : Sprite[];

    //수락할때 최종값
    public QuestAcceptIngreIDArr : number[];
    public QuestAcceptIngreNum : number;
    public QuestAcceptFoodName: string;
    public checkAccept : boolean = false;
    public isGetIngre : boolean[];

    //수락한 이후 재료먹을때 관련
    public GetIngreCheckDiction : Map<number,boolean> = new Map<number,boolean>();

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
        //this.acceptBtn.gameObject.SetActive(false);
        this.LeftPanel.SetActive(false);
        for(let i=0; i<this.btnsGO.Length;i++){
            this.btns[i] = this.btnsGO[i].GetComponent<Button>();
        }
        //버튼 이벤트
        for(let i=0; i<this.btns.Length;i++){
            this.btns[i].onClick.AddListener(() => { //버튼 누를때 마다 해당 음식에 따른 재료 아이디 퀘스트매니저 함수에 전송 (두번째 인자는 재료 종류수)
                console.log("현재 누르고있는 버튼 이름:"+ this.btns[i]);
                //this.acceptBtn.gameObject.SetActive(true);
                this.LeftPanel.SetActive(true);
                
                this.QuestIngreGiveAuthority(this.btnsGO[i].GetComponent<FoodInfo>().idArr, this.btnsGO[i].GetComponent<FoodInfo>().idArr.length,this.btnsGO[i].GetComponent<FoodInfo>().foodname);
            });
        }
        this.acceptBtn.onClick.AddListener(()=>{
            console.log("수락완료");
            this.QuestAccept();
        });
        this.giveUpBtn.onClick.AddListener(()=>{
            console.log("퀘스트 포기");
            this.QuestGiveUp();
        });

        this.myQuestBtn.onClick.AddListener(()=>{
            console.log("내 퀘스트 열기");
            this.myQuestUI.SetActive(true);
            if(this.isNowAccept==false){
                this.myQuestScreen.SetActive(false); //퀘스트 안맡았을경우
                this.myQuestXScreen.SetActive(true);
            }
            else{
                this.myQuestScreen.SetActive(true); //퀘스트 맡았을경우
                this.myQuestXScreen.SetActive(false);
            }
        });
        this.MyQuestExitBtn.onClick.AddListener(()=>{
            console.log("내 퀘스트 끄기");
            this.myQuestUI.SetActive(false);
        });

        this.exitBtn.onClick.AddListener(()=>{
            //퀘스트창 끄기
            this.QuestUI.SetActive(false);
            this.LeftPanel.SetActive(false);
        });


        this.MyQuestIngreDiction = this.UIManger.GetComponent<IngredientBookController>().ingredientDict;
    }
    
     //해당 퀘스트를 눌렀을때 재료 아이디값 넣은 배열 불러온다.
     public QuestIngreGiveAuthority(IDArr : number[], idcount: number, foodname: string){ 
        this.ClearMainQuestIngre(); //전에있던거 재료 목록 다지우고
        this.QuestIngreNum = idcount; //퀘스트 받은 재료 종류 수도 등록하여 ingridientinteraction할때 쓸것
        this.QuestFoodName= foodname;
        for(let i=0;i<idcount;i++){
            this.QuestIngreIDArr[i] = IDArr[i];
        }
        this.SetQuestIngreList(this.QuestIngreNum, this.QuestIngreIDArr, this.QuestFoodName); //재료목록 새로 등록
        this.SetMainQuestFoodImage(this.QuestFoodName);
        
    }

    //퀘스트 수락, 사실상 퀘스트에 필요한 데이터들을 부여
    public QuestAccept(){
        this.QuestAcceptIngreNum = this.QuestIngreNum; //임시값을 수락값으로 확정
        this.QuestAcceptFoodName = this.QuestFoodName;
        for(let i=0;i<this.QuestAcceptIngreNum;i++){
            this.QuestAcceptIngreIDArr[i] = this.QuestIngreIDArr[i]; //임시값을 수락값으로 확정
            this.GetIngreCheckDiction.set(this.QuestAcceptIngreIDArr[i],false); //부여된 재료를 한번이라도 먹었는지 체크할 dictionary 초기화
        }
        this.checkAccept = true;
        this.QuestUI.SetActive(false); //퀘스트창 끄기
        this.GetComponent<InventoryController>().ClearInventory();

        this.ClearMyQuest();
        //this.acceptBtn.gameObject.SetActive(false);
        this.StartCoroutine(this.DoCheckAceeptAfterTime());
        this.isNowAccept = true;
        this.GetComponent<InventoryController>().SetInventory(this.QuestIngreNum, this.QuestIngreIDArr); 
        this.SetMyQuest(this.QuestAcceptIngreNum,this.QuestAcceptIngreIDArr,this.QuestAcceptFoodName); //재료 아이디 배열넘김
        this.SetMYQuestFoodImage(this.QuestAcceptFoodName);
        this.isGetIngre = new Array(this.QuestAcceptIngreNum);
        
    }

    *DoCheckAceeptAfterTime(){
        yield new WaitForSeconds(1);
        this.checkAccept=false;
    }


    //퀘스트 포기
    public QuestGiveUp(){

        //퀘스트 안받은상태로 전환
        this.isNowAccept = false;
        //인벤토리 비우기
        this.GetComponent<InventoryController>().ClearInventory();
        //퀘스트도 비우기
        this.ClearMyQuest();
        this.ClearMainQuestIngre();
        this.LeftPanel.SetActive(false);
        this.myQuestScreen.SetActive(false);
        this.myQuestXScreen.SetActive(true);
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
        this.GetComponent<InventoryController>().ClearInventory();
        //퀘스트도 비우기
        this.ClearMyQuest();
        this.ClearMainQuestIngre();
        this.LeftPanel.SetActive(false);

        //먹은상태의 dictionary도 초기화
        for(let i=0;i<this.QuestAcceptIngreNum;i++){
            this.GetIngreCheckDiction.set(this.QuestAcceptIngreIDArr[i],false); //부여된 재료를 한번이라도 먹었는지 체크할 dictionary 초기화
        }

        //부여된 퀘스트 재료 id배열이랑 크기도 초기화
        this.QuestAcceptIngreIDArr = new Array();
        this.QuestAcceptIngreNum = 0;
        
        

    }


    //현재 유저가 퀘스트 진행중일때 퀘스트에 해당하는 재료를 먹었는지 안먹었는지 체크
    public GetIngreCheck(getIngreId: number){

        //진행중일때만
        if(this.isNowAccept==true){
            //먹는 동작 자체를 이미 한개먹었다면 못하게 할것이므로
            /*if(this.GetIngreCheckDiction.get(getIngreId)==false){ //한번도 안먹은 상태가 false이므로 한번은 실행해준다

            }*/
            this.GetIngreCheckDiction.set(getIngreId,true);
        }
    }

    public QuestCompleteCheck() : boolean{  //NPC에게 다시 갔을때 재료를 다먹어서 완료했을경우
        var compleCheck : boolean = true; //퀘스트 완료가능여부 : 딕셔너리 다 검사해서 하나라도 완료 못했으면 false로 바꿀거임

        for(let i=0;i<this.QuestAcceptIngreNum;i++){
            if(this.GetIngreCheckDiction.get(this.QuestAcceptIngreIDArr[i])==false){ //하나라도 못먹었을경우
                compleCheck=false; //퀘스트 완료가능여부 체크 false
            } 
        }

        if(compleCheck==true){
            return true;
        }
        else{
            return false;
        }
    }
    public SetQuestIngreList(size:number, QuestContentsId : number[], foodName: string){

        console.log("내가 지금 선택한 요리의 이름을 알까?: "+ foodName);
        var ingreFood : GameObject;
        //3성음식일때는 2성재료도 추가로 instantiate해야됨
        if(foodName=="팥빙수"){
            ingreFood = GameObject.Instantiate(this.myQuestIngreFactory, this.MainQuestContentTransform) as GameObject;
            ingreFood.name = this.myQuestFoodImgIngre[0].name;

            ingreFood.GetComponent<QuestIngre>().ingredientName.text = this.myQuestFoodImgIngre[0].name;
            ingreFood.GetComponent<QuestIngre>().ingredientImage.sprite = this.myQuestFoodImgIngre[0];
        }
        else if(foodName=="붕어찜"||foodName=="부대찌개"){
            ingreFood = GameObject.Instantiate(this.myQuestIngreFactory, this.MainQuestContentTransform) as GameObject;
            ingreFood.name = this.myQuestFoodImgIngre[1].name;

            ingreFood.GetComponent<QuestIngre>().ingredientName.text = this.myQuestFoodImgIngre[1].name;
            ingreFood.GetComponent<QuestIngre>().ingredientImage.sprite = this.myQuestFoodImgIngre[1];
        }

        for(let i = 0; i < size; i++)
        {
            // 자식으로 생성
            var Ingre : GameObject;

            Ingre = GameObject.Instantiate(this.myQuestIngreFactory, this.MainQuestContentTransform) as GameObject;

            Ingre.name = this.MyQuestIngreDiction.get(QuestContentsId[i]);

            // 재료 이름 설정
            Ingre.GetComponent<QuestIngre>().ingredientName.text = this.MyQuestIngreDiction.get(QuestContentsId[i]);

        }
        this.AddMainQuestIngredientImage();
    }


    public SetMyQuest(size:number, MyQuestContentsId : number[],foodName:string){
        var ingreFood : GameObject;
        //3성음식일때는 2성재료도 추가로 instantiate해야됨
        if(foodName=="팥빙수"){
            ingreFood = GameObject.Instantiate(this.myQuestIngreFactory, this.myQuestContentTransform) as GameObject;
            ingreFood.name = this.myQuestFoodImgIngre[0].name;

            ingreFood.GetComponent<QuestIngre>().ingredientName.text = this.myQuestFoodImgIngre[0].name;
            ingreFood.GetComponent<QuestIngre>().ingredientImage.sprite = this.myQuestFoodImgIngre[0];
        }
        else if(foodName=="붕어찜"||foodName=="부대찌개"){
            ingreFood = GameObject.Instantiate(this.myQuestIngreFactory, this.myQuestContentTransform) as GameObject;
            ingreFood.name = this.myQuestFoodImgIngre[1].name;

            ingreFood.GetComponent<QuestIngre>().ingredientName.text = this.myQuestFoodImgIngre[1].name;
            ingreFood.GetComponent<QuestIngre>().ingredientImage.sprite = this.myQuestFoodImgIngre[1];
        }

        for(let i = 0; i < size; i++)
        {
            // 자식으로 생성
            var Ingre : GameObject;

            Ingre = GameObject.Instantiate(this.myQuestIngreFactory, this.myQuestContentTransform) as GameObject;

            Ingre.name = this.MyQuestIngreDiction.get(MyQuestContentsId[i]);

            // 재료 이름 설정
            Ingre.GetComponent<QuestIngre>().ingredientName.text = this.MyQuestIngreDiction.get(MyQuestContentsId[i]);

        }
        this.AddIngredientImage();
    }

    public ClearMainQuestIngre(){
        //console.log("메인 퀘스트 재료들 삭제실행");
        for(let i = 0; i < this.MainQuestContentTransform.childCount; i++)
        {
            //console.log("메인 퀘스트 재료 삭제중 " + this.MainQuestContentTransform.GetComponentsInChildren<QuestIngre>()[i]);
            GameObject.Destroy(this.MainQuestContentTransform.GetComponentsInChildren<QuestIngre>()[i].gameObject);
        }

    }

    

    public SetMainQuestFoodImage(imgname : string){ //퀘스트창의 음식들 누를때마다 이미지 바뀌는거 실행
        this.FoodImageList.map((image)=>{
            if(imgname==image.name){
                this.MainQuestFoodImg.sprite = image;
            }
        });
        this.MainQuestFoodTxt.text = imgname;
    }

    public SetMYQuestFoodImage(imgname: string){ //내 퀘스트 이미지 설정
        this.FoodImageList.map((image)=>{
            if(imgname==image.name){
                this.MyQuestFoodImg.sprite = image;
            }
        });
        this.MyQuestFoodTxt.text = imgname;
    }

    public ClearMyQuestFoodImage(){
        //this.MyQuestFoodImg.sprite
        this.MyQuestFoodTxt.text = "";
    }



    public ClearMyQuest()
    {
        console.log("맡은 퀘스트 재료들 삭제실행");
        for(let i = 0; i < this.myQuestContentTransform.childCount; i++)
        {
            console.log("퀘스트 재료 삭제중 " + this.myQuestContentTransform.GetComponentsInChildren<QuestIngre>()[i]);
            GameObject.Destroy(this.myQuestContentTransform.GetComponentsInChildren<QuestIngre>()[i].gameObject);
        }
    }


    public AddMainQuestIngredientImage()
    {        
        // 재료 이미지 설정
        this.QuestIngreImageList.map((image) =>{
            // 이미지의 이름이 content 자식 이름이랑 같으면
            this.MainQuestContentTransform.GetComponentsInChildren<QuestIngre>().map((ing) => {
                if(image.name == ing.gameObject.name){
                    //console.log("테스트 " + ing.gameObject.name);
                    ing.gameObject.GetComponent<QuestIngre>().ingredientImage.sprite = image;
                }
            })

        })
    }


    public AddIngredientImage()
    {        
        // 재료 이미지 설정
        this.QuestIngreImageList.map((image) =>{
            // 이미지의 이름이 content 자식 이름이랑 같으면
            this.myQuestContentTransform.GetComponentsInChildren<QuestIngre>().map((ing) => {
                if(image.name == ing.gameObject.name){
                    console.log("테스트 " + ing.gameObject.name);
                    ing.gameObject.GetComponent<QuestIngre>().ingredientImage.sprite = image;
                }
            })

        })
    }

}