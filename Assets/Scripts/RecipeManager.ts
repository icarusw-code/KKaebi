/*import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Button, Image } from 'UnityEngine.UI'
import { GameObject } from 'UnityEngine';
import QuestManager from './QuestManager';
import * as UnityEngine from 'UnityEngine';
export default class RecipeManager extends ZepetoScriptBehaviour {
    public recipeBtnObject: GameObject[];
    public recipeBtn: Button[];
    Start() {
        

        for (let i = 0; i < this.recipeBtnObject.Length; i++) {
            this.recipeBtn[i] = this.recipeBtnObject[i].GetComponent<Button>();
        for (let i = 0; i < this.recipeBtn.Length; i++) {
            this.recipeBtn[i].onClick.AddListener(() => { //버튼 누를때 마다 해당 레시피 뜨게할거임)
                //해당음식에 맞는 레시피 띄움
                //그렇다면 해방 버튼오브젝트의 이름을 가져오고
                //그 이름에 맞는 
            });
        }
    }
    }
    //레시피를 처음 제작했을때 나오게하는, 그리고 나갔다 들어왔을때도 도감의 음식을 표시하게 하는함수
    public TurnOnRecipeImage(btnObject:GameObject){
        //playerpref에서 해당 레시피의 카운트가 1이상이면
        if(UnityEngine.PlayerPrefs.GetInt(btnObject.name)>=1){
            QuestManager.getInstance().FoodImageList.map((image) =>{
                if(btnObject.name == image.name){
   
                }
           })
        }

        //이미지리스트에서 레시피 버튼의 이름과 같은 이미지를 찾으면
        /*QuestManager.getInstance().FoodImageList.map((image) =>{
             if(btnObject.name == image.name){

             }
        })
        // btnimagesibling에 넣어야한다.
    }

}*/