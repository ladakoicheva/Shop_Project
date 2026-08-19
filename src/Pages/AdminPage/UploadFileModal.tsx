import React from 'react'

export default function UploadFileModal({file}:any) {
  return (
    <div>
      <input type="file" value={file } />
    </div>
  )
}
