document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".inmidcon");
  cards.forEach((card) => {
    let code = card.classList.contains("icecon")
      ? "iceland"
      : card.classList.contains("fincon")
        ? "finland"
        : card.classList.contains("swecon")
          ? "sweden"
          : "norway";

    card.addEventListener("mouseenter", () => {
      window.parent.document.body.classList.add(`iframe-hover-${code}`);
    });
    card.addEventListener("mouseleave", () => {
      window.parent.document.body.classList.remove(`iframe-hover-${code}`);
    });
  });
});
