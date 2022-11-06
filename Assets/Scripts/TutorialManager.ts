import { GameObject } from 'UnityEngine'
import { Button,Text } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import * as UnityEngine from 'UnityEngine'
import LanguageChange from './Language/LanguageChange';
export default class TutorialManager extends ZepetoScriptBehaviour {
    public TutorialButton:Button;
    public TutorialUIObj:GameObject;
    public txtNum: number;
    public TutorialStory: string[];
    public NextBtn:Button;
    public BeforeBtn:Button;
    public CurrentPageNuM:number = 0;
    public TutorialText: Text;
    public TutorialExitBtn: Button;

    
    Start() {    
        if(UnityEngine.PlayerPrefs.GetInt("방문횟수")==0){
            this.TutorialUIObj.SetActive(true);
        }
        UnityEngine.PlayerPrefs.SetInt("방문횟수",UnityEngine.PlayerPrefs.GetInt("방문횟수")+1);
        this.TutorialButton.onClick.AddListener(()=>{
            this.TutorialUIObj.SetActive(true);
        });
        this.NextBtn.onClick.AddListener(()=>{
            this.GoNext();
        });
        this.BeforeBtn.onClick.AddListener(()=>{
            this.GoBefore();
        });
        this.TutorialExitBtn.onClick.AddListener(()=>{
            this.TutorialUIObj.SetActive(false);
        });
        this.DoTextUpdate();
        this.TutorialText.text = this.TutorialStory[0];
        this.BeforeBtn.gameObject.SetActive(false);
        
    }

    public DoTextUpdate(){
        if (LanguageChange.getInstance().LanguageMode == 1) {
            this.TutorialStory[0] = "'한식깨비 야시장'에 온 걸 환영한다! 난 야시장의 대부, 대왕깨비란다.";
            this.TutorialStory[1] = "야시장에 손님이 너무 많이 오는 바람에 음식이 다 떨어졌단다.";
            this.TutorialStory[2] = "야시장과 숲을 돌아보면서 한식에 필요한 재료를 구해서 나를 찾아오면 요리를 만들어주마.";
            this.TutorialStory[3] = "도깨비불이 있는 곳에서 아래로 뛰어내려 나를 찾아와보렴!";
        }
        else if (LanguageChange.getInstance().LanguageMode == 2) {
            this.TutorialStory[0] = "Welcome to the 'Hansik Kkebi Night Market'! I'm the godfather of the Night Market, the King Kkebi.";
            this.TutorialStory[1] = "We ran out of food because we had so many guests!";
            this.TutorialStory[2] = "Around the Night Market and forest, get ingredients for Korean food, and I'll make you a dish for you.";
            this.TutorialStory[3] = "Jump down where the Dokkebi light is and find me!";
        }
    }


    public GoNext(){
        //페이지 숫자 올리고 텍스트를 해당 페이지에 맞게 바꿔줌
        this.txtNum++;
        this.TutorialText.text = this.TutorialStory[this.txtNum];
        //더했을때 결과가 끝페이지라면
        if(this.txtNum==this.TutorialStory.length-1){
            //다음페이지로 넘어가는 버튼 꺼준다.
            this.NextBtn.gameObject.SetActive(false);
        }
        //그리고 더했을때 첫페이지보다 뒤라면 이전페이지로 넘어가는 버튼을 켜준다
        else if(this.txtNum!=0){
            this.BeforeBtn.gameObject.SetActive(true);
        }
    }
    public GoBefore(){
        //페이지 숫자 내리고 텍스트를 해당 페이지에 맞게 바꿔줌
        this.txtNum--;
        this.TutorialText.text = this.TutorialStory[this.txtNum];
        //뺏을때 결과가 처음페이지라면
        if(this.txtNum==0){
            //이전페이지로 넘어가는 버튼 꺼준다.
            this.BeforeBtn.gameObject.SetActive(false);
        }
        //그리고 더했을때 끝페이지보다 앞이라면 다음페이지로 넘어가는 버튼을 켜준다
        else if(this.txtNum!=this.TutorialStory.length){
            this.NextBtn.gameObject.SetActive(true);
        }
    }
}