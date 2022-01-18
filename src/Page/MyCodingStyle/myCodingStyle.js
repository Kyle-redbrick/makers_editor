export const MYCODINGSTYLE_QUESTION_TARGET = {
  QUESTION: "question",
  RESULT: "result"
};

export default {
  title: "위즈메이트로 알아보는 나의 코딩 스타일은?",
  questions: [
    {
      title:
        "달리기 게임에서 우승해야해!\n한 가지 아이템을 사용할 수 있는데,\n어떤 아이템을 사용할래?",
      imgSrc: "",
      choices: [
        {
          title: "시간을 멈추는\n마법 시계",
          imgSrc: require("./Image/watch.png")
        },
        {
          title: "초스피드로\n달리는 신발",
          imgSrc: require("./Image/shoes.png")
        }
      ]
    },
    {
      title: "캐릭터가 너무 오래 달려서 지쳐버렸어.\n어디에서 쉬게 할까?",
      imgSrc: "",
      choices: [
        {
          title: "스킬을 하나\n더 배울 수 있는\n나무 그늘 아래",
          imgSrc: require("./Image/tree.png")
        },
        {
          title: "물을 마시며\n체력을 회복!\n졸졸졸 시냇가",
          imgSrc: require("./Image/water.png")
        }
      ]
    },
    {
      title:
        "앗, 목적지까지 얼마 남지 않았는데...\n체력이 떨어진 친구 캐릭터가 있어!\n어떡하지?",
      imgSrc: "",
      choices: [
        {
          title: "내 체력 포션을\n나눠준다.",
          imgSrc: require("./Image/potion.png")
        },
        {
          title: "우승이 중요해!\n그냥 간다.",
          imgSrc: require("./Image/trophy.png")
        }
      ]
    },
    {
      title:
        "야호! 도착했다!\n완주 기념으로 상품으로 받을 아이템을\n선택할 수 있어!",
      imgSrc: "",
      choices: [
        {
          title: "아주 희귀한\n레어 아이템",
          imgSrc: require("./Image/treasure box.png")
        },
        { title: "두둑한\n게임 머니", imgSrc: require("./Image/money.png") }
      ]
    }
  ],
  results: {
    0: {
      title: "창의적인 천재 타입",
      imgSrc: require("./Image/result0.jpg"),
      description: `너는 늘 새로운 일에 관심이 있고 호기심이 많은 친구야.
창의적인 방법으로 문제를 해결하는 것을 좋아하고, 
뻔한 결론은 시시하다고 생각하는 타입이지.

너의 반짝이는 아이디어는 신비로운 곳으로 모험을 떠나는 게임과 아주 잘 맞아!
특별한 코딩 방법으로 몬스터를 무찌르고,
유적지의 보물을 찾는 <고대 몬스터의 부활> 게임 앱을 만들어볼래?`
    },
    1: {
      title: "세심한 꼼꼼 타입",
      imgSrc: require("./Image/result1.jpg"),
      description: `너는 혼자서도 척척 해내는 일이 많고 이해가 빠른 똑똑한 친구야.
다른 사람이 어려움에 처했을 때 외면하지 않고 도움을 주는
따뜻한 마음을 가진 멋진 타입이지.

너의 꼼꼼하고 따뜻한 성격은 캐릭터를 성장시키는 게임과 아주 잘 맞아!
재밌는 코딩 방법으로 아기 공룡을 길들이고 훈련시켜서
못된 익룡을 혼내주는 <다이너소어 길들이기> 게임 앱을 만들어볼래?`
    },
    2: {
      title: "도전적인 과감 타입",
      imgSrc: require("./Image/result2.jpg"),
      description: `너는 항상 새로운 것을 좋아하고, 마음만 먹으면 못하는 것이 없는 친구야.
용기있는 행동으로 주변 사람들에게 많은 힘을 주고
과감한 결단력이 돋보이는 스마트한 타입이지

너의 과감한 결단력과 용기있는 도전 자세는 마법 스킬 게임과 아주 잘 맞아!
멋진 코딩 방법으로 몬스터를 무찌르고
성소를 지키는 <몰려오는 몬스터> 게임 앱을 만들어볼래?`
    }
  },
  resultMap: {
    "0000": 0,
    "0001": 1,
    "0010": 0,
    "0011": 0,
    "0100": 2,
    "0101": 1,
    "0110": 2,
    "0111": 0,
    "1000": 1,
    "1001": 1,
    "1010": 0,
    "1011": 0,
    "1100": 1,
    "1101": 1,
    "1110": 2,
    "1111": 2
  }
};
