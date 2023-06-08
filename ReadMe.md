# Balance Sheet Generator

This is a Node.js application that generates a balance sheet from revenue and expense data provided in a JSON format. The balance sheet is calculated month-wise, taking into account the revenue and expense amounts for each month.

## How it Works

The application takes an input JSON file containing the revenue and expense data. It then processes the data and generates the balance sheet. The balance for each month is calculated by subtracting the total expense amount from the total revenue amount.

The application follows the following steps to generate the balance sheet:

1. Read the input JSON file containing the revenue and expense data.
2. Parse the JSON data and extract the revenue and expense entries.
3. Group the revenue and expense entries by month.
4. Calculate the balance for each month by summing the revenue and expense amounts.
5. Sort the balance sheet in ascending order by timestamp (start date).
6. Generate the output JSON file containing the balance sheet.

## Usage

1. Make sure you have Node.js installed on your machine.
2. Clone this repository to your local machine.
3. Navigate to the project directory in your terminal.
4. Install the dependencies by running the following command:

   ```shell
   npm install
 5.Prepare your input data by creating a JSON. Let's assume you saved it as input.json in the project directory.
 6.Now run node app by running the command


   ```shell
   node .\balancesheet.js
   ```
   
 7.Once the execution is complete, a new file named output.json will be created in the project directory. This file will contain the generated balance sheet.



