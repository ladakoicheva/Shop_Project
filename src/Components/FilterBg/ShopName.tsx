type props = {
  name: string;
}

export default function ShopName({name}:props) {
 
  return (
    <div className='filterBg'>
      <h1 style={{color:'black'}}>{name}</h1>
    </div>
  );
}