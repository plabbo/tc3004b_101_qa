function calculate(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    let result;
    
    if (operation === 'add') {
        result = num1 + num2;
        document.getElementById('operator').innerText = "+";
    } else if (operation === 'subtract') {
        result = num1 - num2;
        document.getElementById('operator').innerText = "-";
    }

    document.getElementById('result').innerText = "Result: " + result;
}

function resetFields(){
    const num1 = document.getElementById('num1');
    const num2 = document.getElementById('num2');

    num1.value = '';
    num2.value = '';

    document.getElementById('operator').innerText = '+';
    document.getElementById('result').innerText = '';
}