import { useState, useEffect } from "react";
import { useStoreContext } from "../../store/store";

export default function ShopName({name}) {
  const store = useStoreContext();
 



  return (
    <div className='filterBg'>
      <h1 style={{color:'black'}}>{name}</h1>
    </div>
  );
}