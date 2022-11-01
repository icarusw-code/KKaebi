using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Option : MonoBehaviour
{
    // 설정 버튼
    public Button option;
    // 설정 닫는 X 버튼
    public Button closeBtn;
    // 언어 선택 버튼
    public Button listBtn;

    // 언어 버튼
    public Button korean;
    public Button english;
    public Button japanese;
    public Button thai;
    public Button indonesian;

    // 배경음 버튼
    public Button bgBtn;
    // 효과음 버튼
    public Button sfxBtn;

    // 설정 창
    public GameObject optionManu;
    // 언어 창
    public GameObject list;

    // 배경음 ON / OFF
    public GameObject bgON;
    public GameObject bgOFF;
    
    // 효과음 ON / OFF
    public GameObject sfxON;
    public GameObject sfxOFF;

    // 언어 버튼 이미지 색
    Image koreanColor;
    Image englishColor;
    Image japaneseColor;
    Image thaiColor;
    Image indonesianColor;

    // 언어 목록 창 텍스트
    public Text listText;

    // 언어 버튼 ON / OFF 체크
    bool isClick = true;

    // Start is called before the first frame update
    void Start()
    {
        // 버튼 클릭 시 함수 호출
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

        // 언어 이미지 불러오기
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

    // 설정 버튼 클릭 시
    void OptiOnClick()
    {
        // 설정 창 나오기
        optionManu.SetActive(true);
    }

    // 설정 창 X 버튼 클릭 시
    void CloesBtn()
    {
        // 설정 창 끄기
        optionManu.SetActive(false);
    }

    // 언어 목록 버튼 클릭 시
    void ListBtn()
    {
        // 언어 목록 창 나오게
        list.SetActive(true);
    }

    // 배경음 ON / OFF 카운트 체크
    int bgcount = 0;
    void BGOFF()
    {
        bgcount++;

        // 만약 카운트가 1이라면
        if(bgcount == 1)
        {
            // 버튼 위치를 off로
            bgBtn.transform.position = bgOFF.transform.position;
        }

        // 만약 카운트가 2라면
        if(bgcount == 2)
        {
            // 버튼 위치를 on으로
            bgBtn.transform.position = bgON.transform.position;
            // 카운트 초기화 해 주기
            bgcount = 0;
        }

    }

    // 효과음 ON / OFF 카운트 체크
    int sfxcount = 0;
    void SFXOFF()
    {
        sfxcount++;

        // 만약 카운트가 1이면 
        if (sfxcount == 1)
        {
            // 버튼 위치를 on으로
            sfxBtn.transform.position = sfxOFF.transform.position;
        }

        // 만약 카운트가 2라면
        if (sfxcount == 2)
        {
            // 버튼 위치를 on으로
            sfxBtn.transform.position = sfxON.transform.position;
            // 카운트 초기화
            sfxcount = 0;
        }

    }

    // 언어 클릭 체크
    bool isKorean = false;
    bool isEnglish = false;
    bool isJapanese = false;
    bool isThai = false;
    bool isindonesian = false;
    
    // 한국어 버튼
    void KoreanBtn()
    {
        isKorean = true;

        // 만약 isKorean = true라면
        if (isKorean == true)
        {
            // 한국어 버튼 색을 하얀색으로
            koreanColor.color = new Color(1f, 1f, 1f, 1f);

            // 나머지 언어 버튼 색은 원래 색(회색)으로
            englishColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            thaiColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            japaneseColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            indonesianColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
        }

        // 목록 텍스트를 한국어로 바꿔주기
        listText.text = "한국어";
        // 목록 창 끄기
        list.SetActive(false);
    }

    // 영어 버튼
    void EnglishBtn()
    {
        isEnglish = true;

        // 만약 isEnglish = true라면
        if (isEnglish == true)
        {
            // 영어 버튼 색을 하얀색으로
            englishColor.color = new Color(1f, 1f, 1f, 1f);

            // 나머지 언어 버튼 색은 원래 색(회색)으로
            koreanColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            thaiColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            japaneseColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            indonesianColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
        }

        // 목록 텍스트를 영어로 바꿔주기
        listText.text = "영어";
        // 목록 창 끄기
        list.SetActive(false);

    }

    void JapaneseBtn()
    {
        isJapanese = true;

        // 만약 isJapanese = true라면
        if (isJapanese == true)
        {
            // 일본어 버튼 색을 하얀색으로
            japaneseColor.color = new Color(1f, 1f, 1f, 1f);

            // 나머지 언어 버튼 색은 원래 색(회색)으로
            koreanColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            englishColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            thaiColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            indonesianColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
        }

        // 목록 텍스트를 일본어로 바꿔주기
        listText.text = "일본어";
        // 목록 창 끄기
        list.SetActive(false);
    }
    void ThaiBtn()
    {
        isThai = true;

        // 만약 isThai = true라면
        if (isThai == true)
        {
            // 태국어 버튼 색을 하얀색으로
            thaiColor.color = new Color(1f, 1f, 1f, 1f);

            // 나머지 언어 버튼 색은 원래 색(회색)으로
            koreanColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            englishColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            japaneseColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            indonesianColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
        }

        // 목록 텍스트를 태국어로 바꿔주기
        listText.text = "태국어";
        // 목록 창 끄기
        list.SetActive(false);
    }

    void indonesianBtn()
    {
        isindonesian = true;

        // 만약 isindonesian = true라면
        if (isindonesian == true)
        {
            // 인도네시아어 버튼 색을 하얀색으로
            indonesianColor.color = new Color(1f, 1f, 1f, 1f);

            // 나머지 언어 버튼 색은 원래 색(회색)으로
            koreanColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            englishColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            thaiColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            japaneseColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
        }

        // 목록 텍스트를 인도네시아어로 바꿔주기
        listText.text = "인도네시아어";
        // 목록 창 끄기
        list.SetActive(false);
    }

}
