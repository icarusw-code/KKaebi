import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Image, Text } from 'UnityEngine.UI'

export default class Slot extends ZepetoScriptBehaviour {

    // 재료 이름
    public ingredientName : Text;
    // 재료 이미지
    public ingredientImage : Image;

    Start() {    
        // 이름에 현재 음식이름 넣어주기
        this.ingredientName.text = "빈박스";
        

    }

}