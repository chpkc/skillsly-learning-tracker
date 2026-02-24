
export const fetchSkillsReport = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    throw new Error("API URL is not configured. Check VITE_API_URL in .env");
  }

  try {
    const response = await fetch(`${apiUrl}/skills-report`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch skills report:", error);
    throw error;
  }
};
