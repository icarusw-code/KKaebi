import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Button, Image } from 'UnityEngine.UI'
import { GameObject,Sprite,Transform } from 'UnityEngine';
import QuestManager from './QuestManager';
import * as UnityEngine from 'UnityEngine';
export default class RecipeManager extends ZepetoScriptBehaviour {
    public recipeBtnObject: GameObject[];
    public recipeBtn: Button[];
    public makeImage: Sprite;
    Start() {
        for (let i = 0; i < this.recipeBtnObject.Length; i++) {
            this.recipeBtn[i] = this.recipeBtnObject[i].GetComponent<Button>();
        }
        for (let i = 0; i < this.recipeBtn.Length; i++) {
            this.recipeBtn[i].onClick.AddListener(() => { //버튼 누를때 마다 해당 레시피 뜨게할거임)
                console.log("이 버튼 이름은:"+this.recipeBtn[i].name);
                //해당음식에 맞는 레시피 띄움
                //그렇다면 해방 버튼오브젝트의 이름을 가져오고
                //그 이름에 맞는 
            });

        }
    }
    public ReplaceAllRecipeImage(){
        for (let i = 0; i < this.recipeBtnObject.Length; i++) {
            this.TurnOnRecipeImage(this.recipeBtnObject[i]);
        }
    }

    //레시피를 처음 제작했을때 나오게하는, 그리고 나갔다 들어왔을때도 도감의 음식을 표시하게 하는함수
    public TurnOnRecipeImage(btnObject:GameObject){
        //playerpref에서 해당 레시피의 카운트가 1이상이면
        if(UnityEngine.PlayerPrefs.GetInt(btnObject.name)>=1){
            console.log("음식먹은것은:"+btnObject.name+"만든횟수는:"+UnityEngine.PlayerPrefs.GetInt(btnObject.name));
            QuestManager.getInstance().FoodImageList.map((image) =>{    //퀘스트 매니저에 넣어놓은 음식 사진들리스트에서 찾는다.
                if(btnObject.name == image.name){   //버튼이름과 이미지 이름이 맞는것을 찾아서
                    btnObject.transform.GetChild(0).gameObject.GetComponent<Image>().sprite = image; //자식오브젝트(음식이미지가 들어갈) 이미지에 대입한다
                    if(UnityEngine.PlayerPrefs.GetInt(btnObject.name)==1){ //1개 먹은상태면
                        btnObject.transform.GetChild(2).gameObject.GetComponent<Image>().sprite = this.makeImage; //완성했다는 숙련도 표시(첫번째칸)
                    }
                    if(UnityEngine.PlayerPrefs.GetInt(btnObject.name)>=2){
                        btnObject.transform.GetChild(2).gameObject.GetComponent<Image>().sprite = this.makeImage;   //완성했다는 숙련도 표시(첫번째칸)
                        btnObject.transform.GetChild(3).gameObject.GetComponent<Image>().sprite = this.makeImage; //완성했다는 숙련도 표시(두번째칸)
                    }
                }
           });
        }
    }
}