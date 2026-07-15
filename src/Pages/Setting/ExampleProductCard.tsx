import style from '../../Components/ProductCard/ProductCard.module.css'
import  { styleConfigE } from './Setting'



 const keyStyle = {
  topBG: 'topBG',
  bottomBG: 'bottomBG',
  priceColor: 'priceColor',
  nameColor: 'nameColor'
}

type props = {
  openStyle:(keys:styleConfigE[], type: styleConfigE)=>void
  getStyle:(name:string)=>string[]
}

export default function ExampleProductCard({ openStyle, getStyle }:props) {
 

  
  const [colorName, fontSizeName] = getStyle('name');
  const [colorPrice, fontSizePrice] = getStyle('price');
  const [bgColor] = getStyle('bg');




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