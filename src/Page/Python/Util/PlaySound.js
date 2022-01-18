import { URL } from "../../../Common/Util/Constant";

const isPlayEffect = () => {
  let builderSound = localStorage.getItem("pythonBuilderSound");
  if(builderSound) {
    try {
      const { playEffect } = JSON.parse(builderSound);
      return playEffect
    } catch (error) {
      console.error(error)
      return true
    }
  } else {
    return true
  }
}

export const playButtonEffect = () => {
  const buttonEffect = new Audio(`${URL.S3_DREAMCLASS}/newpython_sfx_button_a.mp3`);

  if (buttonEffect && isPlayEffect()) {
    buttonEffect.pause();
    buttonEffect.currentTime = 0;
    buttonEffect.play();
  }
}

export const playTabEffect = () => {
  const tabEffect = new Audio(`${URL.S3_DREAMCLASS}/newpython_sfx_tap_a.mp3`);
  
  if (tabEffect && isPlayEffect()) {
    tabEffect.pause();
    tabEffect.currentTime = 0;
    tabEffect.play();
  }
}

export const playScriptEffect = () => {
  const scriptEffect = new Audio(`${URL.S3_DREAMCLASS}/newpython_sfx_scriptclick_a.mp3`);
  
  if (scriptEffect && isPlayEffect()) {
    scriptEffect.pause();
    scriptEffect.currentTime = 0;
    scriptEffect.play();
  }
}

export const playSettingEffect = () => {
  const settingEffect = new Audio(`${URL.S3_DREAMCLASS}/newpython_sfx_switch_a.mp3`);
  
  if (settingEffect && isPlayEffect()) {
    settingEffect.pause();
    settingEffect.currentTime = 0;
    settingEffect.play();
  }
}

export const playClearEffect = () => {
  const celarEffect = new Audio(`${URL.S3_DREAMCLASS}/newpython_sfx_clear_a.mp3`);

  if (celarEffect && isPlayEffect()) {
    celarEffect.pause();
    celarEffect.currentTime = 0;
    celarEffect.play();
  }
}

export const playFailEffect = () => {
  const failEffect = new Audio(`${URL.S3_DREAMCLASS}/newpython_sfx_fail_a.mp3`);
  
  if (failEffect && isPlayEffect()) {
    failEffect.pause();
    failEffect.currentTime = 0;
    failEffect.play();
  }
}

export const playSuccessEffect = () => {
  const successEffect = new Audio(`${URL.S3_DREAMCLASS}/newpython_sfx_success_a.mp3`);

  if (successEffect && isPlayEffect()) {
    successEffect.pause();
    successEffect.currentTime = 0;
    successEffect.play();
  }
}

export const playBgm = (bgmSrc) => {
  document.getElementById("dream-python-bgm").pause();
  document.getElementById("dream-python-bgm").setAttribute('src', `${URL.S3_DREAMCLASS}/${bgmSrc}`);
  document.getElementById("dream-python-bgm").load();
  document.getElementById("dream-python-bgm").volume = 1;
  document.getElementById("dream-python-bgm").loop = true;
  document.getElementById("dream-python-bgm").play();
}

export const stopBgm = () => {
  document.getElementById("dream-python-bgm").pause();
}
