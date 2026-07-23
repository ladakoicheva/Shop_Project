export enum styleConfigE {
  bg = 'bg',
  color = 'color',
  padding = 'padding',
  fontSize = 'fontSize',
}
export const styleConfig = styleConfigE;

export enum typeStyleE{
  name = 'name',
  price = 'price',
  bg = 'bg'
}


type styleConfigT = {
    type: styleConfigE;
    text: string;
  };

export interface typesConfigI{
    [styleConfigE.bg] : styleConfigT
    [styleConfigE.padding] : styleConfigT
    [styleConfigE.fontSize] : styleConfigT
    [styleConfigE.color] : styleConfigT
}


export interface styleSettingI {
  isOpen: boolean,
  types: styleConfigE[],
  datas: string[],
  title: string[],
  type: typeStyleE | null
}