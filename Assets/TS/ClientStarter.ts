import { CharacterState, SpawnInfo, ZepetoPlayer, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { Room, RoomData } from 'ZEPETO.Multiplay';
import { Player, State } from 'ZEPETO.Multiplay.Schema';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoWorldMultiplay } from 'ZEPETO.World'
import * as UnityEngine from 'UnityEngine'

export default class ClientStarter extends ZepetoScriptBehaviour {

    public multiplay : ZepetoWorldMultiplay;

    private room : Room;

    private currentPlayers : Map<string, Player> = new Map<string, Player>();

    // private tmp : string = " ";

    Start() {    

        // 이벤트 리스너 
        this.multiplay.RoomCreated += (room: Room) => {
            this.room = room;
        };

        this.multiplay.RoomJoined += (room : Room) => {
            room.OnStateChange += this.OnStateChange;
        };

        // UnityEngine.PlayerPrefs.SetString("test", "change");

        // 퀘스트가 완료되면 해당 요리 도감 카운트를 올려준다.
        // 1. 그 퀘스트 요리이름을 가져오고
        // 2. string 변수 하나 선언해서 요리이름 으로 만들어줌
        // 3. 현재 카운트를 playerprefs로 가져옴
        // 4. 카운트를 올려준다.
        // 5. 바뀐 카운트를 playerprefs로 다시 저장

        // var count : number = UnityEngine.PlayerPrefs.GetInt("떡꼬치"); 

        // UnityEngine.PlayerPrefs.SetString("도감_떡꼬치", count);
        
        // this.tmp = UnityEngine.PlayerPrefs.GetString("test"); 
        // console.log(this.tmp);
    }

    private OnStateChange(state: State, isFirst:boolean){

        // 처음이면
        if(isFirst)
        {
            // 이벤트는 로컬 플레이어가 완전 생성될때
            ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
                const myPlayer = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer;
                myPlayer.character.OnChangedState.AddListener((cur, prev) => {
                    // 캐릭터 스테이트를 서버로 전송
                    this.SendState(cur);
                })
            })
        }

        let join = new Map<string, Player>();
        state.players.ForEach((sessionId : string, player : Player) => {
            // 지금 입장한 플레이어
            if(!this.currentPlayers.has(sessionId))
            {
                // join에 등록
                join.set(sessionId, player);
            }
        });

        // 룸에 플레이어가 새로 들어올때 이벤트를 받을 수 있도록
        join.forEach((player : Player, sessionId : string) => this.OnJoinPlayer(sessionId, player));
    }

    private SendState(state : CharacterState)
    {
        const data = new RoomData();
        data.Add("state", state);
        // 클라이언트에서 서버로 메세지 전송
        this.room.Send("onChangedState", data.GetObject());
    }


    // 룸 입장시 플레이어 이벤트 처리하기
    private OnJoinPlayer(sessionId : string, player : Player)
    {
        console.log(`[OnJoinPlayer] players - sessionId : ${sessionId}`);

        // 입장한 플레이어 등록
        this.currentPlayers.set(sessionId, player);

        const spawnInfo = new SpawnInfo();
        const position = new UnityEngine.Vector3(0, 0, 0);
        const rotation = new UnityEngine.Vector3(0, 0, 0);

        spawnInfo.position = position;
        spawnInfo.rotation = UnityEngine.Quaternion.Euler(rotation);

        // 같으면 로컬 플레이어
        const isLocal = this.room.SessionId === player.sessionId;
        ZepetoPlayers.instance.CreatePlayerWithUserId(sessionId, player.zepetoUserId, spawnInfo, isLocal);
    }

}