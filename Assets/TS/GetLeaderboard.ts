import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { GetRangeRankResponse, ResetRule, GetLeaderboardResponse, LeaderboardAPI } from 'ZEPETO.Script.Leaderboard'
 
export default class GetLeaderboard extends ZepetoScriptBehaviour {
 
   public leaderboardId: string;
 
   public startRank: number;
   public endRank: number;
   public resetRule: ResetRule;

   Start() {    
       LeaderboardAPI.GetLeaderboard(this.leaderboardId, this.OnResult, this.OnError);
       LeaderboardAPI.GetRangeRank(this.leaderboardId, this.startRank, this.endRank, this.resetRule ,false ,this.OnResultRank, this.OnError);

   } 

   OnResultRank(result: GetRangeRankResponse) 
   {
        console.log(`result.isSuccess: ${result.isSuccess}`);
        if (result.rankInfo.myRank)
        {
            console.log(`
            member: ${result.rankInfo.myRank.member},
            rank: ${result.rankInfo.myRank.rank},
            score: ${result.rankInfo.myRank.score}, 
            name: ${result.rankInfo.myRank.name}
            `);
        }

        if (result.rankInfo.rankList)
        {
            for (let i = 0; i < result.rankInfo.rankList.length; ++i) 
            {
                var rank = result.rankInfo.rankList[i];
                console.log(`
                i: ${i},
                member: ${rank.member},
                rank: ${rank.rank},
                score: ${rank.score},
                name: ${result.rankInfo.myRank.name}
                `);
            }
        }
    }

   OnResult(result: GetLeaderboardResponse) {
       console.log(`result.isSuccess: ${result.isSuccess}`);
 
       if (result.leaderboard) {
           console.log(`id: ${result.leaderboard.id}, name: ${result.leaderboard.name}`);
       }
   }
 
   OnError(error: string) {
       console.error(error);
   }



}