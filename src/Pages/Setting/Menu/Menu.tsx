import './Menu.css';
import { SketchPicker, type RGBColor } from 'react-color';
import { changeSettings } from '../../../services/firebase/db/settings';
import { useAppDispatch } from '../../../redux/type';
import type { userAuth, Settings } from '../../../redux/auth/type';
import type { styleConfigE, styleSettingI } from '../type';
import { CloseIcon } from '../../../utils/svgIcons';

type props = {
  style: styleSettingI;
  changeStyle: (valueToSave: string, i: number) => void;
  closeStyle: () => void;
  updateStyles: any;
  user: userAuth;
};

export default function Menu({ style, changeStyle, closeStyle, updateStyles, user }: props) {
  const dispatch = useAppDispatch();

  const getColor = (rgb: RGBColor, i: number) => {
    const valueToSave = `rgba(${rgb.r},${rgb.g},${rgb.b})`;
    changeStyle(valueToSave, i);
  };

  const saveSettings = () => {
    const dataToSave = {} as Partial<Settings>;

    style.types.forEach((type, i) => {
      if (style.datas[i]) {
        const key = (style.type + type) as keyof Settings;
        (dataToSave[key] as string) = style.datas[i];
      }
    });

    closeStyle();
    changeSettings(user?.uid!, dataToSave);
    dispatch(updateStyles(dataToSave));
  };

  const getContentFromStyle = (type: styleConfigE, i: number) => {
    switch (type) {
      case 'color':
      case 'bg':
        return (
          <SketchPicker
            className="picker"
            color={style.datas[i] || '#000000'}
            onChange={(color) => getColor(color.rgb, i)}
            disableAlpha={false}
          />
        );
      case 'fontSize':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              className="rangeInput"
              value={style.datas[i] || 16}
              onChange={(e) => changeStyle(e.target.value, i)}
              type="range"
              min="14"
              max="40"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="menuOverlay" onClick={closeStyle}>
      <div className="menu" onClick={(e) => e.stopPropagation()}>
        <div className="menuHeader">
          <h3>Настройка кастомизации</h3>
          <span className="closeButton" onClick={closeStyle}>
            <CloseIcon size={20} color="#94a3b8" />
          </span>
        </div>

        {style.types.map((type, i) => {
          const title = style.title[i];
          const Component = getContentFromStyle(type, i);

          const isColor = type === 'color' || type === 'bg';
          const currentColor = style.datas[i] || '#000000';

          return (
            <div key={i} className="sectionBlock">
              <div className="sectionTitle">
                <span>{title}</span>

                {isColor && (
                  <div className="bannerSwatchGroup">
                    <span
                      className="colorPreviewSwatch"
                      style={{ backgroundColor: currentColor }}
                    />
                    <span className="badgeVal">{currentColor}</span>
                  </div>
                )}

                {type === 'fontSize' && <span className="badgeVal">{style.datas[i]}px</span>}
              </div>

              {isColor && (
                <div className="colorPreviewBanner">
                  <span>Текущий выставляемый цвет:</span>
                  <div className="bannerSwatchGroup">
                    <div className="largeSwatch" style={{ backgroundColor: currentColor }} />
                  </div>
                </div>
              )}

              {Component}
            </div>
          );
        })}

        <button className="saveMenuBtn" onClick={saveSettings}>
          Применить и сохранить
        </button>
      </div>
    </div>
  );
}
