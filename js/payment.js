document.addEventListener("DOMContentLoaded", function () {
    const paymentPlanChange = document.querySelector('.payment-plan-change');
    const paymentPlanDropdown = document.querySelector('.payment-plan-dropdown');
    const paymentPlanSelect = document.querySelector('#payment-plan-select');
    const paymentPlanTypeImg = document.querySelector('.payment-plan-type img');
    const darkModeIcon = document.querySelector('#darkMode-icon');
    const coursePriceElement = document.querySelector('.payment-summary-item .payment-summary-price');
    const courseDiscountElement = document.querySelector('.payment-summary-item .c2');
    const courseFinalPriceElement = document.querySelector('.payment-summary-item .c3');
    const discountCodeInput = document.getElementById('discount-code');
    const applyDiscountBtn = document.querySelector('.apply-discount-btn');
    const AdditionalDiscount = document.querySelector('.payment-summary-item .c4');
    let discountCodeApplied = false;

    const planOptions = {
        'bash': { name: 'Bash Development', img: './img/Bash-Logo.png', price: 19.99, discount: -1.99 , adddiscount: -1.80, finaldis: 16.2, final: 18  },
        'cpp': { name: 'C++ Development', img: './img/C++_logo.png', price: 29.99, discount: -2.99, adddiscount: -2.70, finaldis: 24.3 , final: 27 },
        'python': { name: 'Python Development', img: './img/Python-Logo.png', price: 14.99, discount: -1.49, adddiscount: -1.35, finaldis: 12.15 , final: 13.5 },
        'web': { name: 'Web Development', img: './img/Web_logo.png', price: 24.99, discount: -2.49, adddiscount: -2.25, finaldis: 20.25 , final: 22.5 },
    };

    paymentPlanChange.addEventListener('click', function () {
        paymentPlanDropdown.classList.toggle('active');
        paymentPlanChange.style.display = 'none';
    });

    paymentPlanSelect.addEventListener('change', function () {
        const selectedPlan = this.value;
        document.querySelector('.payment-plan-info-name').textContent = 'Your Plan:';
        document.querySelector('.payment-plan-info-price').textContent = planOptions[selectedPlan].name;
        paymentPlanTypeImg.src = planOptions[selectedPlan].img;
        coursePriceElement.textContent = `${planOptions[selectedPlan].price.toFixed(2)}$`;
        courseDiscountElement.textContent = `${planOptions[selectedPlan].discount.toFixed(2)}$`;
        courseFinalPriceElement.textContent = `${planOptions[selectedPlan].final.toFixed(1)}$`;
        paymentPlanDropdown.classList.remove('active');
        paymentPlanChange.style.display = 'inline';

        if(discountCodeApplied){
            AdditionalDiscount.textContent = `${planOptions[selectedPlan].adddiscount.toFixed(2)}$`;
            courseFinalPriceElement.textContent = `${planOptions[selectedPlan].finaldis.toFixed(1)}$`;
        }
    });

    darkModeIcon.onclick = () => {
        darkModeIcon.classList.toggle('bx-sun');
        document.body.classList.toggle('dark-mode');

        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkMode);
    };

    const expiryDateInput = document.getElementById('expiry-date');
    expiryDateInput.addEventListener('input', function () {
        let trimmedValue = this.value.replace(/[^0-9]/g, '');

        if (trimmedValue.length > 2) {

            trimmedValue = trimmedValue.replace(/(\d{2})(\d{2})/, '$1/$2');
        }

        this.value = trimmedValue;
    });

    const cardNumberInput = document.getElementById('card-number');

    cardNumberInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });

    const cvvInput = document.getElementById('cvv');

    cvvInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });

    applyDiscountBtn.addEventListener('click', function () {
        if (!discountCodeApplied) { 
            applyDiscount();
        }
    });

    function applyDiscount() {
        const discountCode = discountCodeInput.value.trim();

        if (discountCode === 'DcodeBot') {

            discountCodeInput.style.display = 'none';
            applyDiscountBtn.style.display = 'none';
            discountCodeApplied = true;
            const selectedPlan = paymentPlanSelect.value;
            if (selectedPlan !== '-') {
                AdditionalDiscount.textContent = `${planOptions[selectedPlan].adddiscount.toFixed(2)}$`;
                courseFinalPriceElement.textContent = `${planOptions[selectedPlan].finaldis.toFixed(1)}$`;
            }
        } else {
            alert('Invalid discount code. Please try again.');
        }
    }

    const submitButton = document.querySelector('.payment-form-submit-button');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        const selectedPlan = paymentPlanSelect.value;
        const emailInput = document.getElementById('email');
        const cardNumberInput = document.getElementById('card-number');
        const expiryDateInput = document.getElementById('expiry-date');
        const cvvInput = document.getElementById('cvv');
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

        if (
            emailInput.value.trim() === '' ||
            cardNumberInput.value.trim() === '' ||
            expiryDateInput.value.trim() === '' ||
            cvvInput.value.trim() === ''
        ) {
            alert('Please fill in all required fields.');
        } else if (!emailInput.value.trim().toLowerCase().endsWith('@gmail.com')) {
            alert('Please enter a valid Gmail address.');
        } else if (cvvInput.value.trim().length !== 3) {
            alert('CVV must be 3 digits.');
        } else if (cardNumberInput.value.trim().length !== 16) {
            alert('Card number must be 16 digits.');
        } else if (selectedPlan === '-') {
            alert('Please select a course before making the payment.');
        } else if (!expiryDateInput.value.trim().match(expiryDateRegex)) {
            alert('Please enter a valid expiry date in the format MM/YYYY.');
        } else {
            window.location.href = './index';
        }
    });
});
