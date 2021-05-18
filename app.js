document.getElementById('loan-form').addEventListener('submit',function(e){

    //show loading
    document.getElementById('loading').style.display='block';

    setTimeout(calculateResults,1000);
    
    e.preventDefault();
});

function calculateResults(e){
    console.log('hello');
    
    const amount= document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years= document.getElementById('years');

    const monthlyPayment= document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal= parseFloat(amount.value);
    const calculatedInterest= parseFloat(interest.value)/100/12;
    const calculatePayments= parseFloat(years.value)*12;

    //Calculate monthly payment
    const x=Math.pow((1+calculatedInterest), calculatePayments);
    const monthly= (principal*x*calculatedInterest)/(x-1);

    //hide loading
    document.getElementById('loading').style.display='none';

    if( isFinite(monthly)){
        monthlyPayment.value= monthly.toFixed(2);
        totalPayment.value= (monthly*calculatePayments).toFixed(2);
        totalInterest.value= ((monthly*calculatePayments)-principal).toFixed(2);

        // show results
        document.getElementById('results').style.display='block';

    }else{
        showError('Please check your numbers');
    }
    
    e.preventDefault();
}

// Error function
function showError(error){

    const errorDiv= document.createElement('div');

    //get elements
    const card= document.querySelector('.card');
    const heading= document.querySelector('.heading');

    // add class
    errorDiv.className= 'alert alert-danger';
    // add textnode
    errorDiv.appendChild(document.createTextNode(error));
    //insert above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3sec
    setTimeout(clearError, 2000);
}

// clear error after certain time
function clearError(){
    document.querySelector('.alert').remove();
}