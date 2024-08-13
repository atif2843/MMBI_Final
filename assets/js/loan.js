function calculateLoan() {
    const principal = parseFloat(document.getElementById('principal').value) || 100000;
    const annualInterestRate = parseFloat(document.getElementById('interest').value) / 100 || 9/100;
    const years = parseInt(document.getElementById('years').value) || 1;
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfMonths = years * 12;
    const emi = Math.round((principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) / (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1));
    const totalAmountWithInterest = Math.round(emi * numberOfMonths);
    const totalInterest = Math.round(totalAmountWithInterest - principal);
    const interestInput = document.getElementById('interest');
    const errorMessage = document.getElementById('error-message');
    const minInterest = parseFloat(interestInput.min); // Get the minimum interest for the selected loan type

    if (annualInterestRate * 100 < minInterest) {
        errorMessage.textContent = `Interest rate must be at least ${minInterest}%.`;
        errorMessage.style.display = 'block';
        return false; // Prevent form submission
    } else {
        errorMessage.style.display = 'none';
    }

    updateChart(principal, totalInterest, totalAmountWithInterest,emi);
    return true;

}

calculateLoan()

function updateChart(principal, interest, totalAmountWithInterest,emi) {
    const ctx = document.getElementById('loanChart').getContext('2d');
    
    const data = {
        labels: [
            'Principal Amount',
            'Interest Amount',
            'Total Amount Payable',
            'Monthly EMI'
        ],
        datasets: [{
            data: [principal, totalAmountWithInterest],
            backgroundColor: [
                'rgba(0, 87, 255)',
                'rgba(255, 195, 0)',
            ],
        }],
        datasets1: [{
            data: [principal, interest, totalAmountWithInterest,emi],
            backgroundColor: [
                'rgba(0, 87, 255)',
                'rgba(255, 195, 0)',
                'rgba(255, 0, 138)',
                'rgba(0, 90, 155)',
            ],
        }]
    };
    
    
    const options = {
        plugins: {
            legend: {
                display: false,
                
            },
            datalabels: {
                display: false // Hides the data labels inside the colored area
            },
            id: 'custom_canvas_background_color',
            beforeDraw: (chart, args, options) => {
                const {ctx} = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = options.color;
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            },
            defaults: {
                color: 'lightGreen'
            }

            /*textInside: {
                Cache: false, 
                text: `Total: ₹${emi.toFixed(0)}`,
                color: 'black',
                fontSize: 18
            },*/
        }
    };

    console.log(emi);
    /*Chart.register({
        id: 'textInside',
        afterDatasetsDraw: function (chart) {
            const ctx = chart.ctx;
            const width = chart.width;
            const height = chart.height;
            const fontSize = options.plugins.textInside.fontSize;
            ctx.font = fontSize + 'px Arial';
            ctx.fillStyle = options.plugins.textInside.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const text = options.plugins.textInside.text;
            const textX = Math.round(width / 2);
            const textY = Math.round(height / 2);
            ctx.fillText(text, textX, textY);
        }
    });*/

if (window.loanChart instanceof Chart) {
window.loanChart.destroy();
}

window.loanChart = new Chart(ctx, {
type: 'doughnut',
data: data,
options: options,
plugins: [ChartDataLabels]
});

renderLegend(window.loanChart);



}




function renderLegend(chart) {
    const legendContainer = document.getElementById('legendContainer');
    const ul = document.createElement('ul');
    const labels = chart.data.labels;
    const dataValues = chart.data.datasets1[0].data;
    const backgroundColors = chart.data.datasets1[0].backgroundColor;
    
    labels.forEach((label, index) => {
        const li = document.createElement('li');
        
        // Create color box and label
        const colorBox = document.createElement('span');
        colorBox.style.backgroundColor = backgroundColors[index];
        colorBox.style.display = 'inline-block';
        colorBox.style.width = '15px';
        colorBox.style.height = '15px';
        colorBox.style.borderRadius = '50%';
        colorBox.style.marginRight = '10px';
        li.appendChild(colorBox);
        li.appendChild(document.createTextNode(label));
        
        // Create nested ul and li for amount
        const nestedUl = document.createElement('ul');
        const nestedLi = document.createElement('li');
        nestedLi.appendChild(document.createTextNode(`₹${dataValues[index].toFixed(0)}`));
        nestedUl.appendChild(nestedLi);
        
        li.appendChild(nestedUl);
        ul.appendChild(li);
    });

    legendContainer.innerHTML = '';
    legendContainer.appendChild(ul);
}

const selectElement = document.getElementById('years');

        // Loop from 1 to 50
        for (let i = 1; i <= 50; i++) {
            // Create a new option element
            const option = document.createElement('option');
            option.value = i; // Set the value of the option
            option.textContent = i; // Set the text of the option

            // Append the option to the select element
            selectElement.appendChild(option);
        }

function validateNumberInput(input) {
const min = 8.5;
if (input.value < min) {
    input.value = min;
}
syncRangeInput(input.value);
}

function syncRangeInput(value) {
const rangeInput = document.getElementById('rangeInput');
rangeInput.value = value;
}

function syncNumberInput(value) {
const numberInput = document.getElementById('interest');
numberInput.value = value;
}

// Initialize the inputs to ensure they are synchronized
document.addEventListener('DOMContentLoaded', () => {
const initialValue = document.getElementById('interest').value;
syncRangeInput(initialValue);
});


















function validateNumberInput1(input) {
    const min = 8.5;
    if (input.value < min) {
        input.value = min;
    }
    syncRangeInput(input.value);
}

function syncRangeInput(value) {
    const rangeInput = document.getElementById('rangeInput');
    rangeInput.value = value;
}

function syncNumberInput(value) {
    const numberInput = document.getElementById('interest');
    numberInput.value = value;
}
        





function toggleForms() {
    const formType = document.getElementById('form-selector').value;
    const principalInput = document.getElementById('principal');
    const interestInput = document.getElementById('interest');
    const rangeInput = document.getElementById('rangeInput');
    const loanLabel = document.getElementById('loan-label');
    const minInterestValue = document.getElementById('minValue');
    const tenure = document.getElementById('years');

    if (formType) {
        principalInput.disabled = false;
        interestInput.disabled = false;
        rangeInput.disabled = false;
        tenure.disabled =false;

        let minInterest;
        let loanLabelText;

        switch(formType) {
            case 'business':
                minInterest = 12;
                loanLabelText = 'Business Loan Amount';
                break;
            case 'education':
                minInterest = 6;
                loanLabelText = 'Education Loan Amount';
                break;
            case 'home':
                minInterest = 9.5;
                loanLabelText = 'Home Loan Amount';
                break;
            case 'personal':
                minInterest = 8.5;
                loanLabelText = 'Personal Loan Amount';
                break;
            default:
                minInterest = 6;
                loanLabelText = 'Loan Amount';
        }

        interestInput.min = minInterest;
        rangeInput.min = minInterest;
        minInterestValue.textContent = minInterest;
        interestInput.value = minInterest;
        rangeInput.value = minInterest;
        loanLabel.textContent = loanLabelText;
    } else {
        principalInput.disabled = true;
        interestInput.disabled = true;
        rangeInput.disabled = true;
        tenure.disabled =true;
    }
}