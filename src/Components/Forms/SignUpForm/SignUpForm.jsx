import styles from '../Form.module.css';
import { useFormik } from 'formik';
import { schema } from "../schemas/signUpValidationSchema";
import { useState } from 'react';
import { TYPE_MODAL } from '../typeModeHelper';
import { useAuthContext } from '../../../store/features/useAuth';
import { onRegistration } from '../../../redux/auth/auth';
import { useDispatch } from 'react-redux';
import { changeAuthMode } from '../../../redux/auth/auth';

export default function SignUpForm({ setModalOpen }) {

  const [backError, setBackError] = useState(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confPassword: ''
    },
    onSubmit: values => {
      userSignUp(values.email, values.password)
    },
    validationSchema: schema

  });


  const userSignUp = async (email, password) => {
    const userData = await dispatch(onRegistration({ email, password }));
    if (!userData.payload.ok) {
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

      <label htmlFor="confPassword">Confirm</label>
      <input onChange={formik.handleChange} id='confPassword' value={formik.values.confPassword} type="password" placeholder="confirm your password..." />

      {formik.touched.confPassword && formik.errors.confPassword ? (
        <div>{formik.errors.confPassword}</div>
      ) : null}

      <p>Already have an account? <span onClick={() => dispatch(changeAuthMode(TYPE_MODAL.SING_IN))}>Sign In</span></p>
      <button type='submit'>Sign Up</button>
      {backError && <div className="error">{backError}</div>}
    </form>

  )
}
