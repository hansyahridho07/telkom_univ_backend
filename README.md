# DOC API telkom_univ_backend

## **Sebelum memulai**

- Lakukan npm i
- Disediakan 2 data seed pada folder seeder, silahkan di seed terlebih dahulu

---

## **API untuk admin**

- **POST /admin/loginAdmin**

  _Request Header_

  ```
  no needed
  ```

  _Request Body_

  ```js
  username: admin
  passwrod: Admin123!
  ```

  _Response_

  **_Success_**

  - **(200) - OK**
    ```js
    {
      access_token;
    }
    ```
    **_Error_**
  - **(401) - Unauthorized**

    ```js
    {
      message: "Invalid username/password";
    }
    ```

    **OR**

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal server error";
    }
    ```

---

- **POST /admin/createDosen**

  _Request Headers_

  ```js
  access_token;
  ```

  _Request Body_

  ```js
  nama: nama dosen
  nip: 123456789
  MatkulId: 1
  username: gurusatu
  password: Gurus123!
  ```

  - _note_

    - untuk username tidak boleh menggunakan angka, karakter khusus, dan huruf kapital
    - untuk password terdiri minimal 8 - 20 karakter, minimal 1 huruf besar, minimal 1 huruf kapital, minimal 1 angka, dan 1 karakter khusus

  _Response_

  **_Success_**

  - **(201) - Created**
    ```js
    {
      dosen:{
        nama: "nama dosen",
        nip: 123456789,
        MatkulId: 1,
        username: "dosensatu",
        password
      }
    }
    ```
    **_Error_**
  - **(400) - Bad Request**

    ```js
    {
      message: [
        "Nama tidak boleh kosong",
        "Data nama tidak ada",
        "NIP tidak boleh kosong",
        "Data NIP tidak ada",
        "Username sudah ada",
        "Username tidak boleh kosong",
        "Data username tidak ada",
        "Username minimal 5 karakter",
        "Username harus huruf kecil semua",
        "Username tidak bisa angka",
        "The password must contain at least 10 and maximum 12 characters including at least 1 uppercase, 1 lowercase, one number and one special character.",
      ];
    }
    ```

    **OR**

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal server error";
    }
    ```

---

- **POST /admin/matkul**

  _Request Headers_

  ```js
  access_token;
  ```

  _Request Body_

  ```js
  nama_matkul: Bahasa Indonesia
  ```

  _Response_

  **_Success_**

  - **(201) - Created**
    ```js
    {
      matkul:{
        id: "4",
        nama_matkul: "Bahasa Indonesia"
      }
    }
    ```
    **_Error_**
  - **(400) - Bad Request**

    ```js
    {
      message: ["Mata kuliah tidak boleh kosong"];
    }
    ```

    **OR**

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal server error";
    }
    ```

---

- **PUT /admin/matkul/:idMatkul**

  _Request Header_

  ```js
  access_token;
  ```

  _Request body_

  ```js
  nama_matkul: Ekonomi;
  ```

  _Request params_

  ```js
  req.params.idMatkul;
  ```

  _Response_

  **_Success_**

  - **(200) - OK**
    ```js
    {
      message: "Update matkul berhasil";
    }
    ```
    **_Error_**
  - **(400) - Bad Request**

    ```js
    {
      message: "Mata kuliah tidak boleh kosong";
    }
    ```

    **OR**

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal server error";
    }
    ```

---

- **DELETE /admin/matkul/:idMatkul**

  _Request Headers_

  ```js
  access_token;
  ```

  _Request Body_

  ```js
  no needed
  ```

  _Request Params_

  ```js
  req.params.idMatkul;
  ```

  _Response_

  **_Success_**

  - **(200) - OK**
    ```js
    {
      message: "Matkul berhasil di hapus";
    }
    ```
    **_Error_**
  - **(400) - Bad Request**

    ```js
    {
      message: "Mata kuliah tidak boleh kosong";
    }
    ```

    **OR**

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal server error";
    }
    ```

---

- **POST /admin/schedule**

  _Request Headers_

  ```js
  access_token;
  ```

  _Request Body_

  ```js
  nama_siswa: Dani;
  DosenId: 1;
  jadwal: senin;
  ```

  _Response_

  **_Success_**

  - **(201) - Created**
    ```js
    {
      schedule:{
        id: 1,
        nama_siswa: "Dani",
        DosenId: 1,
        jadwal: "senin",
        MatkulId: 1
      }
    }
    ```

  **_Error_**

  - **(400) - Bad Request**

    ```js
    {
      message: [
        "Nama siswa tidak boleh kosong",
        "Data nama tidak ada",
        "Jadwal tidak boleh kosong",
        "Data jadwal tidak ada",
      ];
    }
    ```

    **OR**

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal server error";
    }
    ```

---

- **PUT /admin/schedule/:idJadawal**

  _Request Headers_

  ```js
  access_token;
  ```

  _Request Body_

  ```js
  nama_siswa: Yadi;
  DosenId: 2;
  jadwal: selasa;
  ```

  _Request Params_

  ```js
  req.params.idJadwal;
  ```

  _Response_

  **_Success_**

  - **(200) - OK**
    ```js
    {
      message: "Berhasil update jadwal matkul";
    }
    ```

  **_Error_**

  - **(400) - Bad Request**

    ```js
    {
      message: [
        "Nama siswa tidak boleh kosong",
        "Data nama tidak ada",
        "Jadwal tidak boleh kosong",
        "Data jadwal tidak ada",
      ];
    }
    ```

    **OR**

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal server error";
    }
    ```

---

- **PATCH /admin/schedule/:idJadwal**

  _Request Headers_

  ```js
  access_token;
  ```

  _Request Body_

  ```js
  DosenId: 1;
  ```

  _Request Params_

  ```js
  req.params.idJadwal;
  ```

  _Response_

  **_Success_**

  - **(200) - OK**
    ```js
    {
      message: "Berhasil update jadwal matkul";
    }
    ```

  **_Error_**

  - **(400) - Bad Request**

    ```js
    {
      message: [
        "Nama siswa tidak boleh kosong",
        "Data nama tidak ada",
        "Jadwal tidak boleh kosong",
        "Data jadwal tidak ada",
      ];
    }
    ```

    **OR**

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal server error";
    }
    ```

---

- **DELETE /admin/schedule/:idJadwal**

  _Request Headers_

  ```js
  access_token;
  ```

  _Request Body_

  ```js
  no needed
  ```

  _Request Params_

  ```js
  req.params.idJadwal;
  ```

  _Response_

  **_Success_**

  - **(200) - OK**
    ```js
    {
      message: "Berhasil delete jadwal";
    }
    ```

  **_Error_**

  - **(404) - Data Not Found**

    ```js
    {
      message: "Data tidak ditemukan";
    }
    ```

    **OR**

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal server error";
    }
    ```

---

## **API untuk admin**

- **POST /dosen/loginDosen**

  _Request Headers_

  ```js
  no needed
  ```

  _Request Body_

  ```js
  username: gurusatu
  password: Gurus123!
  ```

  _Response_

  **_Success_**

  - **(200) - OK**
    ```js
    {
      access_token;
    }
    ```
    **_Error_**
  - **(401) - Unauthorized**

    ```js
    {
      message: "Invalid username/password";
    }
    ```

    **OR**

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal server error";
    }
    ```

---

- **GET /dosen/matkulSchedule/:matkulId**

  _Request Headers_

  ```js
  access_token;
  ```

  _Request Body_

  ```js
  no needed
  ```

  _Request Params_

  ```js
  req.params.matkulId;
  ```

  _Response_

  **_Success_**

  - **(200) - OK**
    ```js
    {
      schedule: [
        {
          id: 1,
          nama_siswa: "Ridho Hansyah",
          DosenId: 1,
          jadwal: "senin",
          MatkulId: 1,
          Matkul: {
            id: 1,
            nama_matkul: "IPA",
          },
        },
      ];
    }
    ```

  **_Error_**

  - **(404) - Data Not Found**

    ```js
    {
      message: "Matkul tersebut belum memiliki jadwal";
    }
    ```

    **OR**

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal server error";
    }
    ```

---

- **GET /dosen/matkulSchedule/:dosenId**

  _Request Headers_

  ```js
  access_token;
  ```

  _Request Body_

  ```js
  no needed
  ```

  _Request Params_

  ```js
  req.params.dosenId;
  ```

  _Response_

  **_Success_**

  - **(200) - OK**
    ```js
    {
    "schedule": [
        {
            "id": 1,
            "nama_siswa": "Ridho Hansyah",
            "DosenId": 1,
            "jadwal": "senin",
            "MatkulId": 1
        }
    ],
    "dosen": {
        "id": 1,
        "nama": "Dani Rama",
        "nip": "12345",
        "MatkulId": 1,
        "username": null,
        "password": null: "2021-04-15T14:04:07.275Z",
        "Matkul": {
            "id": 1,
            "nama_matkul": "IPA"
        }
      }
    }
    ```

  **_Error_**

  - **(404) - Data Not Found**

    ```js
    {
      message: "Belum ada jadwal dengan dosen tersebut";
    }
    ```

    **OR**

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal server error";
    }
    ```
