import * as yup from 'yup'

export const LoginPayloadSchema = yup.object().shape({
    username: yup.string().required('Please input your username!'),
    password: yup.string().required('Please input your password!')
})