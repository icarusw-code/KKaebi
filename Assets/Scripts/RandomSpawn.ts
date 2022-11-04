import { GameObject,Vector3, } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class RandomSpawn extends ZepetoScriptBehaviour {
    public IngredientFactory : GameObject;
    public SpawnPoint : GameObject;
    Start() {    
        this.SpawnPoint = GameObject.Find("SpawnPoint");
        this.Spawn(this.SpawnPoint.transform.position);
    }

    Spawn(summonPoint : Vector3){
        var Ingredient : GameObject = GameObject.Instantiate(this.IngredientFactory)as GameObject;

        Ingredient.transform.position = summonPoint;
    }
}