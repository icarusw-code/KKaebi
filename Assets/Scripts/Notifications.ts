import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Rect, RectTransform, Time, Vector2, WaitForSeconds } from 'UnityEngine';
import { Image,Text } from 'UnityEngine.UI'
import { Vector3 } from 'ZEPETO.Multiplay.Schema';
import { NotificationFlags } from 'UnityEngine.Timeline';
export default class Notifications extends ZepetoScriptBehaviour {
    public notificationTxt : Text;
    public originPos : Vector2;
    public gotoPos: Vector2;
    public thisTrans : RectTransform;
    public noticheck = false;
    public goTime = false;

    public canGodown = false;
    public canGoUp= false;

    public currentTime : float; 
    public static notiInstance : Notifications;
    static getIns(){
        return this.notiInstance||(this.notiInstance = new this());
    }
    Start() {
        Notifications.notiInstance = this;
        this.notificationTxt = this.transform.GetChild(0).GetComponent<Text>();
        this.thisTrans = this.GetComponent<RectTransform>();
        this.originPos = this.thisTrans.anchoredPosition;

        //this.UpLoadText("헤헤헤");
    }

    Update(){
        if(this.canGodown){ //내려 갈수 있다고 신호받으면
            this.GoDownText();
        }
        if(this.canGoUp){
            this.GoUpText();
        }

        if(this.goTime ==true){
            this.currentTime += Time.deltaTime;
        }
        else if(this.goTime == false){
            this.currentTime=0;
        }
    }

    public UpLoadText(txt : string){
            this.notificationTxt.text = txt;
            this.goTime = false;
            this.canGodown=true; //텍스트 갱신되엇으니 내려갈수 잇게함
            this.canGoUp=false;
    }
    

    public imsiy = 45;
    public GoDownText(){
        this.imsiy -= 200*Time.deltaTime;
        this.thisTrans.anchoredPosition = new Vector2(this.thisTrans.anchoredPosition.x,this.imsiy); //계속 내려간다
        if(this.thisTrans.anchoredPosition.y<=this.gotoPos.y){ //정해진 위치까지 내려오면
            this.thisTrans.anchoredPosition = this.gotoPos;
            this.imsiy=this.gotoPos.y;
            this.goTime=true; //시간세기 시작
            if(this.currentTime>=3){  //시간지났으면
                //올라가자
                this.canGodown=false;
                this.canGoUp=true;
                this.goTime=false; //시간 재생 금지하고 초기화
            }
        }
    }
    //public imsix = -45;
    public GoUpText(){
        this.imsiy += 200*Time.deltaTime; //계속올라간다
        this.thisTrans.anchoredPosition = new Vector2(this.thisTrans.anchoredPosition.x,this.imsiy);
        if(this.thisTrans.anchoredPosition.y>=this.originPos.y){ //초기 위치까지 올라가면
            this.thisTrans.anchoredPosition = this.originPos; //위치 고정
            this.imsiy=this.originPos.y;
            this.canGoUp=false;
        }
    }
}