import type { productI } from "../../../../types/types"

export default function HistoryProductsList({product}:{product:productI}) {
  return (
    <li >
      {product.name}
    </li>
  )
}
