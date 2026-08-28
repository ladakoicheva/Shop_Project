import './file.css'
import { useEffect, useState } from 'react'
import type { messageDataI } from './type';
import { ImageFile } from '../../utils/Image';

type props = {
  getFile: (data: { imgFile: File, url: string }|null) => void,
  messages: messageDataI
  
}

export default function FileBtn({getFile,messages}:props) {

  const [file, setFile] = useState<null|{imgFile:File,url:string}>(null);
  
  useEffect(() => {
    if (!file?.imgFile) return;
    setFile(null);
  },[messages])
  

  const previewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(! e.target.files) return
    const inputFile = e.target.files[0];
    

    const reader = new FileReader();
    reader.onload = () => {
      const preview = reader.result as string;
      setFile({ imgFile: inputFile, url: preview });
      getFile({ imgFile: inputFile, url: preview })
    }
    reader.readAsDataURL(inputFile);
    
  }
  const removeSelectedFile = () => {
    setFile(null);
    getFile(null);
  };

  return (
    <>
      {!file?.imgFile && (
        <div className='cont-file-c'>
          <button className='plus-c' type="button">+</button>
          <input type="file" onChange={previewFile} className='file-c' accept="image/*" />
        </div>
      )}

      {file?.url && (
        <div className='img-c'>
          <ImageFile src={file?.url} className='img' alt="file preview" />
          <span onClick={removeSelectedFile}>×</span>
        </div>
      )}
    </>
  );
}


