<script>
  document.getElementById("lang-btn").addEventListener("click", function () {
    const btn = this;
    const elements = document.querySelectorAll("[data-en]");

    if (btn.innerText === "Switch to Hindi") {
      btn.innerText = "Switch to English";
      elements.forEach(el => {
        el.innerText = el.getAttribute("data-hi");
      });
    } else {
      btn.innerText = "Switch to Hindi";
      elements.forEach(el => {
        el.innerText = el.getAttribute("data-en");
      });
    }
  });
</script>
