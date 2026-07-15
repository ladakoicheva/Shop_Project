



export interface settingsI {
    bgbg: string
    name: string
    namecolor: string
    namefontSize: string
    pricecolor: string
    pricefontSize: string
    currency:string
  }

export interface authI {
  user: null | {}
  authMode: string,
  settings: settingsI
}


export interface basketI{
  
    
  [id: string]: {
    count: number
    product: productI
  }

  
}



export interface productI {
   name: string,
  price:number
  currency: string,
  img:string,
  id: string
  count?: number,
  inStock?: boolean,
  category?: string,
  rating?: number
}

export interface historyI {
  date: number
  discount: number
  id: string
  isArchived: boolean
  totalSum:number
  products: Omit<productI,'inStock'|'category'|'rating'>[]

}



export interface favI{
  
  favorites : string[]
}






export interface ResponseI<A> {
  ok: boolean;
  code?: string;
  data?: A
  e?:string
}


