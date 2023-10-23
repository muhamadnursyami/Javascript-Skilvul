// kenapa mengunakan DOMContentLoaded
// Dengan cara ini, Anda dapat memastikan bahwa kode JavaScript Anda
//  tidak akan dijalankan sebelum halaman web sepenuhnya diurai oleh browser,
//  sehingga Anda dapat mengakses dan memanipulasi elemen-elemen HTML dengan aman.
document.addEventListener("DOMContentLoaded", function () {
  // ambil id
  const form = document.getElementById("register-form");
  const errorMessage = document.getElementById("error-message");
  const submitButton = document.getElementById("submit-button");
  // handle form ketika di submit
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    errorMessage.textContent = "";
    // ambil semua value yang telah di isi
    const nama = document.getElementById("nama").value;
    const jenisKelamin = document.getElementById("jenis-kelamin").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const profilePicture = "";
    // check  jika yang di inputkan itu  salah satunya kosong / belum di isi
    if (!nama || !jenisKelamin || !email || !password || !confirmPassword) {
      errorMessage.textContent = "Semua field harus diisi.";
    }
    // jika password yang dimasukan tidak sama dengan confirmPassword
    else if (password !== confirmPassword) {
      errorMessage.textContent = "Password dan Confirm Password harus sama.";
    }
    // jika semua nya sudah isi maka dibuat sebuat object untuk menggabungkan semua nilai
    else {
      const formData = {
        profilePicture: profilePicture,
        nama: nama,
        jenisKelamin: jenisKelamin,
        email: email,
        password: password,
      };
      // kemudian fetch api, jadi data yang telah di input tadi berupa object diatas yaitu formData
      // akan di tambahkan / dimasukan didalam api url dibawah ini.
      fetch("https://652d3ffcf9afa8ef4b271ed7.mockapi.io/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(
            "Pendaftaran berhasil! Anda akan diarahkan ke halaman login dalam 2 detik."
          );

          // Arahkan pengguna ke halaman login setelah 2 detik
          setTimeout(function () {
            window.location.href = "./login/index.html";
          }, 2000);
        })
        .catch((error) => {
          errorMessage.textContent = "Terjadi kesalahan saat mengirim data.";
        });
    }
  });
});
