import { Sandbox, SandboxOptions, SandboxPlayer } from "ZEPETO.Multiplay";
import { DataStorage } from 'ZEPETO.Multiplay.DataStorage';
import { Player } from 'ZEPETO.Multiplay.Schema';
import { IngredientData } from './IngredientData';

export default class extends Sandbox {

    // Room이 생성될 때 1회 호출되며, Room에 대한 초기화 로직을 추가 가능
    onCreate(options: SandboxOptions) {
        this.onMessage("onChangedState", (client, message) => {
            const player = this.state.players.get(client.sessionId);
            player.state = message.state;
        })
    }

    // Client가 Room에 입장할 때 호출된다.
    // Client의 Id 및 캐릭터 정보는 SandboxPlayer 객체에 포함되어 있음
    async onJoin(client: SandboxPlayer) {
        console.log(`[OnJoin] sessionId : ${client.sessionId}, HashCode: ${client.hashCode}, userId: ${client.userId}`);

        // 플레이어 설정
        const player = new Player();
        player.sessionId = client.sessionId;

        if(client.hashCode)
        {
            player.zepetoHash = client.hashCode;   
        }

        if(client.userId)
        {
            player.zepetoUserId = client.userId;
        }

        // 데이터 스토리지 가져오기
        const storage: DataStorage = client.loadDataStorage();

        // 방문횟수 불러오기
        let visit_cnt = await storage.get("VisitCount") as number;
        if(visit_cnt == null) visit_cnt = 0;

        console.log(`[OnJoin] ${client.sessionId}'s visiting count : ${visit_cnt}`);

        // 방문횟수 늘려주기
        await storage.set("VisitCount", ++visit_cnt);

        // 플레이어 정보 저장
        this.state.players.set(client.sessionId, player);

        // console.log(IngredientData["조미료"].id);
    }

    // Client가 Room에서 퇴장할 때 호출
    // 클라이언트가 연결 해제를 요청한 경우, Consented 값이 true로 호출되며 그렇지 않은 경우 false로 호출
    onLeave(client: SandboxPlayer, consented?: boolean) {
        
    }

    // SandboxOptions에서 설정된 tickInterval 마다 반복적으로 호출되며, 각종 Interval 이벤트를 관리
    onTick(deltaTime: number): void {
        
    }
}