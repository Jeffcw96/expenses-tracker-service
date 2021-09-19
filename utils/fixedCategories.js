function fixedExpensesCategories(user_ref_id) {
    return [
        {
            label: "Transportation",
            icon: "transportation de ref id",
            type: "EXPENSES",
            user_ref_id: user_ref_id
        },
        {
            label: "Family",
            icon: "Family de ref id",
            type: "EXPENSES",
            user_ref_id: user_ref_id
        },
        {
            label: "Loan",
            icon: "loan de ref id",
            type: "EXPENSES",
            user_ref_id: user_ref_id
        },
        {
            label: "Education",
            icon: "Education de ref id",
            type: "EXPENSES",
            user_ref_id: user_ref_id
        },
        {
            label: "Leisure",
            icon: "Leisure de ref id",
            type: "EXPENSES",
            user_ref_id: user_ref_id
        }
    ]
}


function fixedExpensesIncome(user_ref_id) {
    return [
        {
            label: "Paycheck",
            icon: "Paycheck de ref id",
            type: "INCOME",
            user_ref_id: user_ref_id
        },
        {
            label: "Investment",
            icon: "investment de ref id",
            type: "INCOME",
            user_ref_id: user_ref_id
        },
    ]
}

module.exports = {
    fixedExpensesCategories,
    fixedExpensesIncome
}