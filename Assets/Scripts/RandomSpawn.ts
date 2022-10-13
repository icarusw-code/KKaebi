import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class RandomSpawn extends ZepetoScriptBehaviour {
    public IngredientFactory : GameObject;
    public SpawnPoint : GameObject;
    Start() {    
        this.SpawnPoint = GameObject.Find("SpawnPoint");
        this.Spawn();
    }

    Spawn(){
        var Ingredient : GameObject = GameObject.Instantiate(this.IngredientFactory)as GameObject;
        Ingredient.transform.position = this.SpawnPoint.transform.position;
    }
}