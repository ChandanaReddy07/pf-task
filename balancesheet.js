const fs = require('fs');

const inputFile = 'input.json';
const outputFile = 'output.json';

// Read the input file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the input file:', err);
    return;
  }

  try {
    const inputData = JSON.parse(data);
    const { expenseData, revenueData } = inputData;

    // Group the expense and revenue data by month
    const expenseByMonth = groupByMonth(expenseData);
    const revenueByMonth = groupByMonth(revenueData);

    // Calculate the balance sheet
    const balanceSheet = calculateBalanceSheet(expenseByMonth, revenueByMonth);

    // Sort the balance sheet by timestamp
    balanceSheet.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    // Create the output object
    const outputData = { balance: balanceSheet };

    // Write the output to the file
    fs.writeFile(outputFile, JSON.stringify(outputData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing the output file:', err);
        return;
      }
      console.log('Output file generated successfully:', outputFile);
    });
  } catch (error) {
    console.error('Error parsing input data:', error);
  }
});

// Group the data by month
function groupByMonth(data) {
  const groupedData = {};

  data.forEach((entry) => {
    const monthYear = new Date(entry.startDate).toISOString().slice(0, 7); // Get the month and year (e.g., '2020-03')

    if (!groupedData[monthYear]) {
      groupedData[monthYear] = [];
    }

    groupedData[monthYear].push(entry);
  });

  return groupedData;
}

// Calculate the balance sheet
function calculateBalanceSheet(expenseByMonth, revenueByMonth) {
    const startMonth = getStartMonth(expenseByMonth, revenueByMonth);
    const endMonth = getEndMonth(expenseByMonth, revenueByMonth);
  
    const balanceSheet = [];
    let currentMonth = startMonth;
  
    while (currentMonth <= endMonth) {
      const revenueEntries = revenueByMonth[currentMonth] || [];
      const expenseEntries = expenseByMonth[currentMonth] || [];
  
      const totalRevenue = revenueEntries.reduce((sum, entry) => sum + entry.amount, 0);
      const totalExpense = expenseEntries.reduce((sum, entry) => sum + entry.amount, 0);
      const balance = totalRevenue - totalExpense;
  
      const balanceEntry = {
        amount: balance,
        startDate: new Date(currentMonth + '-01T00:00:00.000Z').toISOString(),
      };
  
      balanceSheet.push(balanceEntry);
  
      // Move to the next month
      currentMonth = getNextMonth(currentMonth);
    }
  
    return balanceSheet;
  }
  
  // Helper function to get the start month
  function getStartMonth(expenseByMonth, revenueByMonth) {
    const allMonths = [...Object.keys(expenseByMonth), ...Object.keys(revenueByMonth)];
    return allMonths.reduce((minMonth, month) => (month < minMonth ? month : minMonth));
  }
  
  // Helper function to get the end month
  function getEndMonth(expenseByMonth, revenueByMonth) {
    const allMonths = [...Object.keys(expenseByMonth), ...Object.keys(revenueByMonth)];
    return allMonths.reduce((maxMonth, month) => (month > maxMonth ? month : maxMonth));
  }
  
  // Helper function to get the next month
  function getNextMonth(month) {
    const date = new Date(month + '-01T00:00:00.000Z');
    date.setUTCMonth(date.getUTCMonth() + 1);
    return date.toISOString().substring(0, 7);
  }