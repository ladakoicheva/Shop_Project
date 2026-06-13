import React, { useEffect, useState } from 'react'
import { changeSettings, getSettings } from '../../services/firebase/db/settings';
import { useStoreContext } from '../../store/store';
import { Autorisation_HOC } from '../../HOC/Autorisation_HOC'
import ExampleProductCard from './ExampleProductCard'
import Menu from './Menu/Menu';
import styles from './Setting.module.css'
import { log } from 'firebase/firestore/lite/pipelines';

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

  const { user, settings, updateStyles } = useStoreContext();
  

 

  const [style, setStyle] = useState({ 
    isOpen: false,
    types: [],  
    datas: [],
    title: [],
    type : null
  })


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

    switch (type) {
      case 'name': return [settings.namecolor, settings.namefontSize];
      case 'price': return [settings.pricecolor, settings.pricefontSize];
      case 'bg': return [settings.bgbg];
      default : []
    }
 
    return settings[type]; // ['black', '16'],
  }




  const openStyle = (keys, type ) => {
   
    const types = keys.reduce((type, key) => { 
      const t = typesConfig[key];  
      type.types.push(t.type);
      type.title.push(t.text);
      return type; 
    }, { types: [], title: [], datas: [] }) //{types:[color,fontSize],title:['Цвет текста','Размер текста'],datas: []}
    types.datas = getStyle(type);

    setStyle({
      isOpen: true,
      ...types,
      type // name
    })
  }

  

  




  // const syncSettings = async () => {

  //   const response = await getSettings(user.uid);
  //   if()
  //   setColorText(settings.colorText);
  //   setColorBg(settings.colorBg);
  //   setName(settings.name)
  // }



  const changeStyle = (data, i) => {
    style.datas[i] = data; 
    setStyle({...style})
  }

  const closeStyle = (data, i) => {
  
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
        changeSettings(user.uid, { name })
      }}>Save</button>
      <div className={styles.exampleCard}>
        <ExampleProductCard getStyle={getStyle} openStyle={openStyle} styles={style} />
        {style.isOpen && <Menu user={user} updateStyles={updateStyles} closeStyle = {closeStyle} style={style} changeStyle={changeStyle} setStyle={setStyle} />}
      </div>
    </div>


  )
}
export default Autorisation_HOC(Setting);

