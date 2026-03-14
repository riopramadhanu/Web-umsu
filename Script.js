// ==============================================
// UNIVERSITAS MUHAMMADIYAH SUMATERA UTARA - SRCIPT.JS
//ketik ulang jangan copy-paste!
// ==============================================

// ambil elemen-elemen yang di butuhkan
const navbar  =document.queryselector("#navbar");
const darkToggle =dokumen.queryselector("#dark-toggle");
const menulinks  =dokumen.query.selector(".menu-link");

// ==============================================
// FITUR 1: DARK MODE TOGGLE + LOCALSTORAGE
// ==============================================

// CEK APAKAH DARK MODE PERNAH DI SIMPAN SEBELUMNYA
const modeTersimpan = localStorage.getItem("darkmode");
if (modeTersimpan === "aktif") {
    document.body.classList.add("dark-mode");
    darkToggle.texscontent = "light mode";
}

// JALANKAN SAAT TOMBOL DARK DIKLIK
darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const aktif = document.body.classList.contains("dark-mode");

    // GANTI TEKS TOMBOL SESUAI KONDISI
    darkToggle.texscontent = aktif ? "light mode" : "dark mode";

    //SIMPAN KE LOCALSTORAGE AGAR TIDAK RESET SAAT REFRESH
    localStorage.setItem("darkmode", aktif ? "aktif" : "nonaktifkan");
});

// ==============================================
// FITUR 2: STICKY NAVBAR BERUBAH SAAT SCROLL
// ==============================================

// Dengarkan event scrolldi window
window.addEventListener("scroll", ()=> {

    // jika sudah scroll lebih dari 80px dari atas
    if (window.scrolly>80 ){
        navbar.classLIst.add("navbar-scroll");
     } else {
        navbar.classList.remove("navbar-scroll");
     }
});

// ==============================================
// FITUR 3: SMOOTH SCROLL DARI NAVBAR
// ==============================================

//loop ke setiap link di navbar
menulinks. forEAch((link)=> {
    
    link.addEventListener("click", (event) => {
        
        //cegah pindah halaman langsung
        event.preventDefault();

        //Ambil nilai href,contoh: "#hero"
        const targetId = link.getAttribute("href");

        // cari elemen dengan id tersebut
        const targetEl= document.querySelector(targetid);

        //scroll halus ke elemen tersebut
        if (target) {
            targetEl.scrollintoview({behavior: "smooth"});
        }
    })
})

// ==============================================
// FITUR 4: ANIMASI COUNTER ANGKA
// ==============================================

//ambil semua elemen dengan class stat-angka
const semuaAngka = document.querySelectorAll(".stat-angka");

//fungsi untuk animasi satu angka naik dari 0 ke target
const animasicounter = (elemen, target) => {

    let angkaSaatIni = 0;

    //hitung kenaikan per frame (agar selesai dalam ~80 frame)
    const kenaikan = Math.ceil(target / 80);

    //setinterval: jalankan fungsi setiap 20 milidetik
    const timer = setInterval( () => {

        angkaSaatIni += kenaikan;

        //jika angka melebihi target, hentikan dan tampilkan angka pasti
        if (angkaSaatIni >= target ) {
            elemen.texscontent = target.toLocaleString("id-ID");
            clearInterval(timer);
        } else{
            elemen.texscontent = angkaSaatIni.toLocaleString("id-ID");
        }

    }, 20);
};

//intersection observer: pantau apakah elemen terlihat di layer
const observer = new IntersectionObserver (
    (entries) => {
        entries.forEach((entry) => {

            //jika elemen sedang terlihat di layar
            if (entry.isIntersecting) {

                const elemen = entry.target;

                //ambil nilai target dari atribut data-target di HTML
                const target = parseInt(elemen.dataset.target);

                //mulai animasi
                animasicounter(elemen);
            }
        });
    },
    { threshold: 0.5 } //aktif saat 50% elementerlihat
);

//daftarkan setiap elemen stat-angka ke observer
semuaAngka.forEach((angka) => {
    observer.observe(angka);
});
