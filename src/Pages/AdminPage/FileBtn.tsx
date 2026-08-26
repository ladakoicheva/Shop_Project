import './file.css'
import { useEffect, useState } from 'react'
import type { messageDataI } from './type';

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
  return (
    <>
      <div className='cont-file-c'>
        {!file?.imgFile  && <button className='plus-c'>+</button>}
      <input type="file" onChange={previewFile} className='file-c' />

   
      </div>
      
         {file?.url &&  <div className='img-c'><img src={file?.url }  className='img'/> <span onClick={()=>setFile(null)}>×</span></div>}
    </>
    
  )
}
