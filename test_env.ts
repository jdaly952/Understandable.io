console.log("Key from container env:", process.env.GEMINI_API_KEY ? (process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY" ? "PLACEHOLDER" : "EXISTS") : "MISSING");
