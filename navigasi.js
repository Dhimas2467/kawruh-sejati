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

      // Sesuaikan tautan beranda dengan lokasi situs.
      var tombolBeranda = wadah.querySelector(".tombol-beranda");
      if (tombolBeranda) {
        tombolBeranda.href = alamatBeranda.href + "#beranda";
      }

      // Tautan menu mengarah ke bagian yang sesuai di halaman utama.
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
})();
