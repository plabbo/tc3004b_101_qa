function calculate(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    // Validate input
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').innerText = "Please enter valid numbers";
        return;
    }

    // Update operator display
    if (operation === 'add') {
        document.getElementById('operator').innerText = "+";
    } else if (operation === 'subtract') {
        document.getElementById('operator').innerText = "-";
    }

    // Call the appropriate API with relative paths
    const apiUrl = operation === 'add' 
        ? `/api/add?num1=${num1}&num2=${num2}`
        : `/api/subtract?num1=${num1}&num2=${num2}`;

    // Display loading state
    document.getElementById('result').innerText = "Calculating...";

    // Make API call
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('result').innerText = "Result: " + data.result;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerText = "Error: Could not calculate result";
        });
}

function resetFields(){
    const num1 = document.getElementById('num1');
    const num2 = document.getElementById('num2');

    num1.value = '';
    num2.value = '';

    document.getElementById('operator').innerText = '+';
    document.getElementById('result').innerText = '';
}