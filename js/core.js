// Elmer Almeida
// 991507719
// JavaScript file for Assignment 1.

$(document).ready(() => {
    if (localStorage) {
        // Loan Form Submit
        $("#loan-form").on('submit', (e) => {
            // e.preventDefault();
            let form = $("#loan-form").serializeArray();
            for (var i = 0; i < form.length; i++) {
                localStorage.setItem(form[i].name, form[i].value);
            }
        });

        // localStorage values stored in String format. Parse to Int.
        let borrow_amount = parseInt(localStorage.borrow_amount)
        let payment_terms = parseInt(localStorage.payment_terms)

        // Approval Form pre-loaded value calculation
        let interest = (borrow_amount * payment_terms) / 12 * 0.03;
        let payment = borrow_amount + interest;
        let profit = payment - borrow_amount;

        // Approval Form pre-loaded values
        $("input#interest_output").val( localStorage.interest || interest.toFixed(2));
        $("input#payment_output").val( localStorage.payment || payment.toFixed(2) );
        $("input#profit_output").val( localStorage.profit || profit.toFixed(2) );
        $("select#decision_output").val( localStorage.decision || "" )

        // Approval Form Submit
        $("#approval-form").on('submit', (e) => {
            // e.preventDefault();
            let approval_form = $("#approval-form").serializeArray();
            for (var i = 0; i < approval_form.length; i++) {
                localStorage.setItem(approval_form[i].name, approval_form[i].value);
            }
        });

        // Currency Formatter Object
        const currency_formatter = new Intl.NumberFormat('en-CA', {
            style: 'currency',
            currency: 'CAD',
            minimumFractionDigits: 2
        });

        $("p#company-information").html(`
            <b>Owner: </b> ${localStorage.company_owner} <br />
            <b>Company Name: </b> ${localStorage.customer_company_name} <br />
            <b>E-Mail Address: </b> ${localStorage.email_address} <br />
            <b>Borrow Amount: </b> ${currency_formatter.format(localStorage.borrow_amount)} <br />
            <b>Payment Terms: </b> ${localStorage.payment_terms}
        `);

        // Display Loan Applicant Details
        for (var i = 0; i < localStorage.length; i++) {
            $("p#loan-details").html(`
                <b>Customer Company Name: </b> ${localStorage.customer_company_name} <br />
                <b>Company Owner: </b> ${localStorage.company_owner} <br />
                <b>E-Mail Address: </b> ${localStorage.email_address} <br />
                <b>Phone Number: </b> ${localStorage.phone_number} <br />
                <b>Annual Sales: </b> ${currency_formatter.format(localStorage.annual_sales)} <br />
                <b>Borrow Amount: </b> ${currency_formatter.format(localStorage.borrow_amount)} <br />
                <b>Payment Terms: </b> ${localStorage.payment_terms} <br />
            `);
            if (localStorage.interest)
                $("p#loan-details").append(`<b>Interest: </b> ${currency_formatter.format(localStorage.interest)} <br />`);
            if (localStorage.profit)
                $("p#loan-details").append(`<b>Profit: </b> ${currency_formatter.format(localStorage.profit)} <br />`);
            if (localStorage.payment)
                $("p#loan-details").append(`<b>Payment: </b> ${currency_formatter.format(localStorage.payment)} <br /><br />`);
            if (localStorage.decision)
                $("p#loan-details").append(`<span style="font-size: 20px;text-transform:uppercase;letter-spaceing: 0.2em;font-weight:700;"><b>Decision: ${localStorage.decision}</b></span> <br />`);
        }
    }
});


// Clear Local Storage Function
function clearLocalStorage() {
    localStorage.clear();
}