const yup = require('yup')

const userSchema = {
    //Register End point schema validation
    register: yup.object({
        name: yup.string(),
        email_address: yup
            .string()
            .email("Please enter a valid email")
            .required("Email Address is required"),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Please enter at least 8 characters"),
        confirm_password: yup
            .string()
            .required("Confirm Password is required")
            .oneOf([yup.ref('password'), null], "Passwords don't match"),
        birthday: yup
            .date("Please ensure birthday is in Date format")
    })
}

module.exports = userSchema