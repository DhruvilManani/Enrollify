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
    console.log("Login Token:", loginData.token ? "FOUND" : "NOT FOUND");
    
    if (!loginData.token) return;
    
    // Test Dashboard API
    const dashRes = await fetch("https://enrollify.onrender.com/api/client/dashboard", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${loginData.token}`,
        "x-auth-token": loginData.token,
        "token": loginData.token
      }
    });
    
    console.log("Dashboard Status:", dashRes.status);
    const dashData = await dashRes.json();
    console.log("Dashboard response:", JSON.stringify(dashData, null, 2));

    // Test webinar-stats API
    const statsRes = await fetch("https://enrollify.onrender.com/api/client/webinar-stats", {
      method: "GET", headers: { "Authorization": `Bearer ${loginData.token}` }
    });
    console.log("Webinar Stats:", await statsRes.json().catch(()=>"err"));

    // Test analytics API
    const analyticsRes = await fetch("https://enrollify.onrender.com/api/client/analytics", {
      method: "GET", headers: { "Authorization": `Bearer ${loginData.token}` }
    });
    console.log("Analytics:", await analyticsRes.json().catch(()=>"err"));

    // Test subscription API
    const subRes = await fetch("https://enrollify.onrender.com/api/client/subscription", {
      method: "GET", headers: { "Authorization": `Bearer ${loginData.token}` }
    });
    console.log("Subscription:", await subRes.json().catch(()=>"err"));
    
  } catch(e) {
    console.error(e);
  }
}

runTest();
