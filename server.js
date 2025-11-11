import express from "express";
import cors from "cors";
import fetch from "node-fetch";

// Initialize Express app
const app = express();
// Enable CORS for all routes
app.use(cors());
// Parse incoming JSON payloads
app.use(express.json());
// Serve static files from the current directory (optional, but kept for completeness)
app.use(express.static("."));

// **IMPORTANT: Your Hugging Face Token (You MUST verify this token is valid and has 'Inference Providers' permissions)**
// If the authentication error persists, you must replace this with a new token from your HF profile.
const HF_TOKEN = "";
// The specific model ID you are targeting
const MODEL_ID = "meta-llama/Llama-3.1-8B-Instruct";

// *** CORRECT ENDPOINT: Using the official OpenAI compatible path for the router (Chat Completions) ***
const HF_ROUTER_URL = "https://router.huggingface.co/v1/chat/completions"; 

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required in the request body." });
  }
  
  console.log(`➡️ Received prompt: ${prompt.substring(0, 50)}...`);
  // Log the specific, fixed URL that must be used now.
  console.log(`📡 Calling CORRECT endpoint: ${HF_ROUTER_URL}`);

  try {
    const response = await fetch(
      HF_ROUTER_URL, 
      {
        method: "POST",
        headers: {
          // HF token acts as the API key in the OpenAI compatibility layer
          Authorization: `Bearer ${HF_TOKEN}`, 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          model: MODEL_ID, // Model ID is passed in the body payload
          messages: [
            // Prompt must be wrapped in the 'messages' array for this endpoint
            { role: "user", content: prompt } 
          ],
          // OpenAI compatible parameters (using 'max_tokens' instead of 'max_new_tokens')
          max_tokens: 512, 
          // Removed 'do_sample: true' as it is not a supported parameter for this endpoint.
          // Sampling is still enabled by the non-zero 'temperature'.
          temperature: 0.8
        }),
      }
    );

    // Read the response as text first
    const text = await response.text();
    let errorData = { error: `Hugging Face API failed with status ${response.status}`, details: text };

    if (!response.ok) {
        // Attempt to parse error data for clearer messaging
        try {
            errorData = JSON.parse(text);
        } catch (e) {
            // keep default errorData
        }
        
        console.error(`❌ Hugging Face API Error (${response.status}):`, errorData);

        // *** CRITICAL CHECK: AUTHENTICATION FAILURE ***
        if (response.status === 401 || (errorData.error && /Invalid username or password/i.test(errorData.error))) {
             // If this message appears, you must generate a new HF token or ensure the existing one has the correct permissions.
             return res.status(401).json({ error: "Authentication Failed", details: "The provided Hugging Face token is invalid or lacks 'Inference Providers' permissions. Please verify your token." });
        }
        
        return res.status(response.status).json(errorData);
    }


    let data;
    try {
      // Attempt to parse the successful response
      data = JSON.parse(text);
    } catch {
      console.error("❌ Non-JSON response on success:", text);
      return res.status(500).json({ error: "Received unexpected non-JSON response from API." });
    }

    // OpenAI compatibility response structure: choices -> message -> content
    const generated_text = data.choices?.[0]?.message?.content;
    
    if (!generated_text) {
         console.error("❌ Generated text missing from response:", data);
         return res.status(500).json({ error: "API returned success but missing generated text payload.", fullResponse: data });
    }
      
    console.log("✅ Successfully generated text.");

    // Send the extracted text back to the client
    res.json({ generated_text });

  } catch (error) {
    console.error("❌ Backend error during fetch:", error);
    // Use a generic 500 for network/server-side errors
    res.status(500).json({ error: "Something went wrong with the server-side API call." });
  }
});

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);