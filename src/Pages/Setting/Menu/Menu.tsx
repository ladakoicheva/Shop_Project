
import './Menu.css'
import { SketchPicker ,type RGBColor} from 'react-color';
import { changeSettings } from '../../../services/firebase/db/settings';
import { useAppDispatch } from '../../../redux/type';
import type { userAuth } from '../../../redux/auth/type';
import type { Settings } from '../../../redux/auth/type';
import type { styleConfigE, styleSettingI } from '../type';






type props = {
  style: styleSettingI,
  changeStyle: (valueToSave:string, i:number) => void,
  closeStyle: () => void,
  updateStyles: any,
  user:userAuth
}

export default function Menu({ style,  changeStyle, closeStyle, updateStyles, user }:props) {
  const dispatch = useAppDispatch();
  


  const getColor = (rgb:RGBColor, i: number) => {

    const valueToSave = `rgba(${rgb.r},${rgb.g},${rgb.b})`;
    changeStyle(valueToSave, i)
  }

  const saveSettings = () => {
    const dataToSave:Partial<Settings> = {}

    style.types.forEach((type, i) => {
      if (style.datas[i] ) {
        const key = style.type + type as keyof Settings
        dataToSave[key] = style.datas[i]
      }
    })

    console.log(dataToSave);
    

    closeStyle();
    changeSettings(user?.uid!, dataToSave );

    dispatch(updateStyles(dataToSave));
  }


  const getContentFromStyle = (type:styleConfigE, i:number) => {
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
