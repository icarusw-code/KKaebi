import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Button,Text,Image } from 'UnityEngine.UI';
import { GameObject,Color, Sprite } from 'UnityEngine';
import LanguageChange from '../../Scripts/Language/LanguageChange';
import SoundManager from '../../Scripts/SoundManager';
export default class SettingManager extends ZepetoScriptBehaviour {
// 설정 버튼
    public option : Button ;
    // 설정 닫는 X 버튼
    public closeBtn : Button;
    // 언어 선택 버튼
    public listBtn :Button;
    public bgImg : Button;
    public sfxImg : Button;
    public listImg : Button;

    // 언어 버튼
    public korean : Button;
    public english: Button;
    //public japanese: Button;
    //public thai: Button;
    //public indonesian: Button;

    // 배경음 버튼
    public bgBtn : Button;
    // 효과음 버튼
    public sfxBtn : Button;

    // 설정 창
    public optionMenu : GameObject;
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
    //private japaneseColor : Image;
    //private thaiColor : Image;
    //private indonesianColor : Image;

    // 언어 목록 창 텍스트
    public listText : Text;

    // 언어 버튼 ON / OFF 체크
    private isClick : bool = true;

    public BtnBackground : Sprite[]; //0번이 OFF인 이미지, 1번이ON이미지

    public FinalAcceptBtn : Button;
    // Start is called before the first frame update
    Start()
    {
        // 버튼 클릭 시 함수 호출
        this.option.onClick.AddListener(()=>this.OptiOnClick());
        this.closeBtn.onClick.AddListener(()=>this.CloesBtn());
        this.listBtn.onClick.AddListener(()=>this.ListBtn());
        this.bgImg.onClick.AddListener(()=>this.bgImgBtn());
        this.sfxImg.onClick.AddListener(()=>this.sfxImgBtn());
        this.listImg.onClick.AddListener(()=>this.ListBtn2());

        this.korean.onClick.AddListener(()=>this.KoreanBtn());
        this.english.onClick.AddListener(()=>this.EnglishBtn());
        this.FinalAcceptBtn.onClick.AddListener(()=>this.AcceptBtn());
        /*this.japanese.onClick.AddListener(()=>this.JapaneseBtn());
        this.thai.onClick.AddListener(()=>this.ThaiBtn());
        this.indonesian.onClick.AddListener(()=>this.indonesianBtn());*/

        this.bgBtn.onClick.AddListener(()=>this.BGOFF());
        this.sfxBtn.onClick.AddListener(()=>this.SFXOFF());

        // 언어 이미지 불러오기
        this.koreanColor = this.korean.gameObject.GetComponent<Image>();
        this.englishColor = this.english.gameObject.GetComponent<Image>();
        //this.japaneseColor = this.japanese.gameObject.GetComponent<Image>();
        //this.thaiColor = this.thai.gameObject.GetComponent<Image>();
        //this.indonesianColor = this.indonesian.gameObject.GetComponent<Image>();

        this.listText.text = "한국어";
        this.bgBtn.transform.position = this.bgOFF.transform.position;
        this.sfxBtn.transform.position = this.sfxOFF.transform.position;
    }



    public bgImgBtn()
    {
        SoundManager.getInstance().PlayBgm("UIbuttonBgm");
        this.bgcount++;

        if(this.bgcount == 1) //끄기
        {
            this.bgBtn.transform.position = this.bgON.transform.position;
            this.bgImg.GetComponent<Image>().sprite = this.BtnBackground[0];
        }

        if (this.bgcount == 2)//켜기
        {
            this.bgBtn.transform.position = this.bgOFF.transform.position;
            this.bgImg.GetComponent<Image>().sprite = this.BtnBackground[1];
            this.bgcount = 0;
        }
    }

   
    public sfxImgBtn()
    {
        SoundManager.getInstance().PlayBgm("UIbuttonBgm");
        this.sfxcount++;

        if (this.sfxcount == 1) //끄기
        {
            this.sfxBtn.transform.position = this.sfxON.transform.position;
            this.sfxImg.GetComponent<Image>().sprite = this.BtnBackground[0];
        }

        if (this.sfxcount == 2) //켜기
        {
            this.sfxBtn.transform.position = this.sfxOFF.transform.position;
            this.sfxImg.GetComponent<Image>().sprite = this.BtnBackground[1];
            this.sfxcount = 0; //켜있는상태면 0임
        }
    }

    public lcount: number = 0;
    public ListBtn2()
    {
        SoundManager.getInstance().PlayBgm("UIbuttonBgm");
        this.lcount++;
        if(this.lcount == 1)
        {
            // 언어 목록 창 나오게
            this.list.SetActive(true);
        }
        
        if(this.lcount == 2)
        {
            this.list.SetActive(false);
            this.lcount = 0;
        }
    }

    // 설정 버튼 클릭 시
    public OptiOnClick()
    {
        SoundManager.getInstance().PlayBgm("UIbuttonBgm");
        // 설정 창 나오기
        this.optionMenu.SetActive(true);
    }

    // 설정 창 X 버튼 클릭 시
    public CloesBtn()
    {
        SoundManager.getInstance().PlayBgm("UIbuttonBgm");
        // 설정 창 끄기
        this.optionMenu.SetActive(false);
    }

    // 언어 목록 버튼 클릭 시
    public ListBtn()
    {
        SoundManager.getInstance().PlayBgm("UIbuttonBgm");
        // 언어 목록 창 나오게
        this.list.SetActive(true);
    }

    // 배경음 ON / OFF 카운트 체크
    public bgcount:number = 0;
    public BGOFF()
    {
        SoundManager.getInstance().PlayBgm("UIbuttonBgm");
        this.bgcount++;

        // 만약 카운트가 1이라면
        if(this.bgcount == 1)
        {
            // 버튼 위치를 off로
            this.bgBtn.transform.position = this.bgON.transform.position;
            this.bgImg.GetComponent<Image>().sprite = this.BtnBackground[0];
        }

        // 만약 카운트가 2라면
        if (this.bgcount == 2)
        {
            // 버튼 위치를 on으로
            this.bgBtn.transform.position = this.bgOFF.transform.position;
            this.bgImg.GetComponent<Image>().sprite = this.BtnBackground[1];
            // 카운트 초기화 해 주기
            this.bgcount = 0;
        }

    }

    // 효과음 ON / OFF 카운트 체크
    public sfxcount : number = 0;
    public SFXOFF()
    {
        SoundManager.getInstance().PlayBgm("UIbuttonBgm");
        this.sfxcount++;

        // 만약 카운트가 1이면 
        if (this.sfxcount == 1)
        {
            // 버튼 위치를 on으로
            this.sfxBtn.transform.position = this.sfxON.transform.position;
            this.sfxImg.GetComponent<Image>().sprite = this.BtnBackground[0];
        }

        // 만약 카운트가 2라면
        if (this.sfxcount == 2)
        {
            // 버튼 위치를 on으로
            this.sfxBtn.transform.position = this.sfxOFF.transform.position;
            this.sfxImg.GetComponent<Image>().sprite = this.BtnBackground[1];
            // 카운트 초기화
            this.sfxcount = 0;
        }

    }

    // 언어 클릭 체크
    public isKorean : bool = false
    public isEnglish : bool = false
    //public isJapanese = false : bool;
    //public isThai = false : bool;
    //public isindonesian = false : bool;

    // 한국어 버튼
    public KoreanBtn()
    {
        SoundManager.getInstance().PlayBgm("UIbuttonBgm");
        this.isKorean = true;
        LanguageChange.getInstance().LanguageMode=1;
        // 만약 isKorean = true라면
        if (this.isKorean == true)
        {
            // 한국어 버튼 색을 하얀색으로
            this.koreanColor.color = new Color(1, 1, 1, 1);

            // 나머지 언어 버튼 색은 원래 색(회색)으로
            this.englishColor.color = new Color(0.66, 0.66, 0.66, 1);
            //this.thaiColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            //this.japaneseColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
            //this.indonesianColor.color = new Color(0.66f, 0.66f, 0.66f, 1f);
        }

        // 목록 텍스트를 한국어로 바꿔주기
        this.listText.text = "한국어";
        // 목록 창 끄기
        this.list.SetActive(false);
        this.lcount = 0;
    }

    // 영어 버튼
    public EnglishBtn()
    {
        SoundManager.getInstance().PlayBgm("UIbuttonBgm");
        this.isEnglish = true;
        LanguageChange.getInstance().LanguageMode=2;
        // 만약 isEnglish = true라면
        if (this.isEnglish == true)
        {
            // 영어 버튼 색을 하얀색으로
            this.englishColor.color = new Color(1, 1, 1, 1);

            // 나머지 언어 버튼 색은 원래 색(회색)으로
            this.koreanColor.color = new Color(0.66, 0.66, 0.66, 1);
            //this.thaiColor.color = new Color(0.66, 0.66, 0.66, 1);
            //this.japaneseColor.color = new Color(0.66, 0.66, 0.66, 1);
            //this.indonesianColor.color = new Color(0.66, 0.66, 0.66, 1);
        }

        // 목록 텍스트를 영어로 바꿔주기
        this.listText.text = "English";
        // 목록 창 끄기
        this.list.SetActive(false);
        this.lcount = 0;

    }

    public AcceptBtn(){
        SoundManager.getInstance().PlayBgm("UIbuttonBgm");
        if(LanguageChange.getInstance().LanguageMode==1){
            LanguageChange.getInstance().ChangeTxtInStatics(1);
        }
        else if(LanguageChange.getInstance().LanguageMode==2){
            LanguageChange.getInstance().ChangeTxtInStatics(2);
        }
        SoundManager.getInstance().BackGroundMusicControll(this.bgcount);
        this.optionMenu.SetActive(false);
    }

    /*public JapaneseBtn()
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
    public ThaiBtn()
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

    public indonesianBtn()
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
    }*/
}