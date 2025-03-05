const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const assert = require('assert');

// Helper function to create a base test setup
function createBaseTest(testName) {
    // Create screenshots directory if it doesn't exist
    if (!fs.existsSync('./screenshots')) {
        fs.mkdirSync('./screenshots');
    }

    // Return an object with setup and teardown functions
    return {
        setup: async function() {
            const options = new chrome.Options();
            options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');

            const driver = await new Builder()
                .forBrowser('chrome')
                .setChromeOptions(options)
                .build();

            return driver;
        },
        teardown: async function(driver, testName) {
            if (driver) {
                // Take a screenshot
                const safeName = testName.replace(/\s+/g, '_').toLowerCase();
                const encodedString = await driver.takeScreenshot();
                await fs.writeFileSync(`./screenshots/${safeName}.png`, encodedString, 'base64');

                // Close the browser
                await driver.quit();
            }
        }
    };
}

// Negative Numbers Subtraction Test
describe('Negative Numbers Subtraction Test', function() {
    this.timeout(30000);
    let driver;
    const baseTest = createBaseTest('Negative Numbers Subtraction Test');

    beforeEach(async function() {
        driver = await baseTest.setup();
    });

    afterEach(async function() {
        await baseTest.teardown(driver, this.currentTest.title);
    });

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

// Zero Input Subtraction Test
describe('Zero Input Subtraction Test', function() {
    this.timeout(30000);
    let driver;
    const baseTest = createBaseTest('Zero Input Subtraction Test');

    beforeEach(async function() {
        driver = await baseTest.setup();
    });

    afterEach(async function() {
        await baseTest.teardown(driver, this.currentTest.title);
    });

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

// Positive Numbers Subtraction Test
describe('Positive Numbers Subtraction Test', function() {
    this.timeout(30000);
    let driver;
    const baseTest = createBaseTest('Positive Numbers Subtraction Test');

    beforeEach(async function() {
        driver = await baseTest.setup();
    });

    afterEach(async function() {
        await baseTest.teardown(driver, this.currentTest.title);
    });

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

// Decimal Numbers Subtraction Test
describe('Decimal Numbers Subtraction Test', function() {
    this.timeout(30000);
    let driver;
    const baseTest = createBaseTest('Decimal Numbers Subtraction Test');

    beforeEach(async function() {
        driver = await baseTest.setup();
    });

    afterEach(async function() {
        await baseTest.teardown(driver, this.currentTest.title);
    });

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

// Large Numbers Subtraction Test
describe('Large Numbers Subtraction Test', function() {
    this.timeout(30000);
    let driver;
    const baseTest = createBaseTest('Large Numbers Subtraction Test');

    beforeEach(async function() {
        driver = await baseTest.setup();
    });

    afterEach(async function() {
        await baseTest.teardown(driver, this.currentTest.title);
    });

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

// Reset Functionality Test
describe('Reset Functionality Test', function() {
    this.timeout(30000);
    let driver;
    const baseTest = createBaseTest('Reset Functionality Test');

    beforeEach(async function() {
        driver = await baseTest.setup();
    });

    afterEach(async function() {
        await baseTest.teardown(driver, this.currentTest.title);
    });

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

// Addition Test
describe('Addition Test', function() {
    this.timeout(30000);
    let driver;
    const baseTest = createBaseTest('Addition Test');

    beforeEach(async function() {
        driver = await baseTest.setup();
    });

    afterEach(async function() {
        await baseTest.teardown(driver, this.currentTest.title);
    });

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