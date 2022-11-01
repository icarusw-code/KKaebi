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

        //Npc = 1000 �� ��ȭ
        // �⺻ ��ȭ
        // Ʃ�丮���� ���� ���� ��ȭ
        talkData.Add(1000, new string[]
        {
            "������, � ������ ������ �ͳ�?��"
        });
        
        //����Ʈ ��ȭ 1)
        talkData.Add(10 + 1000, new string[]
        { 
            "�����㵵���� �߽��塯�� �� �� ȯ���Ѵ�! �� �߽����� ���, ��ձ������.��",
            "���߽��忡 �ѽ��� ������ �Դٱ�? �̷�, �̸� ��°.��",
            "���մ��� �ʹ� ���� ���� �ٶ��� ������ �� �������ܴ�.��" ,
            "�������� ��������! �װ� ��Ḧ ���ؿ´ٸ� �ݹ� ������ ���� �� �����Ŷ���.��",
            "���߽���� ���� ���ƺ��鼭 �ѽĿ� �ʿ��� ��Ḧ ���ؼ� �̰����� �������� �丮�� ������ָ�.��",
            "��� �ѽ��� �԰� �ͳ�?��"

        });
     
        //����Ʈ�� ���� �� ��
        talkData.Add(11 + 2000, new string[]
        {
            // ���� ����Ʈ�� �Ѿ
        });

        //����Ʈ ��ȭ 2)
        talkData.Add(20 + 1000, new string[]
        {
            "������ ������ �� �� �丮�ϸ� �ű��� ���� �������ܴ�.��",
            "���ѽ��� �����ϴ� ������ ��Ÿ�� ���� ����.��",
            "������ ������ �� �� �� �����غ�������.��",
        });
        talkData.Add(21 + 1000, new string[]
        {
            "���̷�, ���� �丮�� �� �� �ۿ� ���� �ʾұ���. �丮�� �� �� �� ������.��"
        });
        talkData.Add(21 + 4000, new string[]
        {

        });
        // ����Ʈ
        talkData.Add(22 + 1000, new string[]
        {
            "����Ḧ �� ��Ƽ� ���� �丮�� ���ְڴ�.��"
        });
        //����Ʈ�� ���� �� ��
        talkData.Add(22 + 3000, new string[]
        {
            // ���� ����Ʈ�� �Ѿ
        });

       

        //����Ʈ ��ȭ 3)
        talkData.Add(30 + 1000, new string[]
        {
            "����, �ѽı��� ��ȯ�߱���! �����Ѵ�. ������ �ѽı���� �������� Ȯ���� �� �ִܴ�.��",
            "�������� �پ��� �ѽ� �丮�� ���� �ѽı��� ��ƺ���.��",
            "�������� ���� �����ٸ� �ű��� ���� ������ ���� �𸣰ڱ���.��",
           
        });
        talkData.Add(31 + 1000, new string[]
        {
            "����Ḧ ��� ��Ҵ°�?��"
        });
        //����Ʈ�� ���� �� ��
        talkData.Add(31 + 4000, new string[]
        {
            // ���� ����Ʈ�� �Ѿ
        });



    }

    // Object�� id , string �迭�� talkIndex 
    public string GetTalk(int id, int talkIndex)
    {
        if(!talkData.ContainsKey(id))
        {
            if(!talkData.ContainsKey(id - id % 10))
            {
                // ����Ʈ �� ó�� ��縶�� ���� �� �⺻ ��縦 �������
                if (talkIndex == talkData[id - id % 100].Length)
                    return null;
                else
                    return talkData[id - id % 100][talkIndex];
            }
            else
            {
                // �ش� ����Ʈ ���� �� ��簡 ���� �� ����Ʈ �� ó�� ��縦 ������ ��
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
