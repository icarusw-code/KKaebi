import { GameObject, PlayerPrefs } from 'UnityEngine'
import { Text } from 'UnityEngine.UI'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import IngredientInfo from './IngredientInfo';

export default class IngredientBookController extends ZepetoScriptBehaviour {

    public ingredientList : GameObject[];

    public ingredientDict : Map<number, string> = new Map<number, string>();

    Start(){

        // id : 이름 를 가진 재료 딕셔너리 생성
        this.ingredientList.map((d) => {
            this.ingredientDict.set(d.GetComponent<IngredientInfo>().id, d.gameObject.name);
        });

    }

    Update() {    

        // 재료 도감 카운트 세팅
        // 텍스트 값을 PlayerPrefs 로 카운트를 가져와서 적용해줌
        this.ingredientList.map((d) => {
            d.transform.GetChild(2).GetComponent<Text>().text = PlayerPrefs.GetInt(d.GetComponent<IngredientInfo>().id.toString()).toString();
        })
    }

}