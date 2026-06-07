import * as Yup from 'yup';

export const schema = Yup.object({
  
  name: Yup.string()
    .min(3,'Must be 3 characters or more')
    .max(50, 'Must be 50 characters or less')
    .required('Required'),
  category: Yup.string()
    .min(3, 'Must be 3 characters or more')
    .max(50, 'Must be 50 characters or less')
    .required('Required'),
  price: Yup.number()
    .min(0, 'Price can`t be negative')
    .required('Required'),
  rating: Yup.number()
    .min(1)
    .max(5)
    .required(),
})