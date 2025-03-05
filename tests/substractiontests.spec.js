// 1. Negative Numbers Subtraction Test
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const assert = require('assert');

// Helper function to create a base test setup
function createBaseTest(testName) {
    describe(testName, function() {
        this.timeout(30000);
        let driver;

        // Create screenshots directory if it doesn't exist
        if (!fs.existsSync('./screenshots')) {
            fs.mkdirSync('./screenshots');
        }

        beforeEach(async function() {
            const options = new chrome.Options();
            options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');

            driver = await new Builder()
                .forBrowser('chrome')
                .setChromeOptions(options)
                .build();
        });

        afterEach(async function () {
            if (driver) {
                // Take a screenshot
                const safeName = testName.replace(/\s+/g, '_').toLowerCase();
                const encodedString = await driver.takeScreenshot();
                await fs.writeFileSync(`./screenshots/${safeName}.png`, encodedString, 'base64');

                // Close the browser
                await driver.quit();
            }
        });

        return { driver, fs };
    });
}

// 1. Negative Numbers Subtraction Test
describe('Negative Numbers Subtraction Test', function() {
    const { driver, fs } = createBaseTest('Negative Numbers Subtraction Test');

    it('Subtracts negative numbers correctly', async function() {
        await driver.get("http://localhost:8000/");
        await driver.manage().window().setRect({ width: 1366, height: 702 });

        const num1Input = await driver.findElement(By.id("num1"));
        const num2Input = await driver.findElement(By.id("num2"));
        const subtractButton = await driver.findElement(By.xpath("//button[text()='Subtraction']"));
        const resultDisplay = await driver.findElement(By.id("result"));
        const operatorDisplay = await driver.findElement(By.id("operator"));

        await num1Input.sendKeys("-1");
        await num2Input.sendKeys("-1");
        await subtractButton.click();

        await driver.wait(until.elementTextContains(resultDisplay, "Result: 0"), 2000);
        const resultText = await resultDisplay.getText();
        const operatorText = await operatorDisplay.getText();
        
        assert.strictEqual(resultText, "Result: 0", "Subtraction of -1 and -1 should result in 0");
        assert.strictEqual(operatorText, "-", "Operator should change to '-'");
    });
});

// 2. Zero Input Test
describe('Zero Input Subtraction Test', function() {
    const { driver, fs } = createBaseTest('Zero Input Subtraction Test');

    it('Handles zero inputs in subtraction', async function() {
        await driver.get("http://localhost:8000/");
        await driver.manage().window().setRect({ width: 1366, height: 702 });

        const num1Input = await driver.findElement(By.id("num1"));
        const num2Input = await driver.findElement(By.id("num2"));
        const subtractButton = await driver.findElement(By.xpath("//button[text()='Subtraction']"));
        const resultDisplay = await driver.findElement(By.id("result"));

        await num1Input.sendKeys("0");
        await num2Input.sendKeys("0");
        await subtractButton.click();

        await driver.wait(until.elementTextContains(resultDisplay, "Result: 0"), 2000);
        const resultText = await resultDisplay.getText();
        
        assert.strictEqual(resultText, "Result: 0", "Subtraction of 0 and 0 should result in 0");
    });
});

// 3. Positive Numbers Subtraction Test
describe('Positive Numbers Subtraction Test', function() {
    const { driver, fs } = createBaseTest('Positive Numbers Subtraction Test');

    it('Subtracts positive numbers correctly', async function() {
        await driver.get("http://localhost:8000/");
        await driver.manage().window().setRect({ width: 1366, height: 702 });

        const num1Input = await driver.findElement(By.id("num1"));
        const num2Input = await driver.findElement(By.id("num2"));
        const subtractButton = await driver.findElement(By.xpath("//button[text()='Subtraction']"));
        const resultDisplay = await driver.findElement(By.id("result"));

        await num1Input.sendKeys("10");
        await num2Input.sendKeys("5");
        await subtractButton.click();

        await driver.wait(until.elementTextContains(resultDisplay, "Result: 5"), 2000);
        const resultText = await resultDisplay.getText();
        
        assert.strictEqual(resultText, "Result: 5", "Subtraction of 10 and 5 should result in 5");
    });
});

// 4. Decimal Numbers Subtraction Test
describe('Decimal Numbers Subtraction Test', function() {
    const { driver, fs } = createBaseTest('Decimal Numbers Subtraction Test');

    it('Subtracts decimal numbers correctly', async function() {
        await driver.get("http://localhost:8000/");
        await driver.manage().window().setRect({ width: 1366, height: 702 });

        const num1Input = await driver.findElement(By.id("num1"));
        const num2Input = await driver.findElement(By.id("num2"));
        const subtractButton = await driver.findElement(By.xpath("//button[text()='Subtraction']"));
        const resultDisplay = await driver.findElement(By.id("result"));

        await num1Input.sendKeys("10.5");
        await num2Input.sendKeys("5.2");
        await subtractButton.click();

        await driver.wait(until.elementTextContains(resultDisplay, "Result: 5.3"), 2000);
        const resultText = await resultDisplay.getText();
        
        assert.strictEqual(resultText, "Result: 5.3", "Subtraction of 10.5 and 5.2 should result in 5.3");
    });
});

// 5. Large Numbers Subtraction Test
describe('Large Numbers Subtraction Test', function() {
    const { driver, fs } = createBaseTest('Large Numbers Subtraction Test');

    it('Subtracts large numbers correctly', async function() {
        await driver.get("http://localhost:8000/");
        await driver.manage().window().setRect({ width: 1366, height: 702 });

        const num1Input = await driver.findElement(By.id("num1"));
        const num2Input = await driver.findElement(By.id("num2"));
        const subtractButton = await driver.findElement(By.xpath("//button[text()='Subtraction']"));
        const resultDisplay = await driver.findElement(By.id("result"));

        await num1Input.sendKeys("1000000");
        await num2Input.sendKeys("500000");
        await subtractButton.click();

        await driver.wait(until.elementTextContains(resultDisplay, "Result: 500000"), 2000);
        const resultText = await resultDisplay.getText();
        
        assert.strictEqual(resultText, "Result: 500000", "Subtraction of large numbers should work");
    });
});

// 6. Reset Functionality Test
describe('Reset Functionality Test', function() {
    const { driver, fs } = createBaseTest('Reset Functionality Test');

    it('Resets calculator fields', async function() {
        await driver.get("http://localhost:8000/");
        await driver.manage().window().setRect({ width: 1366, height: 702 });

        const num1Input = await driver.findElement(By.id("num1"));
        const num2Input = await driver.findElement(By.id("num2"));
        const subtractButton = await driver.findElement(By.xpath("//button[text()='Subtraction']"));
        const resetButton = await driver.findElement(By.xpath("//button[text()='Reset']"));
        const resultDisplay = await driver.findElement(By.id("result"));
        const operatorDisplay = await driver.findElement(By.id("operator"));

        await num1Input.sendKeys("10");
        await num2Input.sendKeys("5");
        await subtractButton.click();

        await driver.wait(until.elementTextContains(resultDisplay, "Result: 5"), 2000);
        await resetButton.click();

        const num1Value = await num1Input.getAttribute('value');
        const num2Value = await num2Input.getAttribute('value');
        const resultText = await resultDisplay.getText();
        const operatorText = await operatorDisplay.getText();

        assert.strictEqual(num1Value, "", "First input should be cleared");
        assert.strictEqual(num2Value, "", "Second input should be cleared");
        assert.strictEqual(resultText, "", "Result should be cleared");
        assert.strictEqual(operatorText, "+", "Operator should reset to '+'");
    });
});

// 7. Addition Test
describe('Addition Test', function() {
    const { driver, fs } = createBaseTest('Addition Test');

    it('Performs addition correctly', async function() {
        await driver.get("http://localhost:8000/");
        await driver.manage().window().setRect({ width: 1366, height: 702 });

        const num1Input = await driver.findElement(By.id("num1"));
        const num2Input = await driver.findElement(By.id("num2"));
        const addButton = await driver.findElement(By.xpath("//button[text()='Addition']"));
        const resultDisplay = await driver.findElement(By.id("result"));
        const operatorDisplay = await driver.findElement(By.id("operator"));

        await num1Input.sendKeys("10");
        await num2Input.sendKeys("5");
        await addButton.click();

        await driver.wait(until.elementTextContains(resultDisplay, "Result: 15"), 2000);
        const resultText = await resultDisplay.getText();
        const operatorText = await operatorDisplay.getText();

        assert.strictEqual(resultText, "Result: 15", "Addition of 10 and 5 should result in 15");
        assert.strictEqual(operatorText, "+", "Operator should show '+'");
    });
});