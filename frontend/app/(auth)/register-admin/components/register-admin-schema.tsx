import * as yup from 'yup'

export const registerAdminSchema = yup.object().shape({
    username: yup.string().required('Please add your username.'),
    password: yup.string().required('Please input your password name.'),
    email: yup.string().required('Please enter your email.'),
    fname: yup.string().required('Please enter your first name.'),
    lname: yup.string().required('Please enter your last name.'),
    ext: yup.string().required('Please upload a profile picture.'),
    imageData: yup.string().required('Please upload a profile picture.')
});