export async function getUserData(accessToken: string) {
  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getUserData:", error);
    throw error;
  }
}
export async function savePhoneNumber(
  accessToken: string,
  phoneNumber: string,
  email: string,
  refreshToken: string
) {
  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/users/phone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ phoneNumber, email, refreshToken }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to save phone number");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in savePhoneNumber:", error);
    throw error;
  }
}
