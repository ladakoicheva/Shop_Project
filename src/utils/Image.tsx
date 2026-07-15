import { useState } from "react"

const defaultSRC_Product = '/No-Image.svg.png'

interface propsImageI {
  src: string,
  className : string,
  alt: string
} 
interface propsMainImage extends propsImageI{
  defaultSRC: string
} 

export const Image = ({ src, defaultSRC, className, alt }: propsMainImage) => {
  const [img, setImg] = useState(src || defaultSRC)
  const onError = () => setImg(defaultSRC)
  return <img onError={onError} src={img} alt={alt} className={className} />
}



export const ImageProduct = (props : propsImageI) => <Image {...props}  defaultSRC={defaultSRC_Product}/>
// export const ImageAvatar = (props : propsImageI) => <Image {...props}  defaultSRC={defaultSRC_Product}/>

