import { API_BASE } from "./config.js";

export const registerUserAPI = async (userData) => {
  const response = await fetch(`${API_BASE}/api/payment/enroll`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.msg || `Registration failed with status ${response.status}`);
  }

  return await response.json();
};

export const verifyPaymentAPI = async (verificationData) => {
  const response = await fetch(`${API_BASE}/api/payment/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(verificationData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.msg || `Verification failed with status ${response.status}`);
  }

  return await response.json();
};
