import banner from '../assets/loginBanner.jpg'
import logo from '../assets/Devoro-logo-mobile.png'
import { useFormik, FormikProps } from 'formik'
import { SignUpSchema } from '../validations/Validation'
import { RiErrorWarningFill } from "react-icons/ri";
import { auth } from '../firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Tooltip } from '@material-tailwind/react';


interface SignupValues {
    email: string;
    password: string;
    cpassword: string;
  }

const initialValues = {
  email: '',
  password: '',
  cpassword: '',
}


export default function Signup() {

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const navigate = useNavigate();

  const {values, handleChange, handleSubmit, errors }: FormikProps<SignupValues> = useFormik<SignupValues>({
        initialValues: initialValues,
        validationSchema: SignUpSchema,
        validateOnChange: false,
        onSubmit: () => {},
      });

  const signup = () => {
          const email = values.email 
          const password = values.password
        
          if (!emailRegex.test(email)) {
            console.error('The email address is not formatted correctly.');
            return; 
          }
        
          createUserWithEmailAndPassword(auth, email, password).then(data => {
            console.log(data, 'authData');
            navigate('/login')
          });
        }
    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
            <div className='flex h-[500px] xl:h-[650px] lg:h-[500px] md:h-[500px] shadow-2xl rounded-xl'>
                <form onSubmit={handleSubmit} className='flex flex-col w-[400px] lg:w-[550px] md:w-[350px] items-center py-12 rounded-xl md:rounded-r-none'>
                    <img src={logo} alt='devoro-logo' className='h-32 w-40 mb-5'/>
                    <div className='flex items-center flex-col gap-5 w-full'>
                        <div className='flex relative  w-full'>
                            <div className='flex tems-center gap-4 w-full justify-center'>
                            <input onChange={handleChange} value={values.email} id="email" name="email" type='text' placeholder='Email' className='w-[50%] px-2 py-2 rounded-lg border border-black/30'/>
                            </div>
                            <div className='absolute right-[107px] top-2'>
                              {errors.email &&
                              <Tooltip content={errors.email}>
                                        <RiErrorWarningFill size={24} className='text-red-800 cursor-help'/>
                              </Tooltip>
                              }     
                            </div>
                        </div>
                        <div className='flex relative w-full'>
                            <div className='flex tems-center gap-4 w-full justify-center'>
                            <input onChange={handleChange} value={values.password} id="password" name="password" type='text' placeholder='Password' className='w-[50%] px-2 py-2 rounded-lg border border-black/30'/>
                            </div>
                            <div className='absolute right-[107px] top-2'>
                              {errors.password &&
                              <Tooltip content={errors.password}>
                                        <RiErrorWarningFill size={24} className='text-red-800 cursor-help'/>
                              </Tooltip>
                              }     
                            </div>
                        </div>
                        <div className='flex relative mb-5 w-full'>
                            <div className='flex tems-center gap-4 w-full justify-center'>
                            <input onChange={handleChange} value={values.cpassword} id="cpassword" name="cpassword" type='text' placeholder='Confirm Password' className='w-[50%] px-2 py-2 rounded-lg border border-black/30'/>
                            </div>
                            <div className='absolute right-[107px] top-2'>
                              {errors.cpassword &&
                              <Tooltip content={errors.cpassword}>
                                        <RiErrorWarningFill size={24} className='text-red-800 cursor-help'/>
                              </Tooltip>
                              }     
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center text-center gap-5 w-[50%]'>
                        <button type='submit' onClick={signup} className='bg-purple-900 py-2 px-24 w-full rounded-md font-semibold hover:bg-purple-700 text-white'>Sign up</button>
                        <div className='flex items-center gap-1 text-sm w-[110%] justify-center'>
                            <span>Already have an account yet?</span>
                            <Link to={'/login'} className='text-purple-900 underline hover:font-normal'>Login</Link>
                        </div>
                    </div>
                </form>
                <div>
                  <img src={banner} alt='formImg' className='h-full w-[450px] rounded-r-2xl lg:block hidden md:block'/> 
                </div>
            </div>
            </div>
        </div>
        )
}

