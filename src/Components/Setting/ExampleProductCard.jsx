import style from '../ProductCard/ProductCard.module.css';
import { useStoreContext } from '../../store/store';

export const keyStyle = {
  topBG: 'topBG',
  bottomBG: 'bottomBG',
  priceColor: 'priceColor',
  nameColor: 'nameColor'
}


export default function ExampleProductCard({ name, onClick }) {

  const store = useStoreContext()

  return (
    <>
      <article className={style.productCard} style={{ maxWidth: '20%'}} >


        <div className={style.img} slot={keyStyle.topBG} >
          <img src='https://img.joomcdn.net/7395a4bf7ca6e4e56be137088a9ce9deb834c1e0_original.jpeg' alt="" slot={keyStyle.topBG} />
          <span className={style.inStockSpan} style={{ color: 'green' }} slot={keyStyle.topBG}> ◉ in Stock</span>
        </div>
        <div slot={keyStyle.bottomBG}>

          <div style={{ width: 'fit-content'}} slot={keyStyle.nameColor} className={style.product}>
            <h3 onClick={() => onClick(['color', 'fontSize'])}  slot={keyStyle.nameColor}>{name}</h3>
          </div>

          <section className={style.info} slot={keyStyle.bottomBG}>
            <div slot={keyStyle.bottomBG} className={style.buyInfo} style={{ width: 'fit-content' }}>
              <h2 style ={{width:'fit-content'}} slot={keyStyle.priceColor} > 200 USD</h2>
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