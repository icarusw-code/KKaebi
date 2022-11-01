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
        // �ʱ�ȭ
        questList = new Dictionary<int, QuestData>();
        GenerateData();
    }

    void GenerateData()
    {
        questList.Add(10, new QuestData(" 1 ", new int[] { 1000, 2000 }));
        questList.Add(20, new QuestData(" (���� �̸�) ��Ḧ ��ƺ��� ", new int[] { 1000, 3000, 4000 }));
        questList.Add(30, new QuestData(" 3 ", new int[] { 1000, 4000 }));
        questList.Add(40, new QuestData(" 4 ", new int[] { 0 }));
    }

    public int GetQuestTalkIndex(int id)
    {
        return questId + questActionIndex;
    }

    // ��ȭ�� ���� ���� �� questActionIndex +1 
    public string CheckQuest(int id)
    {
        //npc id�� ������ ������ �°� ��ȭ�ϸ� +1 �Ѵ�
        if (id == questList[questId].npcId[questActionIndex])
        {
            questActionIndex++;
        }

        ControlObject();

        // ����Ʈ ��ȭ ������ ���� ���� ���� �� ����Ʈ ��ȣ +10
        if (questActionIndex == questList[questId].npcId.Length)
        {
            NextQuest();
        }

        return questList[questId].questName ;
    }

    // ���� ����Ʈ�� ����
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
