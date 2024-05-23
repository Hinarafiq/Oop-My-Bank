#! /usr/bin/env node
import inquirer from "inquirer";
class BankAccount {
    accountNumber;
    bankBalance;
    constructor(accountNumber, bankBalance) {
        this.accountNumber = accountNumber;
        this.bankBalance = bankBalance;
    }
    withDraw(amount) {
        if (this.bankBalance >= amount) {
            this.bankBalance -= amount;
            console.log(`Withdrawal of $${amount} successfully.Remaining balance : $${this.bankBalance}.`);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.bankBalance += amount;
        console.log(`Deposit of $${amount} successfully.Remaining balance : $${this.bankBalance}.`);
    }
    checkBalance() {
        console.log(`Current balance $${this.bankBalance}.`);
    }
}
class Customers {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
const accounts = [
    new BankAccount(2025, 600),
    new BankAccount(2024, 1000),
    new BankAccount(2023, 1500)
];
const customer = [
    new Customers("Arbeen", "Haroon", "Female", 22, 3141138914, accounts[0]),
    new Customers("Alishba", "Nazim", "Female", 19, 3141131285, accounts[1]),
    new Customers("Zavian", "Khan", "Male", 25, 3141132791, accounts[2])
];
async function sevice() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const Customers = customer.find(Customers => Customers.account.accountNumber === accountNumberInput.accountNumber);
        if (Customers) {
            console.log(`Welcome,${Customers.firstName} ${Customers.lastName}!\n`);
            const answer = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select your service",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }
            ]);
            switch (answer.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount for deposit:"
                    });
                    Customers.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    });
                    Customers.account.withDraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    Customers.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting the bank program");
                    console.log("\n Thank you for using our services. Have a good day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please enter valid account number.");
        }
    } while (true);
}
sevice();
