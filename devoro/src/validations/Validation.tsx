import * as yup from 'yup'

export const LoginSchema = yup.object({
    email: yup.string().email('Please Enter a valid Email').required('Please Enter your Email'),
    password: yup.string().required('Please Enter your Password')
})

export const SignUpSchema = yup.object({
    username: yup.string().required('This field is required'),
    email: yup.string().email('Please Enter a valid Email').required('This field is required'),
    password: yup.string().required('This field is required').min(8, 'Your password is too short.'),
    cpassword: yup.string().required('Please retype your password').oneOf([yup.ref('password')], 'Password do not match')
})

