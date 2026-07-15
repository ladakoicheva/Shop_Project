
import styles from '../Form.module.css';
import { useFormik } from 'formik';
import { schema } from "../schemas/signInValidationSchema";
import { TYPE_MODAL } from "../typeModeHelper";
import { useState } from "react";
import { changeAuthMode } from '../../../redux/auth/auth';
import { onLogin } from '../../../redux/auth/auth';
import { useAppDispatch } from '../../../redux/type';


type props = {
  setModalOpen:(isOpen:boolean)=>void
}

export default function SignInForm({ setModalOpen}:props) {

  const [backError, setBackError] = useState<string|null>(null);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      userSignIn(values.email, values.password)
    },
    validationSchema: schema
  });

  const userSignIn = async (email:string, password:string):Promise<void>=> {
    const userData = await dispatch(onLogin({ email, password }));

    if (!userData.payload.ok ) {
      setBackError(userData.payload.code)

    } else {
      setModalOpen(false)
    }
  }


  return (

    <form className={styles.userForm} action="" onSubmit={formik.handleSubmit}>

      <label htmlFor="email">Email</label>
      <input onChange={formik.handleChange} value={formik.values.email} id='email' type="email" placeholder="enter your email..." />

      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <label htmlFor="password">Password</label>
      <input onChange={formik.handleChange} id='password' value={formik.values.password} type="password" placeholder="enter your password..." />

      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      <p>Do not have an account? <span onClick={() => dispatch(changeAuthMode(TYPE_MODAL.SIGN_UP))}>Sign Up</span></p>
      <button type='submit'>Sign In</button>
      {backError && <div className="error">{backError}</div>}
    </form>


  )
}
