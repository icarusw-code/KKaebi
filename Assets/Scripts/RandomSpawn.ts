import { GameObject,Vector3, } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import IngredientInfo from '../TS/IngredientInfo';

export default class RandomSpawn extends ZepetoScriptBehaviour {
    public IngredientFactory : GameObject;
    Start() {
    }

    //자기 자리에 소환하는함수
    Spawn(Spawningnum: number){
        var Ingredient : GameObject = GameObject.Instantiate(this.IngredientFactory)as GameObject;
        Ingredient.transform.position = this.transform.position;
        Ingredient.GetComponent<IngredientInfo>().spawnNum = Spawningnum;
    }
}