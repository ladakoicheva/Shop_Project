
import styles from '../Form.module.css';
import { useFormik } from 'formik';
import { schema } from "../schemas/signInValidationSchema";
import { TYPE_MODAL } from "../typeModeHelper";
import { useState } from "react";
import { useAuthContext } from '../../../store/features/useAuth';



export default function SignInForm({setModalOpen}) {

  const { onLogin, changeAuthMode } =useAuthContext()
  const [backError, setBackError] = useState(null);

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

  const userSignIn = async (email, password) => {
    const userData = await onLogin(email, password);
    if (!userData.ok) {
      setBackError(userData.code)

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

      <p>Do not have an account? <span onClick={() => changeAuthMode(TYPE_MODAL.SING_UP)}>Sign Up</span></p>
      <button type='submit'>Sign In</button>
      {backError && <div className="error">{backError}</div>}
    </form>


  )
}
