const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Change these details for yourself
const FULL_NAME = "john_doe";
const DOB = "17091999"; // ddmmyyyy
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// Utility function: alternating caps reverse
function alternatingCapsReverse(str) {
  let reversed = str.split("").reverse().join("");
  let result = "";
  for (let i = 0; i < reversed.length; i++) {
    result += i % 2 === 0 ? reversed[i].toUpperCase() : reversed[i].toLowerCase();
  }
  return result;
}

app.post("/bfhl", (req, res) => {
  try {
    let { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input format. 'data' must be an array",
      });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach((item) => {
      if (/^\d+$/.test(item)) {
        // It's a number
        let num = parseInt(item);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // It's an alphabet string
        alphabets.push(item.toUpperCase());
      } else {
        // Special characters
        special_characters.push(item);
      }
    });

    // Concatenation of alphabets in reverse alternating caps
    let concat_string = alternatingCapsReverse(alphabets.join(""));

    res.json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("BFHL API is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Serve a simple HTML form for testing
app.get("/test", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>BFHL API Test</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        input, textarea { width: 300px; padding: 8px; margin: 5px 0; }
        button { padding: 8px 15px; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
      </style>
    </head>
    <body>
      <h2>Test BFHL API</h2>
      <form id="apiForm">
        <label>Enter array (comma separated):</label><br>
        <input type="text" id="data" placeholder='Example: a,1,334,4,R,$' /><br><br>
        <button type="submit">Submit</button>
      </form>
      <h3>Response:</h3>
      <pre id="response"></pre>

      <script>
        const form = document.getElementById("apiForm");
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const input = document.getElementById("data").value.split(",").map(s => s.trim());
          const res = await fetch("/bfhl", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: input })
          });
          const json = await res.json();
          document.getElementById("response").textContent = JSON.stringify(json, null, 2);
        });
      </script>
    </body>
    </html>
  `);
});

