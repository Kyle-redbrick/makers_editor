import codeImg from "../../../../Image/builder/help/help_sub_code.svg";
import codeDarkImg from "../../../../Image/builder/help/help_sub_code-dark.svg";
import spriteImg from "../../../../Image/builder/help/help_sub_sprite.png";
import spriteDarkImg from "../../../../Image/builder/help/help_sub_sprite-dark.png";
import addImg from "../../../../Image/builder/help/help_sub_add.png";
import addDarkImg from "../../../../Image/builder/help/help_sub_add-dark.png";
import menuImg from "../../../../Image/builder/help/help_sub_menu.svg";
import menuDarkImg from "../../../../Image/builder/help/help_sub_menu-dark.svg";
import previewImg from "../../../../Image/builder/help/help_sub_preview.png";
import previewDarkImg from "../../../../Image/builder/help/help_sub_preview-dark.png";
import playImg from "../../../../Image/builder/help/help_sub_play.svg";
import playDarkImg from "../../../../Image/builder/help/help_sub_play-dark.svg";
import publishImg from "../../../../Image/builder/help/help_sub_publish.svg";
import publishDarkImg from "../../../../Image/builder/help/help_sub_publish-dark.svg";

export default [
  {
    type: "main",
    title: "레드브릭 빌더에 온걸 환영해요!",
    title_localized: {
      zh: "欢迎来到WIZ LAB Builder！",
      jp: "レッドブリックビルダーへようこそ！",
      en: "Welcome to the Redbrick Builder!"
    },
    subtitle: "안녕, 레드브릭 빌더를 더욱 즐겁게 이용할 수 있도록 기본 기능에 대해 설명해줄 거예요.",
    subtitle_localized: {
      en: "Hello, this will instruct you on the basic features to help you enjoy Redbrick Builder.",
      jp: "こんにちは。レッドブリックビルダーをより楽しく使えるように基本機能について説明しますね。",
      zh: "你好，我们将为大家介绍WIZ LAB Builder最基本的功能，以帮助大家更加方便有趣地使用WIZ LAB Builder。",
    },
    activeButtonTitle: "튜토리얼 시작하기",
    activeButtonTitle_localized: {
      en: "Begin the tutorial",
      jp: "チュートリアルを始める",
      zh: "开始教程"
    },
    inactiveButtonTitle: "아니야 괜찮아, 넘길래",
    inactiveButtonTitle_localized: {
      en: "No, I'll skip this",
      jp: "大丈夫だよ、スキップする",
      zh: "没关系，不用了。开始下一个吧。"
    }
  },
  {
    type: "sub",
    title: "코딩의 가장 기본! 코드입력란",
    title_localized: {
      en: "The fundamental basic of coding! Code input field",
      jp: "コーディングの基本中の基本 入力欄",
      zh: "编程的基础！输入代码是什么？"
    },
    subtitle: "여기에다 명령어 코드를 입력 할 수 있어요.\n친구들이 상상하는 모든 것들을 현실로 만들어 줄 거에요!",
    subtitle_localized: {
      en: "You can write code in here.\nThis will make everything you imagine into reality!",
      jp: "ここにコマンドコードを入力することができます。\nみなさんが想像するすべてを現実にしてくれますよ！",
      zh: "可以在这里输入命令语代码。\n朋友们想象的一切都能变成现实哦！",
    },
    modalStyle: { top: "355px", left: "201px" },
    anchorStyle: { type: "top", left: "20%" },
    imageStyle: {
      img: codeImg,
      darkImg: codeDarkImg,
      top: "42px",
      left: "171px"
    }
  },
  {
    type: "sub",
    title: "스프라이트란?",
    title_localized: {
      en: "What is a sprite?",
      jp: "スプライトとは？",
      zh: "角色是什么？"
    },
    subtitle: "스프라이트는 게임 창작에 쓸 이미지에요.\n이걸로 우리는 게임의 캐릭터와 가구 등을 만들 수 있어요!",
    subtitle_localized: {
      en: "A sprite is an image used in game production.\nWe can use this to create things like a game's character and furniture!",
      jp: "スプライトはゲームの創作に使うイメージです。\nこれで私たちはゲームのキャラクターと家具などを作れます！",
      zh: "角色是在游戏创作时要用的图像。\n我们可以用这个来做出游戏人物、家具等等！",
    },
    modalStyle: { top: "52px", left: "257px" },
    anchorStyle: { type: "left", top: "20%" },
    imageStyle: {
      img: spriteImg,
      darkImg: spriteDarkImg,
      top: "42px",
      left: "70px",
      transformOrigin: "top left",
      transform: "scale(0.75)"
    }
  },
  {
    type: "sub",
    title: "스프라이트를 추가해보자!",
    title_localized: {
      en: "Add sprites!",
      jp: "スプライトを追加してみよう！",
      zh: "让我们来添加角色吧！"
    },
    subtitle: "‘+’ 버튼으로 스프라이트를 목록에 추가할 수 있어요!",
    subtitle_localized: {
      en: "Use the ‘+’ button to add sprites to the list!",
      jp: "‘+’ ボタンでスプライトリストに追加することができます！",
      zh: "使用’+’按钮可以将角色添加到目录中！",
    },
    modalStyle: { bottom: "72px", left: "206px" },
    anchorStyle: { type: "left", bottom: "20%" },
    imageStyle: {
      img: addImg,
      darkImg: addDarkImg,
      bottom: "82px",
      left: "70px",
      transformOrigin: "bottom left",
      transform: "scale(0.5)"
    }
  },
  {
    type: "sub",
    title: "스프라이트들을 조종해봐!",
    title_localized: {
      en: "Control the sprites!",
      jp: "スプライトを操作してみよう！",
      zh: "让我们操控角色吧！"
    },
    subtitle: "프리뷰는 추가한 스프라이트들과 배경을 수정하는걸\n실시간으로 보여줘요!",
    subtitle_localized: {
      en: "The preview shows the added sprites and modified backgrounds in real-time!",
      jp: "プレビューは追加したスプライトと背景を修正するのをリアルタイムで見せてくれます！",
      zh: "预览（preview）可以将添加的角色和背景的整个修改过程\n实时地呈现给大家！",
    },
    modalStyle: { bottom: "421px", right: "360px" },
    anchorStyle: { type: "bottom", right: "20%" },
    imageStyle: {
      img: previewImg,
      darkImg: previewDarkImg,
      bottom: "60px",
      right: "120px",
      transformOrigin: "bottom right",
      transform: "scale(0.5)",
      borderRadius: "40px"
    }
  },
  {
    type: "sub",
    title: "실행 버튼으로 창작한걸 실행해봐!",
    title_localized: {
      en: "Use the run button to run your creation!",
      jp: "実行ボタンで創作したものを実行してみよう！",
      zh: "使用运行按钮，运行一下已创作的作品吧！"
    },
    subtitle: "중간 중간 친구들이 만든 것들이\n제대로 작동하고 있는지 실행볼 수 있어요",
    subtitle_localized: {
      en: "You can try running projects\nmade by your friends in the middle.",
      jp: "途中でみなさんが作ったものがきちんと\n作動するのか実行してみることができます。",
      zh: "可以随时运行程序\n检查大家所做的作品是否正常运行。",
    },
    modalStyle: { bottom: "60px", right: "136px" },
    anchorStyle: { type: "right", bottom: "20%" },
    imageStyle: {
      img: playImg,
      darkImg: playDarkImg,
      bottom: "50px",
      right: "10px"
    }
  },
  {
    type: "sub",
    title: "궁금한 점이 있다면?",
    title_localized: {
      en: "Have any questions?",
      jp: "気になる点があればこちら！",
      zh: "如果有什么问题时"
    },
    subtitle: "동영상, API 목록, 채팅으로 궁금한게 있으면 꼭 클릭해봐요!",
    subtitle_localized: {
      en: "Click if you have any questions regarding videos, API list, or chat!",
      jp: "動画、APIリスト、チャットで気になるものがあればかぜひクリックしてみてね！",
      zh: "有什么问题时一定要点击视频、API目录、聊天窗口来解决疑问哦！",
    },
    modalStyle: { top: "52px", right: "140px" },
    anchorStyle: { type: "right", top: "20%" },
    imageStyle: {
      img: menuImg,
      darkImg: menuDarkImg,
      top: "42px",
      right: "10px",
      transformOrigin: "top right",
      transform: "scale(1.5)",
      borderRadius: "10px"
    }
  },
  {
    type: "sub",
    title: "게임 완성후에 퍼블리싱까지!",
    title_localized: {
      en: "Create a game and publish it!",
      jp: "ゲームを完成してからパブリッシングまで！",
      zh: "从游戏完成再到发布！"
    },
    subtitle: "게임이 완성 됐다고 생각 되면 친구들에게 자랑해봐요!\n(로그인은 필수!)",
    subtitle_localized: {
      en: "If you think your game is complete, show it to your friends!\n(Make sure to stay logged in!)",
      jp: "ゲームが完成されたと思ったら、友達に自慢してみてね！\n（ログインは必須！）",
      zh: "完成游戏之后可以向朋友们炫耀一下哦！\n（必须要先登录！）",
    },
    modalStyle: { top: "120px", right: "48px" },
    anchorStyle: { type: "topRight" },
    imageStyle: {
      img: publishImg,
      darkImg: publishDarkImg,
      top: "10px",
      right: "10px",
      transformOrigin: "top right",
      transform: "scale(0.75)"
    }
  },
  {
    type: "main",
    title: "축하해요!",
    title_localized: {
      en: "Congratulations!",
      jp: "おめでとう！",
      zh: "恭喜您！"
    },
    subtitle: "여기까지가 친구들만의 독특한 게임을 창작하기에 앞서 알아야 할 기본적인 기능들이에요.\n자유롭게 위즈랩 빌더를 사용해봐요!",
    subtitle_localized: {
      en: "These are the basics you need to know to create your unique game.\nUse the Redbrick builder as you wish now!",
      jp: "ここまでがみなさんが独特なゲームを作り上げる前に知っておく必要がある基本的な機能です。\n自由にレッドブリックビルダーを使ってみましょう！",
      zh: "创作属于自己的独特游戏之前该知道的基本功能都已经介绍完了。\n现在您可以自由使用WIZ LAB Builder了！",
    },
    activeButtonTitle: "창작 시작하기",
    activeButtonTitle_localized: {
      en: "Begin creation",
      jp: "創作を始める",
      zh: "开始创作",
    },
  }
];
