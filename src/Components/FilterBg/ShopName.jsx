import { useState, useEffect } from "react";
import { getSettings } from "../../firebase/db/settings";
import { useStoreContext } from "../../store/store";

export default function ShopName({name}) {
  const store = useStoreContext();
 



  return (
    <div className='filterBg'>
      <h1 style={{color:'black'}}>{name}</h1>
    </div>
  );
}