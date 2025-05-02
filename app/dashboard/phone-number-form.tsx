"use client";

import { getUserData, savePhoneNumber } from "@/actions/api";
import { useEffect, useState } from "react";

interface PhoneNumberFormProps {
  userEmail: string;
  accessToken: string;
  refreshToken: string;
}

export function PhoneNumberForm({
  userEmail,
  accessToken,
  refreshToken,
}: PhoneNumberFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [savedNumber, setSavedNumber] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchData = async () => {
      try {
        const userData = await getUserData(accessToken);
        if (userData.phoneNumber) {
          setSavedNumber(userData.phoneNumber);
          setPhoneNumber(userData.phoneNumber);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Validate phone number format (simple validation)
      const phoneRegex = /^\+?[1-9]\d{9,14}$/;
      if (!phoneRegex.test(phoneNumber)) {
        setMessage(
          "Please enter a valid phone number in international format (e.g., +1234567890)"
        );
        setLoading(false);
        return;
      }

      const response = await savePhoneNumber(
        accessToken,
        phoneNumber,
        userEmail,
        refreshToken
      );

      if (response) {
        setMessage("Phone number saved successfully!");
        setSavedNumber(phoneNumber);
      } else {
        setMessage("Error: Failed to save phone number");
      }
    } catch (error: any) {
      setMessage(
        `Error: ${error.message || "Could not connect to the server"}`
      );
      console.error("Error saving phone number:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number (International Format)</label>
        <input
          type="tel"
          id="phoneNumber"
          className="input"
          placeholder="+1234567890"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="button" disabled={loading}>
        {loading ? "Saving..." : "Save Phone Number"}
      </button>

      {message && (
        <p
          style={{
            color: message.includes("Error") ? "red" : "green",
            marginTop: "10px",
          }}
        >
          {message}
        </p>
      )}

      {savedNumber && (
        <p style={{ marginTop: "20px" }}>
          Your current phone number for call reminders:{" "}
          <strong>{savedNumber}</strong>
        </p>
      )}
    </form>
  );
}
