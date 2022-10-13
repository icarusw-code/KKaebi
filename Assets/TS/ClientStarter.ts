import { CharacterState, SpawnInfo, ZepetoPlayer, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { Room, RoomData } from 'ZEPETO.Multiplay';
import { Player, State, Vector3 } from 'ZEPETO.Multiplay.Schema';
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

        // 정기적으로 플레이어 위치 전송
        this.StartCoroutine(this.SendMessageLoop(0.1));
    }

    private * SendMessageLoop(tick : number)
    {
        while(true)
        {
            yield new UnityEngine.WaitForSeconds(tick);

            if(this.room != null && this.room.IsConnected)
            {
                // 플레이어 받아오기
                const hasPlayer = ZepetoPlayers.instance.HasPlayer(this.room.SessionId);
                if(hasPlayer)
                {
                    const myPlayer = ZepetoPlayers.instance.GetPlayer(this.room.SessionId);
                    // 대기상태가 아니면 전송
                    if(myPlayer.character.CurrentState != CharacterState.Idle)
                    {
                        // 내 위치 전송
                        this.SendTransform(myPlayer.character.transform);
                    }
                }
            }
        }
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
                });
            });

            // 위치 전송 받기(로컬 플레이어가 아닐때)
            ZepetoPlayers.instance.OnAddedPlayer.AddListener((sessionId : string) => {
                const isLocal = this.room.SessionId === sessionId;
                if(!isLocal)
                {
                    const player : Player = this.currentPlayers.get(sessionId);

                    player.OnChange += (ChangeValues) => this.OnUpdatePlayer(sessionId, player);
                }
            });
        }

        let join = new Map<string, Player>();
        let leave = new Map<string, Player>(this.currentPlayers);

        state.players.ForEach((sessionId : string, player : Player) => {
            // 지금 입장한 플레이어
            if(!this.currentPlayers.has(sessionId))
            {
                // join에 등록
                join.set(sessionId, player);
            }
            leave.delete(sessionId);
        });

        // 룸에 플레이어가 새로 들어올때 이벤트를 받을 수 있도록
        join.forEach((player : Player, sessionId : string) => this.OnJoinPlayer(sessionId, player));

        leave.forEach((player : Player, sessionId : string) => this.OnLeavePlayer(sessionId, player));
    }

    private SendState(state : CharacterState)
    {
        const data = new RoomData();
        data.Add("state", state);
        // 클라이언트에서 서버로 메세지 전송
        this.room.Send("onChangedState", data.GetObject());
    }

    private SendTransform(transform : UnityEngine.Transform)
    {
        // 룸데이터
        const data = new RoomData();

        // 위치 설정
        const pos = new RoomData();
        pos.Add("x", transform.localPosition.x);
        pos.Add("y", transform.localPosition.y);
        pos.Add("z", transform.localPosition.z);
        data.Add("position", pos.GetObject());

        // 회전 설정
        const rot = new RoomData();
        rot.Add("x", transform.localEulerAngles.x);
        rot.Add("y", transform.localEulerAngles.y);
        rot.Add("z", transform.localEulerAngles.z);
        data.Add("rotation", rot.GetObject());

        // 메세지 전송
        this.room.Send("onChangedTransform", data.GetObject());
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

    // 룸 퇴장시
    private OnLeavePlayer(sessionId : string, player : Player)
    {
        console.log(`[OnRemove] player - sessionId : ${sessionId}`);
        this.currentPlayers.delete(sessionId);

        ZepetoPlayers.instance.RemovePlayer(sessionId);
    }


    private OnUpdatePlayer(sessionId : string, player : Player)
    {
        const position = this.ParseVector3(player.transform.position);

        const zepetoPlayer = ZepetoPlayers.instance.GetPlayer(sessionId);
        zepetoPlayer.character.MoveToPosition(position);

        if(player.state === CharacterState.JumpIdle || player.state === CharacterState.JumpMove)
        {
            zepetoPlayer.character.Jump();
        }
    }

    private ParseVector3(vector3 : Vector3) : UnityEngine.Vector3{
        return new UnityEngine.Vector3(
            vector3.x,
            vector3.y,
            vector3.z
        );
    }

}