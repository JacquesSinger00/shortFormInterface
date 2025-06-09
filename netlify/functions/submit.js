exports.handler = async (event) => {
    try {
      const data = JSON.parse(event.body);
  
      // Log it (you could also send this to Google Sheets API or a DB)
      console.log("Received data:", data);
  
      // Respond success
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow CORS
        },
        body: JSON.stringify({ message: "Success", received: data }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Something went wrong" }),
      };
    }
  };