import React, { useEffect } from 'react'
import './Menu.css'
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import { useStoreContext } from '../../../store/store';
import { changeSettings } from '../../../services/firebase/db/settings';



export default function Menu({ style, setStyle, changeStyle, closeStyle, updateStyles,user }) {

  const [currentColor, setCurrentColor] = useState("");
  const [textSizeValue, setTextSizeValue] = useState("");
  


  

  const getColor = (rgb, i) => {
    const valueToSave = `rgba(${rgb.r},${rgb.g},${rgb.b})`;
    changeStyle(valueToSave, i)
  }

  const saveSettings = () => {
    const dataToSave = {}
    style.types.forEach((type, i) => {
      dataToSave[style.type+ type] = style.datas[i]
    })


    closeStyle();
    updateStyles(style.datas, style.type)
    changeSettings(user.uid, dataToSave)
  }


  const getContentFromStyle = (type, i) => {
    switch (type) {
      case 'color':
      case 'bg': return <SketchPicker className='picker' color={style.datas[0]} onChange={(color) => getColor(color.rgb, i)} />
      case 'fontSize': return <input value={style.datas[i]} onChange={(e) => changeStyle(e.target.value, i)} type='number' />
    }
  }



  return (
    <div className='menu'>
      <span className='closeButton' onClick={closeStyle}>×</span>


      {style.types.map((type, i) => {

        const title = style.title[i];


        const Component = getContentFromStyle(type, i)

        return <div key={i}>
          <h2>{title}</h2>
          {Component}

        </div>
      })}
      <button onClick={saveSettings} style={{ width: '100%' }}>Save</button>
    </div>
  )
}
