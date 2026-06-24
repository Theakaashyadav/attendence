const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyIHXjpRGSe0eQc-4NAwpD7k54yiNgQzF5o7m4qMBBKwMAxEyLJdFxKIYbUUB5_uRMI8A/exec";

async function saveToGoogleSheet(data) {
  try {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: formData
    });

    return await response.json();

  } catch (error) {
    console.error("Save Error:", error);

    return {
      success: false,
      message: "Google Sheet save failed"
    };
  }
}

async function getFromGoogleSheet(action, params = {}) {
  try {
    const query = new URLSearchParams();

    query.append("action", action);

    Object.keys(params).forEach(key => {
      query.append(key, params[key]);
    });

    const response = await fetch(`${GOOGLE_SCRIPT_URL}?${query.toString()}`);

    return await response.json();

  } catch (error) {
    console.error("Fetch Error:", error);

    return {
      success: false,
      data: [],
      message: "Google Sheet fetch failed"
    };
  }
}