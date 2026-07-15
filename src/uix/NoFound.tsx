

export const NoFound = (props:{text:string}) => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'fit-content'
    }}>
      <h1>{ props.text}</h1>
    </div >
  )
}
