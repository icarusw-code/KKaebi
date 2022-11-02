import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Button, Image, Text } from 'UnityEngine.UI'
import { GameObject,Sprite,Transform } from 'UnityEngine';
import QuestManager from './QuestManager';
import * as UnityEngine from 'UnityEngine';
import FoodInfoData from './FoodInfoData';
import LanguageChange from './Language/LanguageChange';
export default class RecipeManager extends ZepetoScriptBehaviour {

    // =========상세정보============== // 
    public foodInfoObject : GameObject;
    foodInfoExtBtn : Button;
    foodName : Text;
    foodImage : Image;
    foodSub : Text;
    foodIngre : Text;
    foodRecipe : Text;
    // ============================== // 

    public recipeBtnObject: GameObject[];
    public recipeBtn: Button[];
    public makeImage: Sprite;

    foodInfo : GameObject;

    Start() {
        for (let i = 0; i < this.recipeBtnObject.Length; i++) {
            this.recipeBtn[i] = this.recipeBtnObject[i].GetComponent<Button>();
        }
        for (let i = 0; i < this.recipeBtn.Length; i++) {
            this.recipeBtn[i].onClick.AddListener(() => { //버튼 누를때 마다 해당 레시피 뜨게할거임)
                //그렇다면 해방 버튼오브젝트의 이름을 가져오고
                //그 이름에 맞는 
                console.log("이 버튼 이름은:"+this.recipeBtn[i].name);

                if(UnityEngine.PlayerPrefs.GetInt(this.recipeBtn[i].name)>=1){
                    // 그전꺼 지워주기
                    if(this.foodInfo != null) GameObject.Destroy(this.foodInfo);
                    //해당음식에 맞는 레시피 띄움
                    this.foodInfo = GameObject.Instantiate(this.foodInfoObject) as GameObject;
                    this.foodInfoExtBtn = this.foodInfo.transform.GetChild(0).GetComponentInChildren<Button>();
                    this.foodName = this.foodInfo.transform.GetChild(0).GetChild(0).GetChild(2).GetComponentsInChildren<Text>()[0];
                    // 음식 이미지 넣기
                    this.foodImage = this.foodInfo.transform.GetChild(0).GetChild(0).GetChild(2).GetComponentsInChildren<Image>()[3];
                    QuestManager.getInstance().FoodImageList.map((image) =>{
                        if(this.recipeBtn[i].name == image.name){
                            this.foodImage.sprite = image;
                        }
                    });


                    // 한국어
                    if(LanguageChange.getInstance().LanguageMode == 1){
                        // 음식 이름 넣기
                        this.foodName.text = "이름 : " + this.recipeBtn[i].name;
                        // 음식 간략 설명
                        this.foodSub =  this.foodInfo.transform.GetChild(0).GetChild(0).GetChild(2).GetComponentsInChildren<Text>()[1];
                        this.foodSub.text = FoodInfoData.getInstance().foodDetailInfo.get(this.recipeBtn[i].name)[0];
    
                        // 음식 재료
                        this.foodIngre = this.foodInfo.transform.GetChild(0).GetChild(0).GetChild(2).GetComponentsInChildren<Text>()[2];
                        this.foodIngre.text = FoodInfoData.getInstance().foodDetailInfo.get(this.recipeBtn[i].name)[1];
    
                        // 음식 제작 방법
                        this.foodRecipe = this.foodInfo.transform.GetChild(0).GetChild(0).GetChild(2).GetComponentsInChildren<Text>()[3];
                        this.foodRecipe.text = FoodInfoData.getInstance().foodDetailInfo.get(this.recipeBtn[i].name)[2];
                    }
                    // 영문
                    else if(LanguageChange.getInstance().LanguageMode == 2){
                        // 음식 이름 넣기
                        this.foodName.text = "Name : " + LanguageChange.getInstance().EnlgishPack.get(this.recipeBtn[i].name);
                        // 음식 간략 설명
                        this.foodSub =  this.foodInfo.transform.GetChild(0).GetChild(0).GetChild(2).GetComponentsInChildren<Text>()[1];
                        this.foodSub.text = FoodInfoData.getInstance().foodDetailInfo_EN.get(LanguageChange.getInstance().EnlgishPack.get(this.recipeBtn[i].name))[0];
                        // 음식 재료
                        this.foodIngre = this.foodInfo.transform.GetChild(0).GetChild(0).GetChild(2).GetComponentsInChildren<Text>()[2];
                        this.foodIngre.text = FoodInfoData.getInstance().foodDetailInfo_EN.get(LanguageChange.getInstance().EnlgishPack.get(this.recipeBtn[i].name))[1];
    
                        // 음식 제작 방법
                        this.foodRecipe = this.foodInfo.transform.GetChild(0).GetChild(0).GetChild(2).GetComponentsInChildren<Text>()[3];
                        this.foodRecipe.text = FoodInfoData.getInstance().foodDetailInfo_EN.get(LanguageChange.getInstance().EnlgishPack.get(this.recipeBtn[i].name))[2];

                    }

                    // 창 종료 버튼 활성화
                    this.foodInfoExtBtn.onClick.AddListener(()=>{
                        console.log("상세정보 끄기");
                        GameObject.Destroy(this.foodInfo);
                    });
                }
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