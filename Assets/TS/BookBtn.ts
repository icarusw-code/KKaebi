import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Button, Image} from "UnityEngine.UI";
import { GameObject, Sprite } from 'UnityEngine';
import { UIZepetoPlayerControl, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { Background, ScrollView } from 'UnityEngine.UIElements';

export default class BookBtn extends ZepetoScriptBehaviour {

    public bookIconBtn : Button;
    public book : GameObject;

    public ingredientTab : Button;
    public recipeTab : Button;
    public kkaebiTab : Button;

    public ingredientBook : GameObject;
    public recipeBook : GameObject;

    isActive : boolean = false;
    public backGroundImgList : Sprite[];
    public backGroundImg : Image;
    private playerController : GameObject;

    Start() {    
        
        // 도감 아이콘 눌렀을 떄
        this.bookIconBtn.onClick.AddListener(() => {
            this.backGroundImg = this.book.transform.GetChild(0).GetComponent<Image>();

            this.playerController = ZepetoPlayers.instance.transform.GetChild(4).gameObject;

            // 도감 켜주기
            this.isActive ? this.book.SetActive(false) : this.book.SetActive(true);

            // 컨트롤러 꺼주기
            this.isActive ? this.playerController.SetActive(true) : this.playerController.SetActive(false);

            this.isActive = !this.isActive;
            
        });


        // 재료 탭 눌렀을 때
        this.ingredientTab.onClick.AddListener(() => {
            // 재료 창만 띄우고 싶다.
            this.ingredientBook.SetActive(true);
            this.recipeBook.SetActive(false);
            this.backGroundImg.sprite = this.backGroundImgList[0];
        });

        // 레시피 탭 눌렀을 때
        this.recipeTab.onClick.AddListener(() => {
            // 레시피 창만 띄우고 싶다.
            this.ingredientBook.SetActive(false);
            this.recipeBook.SetActive(true);
            this.backGroundImg.sprite = this.backGroundImgList[1];
        });


    }

}