using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{

    int id;
    bool isNPC;


    public TalkManager talkManager;
    public QuestManager questManager;

    public Text UITalkText;

    // 대화창
    public GameObject talkPanel;
    public GameObject scanObject;

    // 대화창 활성화 상태
    public bool isAction = false;
    public int talkIndex;

    public void SkipDown()
    {
        int questTalkIndex = questManager.GetQuestTalkIndex(id);
        string talkData = talkManager.GetTalk(id + questTalkIndex, talkIndex);

        if (talkData != null)
        {
            isAction = false;
            talkIndex = 0;

        }

    }

    public void Action(GameObject scanObj)
    {
        //if(isAction)
        //{
        //    isAction = false;
        //}
        //else
        //{
        //    //(실행 중)
        //    isAction = true;
        //    scanObject = scanObj;

        //    // isNPC 정보를 가져와야함
        //    NpcData npcData = scanObject.GetComponent<NpcData>();
        //    Talk(npcData.id, npcData.isNPC);

        //    talkPanel.SetActive(isAction);
        //}

        scanObject = scanObj;
        name = scanObject.name;
        NpcData npcData = scanObject.GetComponent<NpcData>();
        Talk(npcData.id, npcData.isNPC);


        talkPanel.SetActive(isAction);

        
    }


    void Talk(int id, bool isNPC)
    {
        // NPC id + >>퀘스트 번호<<
        int questTalkIndex = questManager.GetQuestTalkIndex(id);
        string talkData = talkManager.GetTalk(id + questTalkIndex, talkIndex);
         
        // 만약 다음 대화가 없다면 
        if (talkData == null)
        {
            // 대화 창을 꺼라
            isAction = false;
            talkIndex = 0; 
            Debug.Log(questManager.CheckQuest(id));
            // questManager.CheckQuest(id);
            return;
        }

        // 만약 Npc 이면
        if (isNPC)
        {
            UITalkText.text = talkData;
        }
        else
        {
            UITalkText.text = talkData;
        }

        isAction = true;

        // 다음 대화로 이동 
        talkIndex++;
    }

    

}
