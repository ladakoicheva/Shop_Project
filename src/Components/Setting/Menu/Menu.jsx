import React, { useEffect } from 'react'
import './Menu.css'
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import { useStoreContext } from '../../../store/store';



export default function Menu({style}) {
  const { menuConf, setMenuConf } = useStoreContext();
  const [currentColor, setCurrentColor] = useState("");


  const handleColorChange = (color) => {
    setCurrentColor(color.rgb);


    const colorString = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
    const clicked = menuConf;
    setMenuConf((prev) => {
      return {
        ...prev,
        [menuConf.clickedItem]: colorString
      }
    });
  };

  const closeMenu = (e) => {
    setMenuConf({ ...menuConf, isOpen: false })
  }

  const getContentFromStyle = (type) => {
    switch (type) {
      case 'bg' :
      case 'color': return <SketchPicker className='picker' color={currentColor} onChange={handleColorChange} />
      case 'fontSize' : return <input type='number'/>
    }
  }



  return (
    <div className='menu'>
      <span onClick={closeMenu} className='closeButton'>×</span>


      {style.types.map((type, i) => {
        const title = style.title[i];
        const Component = getContentFromStyle(type)

        return <div>
          <h2>{ title }</h2>
          {Component}
          <button style ={{width:'100%'}}>Save</button>
        </div>
      })}

    </div>
  )
}
