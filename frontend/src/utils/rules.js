import * as yup from 'yup';

export const getRules = (getValues) => {
    return {
        email: yup.string().required('Vui lòng nhập email của bạn.').email('Email không hợp lệ.'),
        password: yup
            .string()
            .required('Vui lòng nhập mật khẩu của bạn.')
            .min(8, 'Mật khẩu phải chứa ít nhất 8 ký tự.'),
        confirmPassword: yup
            .string()
            .required('Vui lòng nhập lại mật khẩu của bạn.')
            .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp.'),
        passwordOld: yup
            .string()
            .required('Vui lòng nhập mật khẩu cũ của bạn.')
            .min(8, 'Mật khẩu phải chứa ít nhất 8 ký tự.'),
        passwordNew: yup
            .string()
            .required('Vui lòng nhập mật khẩu mới của bạn.')
            .min(8, 'Mật khẩu phải chứa ít nhất 8 ký tự.'),
        confirmPasswordNew: yup
            .string()
            .required('Vui lòng nhập lại mật khẩu mới của bạn.')
            .oneOf([yup.ref('passwordNew'), null], 'Mật khẩu không khớp.'),
    };
};
