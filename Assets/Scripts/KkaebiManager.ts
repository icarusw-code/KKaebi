import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Button } from 'UnityEngine.UI'
import { GameObject } from 'UnityEngine';
export default class KkaebiManager extends ZepetoScriptBehaviour {
    public KkaebiBtnObjects: GameObject[];
    public KkaebiButtons : Button[];
    public SummonBtns : Button[];
    public UnsummonBtns : Button[];
    public beforeNumber : number = -1; //깨비 버튼 눌렀을때 다른 깨비버튼의 소환버튼을 없애기 위함
    Start() {    
        for(let i=0; i<this.KkaebiBtnObjects.Length;i++){
            this.KkaebiButtons[i] = this.KkaebiBtnObjects[i].GetComponent<Button>();
            //버튼별 소환/비소환 버튼할당
            this.SummonBtns[i] = this.KkaebiBtnObjects[i].transform.GetChild(2).gameObject.GetComponent<Button>();
            this.UnsummonBtns[i] = this.KkaebiBtnObjects[i].transform.GetChild(3).gameObject.GetComponent<Button>();
            //시작할땐 비활성화(눌러야 나오게할것)
            this.SummonBtns[i].gameObject.SetActive(false);
            this.UnsummonBtns[i].gameObject.SetActive(false);
        }
        for(let i=0; i<this.KkaebiButtons.Length;i++){
            this.KkaebiButtons[i].onClick.AddListener(()=>{
                //이전에 누른버튼의 소환버튼 비활성화 시키기
                if(this.beforeNumber>=0){//초기상태가-1 이므로 한번이라도 누르면 양수로 바뀜
                    this.SummonBtns[this.beforeNumber].gameObject.SetActive(false);
                    this.UnsummonBtns[this.beforeNumber].gameObject.SetActive(false);
                }
                //버튼들 누르면 소환버튼 활성화
                this.SummonBtns[i].gameObject.SetActive(true);
                this.UnsummonBtns[i].gameObject.SetActive(true);
                this.beforeNumber=i;
            });

            //소환버튼을 누르면
            this.SummonBtns[i].onClick.AddListener(()=>{
                
            });
            //비소환 버튼을 누르면
            this.UnsummonBtns[i].onClick.AddListener(()=>{
                
            });
        }
    }

}