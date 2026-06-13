import style from '../ProductCard/ProductCard.module.css';
import { useStoreContext } from '../../store/store';
import { useEffect } from 'react';

export const keyStyle = {
  topBG: 'topBG',
  bottomBG: 'bottomBG',
  priceColor: 'priceColor',
  nameColor: 'nameColor'
}


export default function ExampleProductCard({ openStyle, styles, getStyle }) {
  const store = useStoreContext()
  console.log(getStyle('name'), 'getStyle');
  
  const [colorName, fontSizeName] = getStyle('name');
  const [colorPrice, fontSizePrice] = getStyle('price');
  const [bgColor] = getStyle('bg');

  //todo
  //remove useStoreHook and get data by props
  // save data to firebase
  //get data from firebase
  //use one hook for all settings

  useEffect(() => {
    console.log('colorName', colorName)
    console.log(bgColor)
  }, [colorName, bgColor])
  
  /*
  1.  get default data / current data logic
  > getStyle(type) // 

  2.  open menu
  > openStyle(keys,type)

  3.  change data
  
  > changeStyle(data,i)

  4.  save data to store
  
  */




  return (
    <>
      <article className={style.productCard} style={{ maxWidth: '20%', background: bgColor }} >
        <div
          onClick={() => {
          
            openStyle(['bg'], 'bg')
          }}
          className={style.img} slot={keyStyle.topBG} >
          <img src='https://img.joomcdn.net/7395a4bf7ca6e4e56be137088a9ce9deb834c1e0_original.jpeg' alt="" slot={keyStyle.topBG} />
          <span className={style.inStockSpan} style={{ color: 'green' }} slot={keyStyle.topBG}> ◉ in Stock</span>
        </div>
        <div  slot={keyStyle.bottomBG}>

          <div style={{ width: 'fit-content' }} slot={keyStyle.nameColor} className={style.product}>
            <h3 onClick={() => {
              
              openStyle(['color', 'fontSize'], 'name')
            }} style={{ color: colorName, fontSize: `${fontSizeName}px` }} slot={keyStyle.nameColor}>Product name</h3>
          </div>

          <section className={style.info} slot={keyStyle.bottomBG}>
            <div slot={keyStyle.bottomBG} className={style.buyInfo} style={{ width: 'fit-content' }}>
              <h2 style={{ width: 'fit-content', color: colorPrice, fontSize: `${fontSizePrice}px` }} slot={keyStyle.priceColor} onClick={() => {
             
                openStyle(['color', 'fontSize'], 'price')
              }}> 200 USD</h2>
            </div>

          </section>

        </div>

      </article>

    </>
  )
}

// const openName = () => {
//   setStyle({
//     isOpen: true,
//     types: ['color', 'fontSize'],
//     datas: ['#000000', '16'],
//     title: ['Цвет текста', 'Размер текста']
//   })
// }