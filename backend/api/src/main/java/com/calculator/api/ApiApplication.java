package com.calculator.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class ApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }

}

@RestController
@CrossOrigin(origins = "*") // Enable CORS for all origins (for development)
class CalculatorController {

    @GetMapping("/api/add")
    public CalculationResult add(@RequestParam double num1, @RequestParam double num2) {
        double result = num1 + num2;
        return new CalculationResult(result);
    }

    @GetMapping("/api/subtract")
    public CalculationResult subtract(@RequestParam double num1, @RequestParam double num2) {
        double result = num1 - num2;
        return new CalculationResult(result);
    }
}

class CalculationResult {
    private double result;

    public CalculationResult(double result) {
        this.result = result;
    }

    // Getters and setters required for JSON serialization
    public double getResult() {
        return result;
    }

    public void setResult(double result) {
        this.result = result;
    }
}