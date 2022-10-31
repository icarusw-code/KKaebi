import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class LanguageChange extends ZepetoScriptBehaviour {

    public static instance: LanguageChange;
    public KoreanPack : Map<string,string> = new Map<string,string>();
    public EnlgishPack : Map<string,string> = new Map<string,string>();
    public JapanesePack : Map<string,string> = new Map<string,string>();

    //동적인것들 교체관련
    //NPC퀘스트 창의 음식버튼 (퀘스트 매니저의 foodname을 위해)
    public QMFoodButtonsObj : Button[];
    //NPC퀘스트 창의 음식버튼 (퀘스트 매니저의 foodname을 위해)

    // 정적인것 교체 관련




    static getInstance(){
        return this.instance||(this.instance = new this());
    }


    //!!!!지금 모든 스크립트에서 text변경하는 부분마다 코드 조건식으로 다 달아줄거임 == 체크 매우중요!!!!!! /
    //제일큰 문제 : questmanager의 퀘스트 foodname이 foodinfo스크립트에서 제공된 한글이름을 직접따옴... -> 언어별로 딕셔너리를 만들고 한글 음식 이름을 키값으로 해서 value를 쓰면 되려나? 


    //1. ingredientInteraction 스크립트의 알림창 텍스트
    //2. questmanager 스크립트의 3성요리 만들려 할때 2성음식 없으면 띄우는 알림창 텍스트
    //3.  questmanager 스크립트의 퀘스트 수락할때 ~의 재료를 모아오자
    //4.  questmanager 스크립트의 퀘스트 포기할때 ~를 그만할래


    public LanguageMode : number; //1번: 한국어, 2번: 영어
    Start() {    
        LanguageChange.instance = this;
    }


    //동적인 텍스트들 전부 교체하는 함수
    public ChangeTxtInStatics(){

    }
}