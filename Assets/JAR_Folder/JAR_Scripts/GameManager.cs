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

    // ��ȭâ
    public GameObject talkPanel;
    public GameObject scanObject;

    // ��ȭâ Ȱ��ȭ ����
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
        //    //(���� ��)
        //    isAction = true;
        //    scanObject = scanObj;

        //    // isNPC ������ �����;���
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
        // NPC id + >>����Ʈ ��ȣ<<
        int questTalkIndex = questManager.GetQuestTalkIndex(id);
        string talkData = talkManager.GetTalk(id + questTalkIndex, talkIndex);
         
        // ���� ���� ��ȭ�� ���ٸ� 
        if (talkData == null)
        {
            // ��ȭ â�� ����
            isAction = false;
            talkIndex = 0; 
            Debug.Log(questManager.CheckQuest(id));
            // questManager.CheckQuest(id);
            return;
        }

        // ���� Npc �̸�
        if (isNPC)
        {
            UITalkText.text = talkData;
        }
        else
        {
            UITalkText.text = talkData;
        }

        isAction = true;

        // ���� ��ȭ�� �̵� 
        talkIndex++;
    }

    

}
