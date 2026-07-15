import type { SING_IN_I } from "../../redux/auth/type";
import type { SING_UP_I } from "../../redux/auth/type"
import { MODAL_ENUM } from "../../redux/auth/type";

interface TYPE_MODAL_I{
  SIGN_UP: SING_UP_I
  SIGN_IN: SING_IN_I
}

export const TYPE_MODAL:TYPE_MODAL_I = {
  SIGN_UP: {
    text: MODAL_ENUM.singUpTxt,
    type: MODAL_ENUM.singUpType
  },
  SIGN_IN: {
    text: MODAL_ENUM.singInText,
    type: MODAL_ENUM.singInType
  }
}


