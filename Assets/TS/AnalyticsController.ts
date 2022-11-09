import { GameObject } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { AnalyticsType, ZepetoAnalyticsComponent } from 'ZEPETO.Analytics'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import NpcInteraction from '../Scripts/NpcInteraction';

export default class AnalyticsController extends ZepetoScriptBehaviour {

    public zepetoAnalytics : ZepetoAnalyticsComponent;
    public questAcceptButton : Button;

    Start() {    

        // 퀘스트 수락 로그
        this.questAcceptButton.onClick.AddListener(() =>{

            // 구글로 쏜다.
            var ga = this.zepetoAnalytics.Analytics(AnalyticsType.GoogleAnalytics);

            interface CustomEvent {
                param_01 : string;
            }            

            var _event : CustomEvent = {
                param_01 : "퀘스트 수락",
            }

            ga.LogEvent<CustomEvent>("퀘스트수락", _event);

        });

    }

    QusetCompleteLog(){

        // 구글로 쏜다.
        var ga = this.zepetoAnalytics.Analytics(AnalyticsType.GoogleAnalytics);

        interface CustomEvent {
            param_01 : string;
        }            

        var _event : CustomEvent = {
            param_01 : "퀘스트 완료",
        }

        ga.LogEvent<CustomEvent>("퀘스트완료", _event);
    }

    QuestGiveupLog(){

        // 구글로 쏜다.
        var ga = this.zepetoAnalytics.Analytics(AnalyticsType.GoogleAnalytics);

        interface CustomEvent {
            param_01 : string;
        }            

        var _event : CustomEvent = {
            param_01 : "퀘스트 포기",
        }

        ga.LogEvent<CustomEvent>("퀘스트포기", _event);

    }


}