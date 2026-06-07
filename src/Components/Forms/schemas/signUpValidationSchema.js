import * as Yup from 'yup';

export const schema = Yup.object({
  email: Yup.string()
    .required('required')
    .email('wrong email')
    .trim(),

  password: Yup.string()
    .required('required')
    .min(6, 'must be not less then 6 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter ')
    .matches(/[0-9]/, 'Password must contain at least one number'),

  confPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'passwords must match')
    .required('confirm your password'),
})