import { convector } from "../../utils/convector"
import type { settingsI } from "../../../types/types"
import type { productI } from "../../../types/types"

type props = {
  style: settingsI,
  product: productI,
  rates: { [rate: string]:number }
}

export default function Price({style,product,rates}:props) {
  return (
     <h2 style={{ color: style.pricecolor, fontSize: `${style.pricefontSize}px` }}>
      {convector( style.currency, product.currency,  product.price, rates )}
      {style.currency}
    </h2 >
    
  )
}
