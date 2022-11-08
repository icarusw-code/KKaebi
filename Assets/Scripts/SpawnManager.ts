import { GameObject,WaitForSeconds } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import RandomSpawn from './RandomSpawn';

export default class SpawnManager extends ZepetoScriptBehaviour {
    public SpawnList : GameObject[];
    public IsSpawnCheckList : bool[]; //true면 소환된 상태, false면 먹어서 없어진상태

    Start() {    
        for(let i=0; i<this.SpawnList.length;i++){
            this.IsSpawnCheckList[i]=false; //처음엔 false로 해놔야 시작할때 한번씩 다 소환
        }
    }
    //소환 자체스크립트가 달린 빈오브젝트:
//1. 소환할때 그 소환한 재료의 스크립트의 number변수값에 해당리스트 순서값 부여 ex) 1, 2번 빈오브젝트가 생성한 재료들에게 1번,2번 각각부여
//2. 플레이어가 해당 재료 먹을때 자기 번호에 해당하는 값을 소환매니저의 체크배열[i]번째에게 먹었다는 표시로 전달
//3. 소환매니저에서는 계속 리스트의 체크배열을 검사하고있는데, 여기서 먹었다는 표시로 바뀐녀석에서는 바로 이값을 안먹었다는 표시로 바꿔준후
//4. 5초후에 spawn을 시키는 코루틴함수 실행

    Update(){
        this.Spawning();
    }

    public Spawning(){
        for(let i=0; i<this.SpawnList.length;i++){
            if(this.IsSpawnCheckList[i]==false){
                this.IsSpawnCheckList[i]=true;
                //1. 소환할때 그 소환한 재료의 스크립트의 number변수값에 해당리스트 순서값 부여 ex) 1, 2번 빈오브젝트가 생성한 재료들에게 1번,2번 각각부여
                this.StartCoroutine(this.DoSpawning(i));
            }
        }
    }

    *DoSpawning(Spawningnum: number){
        //1. 소환할때 그 소환한 재료의 스크립트의 number변수값에 해당리스트 순서값 부여 ex) 1, 2번 빈오브젝트가 생성한 재료들에게 1번,2번 각각부여
        yield new WaitForSeconds(5);
        this.SpawnList[Spawningnum].GetComponent<RandomSpawn>().Spawn(Spawningnum);
    }
}