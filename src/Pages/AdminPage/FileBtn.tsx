import './file.css'
import { useState } from 'react'

type props = {
  getFile: (data: { imgFile: File, url: string }|null) => void,
  url: string | null
  
}

export default function FileBtn({getFile,url}:props) {

  const [file, setFile] = useState<null|{imgFile:File,url:string}>(null);
  
  
  
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
        {!url && <button className='plus-c'>+</button>}
      <input type="file" onChange={previewFile} className='file-c' />

   
      </div>
      
         {url &&  <div className='img-c'><img src={url }  className='img'/> <span onClick={()=>getFile(null)}>×</span></div>}
    </>
    
  )
}
