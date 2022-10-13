import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import * as UnityEngine from 'UnityEngine'
import IngredientInfo from './IngredientInfo';
export default class GameManager extends ZepetoScriptBehaviour {

    public static instance:GameManager;
    public IngreArr : UnityEngine.GameObject[];

    static getInstance(){
        return this.instance||(this.instance = new this());
    }

    Start() {
        GameManager.instance = this;

    }

    public IngredientCountInit(){
        
        this.IngreArr.map((d) => {
            // number 변수 하나 선언해서 요리아이디 으로 만들어줌
            var keyId : number = d.GetComponent<IngredientInfo>().id;
            // 0으로 초기화 세팅
            UnityEngine.PlayerPrefs.SetInt(keyId.toString(), 0);
        });
    }


    public IngredientCountUP(id : number){

        //해당 id를 데이터에서 찾아서 카운트를 올려 저장해줄거임.
        var IngreCount : number = UnityEngine.PlayerPrefs.GetInt(id.toString());
        IngreCount++;
        UnityEngine.PlayerPrefs.SetInt(id.toString(),IngreCount);
        console.log("현재 이녀석의 id는: "+ id + "이고 현재먹은 이 재료의 개수 : " + UnityEngine.PlayerPrefs.GetInt(id.toString()));
    }
    // UnityEngine.PlayerPrefs.SetString("test", "change");

        // 퀘스트가 완료되면 해당 요리 도감 카운트를 올려준다.
        // 1. 그 퀘스트 요리이름을 가져오고
        // 2. string 변수 하나 선언해서 요리이름 으로 만들어줌
        // 3. 현재 카운트를 playerprefs로 가져옴
        // 4. 카운트를 올려준다.
        // 5. 바뀐 카운트를 playerprefs로 다시 저장

        // var count : number = UnityEngine.PlayerPrefs.GetInt("떡꼬치"); 

        // UnityEngine.PlayerPrefs.SetString("도감_떡꼬치", count);
        
        // this.tmp = UnityEngine.PlayerPrefs.GetString("test"); 
        // console.log(this.tmp);

        // this.IngreArr.map((d) => {
        //     // 2. number 변수 하나 선언해서 요리아이디 으로 만들어줌
        //     var keyId : number = d.GetComponent<IngredientInfo>().id
        //     // 3. 현재 카운트를 playerprefs로 가져옴
        //     var count : number = UnityEngine.PlayerPrefs.GetInt(keyId.toString());
        //     // 4. 카운트를 올려준다.
        //     count++;
        //     // 5. 바뀐 카운트를 playerprefs로 다시 저장
        //     UnityEngine.PlayerPrefs.SetInt(keyId.toString(), count);
        //     console.log(keyId);
        // });

}