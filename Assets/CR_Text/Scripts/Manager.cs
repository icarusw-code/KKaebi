using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Manager : MonoBehaviour
{
    public GameObject npc;
    public GameObject textboxTxt;
    public GameObject textbox;
    public Button textBoxBtn;

    Text txt;
    // Start is called before the first frame update
    void Start()
    {
        txt = textboxTxt.GetComponent<Text>();
    }

    bool isnpcStart = true;
    // Update is called once per frame
    void Update()
    {
        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        RaycastHit hit;

        if (Input.GetMouseButtonDown(0))
        {
            if (Physics.Raycast(ray, out hit))
            {
                if (hit.transform.gameObject.tag == "npc")
                {
                    textbox.SetActive(true);
                    if(isnpcStart == true)
                    {
                        txt.text = "������, � ������ ������ �ͳ�?��";
                        textBoxBtn.onClick.AddListener(Text);
                        isnpcStart = false;
                    }
                        
                    if(count == 8)
                    {
                        textbox.SetActive(true);
                    }

                    if(count == 11)
                    {
                        textbox.SetActive(true);
                    }

                    if(count >= 13)
                    {
                        textbox.SetActive(false);
                    }
                }
            }
        }
    }


    int count = 0;
    bool istxt = true;
    
    // ������ ��
    bool is��Ἲ�� = false;
    bool is������ = false;

    bool is���ۼ��� = false;
    bool is���۽��� = false;

    bool isone = true;
    void Text()
    {
        count++;
        print(count);
        if (count == 1)
        {
            txt.text = "�����㵵���� �߽��塯�� �� �� ȯ���Ѵ�! �� �߽����� ���, ��ձ������.��";
        }

        if (count == 2)
        {
            txt.text = "���߽��忡 �ѽ��� ������ �Դٱ�? �̷�, �̸� ��°.��";
        }

        if (count == 3)
        {
            txt.text = "���մ��� �ʹ� ���� ���� �ٶ��� ������ �� �������ܴ�.��";
        }

        if (count == 4)
        {
            txt.text = "�������� ��������! �װ� ��Ḧ ���ؿ´ٸ� �ݹ� ������ ���� �� �����Ŷ���.��";
        }

        if (count == 5)
        {
            txt.text = "���߽���� ���� ���ƺ��鼭 �ѽĿ� �ʿ��� ��Ḧ ���ؼ� �̰����� �������� �丮�� ������ָ�.��";
        }

        if (count == 6)
        {
            txt.text = "��� �ѽ��� �԰� �ͳ�?��";
        }

        if(count == 7)
        {
            textbox.SetActive(false);
            txt.text = "����Ḧ ��� ��Ҵ°�?��";
            //is��Ἲ�� = true;
            is������ = true;
        }

        if (count == 8 && is������ == true)
        {
            txt.text = "����Ḧ �� ��Ƽ� ���� �丮�� ���ְڴ�.��";
        }

        if(count > 8 && is������ == true)
        {
            textbox.SetActive(false);
        }

        if(count == 9 && is������ == true)
        {
            if(isone == true)
            {
                textbox.SetActive(false);
                isone = false;
            }
        }

        if (count == 8 && is��Ἲ�� == true)
        {
            txt.text = "������ ������ �� �� �丮�ϸ� �ű��� ���� �������ܴ�.��";
        }

        if (count == 9 && is��Ἲ�� == true)
        {
            txt.text = "���ѽ��� �����ϴ� ������ ��Ÿ�� ���� ����.��";
        }

        if (count == 10 && is��Ἲ�� == true)
        {
            txt.text = "������ ������ �� �� �� �����غ�������.��";
            is���۽��� = true;
            //is���ۼ��� = true;
        }

        if(count == 11 && is���۽��� == true)
        {
            textbox.SetActive(false);
            txt.text = "���̷�, ���� �丮�� �� �� �ۿ� ���� �ʾұ���.�丮�� �� �� �� ������.��";
        }

        if (count > 11 && is���۽��� == true)
        {
            textbox.SetActive(false);
        }

        if (count == 11 && is���ۼ��� == true)
        {
            textbox.SetActive(false);
            txt.text = "����, �ѽı��� ��ȯ�߱���! �����Ѵ�. ������ �ѽı���� �������� Ȯ���� �� �ִܴ�.��";
        }

        if (count == 12 && is���ۼ��� == true)
        {
            txt.text = "�������� �پ��� �ѽ� �丮�� ���� �ѽı��� ��ƺ���.��";
        }

        if (count == 12 && is���ۼ��� == true)
        {
            txt.text = "�������� ���� �����ٸ� �ű��� ���� ������ ���� �𸣰ڱ���.��";
        }

        if(count == 13 && is���ۼ��� == true)
        {
            textbox.SetActive(false);
        }
    }
}
