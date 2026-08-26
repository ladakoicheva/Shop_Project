import './file.css';

type props = {
  getFile: (data: { imgFile: File; url: string } | null) => void;
  attachedFile: { imgFile: File; url: string } | null;
};

export default function FileBtn({ getFile, attachedFile }: props) {
  const previewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const inputFile = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const preview = reader.result as string;
      getFile({ imgFile: inputFile, url: preview });
    };
    reader.readAsDataURL(inputFile);
    // Reset target value so selecting the same file twice triggers onChange
    e.target.value = '';
  };

  const removeFile = () => {
    getFile(null);
  };

  return (
    <>
      {!attachedFile && (
        <div className="cont-file-c" title="Прикрепить фото">
          <button type="button" className="plus-c">
            +
          </button>
          <input type="file" onChange={previewFile} className="file-c" accept="image/*" />
        </div>
      )}

      {attachedFile?.url && (
        <div className="img-c">
          <img src={attachedFile.url} className="img" alt="preview" />
          <span onClick={removeFile} title="Удалить прикрепленный файл">
            ×
          </span>
        </div>
      )}
    </>
  );
}
