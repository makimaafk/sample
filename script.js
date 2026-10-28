document.addEventListener("DOMContentLoaded", function () {
  const envelope = document.getElementById("envelope");
  const openBtn = document.getElementById("openBtn");
  const hint = document.getElementById("hint");
  const pages = Array.from(document.querySelectorAll(".page"));

  const gallery = document.getElementById("gallery");
  const photoGrid = document.getElementById("photoGrid");
  const photoViewer = document.getElementById("photoViewer");
  const largePhoto = document.getElementById("largePhoto");
  const photoCounter = document.getElementById("photoCounter");

  let currentPage = 0;
  let photoIndex = 0;

  function fillList(id, label) {
    const list = document.getElementById(id);
    if (!list || list.children.length > 0) return;

    for (let i = 1; i <= 18; i++) {
      const item = document.createElement("li");
      item.textContent = `${label} ${i}`;
      list.appendChild(item);
    }
  }

  fillList("treasures", "Treasure");
  fillList("gifts", "Gift");
  fillList("candles", "Candle");
  fillList("shots", "Shot");
  fillList("roses", "Rose");

  function showPage(index) {
    if (index < 0 || index >= pages.length) return;

    currentPage = index;

    pages.forEach((page, i) => {
      page.classList.toggle("active", i === index);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openInvitation() {
    if (envelope) envelope.classList.add("open");
    if (openBtn) openBtn.style.display = "none";
    if (hint) hint.textContent = "Your invitation is open!";
    showPage(0);
  }

  function changePage(direction) {
    showPage(currentPage + Number(direction));
  }

  function closeGallery() {
    if (!gallery) return;
    gallery.classList.remove("show");
    gallery.setAttribute("aria-hidden", "true");
  }

  function closePhoto() {
    if (!photoViewer) return;
    photoViewer.classList.remove("show");
    photoViewer.setAttribute("aria-hidden", "true");
  }

  function exitInvitation() {
    if (envelope) envelope.classList.remove("open");
    if (openBtn) openBtn.style.display = "";
    if (hint) hint.textContent = "Tap the button to open your invitation";
    showPage(0);
    closeGallery();
    closePhoto();
  }

  const photoURLs = Array.from({ length: 20 }, (_, i) =>
    `https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80&sig=${i}`
  );

  function updateLargePhoto() {
    if (!largePhoto) return;

    largePhoto.src = photoURLs[photoIndex];
    largePhoto.alt = `Birthday photo ${photoIndex + 1}`;

    if (photoCounter) {
      photoCounter.textContent =
        `${photoIndex + 1} / ${photoURLs.length}`;
    }
  }

  function showGallery() {
    if (!gallery) return;
    gallery.classList.add("show");
    gallery.setAttribute("aria-hidden", "false");
  }

  function movePhoto(direction) {
    photoIndex =
      (photoIndex + Number(direction) + photoURLs.length) %
      photoURLs.length;
    updateLargePhoto();
  }

  if (openBtn) {
    openBtn.addEventListener("click", function (event) {
      event.preventDefault();
      openInvitation();
    });
  }

  if (photoGrid) {
    photoURLs.forEach((url, index) => {
      const img = document.createElement("img");
      img.src = url;
      img.alt = `Birthday photo ${index + 1}`;
      img.loading = "lazy";

      img.addEventListener("click", function () {
        photoIndex = index;
        updateLargePhoto();

        if (photoViewer) {
          photoViewer.classList.add("show");
          photoViewer.setAttribute("aria-hidden", "false");
        }
      });

      photoGrid.appendChild(img);
    });
  }

  if (gallery) {
    gallery.addEventListener("click", event => {
      if (event.target === gallery) closeGallery();
    });
  }

  if (photoViewer) {
    photoViewer.addEventListener("click", event => {
      if (event.target === photoViewer) closePhoto();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeGallery();
      closePhoto();
    }

    if (photoViewer && photoViewer.classList.contains("show")) {
      if (event.key === "ArrowRight") movePhoto(1);
      if (event.key === "ArrowLeft") movePhoto(-1);
    }
  });

  window.openInvitation = openInvitation;
  window.changePage = changePage;
  window.exitInvitation = exitInvitation;
  window.showPage = showPage;
  window.showGallery = showGallery;
  window.closeGallery = closeGallery;
  window.movePhoto = movePhoto;
  window.closePhoto = closePhoto;
});
