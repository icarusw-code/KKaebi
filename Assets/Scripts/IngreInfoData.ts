import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class IngreInfoData extends ZepetoScriptBehaviour {

    public static instance : IngreInfoData;
    public ingreDetailInfo : Map<string, string[]> = new Map<string, string[]>();

    static getInstance(){
        return this.instance||(this.instance = new this());
    }

    Start() {    
        IngreInfoData.instance = this;

        this.ingreDetailInfo.set("후추", ["자극적이고 향긋한 향기와 짜릿한 매운맛이 특징인 향신료이다. 말린 후추 열매를 가루로 만들어서 사용한다."]);
        this.ingreDetailInfo.set("설탕", ["사탕수수나 사탕무에서 얻은 원당을 정제해서 만든 천연 감미료이며 다양한 요리에 자주 쓰인다."]);
        this.ingreDetailInfo.set("소금", ["염화나트륨을 주성분으로 하며 짠맛을 낸다. 암염과 바다에서 소금을 얻을 수 있다. 염전을 통해 바닷물을 말려 소금을 얻는 한국의 전통적인 방식의 생산과정을 거친 소금을 천일염이라고 한다."]);
        this.ingreDetailInfo.set("고춧가루", ["붉은 고추의 꼭지를 따고 배를 갈라 씨를 빼낸 다음 말려서 빻은 가루이다. 고춧가루는 요리를 빨갛게 만들고 매운맛을 낸다. 고춧가루의 입자 크기에 따라 요리별로 용도가 다르다. 현지에서 고춧가루를 구할 수 없다면 치폴레 가루, 칠리 파슬리, 파프리카 가루(맵지 않다)로 대체할 수 있다."]);
        this.ingreDetailInfo.set("깨", ["열대와 아열대 지역에서 자라는 키가 큰 일년생 식물로, 기름이 풍부한 씨앗을 위해 재배한다. 작고 갈색빛을 띠는 깨는 고소한 맛이 난다. 한국에서는 깻잎이라는 잎도 먹는다.\n 현지에서 통깨(sesame seeds)를 구할 수 없다면 대신 해바라기 씨나 잘게 부순 땅콩으로 대체할 수 있다."]);
        this.ingreDetailInfo.set("조청", ["곡식을 엿기름으로 삭혀서 조려 꿀처럼 만든 감미료, 인공적인 꿀이라는 뜻에서 조청이라고 한다. 조청을 구할 수 없다면 현미 시럽으로 대체할 수 있다. 현미 시럽을 사용한다면 설탕을 조금 더 첨가하면 된다."]);
        this.ingreDetailInfo.set("간장", ["콩으로 만든 메주를 소금물에 담근 뒤에 그 즙액을 달여서 만든 장. 음식의 간을 맞추는 기본양념으로 짠맛 단맛 감칠맛 등이 복합된 독특한 맛과 함께 특유의 향을 지니고 있다. 간장을 구할 수 없다면 타마리(Tmari), 우스터 소스(Worcestershire sauce), 코코넛 아미노(Coconut aminos)로 대체할 수 있다."]);
        this.ingreDetailInfo.set("참기름", ["동양 음식에 매우 자주 사용하는 식용유이다. 참깨를 볶은 후 압착하여 만든다. 참깨 특유의 독특하고 고소한 향을 가지고 있어 음식에 소량 첨가하여 입맛을 돋우는 데 쓴다. 참기름을 구할 수 없다면 포도씨유, 카놀라유, 또는 해바라기유로 대체할 수 있다."]);
        this.ingreDetailInfo.set("식용유", ["음식을 만드는 데 사용하는 기름이다."]);
        this.ingreDetailInfo.set("엿기름", ["보리에 물을 부어 싹을 내어 말린 식품. 주로 엿과 식혜를 만드는 데 쓰인다. 엿기름이 없다면 맥주를 만드는 보리 맥아 가루로 대체할 수 있다."]);
        this.ingreDetailInfo.set("케첩", ["토마토를 끓여서 걸러낸 것에 설탕, 소금, 향신료, 식초 따위를 섞어서 조린 소스."]);
        this.ingreDetailInfo.set("된장", ["콩으로 만든 메주를 소금물에 발효시킨 한국의 전통 조미료. 된장을 구할 수 없다면 미소나 간장, 생선 소스로 대체할 수 있다."]);
        this.ingreDetailInfo.set("고추장", ["찹쌀에 고춧가루, 엿기름, 메줏가루 등을 섞어 발효시킨 한국의 전통 조미료이며 붉고 매운맛을 낸다. 고추장이 없다면 스리라차 칠리소스, 타이 칠리 페이스트로 대체할 수 있다."]);
        this.ingreDetailInfo.set("꿀", ["꿀벌에게 얻을 수 있는 달고 향긋한 감미료이다. 꿀이 없다면 메이플 시럽, 당밀로 대체 가능하다."]);
        this.ingreDetailInfo.set("쌀", ["벼 열매의 껍질을 벗긴 알갱이이다. 한식은 대부분 쌀을 익힌 밥과 잘 어울린다. 한식은 전부 자포니카(japonica) 품종의 쌀(한국산)로 요리하지만, 구할 수 없다면 인디카(indica) 쌀(베트남, 인도산)을 사용해도 된다."]);
        this.ingreDetailInfo.set("아몬드", ["고소한 맛이 나는 갈색의 견과류이며, 아몬드 나무의 씨앗이다. 아몬드가 없다면 땅콩, 캐슈넛으로 대체할 수 있다."]);
        this.ingreDetailInfo.set("은행", ["은행나무에 열리는 열매의 씨앗으로, 단단한 껍질을 벗기고 말랑한 과육만 익혀서 먹는다. 너무 많은 은행을 하루에 먹으면 몸에 좋지 않다. 하루 10알 정도 섭취하는 게 좋다. 익히면 약간 쓰고 쫄깃하다."]);
        this.ingreDetailInfo.set("밤", ["밤나무의 열매이며 견과류이다. 단단한 껍질을 벗겨 먹어야 하며, 생으로도 먹을 수 있지만 주로 구워 먹는다. 밤을 구할 수 없다면 피칸, 마카다미아, 헤이즐넛, 피스타치오로 대체할 수 있다."]);
        this.ingreDetailInfo.set("양파", ["수선화과의 부추아과 부추속에 속한 식물로, 생으로 먹으면 알싸하고 매운맛이 강하다. 반면 익혀 먹으면 단맛이 강해진다. 동양에 갈색 껍질 양파가 일반적이지만, 서양에서는 이보다 매운맛이 덜한 자색 양파가 일반적이다."]);
        this.ingreDetailInfo.set("당근", ["쌍떡잎식물 산형화목 미나릿과에 속한 식물로, 주황색으로 단단하며, 생으로 먹었을 때 단맛이 난다."]);
        this.ingreDetailInfo.set("단호박", ["단단한 껍질 속에 노란색의 과육을 가지고 있다. 일반 호박보다 당도가 높은 것이 특징이다."]);
        this.ingreDetailInfo.set("파", ["약 70cm로 뿌리 부분은 희고 위는 초록색의 외떡잎식물이다. 동양에는 널리 재배하고 있으나 서양에는 거의 재배하지 않는다. 양파와 같이 생으로 먹을 때는 매운맛을 내며, 주로 볶거나 끓여 단맛과 파 향을 내어 음식의 맛을 더하는 데 사용된다.\n 서양에서는 파를 구하기 어렵기 때문에 유사한 리크(leek)를 사용해 요리하면 비슷한 맛을 낼 수 있다."]);
        this.ingreDetailInfo.set("마늘", ["요리에서 향신료 역할을 담당하는 채소로, 주로 양념에 쓰인다. 생으로 먹으면 매우 알싸하고 매운맛이 강하다. 거의 모든 한국 음식에 마늘이 들어간다고 할 만큼 한국 음식에서 빼놓을 수 없는 재료이다."]);
        this.ingreDetailInfo.set("무", ["한국을 비롯한 동양의 무는 대체로 크기가 크고 희다. 서양에서 주로 재배되는 무 품종은 동양 무보다는 대체로 작고 둥근 모양을 하고 있으며, 붉은색이나 보라색 등 진한색을 띠는 경우가 많다."]);
        this.ingreDetailInfo.set("고사리", ["포자를 생산하는 양치류 식물이다. 한국에서는 어린 고사리의 순을 말리고 삶아서 먹는다. 고사리가 없다면 시금치 같은 잎채소, 혹은 아스파라거스를 데쳐도 된다."]);
        this.ingreDetailInfo.set("시금치", ["시금치는 비타민, 철분, 식이섬유 등 각종 영양성분이 다량 함유된 녹황색 채소이다. 데쳐서 무쳐 먹거나 국으로 끓여 먹는다. 시금치 대신 로메인 상추, 에스커롤, 케일을 사용해도 된다."]);
        this.ingreDetailInfo.set("감자", ["대표적인 구황작물로 삶거나 굽고, 기름에 튀기는 등 다양한 조리법을 활용하여 요리한다."]);
        this.ingreDetailInfo.set("청양고추", ["다른 고추에 비해 캡사이신 성분이 월등히 높아 매운맛이 강한 고추이다. 청양고추가 없다면 세라노를 사용해도 된다. 다만 세라노의 매운맛이 더 강하므로 더 적게 넣도록 한다. 혹은 할라피뇨나 홍고추를 사용해도 된다."]);
        this.ingreDetailInfo.set("애호박", ["덜 자란 어린 호박으로, 주로 찌개류/ 전/ 볶음/ 무침 등 쓰임새가 다양하다. 애호박 대신 주키니 호박을 사용해도 된다."]);
        this.ingreDetailInfo.set("배추", ["밭에서 재배하는 두해살이 잎줄기채소이다. 넓은 잎과 아삭한 식감이 특징적이다."]);
        this.ingreDetailInfo.set("오이", ["길쭉한 초록색 모양을 가진 박과 덩굴식물의 열매로, 주로 생으로 먹는다. 한국에서는 김치를 담거나 생으로 잘라 요리에 넣는다."]);
        this.ingreDetailInfo.set("생강", ["맵고 알싸한 향을 가진 구근식물이다. 주로 뿌리껍질을 벗겨 잘라서 사용한다. 생강이 없다면 생강 가루, 육두구를 사용해도 된다."]);
        this.ingreDetailInfo.set("사과", ["사과나무에서 열리는 열매로 달달한 맛이 난다. 한국 사과는 붉은빛을 띄는 부사 품종이 제일 유명하지만 붉은 사과가 없다면 녹색 사과를 사용해도 된다."]);
        this.ingreDetailInfo.set("배", ["시원하고 단맛을 내는 배나무의 열매이다. 한식은 동양 배로 만들지만, 동양 배를 구할 수 없다면 서양배를 사용해도 된다."]);
        this.ingreDetailInfo.set("표고버섯", ["팽이 모양의 흑갈색 갓을 가진 버섯으로 특유의 향을 가지고 있다. 표고버섯을 구할 수 없다면 양송이, 느타리버섯, 그물버섯(porcini)을 사용해도 된다."]);
        this.ingreDetailInfo.set("팽이버섯", ["한국 팽이버섯은 하얗고 길쭉한 몸통을 가지고 있으며, 익으면 부드러운 식감을 가진다. 꼭 익혀 먹어야 한다. 팽이버섯이 없다면 다른 버섯 종류를 사용한다."]);
        this.ingreDetailInfo.set("돼지", ["돼지에서 얻은 고기이다. 고기 부위에 따라 등심, 안심, 목심, 갈비, 앞다리 등 다양한 부위를 요리에 따라 다르게 사용한다."]);
        this.ingreDetailInfo.set("소", ["소에서 얻은 고기이다. 고기 부위에 따라 등심, 안심, 목심, 채끝, 우둔 등 다양한 부위를 요리에 따라 다르게 사용한다."]);
        this.ingreDetailInfo.set("닭", ["닭에서 얻은 고기이다. 지방이 적어 맛이 담백하고 살이 부드럽다."]);
        this.ingreDetailInfo.set("계란", ["닭이 낳은 알이다. 영양이 풍부하고 다양한 요리에 사용할 수 있다."]);
        this.ingreDetailInfo.set("붕어", ["잉어목 잉어과의 민물고기이다. 생선, 특히 민물고기로 대체 할 수 있다."]);
        this.ingreDetailInfo.set("우럭", ["쏨뱅이목 양볼락과의 바닷물고기이다. 살이 단단한 생선, 바닷물고기로 대체 할 수 있다."]);
        this.ingreDetailInfo.set("바지락", ["대합과에 속하는 조개이다. 감칠맛 나는 해물 육수를 낼 때 많이 쓴다."]);
        this.ingreDetailInfo.set("낙지", ["연체동물문 문어목 문어과에 속하는 생물로, 문어와 생김새가 유사하나 훨씬 작다."]);
        this.ingreDetailInfo.set("가래떡", ["가는 원통형으로 길게 뽑아 일정한 길이로 자른 흰떡이다."]);
        this.ingreDetailInfo.set("어묵", ["생선 살을 으깨어 소금 등을 넣고 반죽하여 익혀서 응고시킨 식품이다. 나무 판에 올려 찌거나 기름에 튀겨서 만들기도 한다."]);
        this.ingreDetailInfo.set("소시지", ["돼지고기나 쇠고기를 곱게 갈아 동물의 창자 또는 인공 케이싱에 채운 고기 가공품이다."]);
        this.ingreDetailInfo.set("칼국수면", ["밀가루 100g에 물 50g과 소금 2g을 넣고 반죽한 후 얇게 핀 다음 4mm 두께로 자른 후 익힌다. 두께가 대략 8mm로, 일반 면에 비해 훨씬 넓적하다."]);
        this.ingreDetailInfo.set("라면", ["국수를 증기로 익히고 기름에 튀겨서 말린 즉석식품이다."]);
        this.ingreDetailInfo.set("김", ["잘게 자른 물김을 물에 풀은 후 김 틀로 얇게 떠 바싹바싹하게 말린 것이다."]);
        this.ingreDetailInfo.set("단무지", ["무를 소금에 절여 말린 다음 설탕 용액에 절여 만든 것이다."]);
        this.ingreDetailInfo.set("단팥", ["팥을 삶아 으깨어 설탕을 넣은 것이다."]);
        this.ingreDetailInfo.set("우유", ["소의 젖, 백색이다. 살균하여 음료로 마시며 아이스크림, 버터, 치즈 따위의 원료로도 쓴다."]);
        this.ingreDetailInfo.set("시리얼", ["곡류를 가공하여 바로 먹을 수 있도록 만든 식품, 주로 우유나 주스를 부어서 아침 식사로 먹는다."]);
        this.ingreDetailInfo.set("젤리", ["과일주스에 펙틴이나 젤라틴을 넣고 굳힌 디저트이다."]);
        this.ingreDetailInfo.set("연유", ["우유를 진공상태에서 1/2~1/3 정도로 농축시킨 것이다. 단 맛이 나는 가당연유는 우유를 농축한 후 약 40%의 설탕을 첨가해서 전체 당분이 약 53%가 되게 만든 것이다."]);
        this.ingreDetailInfo.set("김가루", ["김을 구워서 잘게 자른 것이다."]);
        this.ingreDetailInfo.set("밀가루", ["밀을 빻은 가루로 주로 빵, 과자, 국수 등의 재료로 이용한다."]);

    }

}