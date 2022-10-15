import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class FoodInfo extends ZepetoScriptBehaviour {

    //필요한 음식 id들
    public idArr : number[];
    public foodId: number;
    public foodname : string;
    Start(){
        this.foodname = this.gameObject.name;
    }
   

}