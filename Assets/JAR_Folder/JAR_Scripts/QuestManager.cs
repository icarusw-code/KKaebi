using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class QuestManager : MonoBehaviour
{
    public int questId;
    public int questActionIndex;
    public GameObject[] questObject;
    

    Dictionary<int, QuestData> questList;


    private void Awake()
    {
        // 초기화
        questList = new Dictionary<int, QuestData>();
        GenerateData();
    }

    void GenerateData()
    {
        questList.Add(10, new QuestData(" 1 ", new int[] { 1000, 2000 }));
        questList.Add(20, new QuestData(" (음식 이름) 재료를 모아보자 ", new int[] { 1000, 3000, 4000 }));
        questList.Add(30, new QuestData(" 3 ", new int[] { 1000, 4000 }));
        questList.Add(40, new QuestData(" 4 ", new int[] { 0 }));
    }

    public int GetQuestTalkIndex(int id)
    {
        return questId + questActionIndex;
    }

    // 대화가 끝이 났을 때 questActionIndex +1 
    public string CheckQuest(int id)
    {
        //npc id를 가져와 순서에 맞게 대화하면 +1 한다
        if (id == questList[questId].npcId[questActionIndex])
        {
            questActionIndex++;
        }

        ControlObject();

        // 퀘스트 대화 순서가 끝에 도달 했을 때 퀘스트 번호 +10
        if (questActionIndex == questList[questId].npcId.Length)
        {
            NextQuest();
        }

        return questList[questId].questName ;
    }

    // 다음 퀘스트를 위한
    void NextQuest()
    {
        questId += 10;
        questActionIndex = 0;
    }


    void ControlObject()
    {
        switch(questId)
        {

            case 10:
                break;
            case 20:
                break;
            case 30:
                break;
                
        }
    }
}
