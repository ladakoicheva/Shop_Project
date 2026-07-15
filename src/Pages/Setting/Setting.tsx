import  { useState } from 'react'
import { changeSettings } from '../../services/firebase/db/settings';
import { Autorisation_HOC } from '../../HOC/Autorisation_HOC'
import ExampleProductCard from './ExampleProductCard'
import Menu from './Menu/Menu';
import styles from './Setting.module.css'
import { useAppDispatch } from '../../redux/type';
import { updateStyles } from '../../redux/auth/auth';
import { useAppSelector } from '../../redux/type';

 export enum styleConfigE {
  bg = 'bg',
  color = 'color',
  padding = 'padding',
  fontSize = 'fontSize',
  
}



interface styleI{
    isOpen: boolean,
    types: string[],
    datas: string[],
    title: string[],
    type: string|null
}
interface typeI{
  datas: string[]
  title: string[]
  types: string[]
}

type styleConfigT = {
    type: string;
    text: string;
  };

export interface typesConfigI{
    [styleConfigE.bg] : styleConfigT
    [styleConfigE.padding] : styleConfigT
    [styleConfigE.fontSize] : styleConfigT
    [styleConfigE.color] : styleConfigT
}



const typesConfig:typesConfigI = {
  bg: {
    type: 'bg',
    text: 'Цвет фона'

  },
  color: {
    type: 'color',
    text: 'Цвет текста'
  },
  padding: {
    type: 'padding',
    text: 'Отступы'
  },
  fontSize: {
    type: 'fontSize',
    text: 'Размер текста'
  },
}


export function Setting() {

  // const { user, settings } = useSelector((s) => s.auth);
  const { user, settings } = useAppSelector((s) => s.auth);


  const [name, setName] = useState<string>(settings.name);
  const dispatch = useAppDispatch();
  const [style, setStyle] = useState<styleI>({
    isOpen: false,
    types: [],
    datas: [],
    title: [],
    type: null
  })


  // useEffect(() => {
  //   if (settings.name) setName(settings.name);
  // }, [settings.name]);
  // // {
  //   "isOpen": true,
  //     "types": [
  //       "color",
  //       "fontSize"
  //     ],
  //       "title": [
  //         "Цвет текста",
  //         "Размер текста"
  //       ],
  //         "datas": [
  //           "rgb(81,56,56)",
  //           "16"
  //         ],
  //           "type": "name"
  // }
  const getStyle = (type:string):string[] => {
   
  //  console.log('type',type)
    if (style.type === type && style.isOpen) {
      return style.datas;
    }

    switch (type) {
      case 'name': return [settings.namecolor, settings.namefontSize];
      case 'price': return [settings.pricecolor, settings.pricefontSize];
      case 'bg': return [settings.bgbg];
      default: return []
    }

  }




  const openStyle = (keys:styleConfigE[], type:string) => {
    console.log('keys --- ', keys)
    // console.log('type',type);
    const types = keys.reduce((type:typeI, key:styleConfigE) => {
      const t = typesConfig[key];
      
    
      type.types.push(t.type);
      type.title.push(t.text);
      return type;
    }, { types: [], title: [], datas: [] })
    types.datas = getStyle(type);

    setStyle({
      isOpen: true,
      ...types,
      type
    })
  }








  // const syncSettings = async () => {

  //   const response = await getSettings(user.uid);
  //   if()
  //   setColorText(settings.colorText);
  //   setColorBg(settings.colorBg);
  //   setName(settings.name)
  // }



  const changeStyle = (data:string, i: number) => {
    const newDatas = [...style.datas];
    newDatas[i] = data;
    setStyle({ ...style, datas: newDatas })
  }

  const closeStyle = () => {

    setStyle({
      isOpen: false,
      types: [],
      datas: [],
      title: [],
      type: null
    })
  }




  return (
    <div>
      <input type="text" placeholder='your shop`s name' value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => {
        changeSettings(user?.uid!, { name })
        dispatch(updateStyles({ name }));
      }}>Save</button>
      <div className={styles.exampleCard}>
        <ExampleProductCard getStyle={getStyle} openStyle={openStyle} />
        {style.isOpen && <Menu user={user} updateStyles={updateStyles} closeStyle={closeStyle} style={style} changeStyle={changeStyle} />}
      </div>
    </div>


  )
}


const SettingPage = Autorisation_HOC(Setting);
export default SettingPage

