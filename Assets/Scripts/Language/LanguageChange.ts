import { GameObject } from 'UnityEngine';
import { Button,Text } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import IngredientBookController from '../../TS/IngredientBookController';
import IngredientInfo from '../../TS/IngredientInfo';
import KkaebiInfo from '../../TS/KkaebiInfo';
import FoodInfo from '../FoodInfo';
import QuestManager from '../QuestManager';

export default class LanguageChange extends ZepetoScriptBehaviour {

    public static instance: LanguageChange;
    public EnlgishPack : Map<string,string> = new Map<string,string>(); //영어팩

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


    /////////////////////////////////////////////////

    public IngrdientBookController : GameObject;
    static getInstance(){
        return this.instance||(this.instance = new this());
    }


    //!!!!지금 모든 스크립트에서 text변경하는 부분마다 코드 조건식으로 다 달아줄거임 == 체크 매우중요!!!!!! /
    //제일 큰 문제 : questmanager의 퀘스트 foodname이 foodinfo스크립트에서 제공된 한글이름을 직접따옴... -> 언어별로 딕셔너리를 만들고 한글 음식 이름을 키값으로 해서 value를 쓰면 되려나? 


    //1. ingredientInteraction 스크립트의 알림창 텍스트
    //2. questmanager 스크립트의 3성요리 만들려 할때 2성음식 없으면 띄우는 알림창 텍스트
    //3.  questmanager 스크립트의 퀘스트 수락할때 ~의 재료를 모아오자
    //4.  questmanager 스크립트의 퀘스트 포기할때 ~를 그만할래
    //5.  questmanager에서 퀘스트 클릭시 재료이름들이랑 나의 퀘스트 재료이름들 부여 텍스트

    public LanguageMode : number; //1번: 한국어, 2번: 영어
    Start() {    
        LanguageChange.instance = this;
        //동적
        for(let i=0; i<this.QMFoodButtonsObj.length;i++){ //음식이름 영어데이터 저장
            this.EnlgishPack.set(this.QMFoodButtonsObj[i].GetComponent<FoodInfo>().foodname,this.QMFoodButtonsObj[i].GetComponent<FoodInfo>().foodEnlgishName);
        }
        for(let i=0; i<this.QMIngrePrefabsObj.length;i++){ //재료이름 영어데이터 저장
            this.EnlgishPack.set(
                this.IngrdientBookController.GetComponent<IngredientBookController>().ingredientDict.get(this.QMIngrePrefabsObj[i].GetComponent<IngredientInfo>().id),
            this.QMIngrePrefabsObj[i].GetComponent<IngredientInfo>().EnlgishName);
        } //북컨트롤의 인그리디언트의 string,int 꼴로 저장된 딕셔너리에 재료 프리팹에 달려있는 id키값으로 접근해 이름을 얻고, 그 이름을 키값으로 재료프리팹에 달린 영어이름value로 저장

        //정적
        for(let i =0 ; i<this.BookIngreButtonObj.length;i++){ //재료도감 영어데이터 저장
            this.EnlgishPack.set(this.BookIngreButtonObj[i].name,this.BookIngreButtonObj[i].GetComponent<IngredientInfo>().EnlgishName);
        }

        for(let i =0 ; i<this.BookFoodButtonObj.length;i++){ //재료도감 영어데이터 저장
            this.EnlgishPack.set(this.BookFoodButtonObj[i].name,this.BookFoodButtonObj[i].GetComponent<FoodInfo>().foodEnlgishName);
        }
        for(let i =0 ; i<this.BookKkaebiButtonObj.length;i++){ //재료도감 영어데이터 저장
            this.EnlgishPack.set(this.BookKkaebiButtonObj[i].name,this.BookKkaebiButtonObj[i].GetComponent<KkaebiInfo>().EnglishName);
        }
        var Koreanbtn =  GameObject.Find("Btn11").GetComponent<Button>();
        var Englishbtn =  GameObject.Find("Btn22").GetComponent<Button>();
        Koreanbtn.onClick.AddListener(()=>{
            this.LanguageMode=1;
            this.ChangeTxtInStatics(this.LanguageMode);
        });
        Englishbtn.onClick.AddListener(()=>{
            this.LanguageMode=2;
            this.ChangeTxtInStatics(this.LanguageMode);
        });
    }


    //정적인 텍스트들 다른언어로 전부 교체하는 함수
    public ChangeTxtInStatics(languageType: number){
        for(let i =0 ; i<this.BookIngreButtonObj.length;i++){ //재료도감 영어데이터 저장
            this.BookIngreButtonObj[i].transform.GetChild(1).GetComponent<Text>().text = this.EnlgishPack.get(this.BookIngreButtonObj[i].name);
        }
        for(let i =0 ; i<this.BookFoodButtonObj.length;i++){ //음식도감 영어데이터 저장
            this.BookFoodButtonObj[i].transform.GetChild(1).GetComponent<Text>().text = this.EnlgishPack.get(this.BookFoodButtonObj[i].name);
        }
        for(let i =0 ; i<this.BookKkaebiButtonObj.length;i++){ //깨비도감 영어데이터 저장
            this.BookKkaebiButtonObj[i].transform.GetChild(1).GetComponent<Text>().text = this.EnlgishPack.get(this.BookKkaebiButtonObj[i].name);
        }
    }
}