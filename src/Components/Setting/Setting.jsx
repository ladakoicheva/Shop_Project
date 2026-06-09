import React, { useEffect, useState } from 'react'
import { changeSettings, getSettings } from '../../services/firebase/db/settings';
import { useStoreContext } from '../../store/store';
import { Autorisation_HOC } from '../../HOC/Autorisation_HOC'
import ExampleProductCard from './ExampleProductCard'
import Menu from './Menu/Menu';
import styles from './Setting.module.css'
import { log } from 'firebase/firestore/lite/pipelines';

// const types = ['bg', 'color', 'padding', 'fontSize'];
export const typesConfig = {
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

function Setting() {

  const { user } = useStoreContext();
  const [colorText, setColorText] = useState('#121111');
  const [colorBg, setColorBg] = useState('#121111');
  const [name, setName] = useState("");

  const [settingProduct, setSettingProduct] = useState({
    name: ['black', '16'],
    price: ['black', '14'],
    bg: ['rgb(255, 255, 255)']
  })

  const [style, setStyle] = useState({ 
    isOpen: false,
    types: [],  
    datas: [],
    title: [],
    type : null
  })

  useEffect(() => {
    console.log('style', style);
    console.log('settings',settingProduct)
},[style,settingProduct])


  // {
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
  const getStyle = (type) => {
    if (style.type === type && style.isOpen) { 
      //console.log(style.datas)
      return style.datas; //  отработает если меню открыто 
      // "datas": [
      //      "rgb(81,56,56)",
      //       "16"
      //         ],
    }
 
    return settingProduct[type]; // ['black', '16'],
  }




  const openStyle = (keys, type /* ['color', 'fontSize'], 'name' */ ) => {
   
    const types = keys.reduce((type, key) => { 
      const t = typesConfig[key];  
      type.types.push(t.type);
      type.title.push(t.text);
      return type; 
    }, { types: [], title: [], datas: [] }) //{types:[color,fontSize],title:['Цвет текста','Размер текста'],datas: []}
    types.datas = settingProduct[type];

    setStyle({
      isOpen: true,
      ...types,
      type // name
    })
  }

  

  

  useEffect(() => {

    if (user) {
      syncSettings();
    }


  }, [user])


  const syncSettings = async () => {

    const settings = await getSettings(user.uid);
    setColorText(settings.colorText);
    setColorBg(settings.colorBg);
    setName(settings.name)
  }



  const changeStyle = (data, i) => {
    style.datas[i] = data; 
    setStyle({...style})
  }




  return (
    <div>
      <input type="text" placeholder='your shop`s name' value={name} onChange={(e) => setName(e.target.value)} />
      <input type="color" value={colorText} onChange={(e) => setColorText(e.target.value)} />
      <input type="color" value={colorBg} onChange={(e) => setColorBg(e.target.value)} />
      <button onClick={() => {
        changeSettings(user.uid, { colorText, colorBg, name })
        store.setName(name)
      }}>Save</button>
      <div className={styles.exampleCard}>
        <ExampleProductCard getStyle={getStyle} openStyle={openStyle} styles={style} />
        {style.isOpen && <Menu style={style} changeStyle={changeStyle} setStyle={setStyle} />}
      </div>
    </div>


  )
}
export default Autorisation_HOC(Setting);
