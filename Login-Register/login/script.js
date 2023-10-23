// kenapa mengunakan DOMContentLoaded
// Dengan cara ini, Anda dapat memastikan bahwa kode JavaScript Anda
//  tidak akan dijalankan sebelum halaman web sepenuhnya diurai oleh browser,
//  sehingga Anda dapat mengakses dan memanipulasi elemen-elemen HTML dengan aman.
document.addEventListener("DOMContentLoaded", function () {
  // ambil login form
  const loginForm = document.getElementById("login-form");
  // ketika handle ketika form disubmit
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // ambil nilai yang di inputkan
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // periksa email password harus diisi semua
    if (!email || !password) {
      alert("Silakan isi email dan password.");
    }
    // kemudian fetch data, ambil data yang ada di api dibawah kemudian
    // cocokan email dan password
    else {
      fetch("https://652d3ffcf9afa8ef4b271ed7.mockapi.io/account", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // pencococakn email dan password meggunakan function di find
          const user = data.find(
            (item) => item.email === email && item.password === password
          );
          // jika account user ada maka tambahkan islogin, email, nama, jeniskelami kedalam lokal storage
          if (user) {
            // Simpan status login
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("email", user.email);
            localStorage.setItem("nama", user.nama);
            localStorage.setItem("jenisKelamin", user.jenisKelamin);

            // jika berhasil akan dialihkan ke halaman landingpage
            alert("Login berhasil! Anda akan diarahkan ke HomePage.");
            window.location.href = "../landingPage.html";
          } else {
            alert("Login gagal. Periksa email dan password Anda.");
          }
        })
        .catch((error) => {
          alert("Terjadi kesalahan saat mengambil data.");
        });
    }
  });
});
