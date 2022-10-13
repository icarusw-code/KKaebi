import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class ButtonClick extends ZepetoScriptBehaviour {


    Start() {    

}

    //재료 프리팹이 생성되고 트리거 온되면
    //UI의 버튼이 생성되고 켜진다.
    //켜질때 버튼의 위치는 프리팹의 위치로
    //그리고 그 버튼의 위치는 프리팹의 스크린좌표계이다.
    
    //켜지는 함수
    TurnOnButton(){
        this.gameObject.SetActive(true); //버튼 UI켜주고
        
    }
    TurnOffButton(){
        this.gameObject.SetActive(false);
    }
}