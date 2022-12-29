/**
 * snippet = [ { title , description, image, steps:[{title, javascriptCode, image, description },...] },...]
 *
 * @author kate
 */
 export default [
  {
    title: {
      ko: "점프하는 캐릭터 만들기",
      en: "Make a Character Jump.",
      zh: "让角色跳起来",
      ja: "ジャンプするキャラクターの作成",
      default: "점프하는 캐릭터 만들기"
    },
    video: "Video/snippet01.mp4",
    steps: [
      {
        title: {
          ko: "캐릭터가 아래로 내려가도록 중력을 설정합니다.",
          en: "Set gravity on the character sprite to make it go down.",
          ja: "キャラクターが下に落ちるように重力を設定してください。",
          zh: "给角色设置重力，让角色向下移动。",
          default: "캐릭터가 아래로 내려가도록 중력을 설정합니다."
        },
        javascriptCode: {
          ko: `setGravityY(1000)`,
          en: `setGravityY(1000)`,
          ja: `setGravityY(1000)`,
          zh: `setGravityY(1000)`,
          default: `setGravityY(1000)`
        }
      },
      {
        title: {
          ko: "스페이스키를 누르면 위로 올라가도록 만들어볼까요?",
          en: "Make the character move up by pressing a specificed key. In our example, we'll use the spacebar.",
          ja: "スペースキーを押すと上昇するようにしましょう。",
          zh: "通过点击空格键，让角色向上移动吧！",
          default: "스페이스키를 누르면 위로 올라가도록 만들어볼까요?"
        },
        javascriptCode: {
          ko: `onKey("space",function(){
    setVelocityY(-500)
})`,
          en: `onKey("space",function(){
    setVelocityY(-500)
})`,
          ja: `onKey("space",function(){
    setVelocityY(-500)
})`,
          default: `onKey("space",function(){
    setVelocityY(-500)
})`,
          zh: `onKey("space",function(){
    setVelocityY(-500)
})`
        },
        description: {
          ko: "자유롭게 원하는 숫자를 입력해보세요.",
          en: "Enter a negative value for the Y-axis velocity to make the sprite move up.",
          ja: "自由に好きな数字を入力してください。",
          zh: "请自由输入任意数字。",
          default: "자유롭게 원하는 숫자를 입력해보세요."
        }
      },
      {
        title: {
          ko:
            "캐릭터가 장면아래로 떨어지나요? 다음 코드를 입력해서 화면밖으로 못나가게 만들어보세요.",
          en: "Make the character stay in the screen by setting it to collide with the background. Add this statement in a line that is not in the onKey block.",
          ja: "キャラクターが画面外に落ちてしまいましたか？次のコードを入力して画面外に出ないようにしましょう。",
          zh:
            "角色是不是总掉到场景外面去呢？请输入以下代码，让角色无法脱离界面吧。",
          default:
            "캐릭터가 장면아래로 떨어지나요? 다음 코드를 입력해서 화면밖으로 못나가게 만들어보세요."
        },
        javascriptCode: {
          ko: `setCollideScene(true)`,
          en: `setCollideScene(true)`,
          ja: `setCollideScene(true)`,
          zh: `setCollideScene(true)`,
          default: `setCollideScene(true)`
        }
      },
      {
        title: {
          ko: "만약 이단점프를 막고싶다면 코드를 다음과 같이 수정해보세요.",
          en: "Currently, the character can jump continuously even when it's still in the air. Add the following condition to the onKey block to prevent this.",
          ja: "2段ジャンプを禁止したい場合は、次のようにコードを修正してください。",
          zh: "如果不想出现双重跳跃，请如下修改代码。",
          default: "만약 이단점프를 막고싶다면 코드를 다음과 같이 수정해보세요."
        },
        javascriptCode: {
          ko: `onKey("space",function(){
    if(getVelocityY()==0){
        setVelocityY(-500)
      }
})`,
          en: `onKey("space",function(){
    if(getVelocityY()==0){
        setVelocityY(-500)
    }
})`,
          ja: `onKey("space",function(){
    if(getVelocityY()==0){
        setVelocityY(-500)
    }
})`,
          zh: `onKey("space",function(){
    if(getVelocityY()==0){
        setVelocityY(-500)
    }
})`,
          default: `onKey("space",function(){
    if(getVelocityY()==0){
        setVelocityY(-500)
    }
})`
        }
      },
      {
        title: {
          ko: "완성!",
          en: "All Set. The code you entered should look something like this.",
          ja: "完成！",
          zh: "完成！",
          default: "완성!"
        },
        javascriptCode: {
          ko: `setGravityY(1000)
onKey("space",function(){
    if(getVelocityY()==0){
      setVelocityY(-500)
    }
})
setCollideScene(true)`,
          en: `setGravityY(1000)
onKey("space",function(){
    if(getVelocityY()==0){
      setVelocityY(-500)
    }
})
setCollideScene(true)`,
          ja: `setGravityY(1000)
onKey("space",function(){
    if(getVelocityY()==0){
      setVelocityY(-500)
    }
})
setCollideScene(true)`,
          zh: `setGravityY(1000)
onKey("space",function(){
    if(getVelocityY()==0){
      setVelocityY(-500)
    }
})
setCollideScene(true)`,
          default: `setGravityY(1000)
onKey("space",function(){
    if(getVelocityY()==0){
      setVelocityY(-500)
    }
})
setCollideScene(true)`
        }
      }
    ]
  },
  {
    title: {
      ko: "흐르는 배경 만들기",
      en: "Make a Scrolling Background.",
      ja: "スクロールする背景の作成",
      zh: "让背景滚动",
      default: "흐르는 배경 만들기"
    },
    video: "Video/snippet02.mp4",
    steps: [
      {
        title: {
          ko:
            "배경 스프라이트가 매 프레임마다 옆으로 이동하게 코드를 작성해보세요.",
          en: "Make the background scroll by adding the onFrame command and the go command to the background sprite.",
          ja: "背景スプライトが各フレームごとに横に移動するようにコードを作成しましょう。",
          zh:
            "请写出背景角色每帧都会横向移动的程序代码吧。",
          default:
            "배경 스프라이트가 매 프레임마다 옆으로 이동하게 코드를 작성해보세요."
        },
        description: {
          ko:
            "반대방향으로 움직이게 하고싶다면 goX의 값을 -3으로 변경해보세요. ",
          en: "Use goX() and enter a positive or negative value within the () to make the screen scroll right or left. Use goY() and enter a positive or negative value within the () to make the screen scroll up or down.",
          ja: "反対方向に動かせたい場合は、goXの値を-3に変更してください。",
          zh:
            "如果想让背景反方向移动，请将goX值修改为 -3。",
          default:
            "반대방향으로 움직이게 하고싶다면 goX의 값을 -3으로 변경해보세요. "
        }
      },
      {
        title: {
          ko: "완성!",
          en: "In this example, we're making the scene move right.",
          ja: "完成！",
          zh: "完成！",
          default: "완성!"
        },
        javascriptCode: {
          ko: `onFrame(function(){
    goX(3)
})`,
          en: `onFrame(function(){
    goX(3)
})`,
          ja: `onFrame(function(){
    goX(3)
})`,
          zh: `onFrame(function(){
    goX(3)
})`,
          default: `onFrame(function(){
    goX(3)
})`
        },
      }
    ]
  },

  {
    title: {
      ko: "미사일 발사하기",
      en: "Make a Character Launch a Projectile",
      ja: "ミサイルの発射",
      zh: "发射导弹",
      default: "미사일 발사하기"
    },
    video: "Video/snippet03.mp4",
    steps: [
      {
        title: {
          ko: "미사일 스프라이트가 숨어있게 만들어주세요.",
          en: "First, add the sprite intended to be launched to the sprite list and then enter the hide command.",
          ja: "ミサイルのスプライトが隠れるように作成してください。",
          zh: "请让导弹角色隐藏起来吧。",
          default: "미사일 스프라이트가 숨어있게 만들어주세요."
        },
        javascriptCode: {
          ko: `hide()`,
          en: `hide()`,
          ja: `hide()`,
          zh: `hide()`,
          default: `hide()`
        }
      },
      {
        title: {
          ko:
            "스페이스키를 누를 때 미사일 스프라이트가 복제되면서 발사되도록 아래의 코드를 작성해주세요.",
          en: "Enter the code below to the projectile sprite. This should be added after the hide command.",
          ja: "スペースキーを押すとミサイルの下にスプライトがコピーされて発射されるように下記のコードを作成してください。",
          zh:
            "请编写程序，当点击空格键时，复制导弹角色且发射。",
          default:
            "스페이스키를 누를 때 미사일 스프라이트가 복제되면서 발사되도록 아래의 코드를 작성해주세요."
        },
        javascriptCode: {
          ko: `onKey("space",function(){
    goToSprite("주인공 스프라이트")
    var missile = clone()
    missile.setVelocityX(2000)
    missile.show()
    missile.onOutStage(function(){
        missile.kill()
    })
})`,
          en: `onKey("space",function(){
    goToSprite("main character sprite")
    var missile = clone()
    missile.setVelocityX(2000)
    missile.show()
    missile.onOutStage(function(){
        missile.kill()
    })
})`,
          ja: `onKey("space",function(){
    goToSprite("主人公のスプライト")
    var missile = clone()
    missile.setVelocityX(2000)
    missile.show()
    missile.onOutStage(function(){
        missile.kill()
    })
})`,
          zh: `onKey("space",function(){
    goToSprite("主人公角色")
    var missile = clone()
    missile.setVelocityX(2000)
    missile.show()
    missile.onOutStage(function(){
        missile.kill()
    })
})`,
          default: `onKey("space",function(){
    goToSprite("주인공 스프라이트")
    var missile = clone()
    missile.setVelocityX(2000)
    missile.show()
    missile.onOutStage(function(){
        missile.kill()
    })
})`
        },
        description: {
          ko: "goToSprite에 주인공 스프라이트의 이름을 적어주세요.",
          en: "Write the name of the character sprite that will fire the projectile in goToSprite. You can change the firing key from the spacebar to any button you'd like by changing the key in the onKey command.",
          ja: "goToSpriteに主人公のスプライトの名前を入力してください。",
          zh: "请在goToSprite中输入主人公角色名称。",
          default: "goToSprite에 주인공 스프라이트의 이름을 적어주세요."
        }
      },
      {
        title: {
          ko: "완성!",
          en: "Your code should look something like this.",
          ja: "完成！",
          zh: "完成！",
          default: "완성!"
        },
        javascriptCode: {
          ko: `hide()
onKey("space",function(){
    goToSprite("주인공 스프라이트")
    var missile = clone()
    missile.setVelocityX(2000)
    missile.show()
    missile.onOutStage(function(){
        missile.kill()
    })
})`,
          en: `hide()
onKey("space",function(){
    goToSprite("main character sprite")
    var missile = clone()
    missile.setVelocityX(2000)
    missile.show()
    missile.onOutStage(function(){
        missile.kill()
    })
})`,
          ja: `hide()
onKey("space",function(){
    goToSprite("主人公のスプライト")
    var missile = clone()
    missile.setVelocityX(2000)
    missile.show()
    missile.onOutStage(function(){
        missile.kill()
    })
})`,
          zh: `hide()
onKey("space",function(){
    goToSprite("主人公角色")
    var missile = clone()
    missile.setVelocityX(2000)
    missile.show()
    missile.onOutStage(function(){
        missile.kill()
    })
})`,
          default: `hide()
onKey("space",function(){
    goToSprite("주인공 스프라이트")
    var missile = clone()
    missile.setVelocityX(2000)
    missile.show()
    missile.onOutStage(function(){
        missile.kill()
    })
})`
        }
      }
    ]
  },
  {
    title: {
      ko: "타이머 만들기",
      en: "Add a Timer",
      ja: "タイマーの作成",
      zh: "制作计时器",
      default: "타이머 만들기"
    },
    video: "Video/snippet04.mp4",
    steps: [
      {
        title: {
          ko:
            "스프라이트 박스에서 텍스트 스프라이트를 가져오고, 타이머를 시작해주세요.",
          en: "Add a Textbox to the sprite list and add code in the timer. Start the timer.",
          ja: "スプライトボックスからテキストスプライトを取り出して、タイマーをスタートさせてください。",
          zh:
            "请从角色栏中取出角色，开始计时。",
          default:
            "스프라이트 박스에서 텍스트 스프라이트를 가져오고, 타이머를 시작해주세요."
        },
        javascriptCode: {
          ko: `startTimer()`,
          en: `startTimer()`,
          ja: `startTimer()`,
          zh: `startTimer()`,
          default: `startTimer()`
        }
      },
      {
        title: {
          ko:
            "매 프레임마다 타이머의 값을 가져와서 텍스트 스프라이트의 내용을 변경해주세요.",
          en: "Make a variable hold the value of the time in each frame and set the variable as the text in the textbox.",
          ja: "各フレームのタイマーの値を取得して、テキストスプライトの内容を変更してください。",
          zh:
            "每帧都将计时器的值取出来，以变更文本角色里的内容。",
          default:
            "매 프레임마다 타이머의 값을 가져와서 텍스트 스프라이트의 내용을 변경해주세요."
        },
        javascriptCode: {
          ko: `onFrame(function(){
    var time = getTimer()
    setText(time)
})`,
          en: `onFrame(function(){
    var time = getTimer()
    setText(time)
})`,
          ja: `onFrame(function(){
    var time = getTimer()
    setText(time)
})`,
          zh: `onFrame(function(){
    var time = getTimer()
    setText(time)
})`,
          default: `onFrame(function(){
    var time = getTimer()
    setText(time)
})`
        }
      },
      {
        title: {
          ko:
            "타이머의 소수점을 제거하고 싶다면 다음과 같이 코드를 변경해보세요.",
          en: "If you just want to see whole numbers without the decimal point, add parseInt like below.",
          ja: "タイマーの小数点を表示したくない場合は、次のようにコードを変更しましょう。",
          zh:
            "想要去掉计时器的小数点，请如下修改代码。",
          default:
            "타이머의 소수점을 제거하고 싶다면 다음과 같이 코드를 변경해보세요."
        },
        javascriptCode: {
          ko: `onFrame(function(){
    var time = parseInt(getTimer())
    setText(time)
})`,
          en: `onFrame(function(){
    var time = parseInt(getTimer())
    setText(time)
})`,
          ja: `onFrame(function(){
    var time = parseInt(getTimer())
    setText(time)
})`,
          zh: `onFrame(function(){
    var time = parseInt(getTimer())
    setText(time)
})`,
          default: `onFrame(function(){
    var time = parseInt(getTimer())
    setText(time)
})`
        }
      },
    ]
  },
  {
    title: {
      ko: "조이스틱 사용하기(1)",
      en: "Connect the Joystick to a Sprite",
      ja: "ジョイスティックの使用(1)",
      zh: "使用游戏杆（1）",
      default: "조이스틱 사용하기(1)"
    },
    video: "Video/snippet05.mp4",
    steps: [
      {
        title: {
          ko:
            "스프라이트 박스에서 조이스틱을 가져오고 3번째 줄 getSprite의 name부분을 움직이고자 하는 스프라이트의 이름으로 바꿔주세요.",
          en: " Add a joystick to the sprite list and replace \"main character\" in the getSprite command with the name of the sprite you want to connect.",
          ja: "スプライトボックスからジョイスティックを取り出して、3行目のgetSpriteのnameを動かしたいスプライトの名前に変更してください。",
          zh:
            "请从角色栏中取出游戏杆，将第三行getSprite的name部分改为想要操控的角色名称。",
          default:
            "스프라이트 박스에서 조이스틱을 가져오고 3번째 줄 getSprite의 name부분을 움직이고자 하는 스프라이트의 이름으로 바꿔주세요."
        },
        javascriptCode: {
          ko: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("주인공 스프라이트")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`,
          en: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("Main Character Sprite")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`,
          ja: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("主人公のスプライト")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`,
          zh: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("主人公角色")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`,
          default: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("주인공 스프라이트")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`
        },
        description: {
          ko:
            "움직이는 속도를 변경하고 싶다면 maxSpeed의 값을 자유롭게 변경해보세요.",
          en: "If you want to change the movement speed, change the value of maxSpeed.",
          ja: "動く速度を変更したい場合は、maxSpeedの値を好きな数字に変更してください。",
          zh:
            "如果想要改变移动速度，可自由修改maxSpeed的值。",
          default:
            "움직이는 속도를 변경하고 싶다면 maxSpeed의 값을 자유롭게 변경해보세요."
        }
      }
    ]
  },

  {
    title: {
      ko: "조이스틱 사용하기(2)",
      en: "Using the Joystick (2)",
      ja: "ジョイスティックの使用(2)",
      zh: "使用游戏杆（2）",
      default: "조이스틱 사용하기(2)"
    },
    video: "Video/snippet12.mp4",
    steps: [
      {
        title: {
          ko:
            "스프라이트 박스에서 조이스틱을 가져오고 3번째 줄 getSprite의 name부분을 움직이고자 하는 스프라이트의 이름으로 바꿔주세요.",
          en: "Get the joystick from the sprite box and replace the name of getSprite on the third line with the name of the sprite you want to move.",
          ja: "スプライトボックスからジョイスティックを取り出して、3行目のgetSpriteのnameを動かしたいスプライトの名前に変更してください。",
          zh:
            "请从角色栏中取出游戏杆，将第三行getSprite的name部分改为想要操控的角色名称。",
          default:
            "스프라이트 박스에서 조이스틱을 가져오고 3번째 줄 getSprite의 name부분을 움직이고자 하는 스프라이트의 이름으로 바꿔주세요."
        },
        javascriptCode: {
          ko: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("주인공 스프라이트")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`,
          en: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("Main Character Sprite")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`,
          ja: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("主人公のスプライト")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`,
          zh: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("主人公角色")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`,
          default: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("주인공 스프라이트")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`
        },
        description: {
          ko:
            "움직이는 속도를 변경하고 싶다면 maxSpeed의 값을 자유롭게 변경해보세요.",
          en: "If you want to change the movement speed, feel free to change the value of maxSpeed.",
          ja: "動く速度を変更したい場合は、maxSpeedの値を好きな数字に変更してください。",
          zh:
            "如果想要改变移动速度，可自由修改maxSpeed的值。",
          default:
            "움직이는 속도를 변경하고 싶다면 maxSpeed의 값을 자유롭게 변경해보세요."
        }
      },
      {
        title: {
          ko:
            "스프라이트의 각도를 조이스틱의 각도만큼 변경해줍니다. 이 예제에서는 위를 보고있는 스프라이트이기 때문에 조이스틱의 각도에 90을 더합니다.",
          en: "Make the sprite face the direction of the movement from the joystick. With our example, we have to add 90 degrees to the angle of the joystick because the sprite faces upwards.",
          ja: "スプライトの角度をジョイスティックの角度の分だけ変更してください。このサンプルでは上を向いているスプライトなので、ジョイスティックの角度に90度を足してください。",
          zh:
            "请将角色角度按照游戏杆角度修改。该例子中的角色是面向上方的，因此要在角色角度加上90。",
          default:
            "스프라이트의 각도를 조이스틱의 각도만큼 변경해줍니다. 이 예제에서는 위를 보고있는 스프라이트이기 때문에 조이스틱의 각도에 90을 더합니다."
        },
        javascriptCode: {
          ko: `sprite.setDegree(degree + 90)`,
          en: `sprite.setDegree(degree + 90)`,
          ja: `sprite.setDegree(degree + 90)`,
          zh: `sprite.setDegree(degree + 90)`,
          default: `sprite.setDegree(degree + 90)`
        },
        description: {
          ko:
            "스프라이트가 기본적으로 보고있는 방향에 따라서 더하는 값이 변경되어야 합니다.",
            en: "Depending on the default direction the sprite is facing, the value we add has to change.",
            ja: "スプライトが向いている方向の初期設定によっては足す値を変えなければなりません。",
          zh:
            "要按照角色基本面向的方向，修改要加的值。",
          default:
            "스프라이트가 기본적으로 보고있는 방향에 따라서 더하는 값이 변경되어야 합니다."
        }
      },
      {
        title: {
          ko: "완성!",
          en: "Done!",
          ja: "完成！",
          zh: "完成！",
          default: "완성!"
        },
        javascriptCode: {
          ko: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("주인공 스프라이트")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
    sprite.setDegree(degree + 90)
})`,
          en: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("Main Character Sprite")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
    sprite.setDegree(degree + 90)
})`,
          ja: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("主人公のスプライト")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
    sprite.setDegree(degree + 90)
})`,
          zh: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("主人公角色")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
    sprite.setDegree(degree + 90)
})`,
          default: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("주인공 스프라이트")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
    sprite.setDegree(degree + 90)
})`
        }
      }
    ]
  },

  {
    title: {
      ko: "튕기는 공 만들기",
      en: "Make a Ball Bounce Aound the Screen",
      ja: "弾むボールの作成",
      zh: "让球来回反弹",
      default: "튕기는 공 만들기"
    },
    video: "Video/snippet06.mp4",
    steps: [
      {
        title: {
          ko: "X, Y축으로 모두 움직이게 속도를 설정합니다.",
          en: "Set values for both the X-axis and Y-axis velocities.",
          ja: "X、Y軸両方向の動く速度を設定してください。",
          zh: "请设置速度，让球往X轴跟Y轴方向移动。",
          default: "X, Y축으로 모두 움직이게 속도를 설정합니다."
        },
        javascriptCode: {
          ko: `setVelocityX(500)
setVelocityY(500)`,
          en: `setVelocityX(500)
setVelocityY(500)`,
          ja: `setVelocityX(500)
setVelocityY(500)`,
          zh: `setVelocityX(500)
setVelocityY(500)`,
          default: `setVelocityX(500)
setVelocityY(500)`
        },
        description: {
          ko: "숫자를 변경해가며 원하는 속도를 설정해보세요.",
          en: "Change directions by making the values negative or positive. The speed can be increased or decreased by changing the number value.",
          ja: "数字をいろいろ試して変えて、好きな速度に設定してください。",
          zh: "请自由修改数字，设置成自己所要的速度。",
          default: "숫자를 변경해가며 원하는 속도를 설정해보세요."
        }
      },
      {
        title: {
          ko: "X, Y축 모두 부딪혔을 때 튕기게 설정합니다.",
          en: "Set the ball to bounce when it hits something in the X-axis and Y-axis.",
          ja: "X軸、もしくはY軸にぶつかった時に弾むように設定してください。",
          zh: "请设置成碰到X轴跟Y轴时都能弹回。",
          default: "X, Y축 모두 부딪혔을 때 튕기게 설정합니다."
        },
        javascriptCode: {
          ko: `setBounceX(1)
setBounceY(1)`,
          en: `setBounceX(1)
setBounceY(1)`,
          ja: `setBounceX(1)
setBounceY(1)`,
          zh: `setBounceX(1)
setBounceY(1)`,
          default: `setBounceX(1)
setBounceY(1)`
        }
      },
      {
        title: {
          ko: "화면에 부딪히게 설정합니다.",
          en: "Set it to collide with the screen so it doesn't leave the screen.",
          ja: "画面とぶつかるように設定してください。",
          zh: "请设置成与界面相互碰撞的情况。",
          default: "화면에 부딪히게 설정합니다."
        },
        javascriptCode: {
          ko: `setCollideScene(true)`,
          en: `setCollideScene(true)`,
          ja: `setCollideScene(true)`,
          zh: `setCollideScene(true)`,
          default: `setCollideScene(true)`
        }
      },
      {
        title: {
          ko: "완성!",
          en: "Done!",
          ja: "完成！",
          zh: "完成！",
          default: "완성!"
        },
        javascriptCode: {
          ko: `setVelocityX(500)
setVelocityY(500)
setBounceX(1)
setBounceY(1)
setCollideScene(true)`,
          en: `setVelocityX(500)
setVelocityY(500)
setBounceX(1)
setBounceY(1)
setCollideScene(true)`,
          ja: `setVelocityX(500)
setVelocityY(500)
setBounceX(1)
setBounceY(1)
setCollideScene(true)`,
          zh: `setVelocityX(500)
setVelocityY(500)
setBounceX(1)
setBounceY(1)
setCollideScene(true)`,
          default: `setVelocityX(500)
setVelocityY(500)
setBounceX(1)
setBounceY(1)
setCollideScene(true)`
        }
      }
    ]
  },

  {
    title: {
      ko: "버튼으로 신호 주고받기",
      en: "Send and Receive Signals with Buttons",
      ja: "ボタンで信号のやり取り",
      zh: "通过按钮发送和接收信号。",
      default: "버튼으로 신호 주고받기"
    },
    video: "Video/snippet07.mp4",
    steps: [
      {
        title: {
          ko: "버튼을 클릭했을 때 신호를 보내게 만들어 줍니다.",
          en: "Add a button to the sprite list and create a signal to be sent when the button is clicked.",
          ja: "ボタンをクリックすると信号を送信するように作成してください。",
          zh: "点击按钮时，发送信号。",
          default: "버튼을 클릭했을 때 신호를 보내게 만들어 줍니다."
        },
        javascriptCode: {
          ko: `onClick(function(){
   sendSignal("signal name")
})`,
          en: `onClick(function(){
   sendSignal("signal name")
})`,
          ja: `onClick(function(){
   sendSignal("signal name")
})`,
          zh: `onClick(function(){
    sendSignal("signal name")
})`,
          default: `onClick(function(){
   sendSignal("signal name")
})`
        },
        description: {
          ko: "신호의 이름은 자유롭게 설정할 수 있습니다.",
          en: "You can set the name of the signal to whatever you'd like.",
          ja: "信号の名前は自由に設定することができます。",
          zh: "信号名称可以自由设置。",
          default: "신호의 이름은 자유롭게 설정할 수 있습니다."
        }
      },
      {
        title: {
          ko: "움직이고 싶은 스프라이트에서 신호를 받는 코드를 작성합니다.",
          en: "Move over to the sprite you want to affect and make it receive the signal.",
          ja: "動かしたいスプライトから信号を受信するコードを作成してください。",
          zh: "请写出想要操控的角色能够收到信号的程序代码。",
          default: "움직이고 싶은 스프라이트에서 신호를 받는 코드를 작성합니다."
        },
        javascriptCode: {
          ko: `onSignal("singal name",function(){
    // 여기에 원하는 코드를 입력하세요.
})`,
          en: `onSignal("singal name",function(){
    // Enter the code you want here.
})`,
          ja: `onSignal("singal name",function(){
    // ここにコードを入力してください。
})`,
          zh: `onSignal("singal name",function(){
    // 请在这里输入代码。
})`,
          default: `onSignal("singal name",function(){
    // 여기에 원하는 코드를 입력하세요.
})`
        },
        description: {
          ko: "신호를 받을 스프라이트에 작성하세요!",
          en: "Enter statements in the brackets {} of the onClick function to make the sprite react to the clicked button.",
          ja: "",
          zh: "请在要收到信号的角色中编写代码！",
          default: "신호를 받을 스프라이트에 작성하세요!"
        }
      },
      {
        title: {
          ko: "완성!",
          en: "Done!",
          ja: "完成！",
          zh: "完成！",
          default: "완성!"
        }
      }
    ]
  },

  {
    title: {
      ko: "반짝이는 글자 만들기",
      en: "Make Text Flash",
      ja: "キラキラ光る文字の作成",
      zh: "让文字闪烁",
      default: "반짝이는 글자 만들기"
    },
    video: "Video/snippet08.mp4",
    steps: [
      {
        title: {
          ko:
            "텍스트 스프라이트에 다음과 같은 코드를 입력해서, 매 프레임마다 랜덤 색상으로 변하게 해줍니다.",
          en: "Enter the following block in the textbox sprite to make the text change colors each frame.",
          ja: "テキストのスプライトに次のようなコードを入力して、各フレームごとにランダムな色に変わるようにしてください。",
          zh:
            "请在文本角色中输入以下代码，让文字每帧都能随机变色。",
          default:
            "텍스트 스프라이트에 다음과 같은 코드를 입력해서, 매 프레임마다 랜덤 색상으로 변하게 해줍니다."
        },
        javascriptCode: {
          ko: `onFrame(function(){
    setRandomTextColor()
})`,
          en: `onFrame(function(){
    setRandomTextColor()
})`,
          ja: `onFrame(function(){
    setRandomTextColor()
})`,
          zh: `onFrame(function(){
    setRandomTextColor()
})`,
          default: `onFrame(function(){
    setRandomTextColor()
})`
        }
      },
    ]
  },

  {
    title: {
      ko: "초간단 그림판 만들기",
      en: "Create a Simple Painter",
      ja: "超簡単なペイントの作成",
      zh: "做一个超级简单的绘画板",
      default: "초간단 그림판 만들기"
    },
    video: "Video/snippet09.mp4",
    steps: [
      {
        title: {
          ko:
            "스프라이트가 매 프레임마다 마우스를 따라다니게 코드를 작성합니다.",
          en: "Add an object to the sprite list. This object will be used as a custom cursor so set the sprite to follow the mouse in each frame.",
          ja: "スプライトが各フレームごとにマウスを追いかけるようにコードを作成してください。",
          zh:
            "请写出角色每帧都能跟着鼠标移动的代码。",
          default:
            "스프라이트가 매 프레임마다 마우스를 따라다니게 코드를 작성합니다."
        },
        javascriptCode: {
          ko: `onFrame(function(){
    goToMousePointer()
})`,
          en: `onFrame(function(){
    goToMousePointer()
})`,
          ja: `onFrame(function(){
    goToMousePointer()
})`,
          zh: `onFrame(function(){
    goToMousePointer()
})`,
          default: `onFrame(function(){
    goToMousePointer()
})`
        }
      },
      {
        title: {
          ko: "마우스를 클릭하면 펜이 시작하게 설정합니다.",
          en: "Set the sprite to start drawing when the mouse is clicked.",
          ja: "マウスをクリックすると、ペンが始まるように設定してください。",
          zh: "请设置为点击鼠标时，笔就开始移动。",
          default: "마우스를 클릭하면 펜이 시작하게 설정합니다."
        },
        javascriptCode: {
          ko: `onClick(function(){
    startPen()
})`,
          en: `onClick(function(){
    startPen()
})`,
          ja: `onClick(function(){
    startPen()
})`,
          zh: `onClick(function(){
    startPen()
})`,
          default: `onClick(function(){
    startPen()
})`
        }
      },
      {
        title: {
          ko: "마우스 클릭이 끝나면 펜도 멈추게 설정합니다.",
          en: "Set the sprite to stop drawing when the mouse is unclicked.",
          ja: "マウスボタンを放すとペンが止まるように設定してください。",
          zh: "请设置为停止点击鼠标时，笔也跟着停止。",
          default: "마우스 클릭이 끝나면 펜도 멈추게 설정합니다."
        },
        javascriptCode: {
          ko: `onClickUp(function(){
    endPen()
})`,
          en: `onClickUp(function(){
    endPen()
})`,
          ja: `onClickUp(function(){
    endPen()
})`,
          zh: `onClickUp(function(){
    endPen()
})`,
          default: `onClickUp(function(){
    endPen()
})`
        }
      },
      {
        title: {
          ko: "완성!",
          en: "Done!",
          ja: "完成！",
          zh: "完成！",
          default: "완성!"
        },
        javascriptCode: {
          ko: `onFrame(function(){
    goToMousePointer()
})
onClick(function(){
    startPen()
})
onClickUp(function(){
    endPen()
})`,
          en: `onFrame(function(){
    goToMousePointer()
})
onClick(function(){
    startPen()
})
onClickUp(function(){
    endPen()
})`,
          ja: `onFrame(function(){
    goToMousePointer()
})
onClick(function(){
    startPen()
})
onClickUp(function(){
    endPen()
})`,
          zh: `onFrame(function(){
    goToMousePointer()
})
onClick(function(){
    startPen()
})
onClickUp(function(){
    endPen()
})`,
          default: `onFrame(function(){
    goToMousePointer()
})
onClick(function(){
    startPen()
})
onClickUp(function(){
    endPen()
})`
        }
      }
    ]
  },

  {
    title: {
      ko: "클릭하면 커지게 만들기",
      en: "Click to Enlarge Sprite",
      ja: "クリックすると大きくなるように設定",
      zh: "点击时，让角色变大",
      default: "클릭하면 커지게 만들기"
    },
    video: "Video/snippet10.mp4",
    steps: [
      {
        title: {
          ko: "클릭할 때마다 사이즈가 커지도록 코드를 작성합니다.",
          en: "Make the sprite larger each time it's clicked.",
          ja: "クリックする度にサイズが大きくなるようにコードを作成してください。",
          zh: "请写出每当点击时，角色大小都会变大的程序代码。",
          default: "클릭할 때마다 사이즈가 커지도록 코드를 작성합니다."
        },
        javascriptCode: {
          ko: `onClick(function(){
    addSize(10)
})`,
          en: `onClick(function(){
    addSize(10)
})`,
          ja: `onClick(function(){
    addSize(10)
})`,
          zh: `onClick(function(){
    addSize(10)
})`,
          default: `onClick(function(){
    addSize(10)
})`
        },
        description: {
          ko: "사이즈를 작아지게 하고싶다면 addSize의 값을 -로 변경해보세요. ",
          en: "If you want to make the sprite smaller, try changing the value of addSize to a negative number.",
          ja: "サイズを小さくしたい場合はaddSizeの値を-に変更してください。",
          zh: "如果想让大小变小，请将addSize的值修改为-值。",
          default:
            "사이즈를 작아지게 하고싶다면 addSize의 값을 -로 변경해보세요. "
        }
      },
    ]
  },
  {
    title: {
      ko: "숫자 카운터 만들기",
      en: "Create a Numeric Counter using the Textbox",
      ja: "数字カウンターの作成",
      zh: "做一个数字计数器",
      default: "숫자 카운터 만들기"
    },
    video: "Video/snippet11.mp4",
    steps: [
      {
        title: {
          ko: "왼쪽 버튼을 클릭할 때 minus 신호를 보냅니다.",
          en: " Add a left button sprite to the sprite list and make it send a signal called \"minus\" when the left button is clicked.",
          ja: "左ボタンをクリックする時にminus信号を送信してください。",
          zh: "点击向左按钮时，发送minus信号。",
          default: "왼쪽 버튼을 클릭할 때 minus 신호를 보냅니다."
        },
        javascriptCode: {
          ko: `onClick(function(){
    sendSignal("minus")
})`,
          en: `onClick(function(){
    sendSignal("minus")
})`,
          ja: `onClick(function(){
    sendSignal("minus")
})`,
          zh: `onClick(function(){
    sendSignal("minus")
})`,
          default: `onClick(function(){
    sendSignal("minus")
})`
        }
      },
      {
        title: {
          ko: "오른쪽 버튼을 클릭할 때 plus 신호를 보냅니다.",
          en: "Add a right button sprite to the sprite list and make it send a signal named \"plus\" when the right button is clicked.",
          ja: "右ボタンをクリックする時にplus信号を送信してください。",
          zh: "点击向右按钮时，发送plus信号。",
          default: "오른쪽 버튼을 클릭할 때 plus 신호를 보냅니다."
        },
        javascriptCode: {
          ko: `onClick(function(){
    sendSignal("plus")
})`,
          en: `onClick(function(){
    sendSignal("plus")
})`,
          ja: `onClick(function(){
    sendSignal("plus")
})`,
          zh: `onClick(function(){
    sendSignal("plus")
})`,
          default: `onClick(function(){
    sendSignal("plus")
})`
        }
      },
      {
        title: {
          ko:
            "현재 숫자를 저장하는 변수를 만들어주고 plus, minus 신호를 받을 때마다 변수의 값을 변경해줍니다.",
          en: "Move over to the textbox sprite and add the following code to make the textbox display the changing number each time a button is clicked.",
          ja: "現在の数字を保存する変数を作成して、plus、minus信号を受信する度に変数の値が変更されるようにしてください。",
          zh:
            "创建一个能够存储目前数字的变量，且每当收到 plus, minus信号时变更变量的值。",
          default:
            "현재 숫자를 저장하는 변수를 만들어주고 plus, minus 신호를 받을 때마다 변수의 값을 변경해줍니다."
        },
        javascriptCode: {
          ko: `var number = 0

onSignal("plus",function(){
    number = number + 1
    setText(number)
})

onSignal("minus",function(){
    number = number - 1
    setText(number)
})`,
          en: `var number = 0

onSignal("plus",function(){
    number = number + 1
    setText(number)
})

onSignal("minus",function(){
    number = number - 1
    setText(number)
})`,
          ja: `var number = 0

onSignal("plus",function(){
    number = number + 1
    setText(number)
})

onSignal("minus",function(){
    number = number - 1
    setText(number)
})`,
          zh: `var number = 0

onSignal("plus",function(){
    number = number + 1
    setText(number)
})

onSignal("minus",function(){
    number = number - 1
    setText(number)
})`,
          default: `var number = 0

onSignal("plus",function(){
    number = number + 1
    setText(number)
})

onSignal("minus",function(){
    number = number - 1
    setText(number)
})`
        }
      },
      {
        title: {
          ko: "완성!",
          en: "Done!",
          ja: "完成！",
          zh: "完成！",
          default: "완성!"
        }
      }
    ]
  }
];