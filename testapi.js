const https = require('https');

// Test data
const email = "demo@example.com";
const password = "password123";

async function runTest() {
  console.log("Creating user...");
  try {
    const signupRes = await fetch("https://enrollify.onrender.com/users/registers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: "Demo",
        lastname: "Test",
        gender: "male",
        role: "client",
        phone: "1234567890",
        email: email,
        password: password,
        confirmPassword: password
      })
    });
    console.log("Signup:", signupRes.status);
    
    // Login
    const loginRes = await fetch("https://enrollify.onrender.com/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    
    const loginData = await loginRes.json();
    console.log("Login Token:", loginData.token ? "FOUND" : "NOT FOUND (Response: " + JSON.stringify(loginData) + ")");
    
    if (!loginData.token) return;
    
    // Test Webinar API
    const createRes = await fetch("https://enrollify.onrender.com/api/webinars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginData.token}`
      },
      body: JSON.stringify({
        title: "Test API",
        description: "Testing token format",
        price: "0"
      })
    });
    
    console.log("Create Webinar Status (Bearer format):", createRes.status);
    
    if(createRes.status === 401) {
      console.log("Testing with x-auth-token instead...");
      const retryRes = await fetch("https://enrollify.onrender.com/api/webinars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": loginData.token, // Some backends use this
          "token": loginData.token
        },
        body: JSON.stringify({ title: "Test API 2" })
      });
      console.log("Retry Status:", retryRes.status);
      console.log("Retry body:", await retryRes.text());
    } else {
        console.log("Success with Bearer, body:", await createRes.text());
    }
  } catch(e) {
    console.error(e);
  }
}

runTest();
