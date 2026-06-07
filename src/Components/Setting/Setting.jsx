import React, { useEffect, useState } from 'react'
import { changeSettings, getSettings } from '../../firebase/db/settings';
import { useStoreContext } from '../../store/store';
import { Autorisation_HOC } from '../../HOC/Autorisation_HOC'
import  ExampleProductCard from './ExampleProductCard'
import Menu from './Menu/Menu';
import styles from './Setting.module.css'

// const types = ['bg', 'color', 'padding', 'fontSize'];
const types = {
  bg: {
    type: 'bg',
    text : 'Цвет фона'
  },
  color: {
    type: 'color',
    text : 'Цвет текста'
  },
  padding: {
    type: 'padding',
    text : 'Отступы'
  },
  fontSize: {
    type: 'fontSize',
    text : 'Размер текста'
  },
}

function Setting() {
  
  // const { user } = useStoreContext();
  const [colorText, setColorText] = useState('#121111');
  const [colorBg, setColorBg] = useState('#121111');
  const [name, setName] = useState("");
  
  const [style, setStyle] = useState({
    isOpen: false,
    types: [],
    datas: [],
    title : []
  })  

  const openStyle = (keys) => {
    const type = keys.reduce((type, key) => {
      const t = types[key];
      
      type.types.push(t.type)
      type.title.push(t.text)
      type.datas.push('#000000')
      return type
    }, {types : [], title : [], datas : []})

    setStyle({
      isOpen: true,
      ...type
      // types: ['color', 'fontSize'],
      // datas: [e.target.color, e.target.fontSize],
      // title: [e.target.slot, 'Размер текста']
    })
  }
  const  openName  = () => {
    setStyle({
      isOpen: true,
      types: ['color', 'fontSize'],
      datas: ['#000000', '16'],
      title: ['', 'Размер текста']
    })
  }

  // useEffect(() => {

  //   if (user) {
  //     syncSettings();
  //   }


  // }, [user])


  const syncSettings = async () => {

    const settings = await getSettings(user.uid);
    setColorText(settings.colorText);
    setColorBg(settings.colorBg);
    setName(settings.name)
   
   
  }


  const openMenu = (e) => {
  
    if(!e.target.slot) return
    console.log(e.target.slot)
    console.log(menuConf)
    // switch (e.target.title) {
    //   case 'H3': return console.log('product name text')
    //   case 'H2': return console.log('product price text')
    //   case 'SECTION': return console.log('card BG')
    // }
    setMenuConf({ ...menuConf, isOpen: true, clickedItem: e.target.slot })
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
        <ExampleProductCard onClick={openStyle} name='product name' />
        {style.isOpen && <Menu style= {style} />}
      </div>
    </div>

    
  )
}
export default Autorisation_HOC(Setting);
