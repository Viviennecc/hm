const iframe = document.querySelector('iframe[name="incontent"]');
const footerText = document.querySelector(".end p");
let clockInterval;
const API_KEY = "f03eee1f0f50bbba36da7fc8b7f3313f";

const countryConfig = {
  "iceland.html": {
    name: "Iceland",
    tz: "Atlantic/Reykjavik",
    city: "Reykjavik",
  },
  "finland.html": { name: "Finland", tz: "Europe/Helsinki", city: "Helsinki" },
  "sweden.html": { name: "Sweden", tz: "Europe/Stockholm", city: "Stockholm" },
  "norway.html": { name: "Norway", tz: "Europe/Oslo", city: "Oslo" },
};

iframe.addEventListener("load", function () {
  clearInterval(clockInterval);
  try {
    const fileName = iframe.contentWindow.location.pathname.split("/").pop();
    const data = countryConfig[fileName];

    if (data) {
      const updateUI = async () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString("en-GB", {
          timeZone: data.tz,
          hour12: false,
        });
        const dateStr = now.toLocaleDateString("en-GB", {
          timeZone: data.tz,
          day: "2-digit",
          month: "long",
        });

        let weatherHTML = "...";
        try {
          const res = await fetch(
            `https://openweathermap.org{data.city}&units=metric&appid=${API_KEY}`,
          );
          const wData = await res.json();
          if (res.ok) weatherHTML = `${Math.round(wData.main.temp)}°C`;
        } catch (err) {
          weatherHTML = "Offline";
        }

        footerText.innerHTML = `<span id="footer-left">Welcome to ${data.name} | ${dateStr} ${timeStr} | ${weatherHTML}</span><span id="footer-right"></span>`;
      };
      updateUI();
      clockInterval = setInterval(updateUI, 1000);
    } else {
      footerText.innerHTML = `<span id="footer-left">Welcome to the Nordics</span><span id="footer-right"></span>`;
    }
  } catch (e) {
    console.warn("Access Restricted");
  }
});
