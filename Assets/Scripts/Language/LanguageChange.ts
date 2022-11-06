import { GameObject } from 'UnityEngine';
import { Button,Text } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import IngredientBookController from '../../TS/IngredientBookController';
import IngredientInfo from '../../TS/IngredientInfo';
import KkaebiInfo from '../../TS/KkaebiInfo';
import FoodInfo from '../FoodInfo';
import QuestManager from '../QuestManager';
import TutorialManager from '../TutorialManager';
import TxtEnglishName from './TxtEnglishName';
export default class LanguageChange extends ZepetoScriptBehaviour {

    public static instance: LanguageChange;
    public EnlgishPack : Map<string,string> = new Map<string,string>(); //영어팩
    public KoreanPack :  Map<string,string> = new Map<string,string>();

    //영어 키값에서 한국value 얻기
    public EnglishToKoreanDiction : Map<string,string> = new Map<string,string>();

    //동적인것들 교체관련
    //NPC퀘스트 창의 음식버튼 (퀘스트 매니저의 foodname을 위해)
    public QMFoodButtonsObj : GameObject[];
    //NPC퀘스트 창의 재료버튼 (퀘스트 매니저의 음식 재료를 위해)
    public QMIngrePrefabsObj : GameObject[];

    // 정적인것 교체 관련
    //재료 도감 버튼오브젝트들
    public BookIngreButtonObj : GameObject[];
    //음식도감
    public BookFoodButtonObj : GameObject[];
    //깨비도감
    public BookKkaebiButtonObj : GameObject[];
    //이미 맡은 퀘스트도 언어변경위함
    public MyQuestContent :  GameObject;
    //이미 맡은 퀘스트의 음식 이름 변경
    public MyQuestFoodText: GameObject;
    //이미 가지고있는 인벤토리
    public InventoryContent: GameObject;
    //NPC도 이미 띄워진 퀘스트 재료들
    public NpcQuestContent : GameObject;
    
    public TutorialManagerObject:GameObject;
    //고정된 UI들
    //1. 도감 메뉴 바꾸는 버튼 텍스트
    public AllOfStaticTexts : Text[];
    //2.깨비 도감 꺼내기 넣기 *일단 오브젝트에 들어간 스크립트는 UnsummonLang스크립트로 통일
    //public KkaebiButtonSummonText : Text[];
    //3. 내 퀘스트 제목, 내퀘스트 없을때 제목, 없습니다 텍스트

    //4. 내퀘스트 요리중단하기

    //5. NPC 퀘스트 요리하기버튼, 제목, 1성2성3성



    //
    /////////////////////////////////////////////////
    public FinalSettingAcceptBtn : Button;

    public IngrdientBookController : GameObject;
    Awake(){
        LanguageChange.instance = this;
    }

    static getInstance(){
        return this.instance||(this.instance = new this());
    }


    //1. ingredientInteraction 스크립트의 알림창 텍스트

    public LanguageMode : number; //1번: 한국어, 2번: 영어
    Start() {    
        
        //동적
        for(let i=0; i<this.QMFoodButtonsObj.length;i++){ //음식이름 영어데이터 저장
            this.KoreanPack.set(this.QMFoodButtonsObj[i].GetComponent<FoodInfo>().foodname,this.QMFoodButtonsObj[i].GetComponent<FoodInfo>().foodname);
            this.EnlgishPack.set(this.QMFoodButtonsObj[i].GetComponent<FoodInfo>().foodname,this.QMFoodButtonsObj[i].GetComponent<FoodInfo>().foodEnlgishName);
        }
        for(let i=0; i<this.QMIngrePrefabsObj.length;i++){ //재료이름 영어데이터 저장
            this.KoreanPack.set(this.IngrdientBookController.GetComponent<IngredientBookController>().ingredientDict.get(this.QMIngrePrefabsObj[i].GetComponent<IngredientInfo>().id),this.IngrdientBookController.GetComponent<IngredientBookController>().ingredientDict.get(this.QMIngrePrefabsObj[i].GetComponent<IngredientInfo>().id));
            this.EnlgishPack.set(
                this.IngrdientBookController.GetComponent<IngredientBookController>().ingredientDict.get(this.QMIngrePrefabsObj[i].GetComponent<IngredientInfo>().id),
            this.QMIngrePrefabsObj[i].GetComponent<IngredientInfo>().EnlgishName);
        } //북컨트롤의 인그리디언트의 string,int 꼴로 저장된 딕셔너리에 재료 프리팹에 달려있는 id키값으로 접근해 이름을 얻고, 그 이름을 키값으로 재료프리팹에 달린 영어이름value로 저장

        //정적
        for(let i =0 ; i<this.BookIngreButtonObj.length;i++){ //재료도감 영어데이터 저장
            this.KoreanPack.set(this.BookIngreButtonObj[i].name,this.BookIngreButtonObj[i].name);
            this.EnlgishPack.set(this.BookIngreButtonObj[i].name,this.BookIngreButtonObj[i].GetComponent<IngredientInfo>().EnlgishName);
        }

        for(let i =0 ; i<this.BookFoodButtonObj.length;i++){ //재료도감 영어데이터 저장
            this.KoreanPack.set(this.BookFoodButtonObj[i].name,this.BookFoodButtonObj[i].name);
            this.EnlgishPack.set(this.BookFoodButtonObj[i].name,this.BookFoodButtonObj[i].GetComponent<FoodInfo>().foodEnlgishName);
        }
        for(let i =0 ; i<this.BookKkaebiButtonObj.length;i++){ //재료도감 영어데이터 저장
            this.KoreanPack.set(this.BookKkaebiButtonObj[i].name,this.BookKkaebiButtonObj[i].name);
            this.EnlgishPack.set(this.BookKkaebiButtonObj[i].name,this.BookKkaebiButtonObj[i].GetComponent<KkaebiInfo>().EnglishName);
        }
        for(let i =0; i<this.AllOfStaticTexts.length;i++){
            this.EnlgishPack.set(this.AllOfStaticTexts[i].gameObject.name,this.AllOfStaticTexts[i].GetComponent<TxtEnglishName>().EnglishName);
        }

        //음식 이름이랑 재료 이름 다 상세설명용 딕셔너리에 넣기
        for(let i=0; i<this.QMIngrePrefabsObj.length;i++){
            this.EnglishToKoreanDiction.set(this.QMIngrePrefabsObj[i].GetComponent<IngredientInfo>().EnlgishName,this.IngrdientBookController.GetComponent<IngredientBookController>().ingredientDict.get(this.QMIngrePrefabsObj[i].GetComponent<IngredientInfo>().id));
        }
        for(let i=0; i<this.QMFoodButtonsObj.length;i++){
            this.EnglishToKoreanDiction.set(this.QMFoodButtonsObj[i].GetComponent<FoodInfo>().foodEnlgishName,this.QMFoodButtonsObj[i].GetComponent<FoodInfo>().foodname);
        }
    }


    //정적인 텍스트들 다른언어로 전부 교체하는 함수
    public ChangeTxtInStatics(languageType: number){
        if(languageType ==1 ){
            for (let i = 0; i < this.BookIngreButtonObj.length; i++) { //재료도감 한글로 교체
                this.BookIngreButtonObj[i].transform.GetChild(1).GetComponent<Text>().text = this.BookIngreButtonObj[i].name;
            }
            for (let i = 0; i < this.BookFoodButtonObj.length; i++) { //음식도감 한글로 교체
                this.BookFoodButtonObj[i].transform.GetChild(1).GetComponent<Text>().text =this.BookFoodButtonObj[i].name;
            }
            for (let i = 0; i < this.BookKkaebiButtonObj.length; i++) { //깨비도감 한글로 교체
                this.BookKkaebiButtonObj[i].transform.GetChild(1).GetComponent<Text>().text = this.BookKkaebiButtonObj[i].name;
            }
            for(let i=0; i<this.QMFoodButtonsObj.length;i++){ //퀘스트 음식이름 영어로 교체
                this.QMFoodButtonsObj[i].transform.GetChild(0).GetComponent<Text>().text = this.QMFoodButtonsObj[i].name;
            }
            for(let i=0; i<this.InventoryContent.transform.childCount;i++){ //인벤토리에 이미 들어간 재료들 한글로 교체
                this.InventoryContent.transform.GetChild(i).GetChild(1).GetComponent<Text>().text = this.InventoryContent.transform.GetChild(i).name;
            }
            for(let i=0; i<this.MyQuestContent.transform.childCount;i++){ //인벤토리에 이미 들어간 재료들 한글로 교체
                this.MyQuestContent.transform.GetChild(i).GetChild(1).GetComponent<Text>().text = this.MyQuestContent.transform.GetChild(i).name;
            }
            for(let i=0; i<this.NpcQuestContent.transform.childCount;i++){ //인벤토리에 이미 들어간 재료들 한글로 교체
                this.NpcQuestContent.transform.GetChild(i).GetChild(1).GetComponent<Text>().text = this.NpcQuestContent.transform.GetChild(i).name;
            }

            this.MyQuestFoodText.transform.GetChild(0).GetComponent<Text>().text = this.MyQuestFoodText.name; //내퀘스트 음식 이름 한글
            for(let i =0; i<this.AllOfStaticTexts.length;i++){
                this.AllOfStaticTexts[i].text = this.AllOfStaticTexts[i].gameObject.name;
            }
            this.TutorialManagerObject.GetComponent<TutorialManager>().DoTextUpdate();
        }
        if (languageType == 2) {
            for (let i = 0; i < this.BookIngreButtonObj.length; i++) { //재료도감 영어로 교체
                this.BookIngreButtonObj[i].transform.GetChild(1).GetComponent<Text>().text = this.EnlgishPack.get(this.BookIngreButtonObj[i].name);
            }
            for (let i = 0; i < this.BookFoodButtonObj.length; i++) { //음식도감 영어로 교체
                this.BookFoodButtonObj[i].transform.GetChild(1).GetComponent<Text>().text = this.EnlgishPack.get(this.BookFoodButtonObj[i].name);
            }
            for (let i = 0; i < this.BookKkaebiButtonObj.length; i++) { //깨비도감 영어로 교체
                this.BookKkaebiButtonObj[i].transform.GetChild(1).GetComponent<Text>().text = this.EnlgishPack.get(this.BookKkaebiButtonObj[i].name);
            }
            for(let i=0; i<this.QMFoodButtonsObj.length;i++){ //퀘스트 음식이름 영어로 교체
                this.QMFoodButtonsObj[i].transform.GetChild(0).GetComponent<Text>().text = this.EnlgishPack.get(this.QMFoodButtonsObj[i].name);
            }
            for(let i=0; i<this.InventoryContent.transform.childCount;i++){ //인벤토리에 이미 들어간 재료들 영어로 교체
                this.InventoryContent.transform.GetChild(i).GetChild(1).GetComponent<Text>().text = this.EnlgishPack.get(this.InventoryContent.transform.GetChild(i).name);
            }
            for(let i=0; i<this.MyQuestContent.transform.childCount;i++){ //인벤토리에 이미 들어간 재료들 영어로 교체
                this.MyQuestContent.transform.GetChild(i).GetChild(1).GetComponent<Text>().text = this.EnlgishPack.get(this.MyQuestContent.transform.GetChild(i).name);
            }
            for(let i=0; i<this.NpcQuestContent.transform.childCount;i++){ //인벤토리에 이미 들어간 재료들 한글로 교체
                this.NpcQuestContent.transform.GetChild(i).GetChild(1).GetComponent<Text>().text = this.EnlgishPack.get(this.NpcQuestContent.transform.GetChild(i).name);
            }

            this.MyQuestFoodText.transform.GetChild(0).GetComponent<Text>().text = this.EnlgishPack.get(this.MyQuestFoodText.name); //내퀘스트 음식 이름 영어
            for(let i =0; i<this.AllOfStaticTexts.length;i++){
                this.AllOfStaticTexts[i].text = this.EnlgishPack.get(this.AllOfStaticTexts[i].gameObject.name);
            }
            this.TutorialManagerObject.GetComponent<TutorialManager>().DoTextUpdate();
        }
        


        //인벤토리에 원래 들어있던것들이랑, 현재 맡고있는 퀘스트도 바꿔야됨
        //컨텐트에 있는 자식개수들만큼 반복문
        //그 자식들의 텍스트를 영어화/한글화
        
        //정적인 모든 UI다 찾아서 한글화/영어화
    }
}