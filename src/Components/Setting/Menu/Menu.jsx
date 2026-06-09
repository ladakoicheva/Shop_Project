import React, { useEffect } from 'react'
import './Menu.css'
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import { useStoreContext } from '../../../store/store';



export default function Menu({ style, setStyle, changeStyle }) {

  const [currentColor, setCurrentColor] = useState("");
  const store = useStoreContext();
  const [textSizeValue, setTextSizeValue] = useState("");




  // const saveSettings = (key) => {
  //   const valueToSave = key === 'color' ? `rgba(${currentColor.r},${currentColor.g},${currentColor.b},${currentColor.a})` : textSizeValue
  //   const styles = { ...style };
  //   styles.datas[key] = valueToSave
  //   //setStyle(styles);
  // }



  const getColor = (rgb, i) => {
    const valueToSave = `rgba(${rgb.r},${rgb.g},${rgb.b})`;
    changeStyle(valueToSave, i)
  }


  const getContentFromStyle = (type, i) => {
    switch (type) {

      case 'color': return <SketchPicker className='picker' color={style.datas[i]} onChange={(color) => getColor(color.rgb, i)} />
      case 'fontSize': return <input value={style.datas[i]} onChange={(e) => changeStyle(e.target.value, i)} type='number' />
      case 'bg': return <SketchPicker className='picker' color={style.datas[i]} onChange={(color) => getColor(color.rgb, i)} />


    }
  }



  return (
    <div className='menu'>
      <span className='closeButton' onClick={() => setStyle({
        ...style,
        isOpen: false,


      })}>×</span>


      {style.types.map((type, i) => {

        const title = style.title[i];


        const Component = getContentFromStyle(type, i)

        return <div key={i}>
          <h2>{title}</h2>
          {Component}
          <button onClick={() => store.updateStyles(style.datas[i],style.type,i)} style={{ width: '100%' }}>Save</button>
        </div>
      })}

    </div>
  )
}
