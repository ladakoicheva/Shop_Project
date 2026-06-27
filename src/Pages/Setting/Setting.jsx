import React, { useState } from 'react'
import { changeSettings } from '../../services/firebase/db/settings';
import { Autorisation_HOC } from '../../HOC/Autorisation_HOC'
import ExampleProductCard from './ExampleProductCard'
import Menu from './Menu/Menu';
import styles from './Setting.module.css'

const typesConfig = {
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

export function Setting({auth}) {

  const { user, settings, updateStyles } = auth;
  const [name, setName] = useState(settings.name);

 


  const [style, setStyle] = useState({
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
  const getStyle = (type) => {
    if (style.type === type && style.isOpen) {
      return style.datas;
    }

    switch (type) {
      case 'name': return [settings.namecolor , settings.namefontSize ];
      case 'price': return [settings.pricecolor , settings.pricefontSize ];
      case 'bg': return [settings.bgbg ];
      default: return []
    }
    
  }




  const openStyle = (keys, type) => {

    const types = keys.reduce((type, key) => {
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



  const changeStyle = (data, i) => {
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
        changeSettings(user.uid, { name })
        updateStyles({ name });
      }}>Save</button>
      <div className={styles.exampleCard}>
        <ExampleProductCard getStyle={getStyle} openStyle={openStyle}  />
        {style.isOpen && <Menu user={user} updateStyles={updateStyles} closeStyle={closeStyle} style={style} changeStyle={changeStyle} setStyle={setStyle} />}
      </div>
    </div>


  )
}


const SettingPage = Autorisation_HOC(Setting);
export default SettingPage

