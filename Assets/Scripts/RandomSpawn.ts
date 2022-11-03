import { GameObject,Vector3, } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class RandomSpawn extends ZepetoScriptBehaviour {
    public IngredientFactory : GameObject;
    public IngredientFactory1 : GameObject;
    public IngredientFactory2 : GameObject;
    public IngredientFactory3 : GameObject;
    public IngredientFactory4 : GameObject;
    public IngredientFactory5 : GameObject;
    public IngredientFactory6 : GameObject;
    public IngredientFactory7 : GameObject;
    public IngredientFactory8 : GameObject;
    public IngredientFactory9 : GameObject;
    public IngredientFactory10 : GameObject;
    public SpawnPoint : GameObject;
    Start() {    
        this.SpawnPoint = GameObject.Find("SpawnPoint");
        this.Spawn();
    }

    Spawn(){
        var Ingredient : GameObject = GameObject.Instantiate(this.IngredientFactory)as GameObject;
        var Ingredient1 : GameObject = GameObject.Instantiate(this.IngredientFactory1)as GameObject;
        var Ingredient2 : GameObject = GameObject.Instantiate(this.IngredientFactory2)as GameObject;
        var Ingredient3 : GameObject = GameObject.Instantiate(this.IngredientFactory3)as GameObject;
        var Ingredient4 : GameObject = GameObject.Instantiate(this.IngredientFactory4)as GameObject;
        var Ingredient5 : GameObject = GameObject.Instantiate(this.IngredientFactory5)as GameObject;
        var Ingredient6 : GameObject = GameObject.Instantiate(this.IngredientFactory6)as GameObject;
        var Ingredient7 : GameObject = GameObject.Instantiate(this.IngredientFactory7)as GameObject;
        var Ingredient8 : GameObject = GameObject.Instantiate(this.IngredientFactory8)as GameObject;
        var Ingredient9 : GameObject = GameObject.Instantiate(this.IngredientFactory9)as GameObject;
        var Ingredient10 : GameObject = GameObject.Instantiate(this.IngredientFactory10)as GameObject;
        Ingredient.transform.position = this.SpawnPoint.transform.position + new Vector3(1,0,0);
        Ingredient1.transform.position = this.SpawnPoint.transform.position + new Vector3(2,0,0);
        Ingredient2.transform.position = this.SpawnPoint.transform.position + new Vector3(3,0,0);
        Ingredient3.transform.position = this.SpawnPoint.transform.position + new Vector3(-1,0,0);
        Ingredient4.transform.position = this.SpawnPoint.transform.position + new Vector3(-2,0,0);
        Ingredient5.transform.position = this.SpawnPoint.transform.position + new Vector3(-3,0,0);
        Ingredient6.transform.position = this.SpawnPoint.transform.position + new Vector3(2,0,2);
        Ingredient7.transform.position = this.SpawnPoint.transform.position + new Vector3(3,0,3);
        Ingredient8.transform.position = this.SpawnPoint.transform.position + new Vector3(4,0,0);
        Ingredient9.transform.position = this.SpawnPoint.transform.position + new Vector3(-4,0,0);
        Ingredient10.transform.position = this.SpawnPoint.transform.position + new Vector3(5,0,0);
    }
}