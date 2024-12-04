const fs = require('fs');
const path = require('path');

// Function to load test data from a JSON file
function loadData(fileName) {
  // Resolve the path to the 'data' folder in the project root
  const dataPath = path.resolve(__dirname, `../data/${fileName}`);
  
  // Check if the file exists before reading it
  if (!fs.existsSync(dataPath)) {
    throw new Error(`File not found: ${dataPath}`);
  }

  // Read and parse the data
  const data = fs.readFileSync(dataPath, 'utf8');
  const parsedData = JSON.parse(data);

  return parsedData;
}

module.exports = { loadData };
