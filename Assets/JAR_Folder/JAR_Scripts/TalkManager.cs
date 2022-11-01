using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class TalkManager : MonoBehaviour
{
    Dictionary<int, string[]> talkData;
    bool isCheck = false;

    private void Awake()
    {
        talkData = new Dictionary<int, string[]>();
        GenerateData();
    }

    private void GenerateData()
    {

        //Npc = 1000 의 대화
        // 기본 대화
        // 튜토리얼을 하지 않은 대화
        talkData.Add(1000, new string[]
        {
            "“허허, 어떤 음식을 만들어보고 싶나?”"
        });
        
        //퀘스트 대화 1)
        talkData.Add(10 + 1000, new string[]
        { 
            "“‘밤도깨비 야시장’에 온 걸 환영한다! 난 야시장의 대부, 대왕깨비란다.”",
            "“야시장에 한식을 먹으러 왔다구? 이런, 이를 어째.”",
            "“손님이 너무 많이 오는 바람에 음식이 다 떨어졌단다.”" ,
            "“하지만 걱정마렴! 네가 재료를 구해온다면 금방 음식을 만들 수 있을거란다.”",
            "“야시장과 숲을 돌아보면서 한식에 필요한 재료를 구해서 이곳으로 가져오면 요리를 만들어주마.”",
            "“어떤 한식을 먹고 싶나?”"

        });
     
        //퀘스트를 성공 할 시
        talkData.Add(11 + 2000, new string[]
        {
            // 다음 퀘스트로 넘어감
        });

        //퀘스트 대화 2)
        talkData.Add(20 + 1000, new string[]
        {
            "“같은 음식을 두 번 요리하면 신기한 일이 벌어진단다.”",
            "“한식을 좋아하는 도깨비가 나타날 지도 모르지.”",
            "“같은 음식을 한 번 더 제작해보려무나.”",
        });
        talkData.Add(21 + 1000, new string[]
        {
            "“이런, 아직 요리를 한 번 밖에 하지 않았구나. 요리를 한 번 더 만들어보렴.”"
        });
        talkData.Add(21 + 4000, new string[]
        {

        });
        // 퀘스트
        talkData.Add(22 + 1000, new string[]
        {
            "“재료를 다 모아서 오면 요리를 해주겠다.”"
        });
        //퀘스트를 성공 할 시
        talkData.Add(22 + 3000, new string[]
        {
            // 다음 퀘스트로 넘어감
        });

       

        //퀘스트 대화 3)
        talkData.Add(30 + 1000, new string[]
        {
            "“오, 한식깨비를 소환했구나! 축하한다. 수집한 한식깨비는 도감에서 확인할 수 있단다.”",
            "“앞으로 다양한 한식 요리를 통해 한식깨비를 모아보렴.”",
            "“도감을 전부 모은다면 신기한 일이 벌어질 지도 모르겠구나.”",
           
        });
        talkData.Add(31 + 1000, new string[]
        {
            "“재료를 모두 모았는가?”"
        });
        //퀘스트를 성공 할 시
        talkData.Add(31 + 4000, new string[]
        {
            // 다음 퀘스트로 넘어감
        });



    }

    // Object의 id , string 배열의 talkIndex 
    public string GetTalk(int id, int talkIndex)
    {
        if(!talkData.ContainsKey(id))
        {
            if(!talkData.ContainsKey(id - id % 10))
            {
                // 퀘스트 맨 처음 대사마저 없을 때 기본 대사를 가지고옴
                if (talkIndex == talkData[id - id % 100].Length)
                    return null;
                else
                    return talkData[id - id % 100][talkIndex];
            }
            else
            {
                // 해당 퀘스트 진행 중 대사가 없을 때 퀘스트 맨 처음 대사를 가지고 옴
                if (talkIndex == talkData[id - id % 10].Length)
                    return null;
                else
                    return talkData[id - id % 10][talkIndex];

            }
        }
        if (talkIndex == talkData[id].Length)
            return null;
        else
            return talkData[id][talkIndex];
    }


}
