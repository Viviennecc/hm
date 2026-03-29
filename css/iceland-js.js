// Button to scroll to target
const nextBtn = document.getElementById("nextBtn");
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    const target = document.getElementById("next-step");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

// Scroll effect for upward object
window.addEventListener("scroll", () => {
  const upwardObject = document.querySelector(".upward-object");
  if (upwardObject) {
    if (window.scrollY > 50) {
      upwardObject.style.opacity = 0;
    } else {
      upwardObject.style.opacity = 1;
    }
  }
});
