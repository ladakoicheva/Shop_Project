import { useState } from 'react';
import { changeSettings } from '../../services/firebase/db/settings';
import { Autorisation_HOC } from '../../HOC/Autorisation_HOC';
import ExampleProductCard from './ExampleProductCard';
import Menu from './Menu/Menu';
import styles from './Setting.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/type';
import { updateStyles } from '../../redux/auth/auth';
import type { styleConfigE, styleSettingI, typesConfigI } from './type';
import { styleConfig, typeStyleE } from './type';

interface typeI {
  datas: string[];
  title: string[];
  types: styleConfigE[];
}

const typesConfig: typesConfigI = {
  bg: {
    type: styleConfig.bg,
    text: 'Цвет фона',
  },
  color: {
    type: styleConfig.color,
    text: 'Цвет текста',
  },
  padding: {
    type: styleConfig.padding,
    text: 'Отступы',
  },
  fontSize: {
    type: styleConfig.fontSize,
    text: 'Размер текста',
  },
};

export function Setting() {
  const { user, settings } = useAppSelector((s) => s.auth);
  const [currency, setCurrency] = useState(settings.currency);
  const [name, setName] = useState<string>(settings.name);
  const dispatch = useAppDispatch();
  const [style, setStyle] = useState<styleSettingI>({
    isOpen: false,
    types: [],
    datas: [],
    title: [],
    type: null,
  });

  const getStyle = (type: string): string[] => {
    if (style.type === type && style.isOpen) {
      return style.datas;
    }

    switch (type) {
      case 'name':
        return [settings.namecolor, settings.namefontSize];
      case 'price':
        return [settings.pricecolor, settings.pricefontSize];
      case 'bg':
        return [settings.bgbg];
      default:
        return [];
    }
  };

  const openStyle = (keys: styleConfigE[], type: typeStyleE) => {
    const types = keys.reduce(
      (type: typeI, key: styleConfigE) => {
        const t = typesConfig[key];
        type.types.push(t.type);
        type.title.push(t.text);
        return type;
      },
      { types: [], title: [], datas: [] }
    );
    types.datas = getStyle(type);

    setStyle({
      isOpen: true,
      ...types,
      type,
    });
  };

  const changeStyle = (data: string, i: number) => {
    const newDatas = [...style.datas];
    newDatas[i] = data;
    setStyle({ ...style, datas: newDatas });
  };

  const closeStyle = () => {
    setStyle({
      isOpen: false,
      types: [],
      datas: [],
      title: [],
      type: null,
    });
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsCard}>
        <h2 className={styles.cardTitle}>Основные настройки магазина</h2>

        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Название вашего магазина</label>
            <input
              className={styles.textInput}
              type="text"
              placeholder="Название магазина"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Валюта по умолчанию</label>
            <select
              className={styles.selectInput}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              name="currency"
              id="currency"
            >
              <option value="UAH">UAH (₴)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>

          <button
            className={styles.saveBtn}
            onClick={() => {
              changeSettings(user?.uid!, { name, currency });
              dispatch(updateStyles({ name }));
            }}
          >
            Сохранить изменения
          </button>
        </div>
      </div>

      <div className={styles.exampleCardSection}>
        <div className={styles.previewNotice}>
          💡 Кастомизатор карточек товаров: нажимайте на названия, цены или фон для изменения цветов и размеров.
        </div>
        <div className={styles.exampleWrapper}>
          <ExampleProductCard getStyle={getStyle} openStyle={openStyle} />
          {style.isOpen && (
            <Menu
              user={user}
              updateStyles={updateStyles}
              closeStyle={closeStyle}
              style={style}
              changeStyle={changeStyle}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const SettingPage = Autorisation_HOC(Setting);
export default SettingPage;
