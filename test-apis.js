const execute = async () => {
    // Login
    const loginRes = await fetch("https://enrollify.onrender.com/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "demo@example.com", password: "password" })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    if (!token) return console.log("Login failed");

    const get = async (url) => {
        const res = await fetch(url, { headers: { "Authorization": `Bearer ${token}` } });
        if (!res.ok) return `HTTP Error ${res.status}`;
        try { return await res.json(); } catch(e) { return "Parse Error"; }
    };

    console.log("--- Dashboard ---");
    console.log(await get("https://enrollify.onrender.com/api/client/dashboard"));
    console.log("--- Webinar Stats ---");
    console.log(await get("https://enrollify.onrender.com/api/client/webinar-stats"));
    console.log("--- Analytics ---");
    console.log(await get("https://enrollify.onrender.com/api/client/analytics"));
    console.log("--- Subscription ---");
    console.log(await get("https://enrollify.onrender.com/api/client/subscription"));
};
execute();
