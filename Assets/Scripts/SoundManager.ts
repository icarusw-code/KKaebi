import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { AudioSource, AudioClip, GameObject} from 'UnityEngine'
import SettingManager from '../OptionManager/Scripts/SettingManager';
export default class SoundManager extends ZepetoScriptBehaviour {
    public static instance: SoundManager;
    public AudioPlay: AudioSource;
    public BackgroundMusic : AudioSource;
    public BackGroundBgm:AudioClip;
    public NotificationBgm : AudioClip;
    public UIbuttonBgm :  AudioClip;
    public IngreGetBgm : AudioClip;
    public CookingAudioSource: AudioSource;
    public CookingBgm : AudioClip;
    public KkaebiGetBgm: AudioClip;

    public OptionManager: GameObject;
    Awake(){
        SoundManager.instance = this;
    }

    static getInstance(){
        return this.instance||(this.instance = new this());
        
    }

    Start() {
        //this.BackgroundMusic = this.GetComponent<AudioSource>();
        //this.AudioPlay = this.GetComponent<AudioSource>();
        this.BackgroundMusic.clip = this.BackGroundBgm;
        this.BackgroundMusic.loop=true;
        this.BackgroundMusic.Play();
    }
    public BackGroundMusicControll(on_off:number){
        
        //0이면 켜지고 아니면 끔
        if(on_off==0){
            this.BackgroundMusic.loop=true;
            this.BackgroundMusic.Play();
        }
        else{
            this.BackgroundMusic.loop=false;
            this.BackgroundMusic.Stop();
        }
    }

    public PlayBgm(bgmname: string){
        this.AudioPlay.loop=false;
        this.CookingAudioSource.loop=false;
        if (this.OptionManager.GetComponent<SettingManager>().sfxcount == 0) {
            switch (bgmname) {
                case "NotificationBgm":
                    this.AudioPlay.clip = this.NotificationBgm;
                    this.AudioPlay.Play();
                    break;
                case "UIbuttonBgm":
                    this.AudioPlay.clip = this.UIbuttonBgm;
                    this.AudioPlay.Play();
                    break;
                case "IngreGetBgm":
                    this.AudioPlay.clip = this.IngreGetBgm;
                    this.AudioPlay.Play();
                    break;
                case "CookingBgm":
                    this.CookingAudioSource.clip = this.CookingBgm;
                    this.CookingAudioSource.Play();
                    break;
                case "KkaebiGetBgm":
                    this.AudioPlay.clip = this.KkaebiGetBgm;
                    this.AudioPlay.Play();
                    break;
            }
            
        }
    }


}