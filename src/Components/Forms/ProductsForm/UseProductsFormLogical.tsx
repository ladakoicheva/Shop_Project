import type { productI } from "../../../../types/types"
import { useAppSelector } from "../../../redux/type";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/type";
import { useState } from "react";
import { openLoading } from "../../../redux/loading/loading";
import { closeLoading } from "../../../redux/loading/loading";
import { addProduct } from "../../../services/firebase/db/products";
import { editProduct } from "../../../services/firebase/db/products";
import { updateBasketEditProduct } from "../../../redux/basket/basket";

type props = {
  onClose: () => void,
  product:productI
}
export default function UseProductsFormLogical({ product,onClose }:props) {

  const auth = useAppSelector((s) => s.auth)
  const navigate = useNavigate();
  const [img, setImg] = useState<{ file: File|null, src: string|null } | null>( product? { file:null ,src:product.img }: null);
  const dispatch = useAppDispatch()
  const basket = useAppSelector((s) => s.basket.data)

    const create = async (product:Omit<productI, 'id'>) => {
      dispatch(openLoading())
      await addProduct(product, img?.file, auth?.user?.uid!)
      navigate(`/products/${auth?.user?.uid}`)
      dispatch(closeLoading())
    }
  
  const updateImage = (data:{ file: File|null, src: string|null } | null) => {
    setImg(data)
  }
  const updateItem = async (uid:string, id:string, newData:productI, file:File) => {
  
      const fieldsToUpdate: Partial<productI> = {};
      
  for (const key in product) {
    const productKey = key as keyof productI;
  
    if (product[productKey] !== newData[productKey]) {
      (fieldsToUpdate as Record<keyof productI, productI[keyof productI]>)[productKey] = newData[productKey];
    }
  }
  
      if (Object.keys(fieldsToUpdate).length > 0) {
        const res = await editProduct(uid, id, fieldsToUpdate, file);
        const basketCopy = { ...basket };
        if (basketCopy[id] && res.ok) {
          basketCopy[id] = {
            ...basketCopy[id],
            product: {
              ...basketCopy[id].product,
              ...res.data
            }
          };
  
          // basketContext.updateBasketEditProduct(basketCopy)
  
          dispatch(updateBasketEditProduct(basketCopy))
        }
        if (res.ok) onClose()
      }
  
  
  }
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   
    if (!e.target.files) return;
    const file = e.target.files[0];
   

    const reader = new FileReader();


    reader.onload = (event) => {
      if (!event.target) return;
      const src = event.target.result as string;
      setImg({ file: file, src: src });
    };

    reader.readAsDataURL(file);

  }
  return (
    {
      auth,
      navigate,
      img,
      basket,
      create,
      updateItem,
      handleFileChange,
      updateImage,
      
    }
  )
}
