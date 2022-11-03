/*import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Button,Text,Image } from 'UnityEngine.UI';
import { GameObject } from 'UnityEngine';
export default class SettingManager extends ZepetoScriptBehaviour {
// 설정 버튼
    public option : Button ;
    // 설정 닫는 X 버튼
    public closeBtn : Button;
    // 언어 선택 버튼
    public listBtn 
    public bgImg : Button;
    public sfxImg : Button;
    public listImg : Button;

    // 언어 버튼
    public korean : Button;
    public english: Button;
    public japanese: Button;
    public thai: Button;
    public indonesian: Button;

    // 배경음 버튼
    public bgBtn : Button;
    // 효과음 버튼
    public sfxBtn : Button;

    // 설정 창
    public optionManu : GameObject;
    // 언어 창
    public list : GameObject;

    // 배경음 ON / OFF
    public bgON : GameObject;
    public bgOFF : GameObject;

    // 효과음 ON / OFF
    public sfxON : GameObject;
    public sfxOFF : GameObject;

    // 언어 버튼 이미지 색
    private koreanColor : Image;
    private englishColor: Image;
    private japaneseColor : Image;
    private thaiColor : Image;
    private indonesianColor : Image;

    // 언어 목록 창 텍스트
    public listText : Text;

    // 언어 버튼 ON / OFF 체크
    private isClick : bool = true;
    // Start is called before the first frame update
    Start()
    {
        // 버튼 클릭 시 함수 호출
        this.option.onClick.AddListener(OptiOnClick);
        this.closeBtn.onClick.AddListener(CloesBtn);
        this.listBtn.onClick.AddListener(ListBtn);
        this.bgImg.onClick.AddListener(bgImgBtn);
        this.sfxImg.onClick.AddListener(sfxImgBtn);
        this.listImg.onClick.AddListener(ListBtn2);

        this.korean.onClick.AddListener(KoreanBtn);
        this.english.onClick.AddListener(EnglishBtn);
        this.japanese.onClick.AddListener(JapaneseBtn);
        this.thai.onClick.AddListener(ThaiBtn);
        this.indonesian.onClick.AddListener(indonesianBtn);

        this.bgBtn.onClick.AddListener(BGOFF);
        this.sfxBtn.onClick.AddListener(SFXOFF);

        // 언어 이미지 불러오기
        this.koreanColor = korean.gameObject.GetComponent<Image>();
        this.englishColor = english.gameObject.GetComponent<Image>();
        this.japaneseColor = japanese.gameObject.GetComponent<Image>();
        this.thaiColor = thai.gameObject.GetComponent<Image>();
        this.indonesianColor = indonesian.gameObject.GetComponent<Image>();

        this.listText.text = "한국어";
    }

    // Update is called once per frame
    void Update()
    {

    }


    void bgImgBtn()
    {
        bgcount++;

        if(bgcount == 1)
        {
            bgBtn.transform.position = bgOFF.transform.position;
        }

        if (bgcount == 2)
        {
            bgBtn.transform.position = bgON.transform.position;
            bgcount = 0;
        }
    }

   
    void sfxImgBtn()
    {
        sfxcount++;

        if (sfxcount == 1)
        {
            sfxBtn.transform.position = sfxOFF.transform.position;
        }

        if (sfxcount == 2)
        {
            sfxBtn.transform.position = sfxON.transform.position;
            sfxcount = 0;
        }
    }

    int lcount = 0;
    void ListBtn2()
    {
        lcount++;
        if(lcount == 1)
        {
            // 언어 목록 창 나오게
            list.SetActive(true);
        }
        
        if(lcount == 2)
        {
            list.SetActive(false);
            lcount = 0;
        }
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
        if (bgcount == 1)
        {
            // 버튼 위치를 off로
            bgBtn.transform.position = bgOFF.transform.position;
        }

        // 만약 카운트가 2라면
        if (bgcount == 2)
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
        lcount = 0;
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
        lcount = 0;

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
        lcount = 0;
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
        lcount = 0;
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
        lcount = 0;
    }
}*/