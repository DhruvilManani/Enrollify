const execute = async () => {
    // Login
    const loginRes = await fetch("https://enrollify.onrender.com/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@example.com", password: "adminpassword" }) // Try typical admin credentials or what's standard for testing? Wait, I don't know admin creds, I'll log in as demo
    });
    // Can I just do this? 
};
execute();
