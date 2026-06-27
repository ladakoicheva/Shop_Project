
import './Menu.css'
import { SketchPicker } from 'react-color';
import { changeSettings } from '../../../services/firebase/db/settings';



export default function Menu({ style,  changeStyle, closeStyle, updateStyles, user }) {

 
  


  const getColor = (rgb, i) => {
    const valueToSave = `rgba(${rgb.r},${rgb.g},${rgb.b})`;
    changeStyle(valueToSave, i)
  }

  const saveSettings = () => {
    const dataToSave = {}
    style.types.forEach((type, i) => {
      if (style.datas[i] !== undefined) {
        dataToSave[style.type + type] = style.datas[i]
      }
    })
    console.log(dataToSave)

    closeStyle();
    changeSettings(user.uid, dataToSave);

    updateStyles(dataToSave);
  }


  const getContentFromStyle = (type, i) => {
    switch (type) {
      case 'color':
      case 'bg': return <SketchPicker className='picker' color={style.datas[0]} onChange={(color) => getColor(color.rgb, i)} />
      case 'fontSize': return <input value={style.datas[i]} onChange={(e) => changeStyle(e.target.value, i)} type='range' min ='14' max ='40' />
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
