import { BrowserRouter, Routes, Route } from "react-router-dom";
import Beranda from "./components/Beranda";
import Navbar from "./components/Navbar";
import ManajemenBuku from "./components/ManajemenBuku";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    retrieveData();
  }, []);

  function retrieveData() {
    axios
      .get("http://localhost:4000/book")
      .then((response) => {
        console.log("Data yang berhasil diambil:", response.data);
        setBooks(response.data);
      })
      .catch(function (error) {
        console.log("Error saat mengambil data:", error);
      });
  }

  function storeData(inputBook) {
    axios
      .post("http://localhost:4000/book/add", inputBook)
      .then((res) => {
        setBooks((prevBooks) => [...prevBooks, inputBook]);
        alert("Data berhasil ditambahkan!");
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }

  function updateData(inputBook) {
    axios
      .put("http://localhost:4000/book/update/" + inputBook._id, inputBook)
      .then((res) => {
        retrieveData();
        alert("Data berhasil diperbarui!");
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }

  function deleteData(book) {
    axios
      .delete("http://localhost:4000/book/delete/" + book._id)
      .then(() => {
        retrieveData();
        alert("Data berhasil dihapus!");
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Beranda />} />
          <Route
            path="/manajemen-buku"
            exact
            element={
              <ManajemenBuku
                bookList={books}
                store={storeData}
                update={updateData}
                remove={deleteData}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
