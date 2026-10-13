/* Memuat menu navigasi */
(function () {
  var skrip = document.currentScript;
  var alamatNavigasi = new URL("navigasi.html", skrip.src);
  var alamatBeranda = new URL("./index.html", skrip.src);

  fetch(alamatNavigasi)
    .then(function (respons) {
      if (!respons.ok) {
        throw new Error("navigasi.html gagal dimuat");
      }
      return respons.text();
    })
    .then(function (html) {
      var nav = document.getElementById("navigasi-container");
      if (!nav) return;

      nav.innerHTML = html;

      var tombolBeranda = nav.querySelector(".tombol-beranda");
      if (tombolBeranda) {
        tombolBeranda.href = alamatBeranda.href + "#beranda";
      }

      nav.querySelectorAll(".navigasi-utama a").forEach(function (tautan) {
        var tujuan = tautan.getAttribute("href");

        if (!tujuan || tujuan.indexOf("../index.html#") !== 0) return;

        var bagian = tujuan.split("#")[1];
        tautan.href = alamatBeranda.href + "#" + bagian;
      });
    })
    .catch(function (error) {
      console.error("Gagal memuat navigasi:", error);
    });
})();


/* Tombol berbagi otomatis */
(function () {
  function buatTombolBerbagi() {
    if (document.querySelector(".tombol-share")) return;

    var url = window.location.href;
    var judul = document.title;
    var u = encodeURIComponent(url);
    var t = encodeURIComponent(judul + " " + url);

    var share = document.createElement("div");
    share.className = "tombol-share";

    share.innerHTML = `
      <a href="https://www.facebook.com/sharer/sharer.php?u=${u}"
         target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <img src="https://cdn.simpleicons.org/facebook/1877F2" alt="Facebook">
      </a>

      <a href="https://twitter.com/intent/tweet?text=${t}"
         target="_blank" rel="noopener noreferrer" aria-label="X">
        <img src="https://cdn.simpleicons.org/x/000000" alt="X">
      </a>

      <button type="button" class="share-instagram" aria-label="Instagram">
        <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="Instagram">
      </button>

      <a href="https://api.whatsapp.com/send?text=${t}"
         target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="WhatsApp">
      </a>

      <a href="https://t.me/share/url?url=${u}&text=${encodeURIComponent(judul)}"
         target="_blank" rel="noopener noreferrer" aria-label="Telegram">
        <img src="https://cdn.simpleicons.org/telegram/26A5E4" alt="Telegram">
      </a>
    `;

    var style = document.createElement("style");

    style.textContent = `
      .tombol-share {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        gap: 14px;
        width: 100%;
        margin: 24px auto;
        text-align: center;
        box-sizing: border-box;
      }

      .tombol-share a,
      .tombol-share button {
        display: inline-flex;
        flex: 0 0 34px;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        padding: 0;
        border: none;
        background: transparent;
        cursor: pointer;
      }

      .tombol-share img {
        display: block;
        width: 28px;
        height: 28px;
        object-fit: contain;
      }
    `;

    document.head.appendChild(style);

    share.querySelector(".share-instagram").addEventListener(
      "click",
      async function () {
        if (navigator.share) {
          try {
            await navigator.share({
              title: judul,
              url: url
            });
          } catch (error) {}
        } else {
          window.open("https://www.instagram.com/", "_blank");
        }
      }
    );

    document.body.appendChild(share);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buatTombolBerbagi);
  } else {
    buatTombolBerbagi();
  }
})();
