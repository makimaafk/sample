document.addEventListener("DOMContentLoaded", function () {
  const envelope = document.getElementById("envelope");
  const openBtn = document.getElementById("openBtn");
  const hint = document.getElementById("hint");
  const pages = document.querySelectorAll(".page");

  const gallery = document.getElementById("gallery");
  const photoGrid = document.getElementById("photoGrid");
  const photoViewer = document.getElementById("photoViewer");
  const largePhoto = document.getElementById("largePhoto");
  const photoCounter = document.getElementById("photoCounter");

  let currentPage = 0;
  let photoIndex = 0;

  // CREATE THE 18-PERSON LISTS
  function fillList(id, label) {
    const list = document.getElementById(id);
    if (!list || list.children.length > 0) return;

    for (let i = 1; i <= 18; i++) {
      const item = document.createElement("li");
      item.textContent = ${label} ${i};
      list.appendChild(item);
    }
  }

  fillList("treasures", "Treasure");
  fillList("gifts", "Gift");
  fillList("candles", "Candle");
  fillList("shots", "Shot");
  fillList("roses", "Rose");

  // OPEN ENVELOPE
  function openInvitation() {
    if (!envelope) {
      console.error("Element #envelope was not found.");
      return;
    }

    envelope.classList.add("open");

    if (hint) {
      hint.textContent = "Your invitation is open!";
    }

    showPage(0);
  }

  // THE DEDICATED BUTTON OPENS THE ENVELOPE
  if (openBtn) {
    openBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      openInvitation();
    });
  } else {
    console.error("Open button not found. Check id='openBtn'.");
  }

  // SHOW PAGE
  function showPage(index) {
    if (index < 0 || index >= pages.length) return;

    currentPage = index;

    pages.forEach(function (page, i) {
      page.classList.toggle("active", i === currentPage);
    });
  }

  // NEXT AND PREVIOUS BUTTONS
  function changePage(direction) {
    const nextPage = currentPage + direction;

    if (nextPage >= 0 && nextPage < pages.length) {
      showPage(nextPage);
    }
  }

  // EXIT AND CLOSE ENVELOPE
  function exitInvitation() {
    if (envelope) {
      envelope.classList.remove("open");
    }

    showPage(0);
    closeGallery();
    closePhoto();

    if (hint) {
      hint.textContent = "Tap the button to open your invitation";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // SAMPLE GALLERY IMAGES
  const photoURLs = Array.from({ length: 20 }, function (_, i) {
    return https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80&sig=${i};
  });

  // CREATE GALLERY THUMBNAILS
  if (photoGrid) {
    photoURLs.forEach(function (url, index) {
      const img = document.createElement("img");

      img.src = url;
      img.alt = Birthday photo ${index + 1};
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

  // OPEN GALLERY
  function showGallery() {
    if (!gallery) return;

    gallery.classList.add("show");
    gallery.setAttribute("aria-hidden", "false");
  }

  // CLOSE GALLERY
  function closeGallery() {
    if (!gallery) return;

    gallery.classList.remove("show");
    gallery.setAttribute("aria-hidden", "true");
  }

  // UPDATE FULL-SIZE PHOTO
  function updateLargePhoto() {
    if (!largePhoto) return;

    largePhoto.src = photoURLs[photoIndex];
    largePhoto.alt = Birthday photo ${photoIndex + 1};

    if (photoCounter) {
      photoCounter.textContent =
        ${photoIndex + 1} / ${photoURLs.length};
    }
  }

  // NEXT OR PREVIOUS PHOTO
  function movePhoto(direction) {
    photoIndex =
      (photoIndex + direction + photoURLs.length) %
      photoURLs.length;

    updateLargePhoto();
  }

  // CLOSE FULL-SIZE PHOTO
    function closePhoto() {
      if (!photoViewer) return;

      photoViewer.classList.remove("show");
      photoViewer.setAttribute("aria-hidden", "true");
    }

    // CLOSE GALLERY WHEN BACKGROUND IS TAPPED
    if (gallery) {
      gallery.addEventListener("click", function (event) {
        if (event.target === gallery) {
          closeGallery();
        }
      });
    }

    // CLOSE PHOTO WHEN BACKGROUND IS TAPPED
    if (photoViewer) {
      photoViewer.addEventListener("click", function (event) {
        if (event.target === photoViewer) {
          closePhoto();
        }
      });
    }

    // KEYBOARD CONTROLS
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

    // MAKE FUNCTIONS AVAILABLE TO HTML BUTTONS
    window.openInvitation = openInvitation;
    window.exitInvitation = exitInvitation;
    window.showPage = showPage;
    window.changePage = changePage;
    window.showGallery = showGallery;
    window.closeGallery = closeGallery;
    window.movePhoto = movePhoto;
    window.closePhoto = closePhoto;
  });