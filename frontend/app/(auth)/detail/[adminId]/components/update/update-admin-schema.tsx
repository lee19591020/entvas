import * as yup from 'yup'

export const updateAdminSchema = yup.object().shape({
    email: yup.string().required('Please enter your email.'),
    fname: yup.string().required('Please enter your first name.'),
    lname: yup.string().required('Please enter your last name.'),
    ext: yup.string().required('Please upload a profile picture.'),
    imageData: yup.string().required('Please upload a profile picture.')
});