import codeImg from "../../../../Image/builder/help/help_sub_code.svg";
import codeDarkImg from "../../../../Image/builder/help/help_sub_code-dark.svg";
import codeDarkImg_ja from "../../../../Image/builder/help/help_1_dark_JP.svg";
import codeDarkImg_en from "../../../../Image/builder/help/help_1_dark_EN.svg";
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
    display:"start",
    title: "빌더에 온걸 환영해요!",
    title_localized: {
      zh: "欢迎来到WIZ LAB Builder！",
      ja: "ビルダーへようこそ！",
      en: "Welcome to the Builder!"
    },
    subtitle: "기본 기능에 대해 설명해줄 거예요.",
    subtitle_localized: {
      en: "Hello, this tutorial will instruct you on the basic features of the builder.",
      ja: "こんにちは。ビルダーをより楽しく使えるように基本機能について説明します。",
      zh: "你好，我们将为大家介绍WIZ LAB Builder最基本的功能，以帮助大家更加方便有趣地使用WIZ LAB Builder。",
    },
    activeButtonTitle: "튜토리얼 시작하기",
    activeButtonTitle_localized: {
      en: "Begin",
      ja: "チュートリアルを始める",
      zh: "开始教程"
    },
    inactiveButtonTitle: "아니야 괜찮아, 넘길래",
    inactiveButtonTitle_localized: {
      en: "Skip",
      ja: "大丈夫だよ、スキップする",
      zh: "没关系，不用了。开始下一个吧。"
    }
  },
  {
    type: "sub",
    title: "코딩의 가장 기본! 코드입력란",
    title_localized: {
      en: "Code Editor",
      ja: "エディターでプログラミング開始！",
      zh: "编程的基础！输入代码是什么？"
    },
    subtitle: "여기에다 명령어 코드를 입력 할 수 있어요.\n친구들이 상상하는 모든 것들을 현실로 만들어 줄 거에요!",
    subtitle_localized: {
      en: "Enter your code here.\nAll the code entered here will be applied to your game.",
      ja: "ここにコマンドコードを入力することができます。\nみなさんが想像するすべてを現実にしてくれますよ！",
      zh: "可以在这里输入命令语代码。\n朋友们想象的一切都能变成现实哦！",
    },
    modalStyle: { top: "355px", left: "201px" },
    anchorStyle: { type: "top", left: "20%" },
    imageStyle: {
      img: codeImg,
      darkImg_ko: codeDarkImg,
      darkImg_en: codeDarkImg_en,
      darkImg_ja: codeDarkImg_ja, 
      width: "953px",
      height: "279px",
      
      top: "42px",
      left: "171px"
    }
  },
  {
    type: "sub",
    title: "스프라이트란?",
    title_localized: {
      en: "What is a Sprite?",
      ja: "スプライトとは？",
      zh: "角色是什么？"
    },
    subtitle: "스프라이트는 게임 창작에 쓸 이미지에요.\n이걸로 우리는 게임의 캐릭터와 가구 등을 만들 수 있어요!",
    subtitle_localized: {
      en: "A sprite is a 2D image used in game production.\nSprites are used to add objects such as characters or obstacles in the game.",
      ja: "スプライトはゲームの創作に使うイメージです。\nこれで私たちはゲームのキャラクターと家具などを作れます！",
      zh: "角色是在游戏创作时要用的图像。\n我们可以用这个来做出游戏人物、家具等等！",
    },
    modalStyle: { top: "52px", left: "305px" },
    anchorStyle: { type: "left", top: "20%" },
    imageStyle: {
      img: spriteImg,
      darkImg: spriteDarkImg,
      top: "42px",
      left: "70px",
      transformOrigin: "top left",
      transform: "scale(0.5)"
    }
  },
  {
    type: "sub",
    title: "스프라이트를 추가해보자!",
    title_localized: {
      en: "Add Sprites!",
      ja: "スプライトを追加してみよう！",
      zh: "让我们来添加角色吧！"
    },
    subtitle: "‘+’ 버튼으로 스프라이트를 목록에 추가할 수 있어요!",
    subtitle_localized: {
      en: "Use the + button to add sprites to the list for your game!",
      ja: "‘+’ ボタンでスプライトリストに追加することができます！",
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
      en: "Game Preview Screen",
      ja: "スプライトを操作してみよう！",
      zh: "让我们操控角色吧！"
    },
    subtitle: "프리뷰는 추가한 스프라이트들과 배경을 수정하는걸\n실시간으로 보여줘요!",
    subtitle_localized: {
      en: "This window displays the current state of your game in real time.",
      ja: "プレビューは追加したスプライトと背景を修正するのをリアルタイムで見せてくれます！",
      zh: "预览（preview）可以将添加的角色和背景的整个修改过程\n实时地呈现给大家！",
    },
    modalStyle: { bottom: "470px", right: "360px" },
    anchorStyle: { type: "bottom", right: "20%" },
    imageStyle: {
      img: previewImg,
      darkImg: previewDarkImg,
      bottom: "60px",
      right: "120px",
      transformOrigin: "bottom right",
      transform: "scale(0.25)",
      borderRadius: "40px"
    }
  },
  {
    type: "sub",
    title: "실행 버튼으로 창작한걸 실행해봐!",
    title_localized: {
      en: "Run the Game",
      ja: "実行ボタンで作ったゲームを実行してみよう！",
      zh: "使用运行按钮，运行一下已创作的作品吧！"
    },
    subtitle: "중간 중간 친구들이 만든 것들이\n제대로 작동하고 있는지 실행볼 수 있어요",
    subtitle_localized: {
      en: "You can run game anytime by pressing this button.\nIt's always good to check your progress throughout making a game to see if it runs the way you want it to!",
      ja: "途中でみなさんが作ったものがきちんと\n作動するのか実行してみることができます。",
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
      en: "Need Some Guidance?",
      ja: "必要なコマンドがあればこちら！",
      zh: "如果有什么问题时"
    },
    subtitle: "동영상, API 목록, 채팅으로 궁금한게 있으면 꼭 클릭해봐요!",
    subtitle_localized: {
      en: "You can find some helpful tips to code some features by pressing the lightbulb button. If you forget the specific name of a command, you can search for it in the API list by clicking the <> button!",
      ja: "動画、APIリスト、チャットで気になるものがあればかぜひクリックしてみてね！",
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
      en: "Save the game and publish it!",
      ja: "ゲームを完成してパブリッシングまで！",
      zh: "从游戏完成再到发布！"
    },
    subtitle: "게임이 완성 됐다고 생각 되면 친구들에게 자랑해봐요!\n(로그인은 필수!)",
    subtitle_localized: {
      en: "If you're finished making the game, save it by clicking this button and entering the required fields. You can choose to share the game with your friends by publishing the game as public!",
      ja: "ゲームが完成されたと思ったら、友達に自慢してみてね！\n（ログインは必須！）",
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
    display:"end",
    title: "축하해요!",
    title_localized: {
      en: "Congratulations!",
      ja: "おめでとう！",
      zh: "恭喜您！"
    },
    subtitle: "여기까지가 친구들만의 독특한 게임을 창작하기에 앞서 알아야 할 기본적인 기능들이에요.\n자유롭게 위즈랩 빌더를 사용해봐요!",
    subtitle_localized: {
      en: "These are the basic functions of the builder.\nUse the builder to create your own game!",
      ja: "ゲームを作る前に知っておく基本的な機能でした。\n自由にビルダーを使ってみましょう！",
      zh: "创作属于自己的独特游戏之前该知道的基本功能都已经介绍完了。\n现在您可以自由使用WIZ LAB Builder了！",
    },
    activeButtonTitle: "창작 시작하기",
    activeButtonTitle_localized: {
      en: "Start Building",
      ja: "ゲーム作りを始める",
      zh: "开始创作",
    },
  }
];
