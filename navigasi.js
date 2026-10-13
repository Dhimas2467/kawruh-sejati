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
      var wadah = document.getElementById("navigasi-container");
      if (!wadah) return;

      wadah.innerHTML = html;

      // Sesuaikan tautan beranda.
      var tombolBeranda = wadah.querySelector(".tombol-beranda");

      if (tombolBeranda) {
        tombolBeranda.href = alamatBeranda.href + "#beranda";
      }

      // Sesuaikan tautan menu navigasi.
      wadah.querySelectorAll(".navigasi-utama a").forEach(function (tautan) {
        var tujuan = tautan.getAttribute("href");

        if (!tujuan || tujuan.indexOf("../index.html#") !== 0) return;

        var bagian = tujuan.split("#")[1];
        tautan.href = alamatBeranda.href + "#" + bagian;
      });
    })
    .catch(function (kesalahan) {
      console.error("Navigasi otomatis gagal dimuat:", kesalahan);
    });

  // Membuat tombol Share.
  function pasangTombolShare() {
    var artikel = document.querySelector(".isi-artikel");

    if (!artikel || document.getElementById("tombol-share")) return;

    var wadah = document.createElement("div");

    wadah.id = "tombol-share";
    wadah.style.cssText =
      "display:flex;flex-wrap:wrap;justify-content:center;" +
      "align-items:center;gap:8px;margin:24px auto;padding:12px 0;";

    var gayaTombol =
      "display:inline-block;padding:9px 13px;border-radius:7px;" +
      "text-decoration:none;font-size:14px;font-weight:600;" +
      "border:1px solid #b99a55;cursor:pointer;";

    var judul = document.title;
    var url = window.location.href;

    var urlEncode = encodeURIComponent(url);
    var judulEncode = encodeURIComponent(judul);

    function buatTautan(teks, tujuan, warna) {
      var tombol = document.createElement("a");

      tombol.textContent = teks;
      tombol.href = tujuan;
      tombol.target = "_blank";
      tombol.rel = "noopener noreferrer";

      tombol.style.cssText =
        gayaTombol + "background:" + warna + ";color:#fff;";

      return tombol;
    }

    // Facebook.
    wadah.appendChild(
      buatTautan(
        "Facebook",
        "https://www.facebook.com/sharer/sharer.php?u=" + urlEncode,
        "#1877f2"
      )
    );

    // WhatsApp.
    wadah.appendChild(
      buatTautan(
        "WhatsApp",
        "https://api.whatsapp.com/send?text=" +
          judulEncode + "%20" + urlEncode,
        "#168b50"
      )
    );

    // Telegram.
    wadah.appendChild(
      buatTautan(
        "Telegram",
        "https://t.me/share/url?url=" +
          urlEncode + "&text=" + judulEncode,
        "#168acd"
      )
    );

    // Salin tautan artikel.
    var salin = document.createElement("button");

    salin.type = "button";
    salin
