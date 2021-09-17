const yup = require('yup')

const categorySchema = {
    //Register End point schema validation
    addCategory: yup.object({
        user_ref_id: yup
            .string()
            .required("user ref id is required"),
        label: yup
            .string()
            .required("Label is required"),
        icon: yup
            .string()
            .required("Icon is required")                    
    })
}

module.exports = categorySchema