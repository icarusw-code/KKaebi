import { GameObject } from 'UnityEngine'
import { Button,Text } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class TutorialUI extends ZepetoScriptBehaviour {
    public TutorialButton:Button;
    public TutorialUIObj:GameObject;
    public txtNum: number;
    public TutorialStory: string[];
    public NextBtn:Button;
    public BeforeBtn:Button;
    public CurrentPageNuM:number = 0;
    public TutorialText: Text;
    Start() {    
        this.TutorialButton.onClick.AddListener(()=>{
            this.TutorialUIObj.SetActive(true);
        });
        this.NextBtn.onClick.AddListener(()=>{
            this.GoNext();
        });
        this.BeforeBtn.onClick.AddListener(()=>{
            this.GoBefore();
        });

        this.TutorialStory[0] = "으에엑1";
        this.TutorialStory[1] = "으에엑2!";
        this.TutorialStory[2] = "으에엑3!!";
        this.TutorialStory[3] = "으에엑4!!!";
        this.TutorialStory[4] = "으에엑5!!!!";
        this.TutorialStory[5] = "으에엑6!!!!!";
        this.TutorialStory[6] = "으에엑7!!!!!!";

        this.TutorialText.text = this.TutorialStory[0];
        this.BeforeBtn.gameObject.SetActive(false);
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