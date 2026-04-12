const iframe = document.querySelector('iframe[name="incontent"]');
const footerText = document.querySelector(".end p");
let clockInterval;
const API_KEY = "f60b30681c1e40ec8ed41b55e7a9311e";

const countryConfig = {
  "iceland.html": {
    name: "Iceland",
    tz: "Atlantic/Reykjavik",
    city: "Reykjavik",
    lat: 64.1355,
    lon: -21.8954
  },
  "finland.html": { name: "Finland", tz: "Europe/Helsinki", city: "Helsinki", lat: 60.1695, lon: 24.9354 },
  "sweden.html": { name: "Sweden", tz: "Europe/Stockholm", city: "Stockholm", lat: 59.3293, lon: 18.0686 },
  "norway.html": { name: "Norway", tz: "Europe/Oslo", city: "Oslo", lat: 59.9139, lon: 10.7522 },
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
            `https://api.openweathermap.org/data/3.0/onecall?lat=${data.lat}&lon=${data.lon}&units=metric&appid=${API_KEY}`
          );
          const wData = await res.json();

          if (res.ok && wData.current) {
            weatherHTML = `${Math.round(wData.current.temp)}°C`;
          } else {
            weatherHTML = "Offline";
          }
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
