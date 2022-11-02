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
                        txt.text = "“허허, 어떤 음식을 만들어보고 싶나?”";
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
    
    // 성공할 시
    bool is재료성공 = false;
    bool is재료실패 = false;

    bool is제작성공 = false;
    bool is제작실패 = false;

    bool isone = true;
    void Text()
    {
        count++;
        print(count);
        if (count == 1)
        {
            txt.text = "“‘밤도깨비 야시장’에 온 걸 환영한다! 난 야시장의 대부, 대왕깨비란다.”";
        }

        if (count == 2)
        {
            txt.text = "“야시장에 한식을 먹으러 왔다구? 이런, 이를 어째.”";
        }

        if (count == 3)
        {
            txt.text = "“손님이 너무 많이 오는 바람에 음식이 다 떨어졌단다.”";
        }

        if (count == 4)
        {
            txt.text = "“하지만 걱정마렴! 네가 재료를 구해온다면 금방 음식을 만들 수 있을거란다.”";
        }

        if (count == 5)
        {
            txt.text = "“야시장과 숲을 돌아보면서 한식에 필요한 재료를 구해서 이곳으로 가져오면 요리를 만들어주마.”";
        }

        if (count == 6)
        {
            txt.text = "“어떤 한식을 먹고 싶나?”";
        }

        if(count == 7)
        {
            textbox.SetActive(false);
            txt.text = "“재료를 모두 모았는가?”";
            //is재료성공 = true;
            is재료실패 = true;
        }

        if (count == 8 && is재료실패 == true)
        {
            txt.text = "“재료를 다 모아서 오면 요리를 해주겠다.”";
        }

        if(count > 8 && is재료실패 == true)
        {
            textbox.SetActive(false);
        }

        if(count == 9 && is재료실패 == true)
        {
            if(isone == true)
            {
                textbox.SetActive(false);
                isone = false;
            }
        }

        if (count == 8 && is재료성공 == true)
        {
            txt.text = "“같은 음식을 두 번 요리하면 신기한 일이 벌어진단다.”";
        }

        if (count == 9 && is재료성공 == true)
        {
            txt.text = "“한식을 좋아하는 도깨비가 나타날 지도 모르지.”";
        }

        if (count == 10 && is재료성공 == true)
        {
            txt.text = "“같은 음식을 한 번 더 제작해보려무나.”";
            is제작실패 = true;
            //is제작성공 = true;
        }

        if(count == 11 && is제작실패 == true)
        {
            textbox.SetActive(false);
            txt.text = "“이런, 아직 요리를 한 번 밖에 하지 않았구나.요리를 한 번 더 만들어보렴.”";
        }

        if (count > 11 && is제작실패 == true)
        {
            textbox.SetActive(false);
        }

        if (count == 11 && is제작성공 == true)
        {
            textbox.SetActive(false);
            txt.text = "“오, 한식깨비를 소환했구나! 축하한다. 수집한 한식깨비는 도감에서 확인할 수 있단다.”";
        }

        if (count == 12 && is제작성공 == true)
        {
            txt.text = "“앞으로 다양한 한식 요리를 통해 한식깨비를 모아보렴.”";
        }

        if (count == 12 && is제작성공 == true)
        {
            txt.text = "“도감을 전부 모은다면 신기한 일이 벌어질 지도 모르겠구나.”";
        }

        if(count == 13 && is제작성공 == true)
        {
            textbox.SetActive(false);
        }
    }
}
