using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Option : MonoBehaviour
{
    // ���� ��ư
    public Button option;
    // ���� �ݴ� X ��ư
    public Button closeBtn;
    // ��� ���� ��ư
    public Button listBtn;

    // ��� ��ư
    public Button korean;
    public Button english;
    public Button japanese;
    public Button thai;
    public Button indonesian;

    // ����� ��ư
    public Button bgBtn;
    // ȿ���� ��ư
    public Button sfxBtn;

    // ���� â
    public GameObject optionManu;
    // ��� â
    public GameObject list;

    // ����� ON / OFF
    public GameObject bgON;
    public GameObject bgOFF;
    
    // ȿ���� ON / OFF
    public GameObject sfxON;
    public GameObject sfxOFF;

    // ��� ��ư �̹��� ��
    Image koreanColor;
    Image englishColor;
    Image japaneseColor;
    Image thaiColor;
    Image indonesianColor;

    // ��� ��� â �ؽ�Ʈ
    public Text listText;

    // ��� ��ư ON / OFF üũ
    bool isClick = true;

    // Start is called before the first frame update
    void Start()
    {
        // ��ư Ŭ�� �� �Լ� ȣ��
        option.onClick.AddListener(OptiOnClick);
        closeBtn.onClick.AddListener(CloesBtn);
        listBtn.onClick.AddListener(ListBtn);

        korean.onClick.AddListener(KoreanBtn);
        english.onClick.AddListener(EnglishBtn);
        japanese.onClick.AddListener(JapaneseBtn);
        thai.onClick.AddListener(ThaiBtn);
        indonesian.onClick.AddListener(indonesianBtn);

        bgBtn.onClick.AddListener(BGOFF);
        sfxBtn.onClick.AddListener(SFXOFF);

        // ��� �̹��� �ҷ�����
        koreanColor = korean.gameObject.GetComponent<Image>();
        englishColor = english.gameObject.GetComponent<Image>();
        japaneseColor = japanese.gameObject.GetComponent<Image>();
        thaiColor = thai.gameObject.GetComponent<Image>();
        indonesianColor = indonesian.gameObject.GetComponent<Image>();
    }

    // Update is called once per frame
    void Update()
    {

    }

    // ���� ��ư Ŭ�� ��
    void OptiOnClick()
    {
        // ���� â ������
        optionManu.SetActive(true);
    }

    // ���� â X ��ư Ŭ�� ��
    void CloesBtn()
    {
        // ���� â ����
        optionManu.SetActive(false);
    }

    // ��� ��� ��ư Ŭ�� ��
    void ListBtn()
    {
        // ��� ��� â ������
        list.SetActive(true);
    }

    // ����� ON / OFF ī��Ʈ üũ
    int bgcount = 0;
    void BGOFF()
    {
        bgcount++;

        // ���� ī��Ʈ�� 1�̶��
        if(bgcount == 1)
        {
            // ��ư ��ġ�� off��
            bgBtn.transform.position = bgOFF.transform.position;
        }

        // ���� ī��Ʈ�� 2���
        if(bgcount == 2)
        {
            // ��ư ��ġ�� on����
            bgBtn.transform.position = bgON.transform.position;
            // ī��Ʈ �ʱ�ȭ �� �ֱ�
            bgcount = 0;
        }

    }

    // ȿ���� ON / OFF ī��Ʈ üũ
    int sfxcount = 0;
    void SFXOFF()
    {
        sfxcount++;

        // ���� ī��Ʈ�� 1�̸� 
        if (sfxcount == 1)
        {
            // ��ư ��ġ�� on����
            sfxBtn.transform.position = sfxOFF.transform.position;
        }

        // ���� ī��Ʈ�� 2���
        if (sfxcount == 2)
        {
            // ��ư ��ġ�� on����
            sfxBtn.transform.position = sfxON.transform.position;
            // ī��Ʈ �ʱ�ȭ
            sfxcount = 0;
        }

    }

    // ��� Ŭ�� üũ
    bool isKorean = false;
    bool isEnglish = false;
    bool isJapanese = false;
    bool isThai = false;
    bool isindonesian = false;
    
    // �ѱ��� ��ư
    void KoreanBtn()
    {
        isKorean = true;

        // ���� isKorean = true���
        if (isKorean == true)
        {
            // �ѱ��� ��ư ���� �Ͼ������
            koreanColor.color = new Color(1f, 1f, 1f, 1f);

            // ������ ��� ��ư ���� ���� ��(ȸ��)����
            englishColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            thaiColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            japaneseColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            indonesianColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
        }

        // ��� �ؽ�Ʈ�� �ѱ���� �ٲ��ֱ�
        listText.text = "�ѱ���";
        // ��� â ����
        list.SetActive(false);
    }

    // ���� ��ư
    void EnglishBtn()
    {
        isEnglish = true;

        // ���� isEnglish = true���
        if (isEnglish == true)
        {
            // ���� ��ư ���� �Ͼ������
            englishColor.color = new Color(1f, 1f, 1f, 1f);

            // ������ ��� ��ư ���� ���� ��(ȸ��)����
            koreanColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            thaiColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            japaneseColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            indonesianColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
        }

        // ��� �ؽ�Ʈ�� ����� �ٲ��ֱ�
        listText.text = "����";
        // ��� â ����
        list.SetActive(false);

    }

    void JapaneseBtn()
    {
        isJapanese = true;

        // ���� isJapanese = true���
        if (isJapanese == true)
        {
            // �Ϻ��� ��ư ���� �Ͼ������
            japaneseColor.color = new Color(1f, 1f, 1f, 1f);

            // ������ ��� ��ư ���� ���� ��(ȸ��)����
            koreanColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            englishColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            thaiColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            indonesianColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
        }

        // ��� �ؽ�Ʈ�� �Ϻ���� �ٲ��ֱ�
        listText.text = "�Ϻ���";
        // ��� â ����
        list.SetActive(false);
    }
    void ThaiBtn()
    {
        isThai = true;

        // ���� isThai = true���
        if (isThai == true)
        {
            // �±��� ��ư ���� �Ͼ������
            thaiColor.color = new Color(1f, 1f, 1f, 1f);

            // ������ ��� ��ư ���� ���� ��(ȸ��)����
            koreanColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            englishColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            japaneseColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            indonesianColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
        }

        // ��� �ؽ�Ʈ�� �±���� �ٲ��ֱ�
        listText.text = "�±���";
        // ��� â ����
        list.SetActive(false);
    }

    void indonesianBtn()
    {
        isindonesian = true;

        // ���� isindonesian = true���
        if (isindonesian == true)
        {
            // �ε��׽þƾ� ��ư ���� �Ͼ������
            indonesianColor.color = new Color(1f, 1f, 1f, 1f);

            // ������ ��� ��ư ���� ���� ��(ȸ��)����
            koreanColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            englishColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            thaiColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            japaneseColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
        }

        // ��� �ؽ�Ʈ�� �ε��׽þƾ�� �ٲ��ֱ�
        listText.text = "�ε��׽þƾ�";
        // ��� â ����
        list.SetActive(false);
    }

}
