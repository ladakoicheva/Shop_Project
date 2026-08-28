import { useState, useEffect } from "react";

const defaultSRC_Product = '/No-Image.svg.png';
const defaultSRC_Chat = '/chat.png';
const defaultSRC_Edit = '/edit.png';
const defaultSRC_Archive = '/free-icon-archive.png';
const defaultSRC_Redo = '/free-icon-redo.png';
const defaultSRC_Avatar = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%239CA3AF"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>';

export interface propsImageI {
  src?: string | null;
  className?: string;
  alt?: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
  style?: React.CSSProperties;
  slot?: string;
}

interface propsMainImage extends propsImageI {
  defaultSRC: string;
}

export const Image = ({ src, defaultSRC, className, alt = "", onClick, style, slot }: propsMainImage) => {
  const [img, setImg] = useState(src || defaultSRC);

  useEffect(() => {
    setImg(src || defaultSRC);
  }, [src, defaultSRC]);

  const onError = () => setImg(defaultSRC);

  return (
    <img
      onError={onError}
      src={img || defaultSRC}
      alt={alt}
      className={className}
      onClick={onClick}
      style={style}
      slot={slot}
    />
  );
};

export const ImageProduct = (props: propsImageI) => <Image {...props} defaultSRC={defaultSRC_Product} />;
export const ImageAvatar = (props: propsImageI) => <Image {...props} defaultSRC={defaultSRC_Avatar} />;
export const ImageChat = (props: propsImageI) => <Image {...props} defaultSRC={defaultSRC_Chat} />;
export const ImageEdit = (props: propsImageI) => <Image {...props} defaultSRC={defaultSRC_Edit} />;
export const ImageArchive = (props: propsImageI) => <Image {...props} defaultSRC={defaultSRC_Archive} />;
export const ImageRedo = (props: propsImageI) => <Image {...props} defaultSRC={defaultSRC_Redo} />;
export const ImageFile = (props: propsImageI) => <Image {...props} defaultSRC={defaultSRC_Product} />;


