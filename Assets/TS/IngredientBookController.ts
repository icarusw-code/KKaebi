import { Color, GameObject, PlayerPrefs, Sprite } from 'UnityEngine'
import { Button, Image, Text } from 'UnityEngine.UI'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import IngreInfoData from '../Scripts/IngreInfoData';
import LanguageChange from '../Scripts/Language/LanguageChange';
import IngredientInfo from './IngredientInfo';

export default class IngredientBookController extends ZepetoScriptBehaviour {

    // =========상세정보============== // 
    public ingreInfoObject : GameObject;
    public ingreBtn : Button[];
    ingreName : Text;
    ingreImage : Image;
    ingreSub : Text;    
    ingreInfo : GameObject;
    ingreInfoExtBtn : Button;
    // ============================== //

    public ingredientList : GameObject[];

    public ingredientDict : Map<number, string> = new Map<number, string>();

    public ingredientImgList : Sprite[];

    Start(){

        // id : 이름 를 가진 재료 딕셔너리 생성
        this.ingredientList.map((d) => {
            this.ingredientDict.set(d.GetComponent<IngredientInfo>().id, d.gameObject.name);
        });

        // 버튼 넣어주기
        for(let i = 0; i <this.ingredientList.Length; i++){
            this.ingreBtn[i] = this.ingredientList[i].GetComponent<Button>();
            this.IngreBookImageColor();
        }

        // 버튼 클릭시
        for(let i = 0; i < this.ingredientList.Length; i++)
        {
            this.ingreBtn[i].onClick.AddListener(() =>{
                console.log("이 버튼 이름은 : " + this.ingreBtn[i].name);
                if(PlayerPrefs.GetInt(this.ingredientList[i].GetComponent<IngredientInfo>().id.toString()) >= 1)
                {
                    // 그전꺼 지워주기
                    if(this.ingreInfo != null) GameObject.Destroy(this.ingreInfo);
                    // 해당재료 상세정보 띄움
                    this.ingreInfo = GameObject.Instantiate(this.ingreInfoObject) as GameObject;

                    // 닫기 버튼
                    this.ingreInfoExtBtn = this.ingreInfo.transform.GetChild(0).GetComponentInChildren<Button>();

                    // 재료 이미지 넣기
                    this.ingreImage = this.ingreInfo.transform.GetChild(0).GetChild(0).GetChild(2).GetComponentsInChildren<Image>()[3];
                    this.ingredientImgList.map((image) => {
                        if(this.ingreBtn[i].name == image.name){
                            this.ingreImage.sprite = image;
                        }
                    });

                    if(LanguageChange.getInstance().LanguageMode == 1){
                        // 재료 이름 넣기
                        this.ingreName = this.ingreInfo.transform.GetChild(0).GetChild(0).GetChild(2).GetComponentsInChildren<Text>()[0];
                        this.ingreName.text = "이름 : " + this.ingreBtn[i].name;
                        // 재료 설명 넣기
                        this.ingreSub = this.ingreInfo.transform.GetChild(0).GetChild(0).GetChild(2).GetComponentsInChildren<Text>()[1];
                        this.ingreSub.text = IngreInfoData.getInstance().ingreDetailInfo.get(this.ingreBtn[i].name)[0];
                    }
                    else if(LanguageChange.getInstance().LanguageMode == 2){                       
                         // 재료 이름 넣기
                        this.ingreName = this.ingreInfo.transform.GetChild(0).GetChild(0).GetChild(2).GetComponentsInChildren<Text>()[0];
                        this.ingreName.text = "Name : " + LanguageChange.getInstance().EnlgishPack.get(this.ingreBtn[i].name);
                        // 재료 설명 넣기
                        this.ingreSub = this.ingreInfo.transform.GetChild(0).GetChild(0).GetChild(2).GetComponentsInChildren<Text>()[1];
                        this.ingreSub.text = IngreInfoData.getInstance().ingreDetailInfo_EN.get(LanguageChange.getInstance().EnlgishPack.get(this.ingreBtn[i].name))[0];
                        
                    }

                    // 창 종료 버튼 활성화
                    this.ingreInfoExtBtn.onClick.AddListener(()=>{
                        console.log("상세정보 끄기");
                        GameObject.Destroy(this.ingreInfo);
                    });
                }
            });

        }

    }

    Update() {    

        // 재료 도감 카운트 세팅
        // 텍스트 값을 PlayerPrefs 로 카운트를 가져와서 적용해줌
        this.ingredientList.map((d) => {
            d.transform.GetChild(2).GetComponent<Text>().text = PlayerPrefs.GetInt(d.GetComponent<IngredientInfo>().id.toString()).toString();
        });

    }

    public IngreBookImageColor(){
        for(let i = 0; i <this.ingredientList.Length; i++){
            //재료 먹은거 1개이상있으면
            if(PlayerPrefs.GetInt(this.ingredientList[i].GetComponent<IngredientInfo>().id.toString())>=1){
                let colors : Color;
                colors = this.ingredientList[i].transform.GetChild(0).GetComponent<Image>().color;
                colors.a = 255;
                this.ingredientList[i].transform.GetChild(0).GetComponent<Image>().color = colors;
                //투명도 선명하게
            }
        }
    }

}