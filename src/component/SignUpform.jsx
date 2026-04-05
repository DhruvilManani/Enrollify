import React, { useState, useRef } from "react";
import "./SignUpform.css";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api/config.js";

function SignUpform() {
  const [isSignup, setIsSignup] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const navigate = useNavigate();

  const otpRefs = useRef([]);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    role: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: ["", "", "", "", "", ""],
    newPassword: "",
    confirmNewPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ===== ENTER TO NEXT FOCUS HANDLER =====
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const form = e.target.form;
      if (!form) return;
      const index = Array.from(form.elements).indexOf(e.target);
      if (index > -1 && index < form.elements.length - 1) {
        e.preventDefault();
        let nextIndex = index + 1;
        // Skip buttons that aren't submit, hidden inputs, etc.
        while (nextIndex < form.elements.length && 
              (form.elements[nextIndex].tagName === "BUTTON" && form.elements[nextIndex].type !== "submit" || 
               form.elements[nextIndex].type === "hidden" || 
               form.elements[nextIndex].disabled)) {
          nextIndex++;
        }
        if (form.elements[nextIndex]) form.elements[nextIndex].focus();
      }
    }
  };

  // ===== INPUT HANDLER =====
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  // ===== OTP HANDLERS =====
  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    const newOtp = [...data.otp];

    if (value.length > 1) {
      value.split("").slice(0, 6).forEach((d, i) => (newOtp[i] = d));
      setData({ ...data, otp: newOtp });
      otpRefs.current[5]?.focus();
      return;
    }

    newOtp[index] = value;
    setData({ ...data, otp: newOtp });

    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !data.otp[index] && index > 0) {
      const newOtp = [...data.otp];
      newOtp[index - 1] = "";
      setData({ ...data, otp: newOtp });
      otpRefs.current[index - 1]?.focus();
    }
  };


  const handleSignup = async () => {
    if (!data.firstName || !data.lastName || !data.gender || !data.role || !data.phone || !data.email || !data.password || !data.confirmPassword) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/users/registers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: data.firstName,
          lastname: data.lastName,
          gender: data.gender.toLowerCase(),
          role: data.role, // Selection value is already "client" or "user"
          phone: data.phone,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword
        }),
      });

      console.log("--- Signup Payload ---", {
        firstname: data.firstName,
        lastname: data.lastName,
        gender: data.gender.toLowerCase(),
        role: data.role,
        phone: data.phone,
        email: data.email,
        password: "***"
      });

      if (response.ok) {
        setIsSignup(false);
        setIsLoading(false);
        return;
      } else {
        const errorData = await response.json().catch(() => ({}));
        setErrorMsg(errorData.message || "Signup failed. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMsg("Unable to connect to server. Please try again.");
      setIsLoading(false);
    }
  };


  // ===== SIGN IN =====
  const handleSignin = async () => {
    if (!data.email || !data.password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        // Store token FIRST (ProtectedRoute checks this)
        if (result.token) {
          localStorage.setItem("token", result.token);
        }

        localStorage.setItem("loggedInUser", data.email);
        const fetchedName = result.user?.firstname
          ? `${result.user.firstname} ${result.user.lastname || ''}`
          : result.firstname
              ? `${result.firstname} ${result.lastname || ''}`
              : result.fullname || data.email.split('@')[0];
        localStorage.setItem("userName", fetchedName.trim());

        // Store user details for use across the app (e.g. webinar registration)
        if (result.user) {
          localStorage.setItem("userData", JSON.stringify({
            id: result.user._id || result.user.id,
            firstname: result.user.firstname,
            lastname: result.user.lastname || "",
            email: result.user.email,
            phone: result.user.phone || ""
          }));
        }

        setIsLoading(false);
        navigate("/dashboard");
        return;
      } else {
        const errorData = await response.json().catch(() => ({}));
        setErrorMsg(errorData.message || "Incorrect email or password.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Signin error:", error);
      setErrorMsg("Unable to connect to server. Please try again.");
      setIsLoading(false);
    }
  };


  // ===== FORGOT PASSWORD =====
  const handleForgotPassword = async () => {
    if (!data.email) {
      setErrorMsg("Please enter your registered email.");
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/password/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      if (response.ok) {
        // Alert removed: OTP sent to your email
        setOtpStep(true);
        setIsLoading(false);
        return;
      } else {
        const errorData = await response.json().catch(() => ({}));
        setErrorMsg(errorData.message || "Failed to send OTP. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      // Alert removed: Something went wrong. Please try again later.
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/password/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      if (response.ok) {
        // Alert removed: OTP resent successfully!
        return;
      }
    } catch (error) {
      console.error("Resend OTP Error:", error);
    }
    // Removed demo alert
  };

  const handleResetPassword = async () => {
    if (data.otp.includes("")) {
      setErrorMsg("Please enter the complete OTP.");
      return;
    }

    if (!data.newPassword || !data.confirmNewPassword) {
      setErrorMsg("Please fill in both password fields.");
      return;
    }

    if (data.newPassword !== data.confirmNewPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    const otpString = data.otp.join("");

    try {
      // Verify OTP first
      const verifyRes = await fetch(`${API_BASE}/api/password/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, otp: otpString }),
      });

      // Then attempt to reset password
      const response = await fetch(`${API_BASE}/api/password/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          otp: otpString,
          newPassword: data.newPassword,
          confirmPassword: data.confirmNewPassword
        }),
      });

      if (response.ok && verifyRes.ok) {
        // Alert removed: Password reset successful
        setForgot(false);
        setOtpStep(false);
        setIsLoading(false);
        return;
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.warn("Reset Error: ", errorData.message || "Invalid OTP or Reset Failed");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      // Alert removed: Something went wrong during reset.
      setIsLoading(false);
    }
  };


  return (
    <div className="auth-wrapper">
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()} className="auth-card">
        <div className="auth-logo-container">
          <img src="/logo.png" alt="Enrollify" className="auth-logo" />
        </div>

        {errorMsg && (
          <div style={{ color: "#ef4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", padding: "10px", borderRadius: "8px", marginBottom: "15px", fontSize: "13px", fontWeight: "600", textAlign: "center" }}>
            {errorMsg}
          </div>
        )}

        {/* SIGN IN */}
        {!isSignup && !forgot && (
          <>
            <input type="email" name="email" value={data.email} placeholder="Email" onChange={handleChange} onKeyDown={handleKeyDown} autoComplete="off" />
            <input type="password" name="password" value={data.password} placeholder="Password" onChange={handleChange} onKeyDown={handleKeyDown} autoComplete="new-password" />
            <button type="submit" onClick={handleSignin} disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="links">
              <span onClick={() => setIsSignup(true)}>Create Account</span>
              <span onClick={() => setForgot(true)}>Forgot Password?</span>
            </div>
          </>
        )}



        {/* SIGN UP */}
        {isSignup && (
          <>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" name="firstName" value={data.firstName} placeholder="First Name" onChange={handleChange} onKeyDown={handleKeyDown} style={{ width: '50%' }} autoComplete="disabled" />
              <input type="text" name="lastName" value={data.lastName} placeholder="Last Name" onChange={handleChange} onKeyDown={handleKeyDown} style={{ width: '50%' }} autoComplete="disabled" />
            </div>
            <select name="gender" value={data.gender} onChange={handleChange} onKeyDown={handleKeyDown} autoComplete="off">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select name="role" value={data.role} onChange={handleChange} onKeyDown={handleKeyDown} autoComplete="off">
              <option value="">Select Role</option>
              <option value="client">Client</option>
              <option value="user">User</option>
            </select>
            <input type="tel" name="phone" value={data.phone} placeholder="Phone Number" onChange={handleChange} onKeyDown={handleKeyDown} autoComplete="off" />
            <input type="email" name="email" value={data.email} placeholder="Email" onChange={handleChange} onKeyDown={handleKeyDown} autoComplete="off" />
            <input type="password" name="password" value={data.password} placeholder="Password" onChange={handleChange} onKeyDown={handleKeyDown} autoComplete="new-password" />
            <input type="password" name="confirmPassword" value={data.confirmPassword} placeholder="Confirm Password" onChange={handleChange} onKeyDown={handleKeyDown} autoComplete="new-password" />
            <button type="submit" onClick={handleSignup} disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
            <div className="links">
              <span onClick={() => setIsSignup(false)}>Back to Sign In</span>
            </div>
          </>
        )}

        {/* FORGOT PASSWORD */}
        {forgot && !otpStep && (
          <>
            <input type="email" name="email" value={data.email} placeholder="Registered Email" onChange={handleChange} onKeyDown={handleKeyDown} autoComplete="off" />
            <button type="submit" onClick={handleForgotPassword} disabled={isLoading}>
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
            <div className="links">
              <span onClick={() => setForgot(false)}>Back</span>
            </div>
          </>
        )}

        {/* OTP */}
        {forgot && otpStep && (
          <>
            <p className="otp-text">Enter 6-digit OTP</p>
            <div className="otp-box">
              {data.otp.map((d, i) => (
                <input
                  key={i}
                  maxLength="1"
                  value={d}
                  ref={(el) => (otpRefs.current[i] = el)}
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => {
                    handleOtpKeyDown(e, i);
                    if (e.key === "Enter") handleKeyDown(e);
                  }} />
              ))}
            </div>

            <input type="password" name="newPassword" value={data.newPassword} placeholder="New Password" onChange={handleChange} onKeyDown={handleKeyDown} autoComplete="new-password" />
            <input type="password" name="confirmNewPassword" value={data.confirmNewPassword} placeholder="Confirm New Password" onChange={handleChange} onKeyDown={handleKeyDown} autoComplete="new-password" />
            <button type="submit" onClick={handleResetPassword} disabled={isLoading}>
              {isLoading ? 'Verifying OTP...' : 'Reset Password'}
            </button>
            <div className="links">
              <span onClick={handleResendOtp}>Resend OTP</span>
              <span onClick={() => setOtpStep(false)}>Back</span>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default SignUpform;