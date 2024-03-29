import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Room, RoomData } from 'ZEPETO.Multiplay';
import { Button, Image } from 'UnityEngine.UI'
import { GameObject } from 'UnityEngine';
import * as UnityEngine from 'UnityEngine';
import KkaebiInfo from '../TS/KkaebiInfo';
import { ZepetoWorldMultiplay } from 'ZEPETO.World';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import SoundManager from './SoundManager';
export default class KkaebiManager extends ZepetoScriptBehaviour {

    public multiplay : ZepetoWorldMultiplay;

    private room : Room;

    public KkaebiBtnObjects: GameObject[];
    public KkaebiPrefabs : GameObject[]; // 깨비 모델들
    public KkaebiButtons : Button[];
    public SummonBtns : Button[];
    public UnsummonBtns : Button[];
    public beforeNumber : number = -1; //깨비 버튼 눌렀을때 다른 깨비버튼의 소환버튼을 없애기 위함

    private selectNumber : number = -1;
    private foodName : string;

    private color : UnityEngine.Color;
    Start() {    
        for(let i=0; i<this.KkaebiBtnObjects.length;i++){
            this.KkaebiButtons[i] = this.KkaebiBtnObjects[i].GetComponent<Button>();
            //버튼별 소환/비소환 버튼할당
            this.SummonBtns[i] = this.KkaebiBtnObjects[i].transform.GetChild(2).gameObject.GetComponent<Button>();
            this.UnsummonBtns[i] = this.KkaebiBtnObjects[i].transform.GetChild(3).gameObject.GetComponent<Button>();
            //시작할땐 비활성화(눌러야 나오게할것)
            this.SummonBtns[i].gameObject.SetActive(false);
            this.UnsummonBtns[i].gameObject.SetActive(false);
            
            this.foodName = this.KkaebiBtnObjects[i].GetComponent<KkaebiInfo>().info;

            // Count가 2 이상인 경우만 투명도 1
            console.log(this.foodName + "'s Count : " + UnityEngine.PlayerPrefs.GetInt(this.foodName));
            if(UnityEngine.PlayerPrefs.GetInt(this.foodName) >= 2)
            {
                this.color = this.KkaebiBtnObjects[i].transform.GetChild(0).gameObject.GetComponent<Image>().color;
                this.color.a = 255;
                this.KkaebiBtnObjects[i].transform.GetChild(0).gameObject.GetComponent<Image>().color = this.color;
            }
            /*else{
                this.color = this.KkaebiBtnObjects[i].transform.GetChild(0).gameObject.GetComponent<Image>().color;
                this.color.a = 0;
                this.KkaebiBtnObjects[i].transform.GetChild(0).gameObject.GetComponent<Image>().color = this.color;

            }*/

        }


        for(let i=0; i<this.KkaebiButtons.length;i++){
            this.KkaebiButtons[i].onClick.AddListener(()=>{
                SoundManager.getInstance().PlayBgm("UIbuttonBgm");
                //이전에 누른버튼의 소환버튼 비활성화 시키기
                if(this.beforeNumber>=0){//초기상태가-1 이므로 한번이라도 누르면 양수로 바뀜
                    this.SummonBtns[this.beforeNumber].gameObject.SetActive(false);
                    this.UnsummonBtns[this.beforeNumber].gameObject.SetActive(false);
               }
                this.foodName = this.KkaebiBtnObjects[i].GetComponent<KkaebiInfo>().info;

                // Count가 2 이상인 경우에만 
                //버튼들 누르면 소환버튼 활성화
                if(UnityEngine.PlayerPrefs.GetInt(this.foodName) >= 2){
                    this.SummonBtns[i].gameObject.SetActive(true);
                    this.UnsummonBtns[i].gameObject.SetActive(true);
                    this.beforeNumber=i;
                }
            });

            //소환버튼을 누르면
            this.SummonBtns[i].onClick.AddListener(()=>{
                SoundManager.getInstance().PlayBgm("UIbuttonBgm");
                var go : GameObject = GameObject.FindGameObjectWithTag("KKaebi");
                if(go != null && this.selectNumber != i)
                {
                    GameObject.Destroy(go);
                }
                if(this.selectNumber != i){
                    const myPlayer = ZepetoPlayers.instance.ZepetoCamera.cameraParent;
                    GameObject.Instantiate(this.KkaebiPrefabs[i], myPlayer.transform.position + new UnityEngine.Vector3(-3, 0, -1.5), UnityEngine.Quaternion.identity);
                }
                this.selectNumber = i;
                
            });
            //비소환 버튼을 누르면
            this.UnsummonBtns[i].onClick.AddListener(()=>{
                SoundManager.getInstance().PlayBgm("UIbuttonBgm");
                var go : GameObject = GameObject.FindGameObjectWithTag("KKaebi");
                if(go != null && this.selectNumber == i)
                {
                    GameObject.Destroy(go);
                }
                this.selectNumber = -1;
            });
        }
    }

    public checkKkaebiCanSpawn(complFoodname: string){
        for (let i = 0; i < this.KkaebiBtnObjects.length; i++) {
            if (UnityEngine.PlayerPrefs.GetInt(complFoodname) >= 2) {
                if (this.KkaebiBtnObjects[i].GetComponent<KkaebiInfo>().info == complFoodname) {
                    this.color = this.KkaebiBtnObjects[i].transform.GetChild(0).gameObject.GetComponent<Image>().color;
                    this.color.a = 255;
                    this.KkaebiBtnObjects[i].transform.GetChild(0).gameObject.GetComponent<Image>().color = this.color;
                }
            }
        }
    }
}