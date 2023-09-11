import React, { useState, useEffect } from "react";

function ManajemenBuku({ bookList, store, remove, update }) {
  const [inputBook, setInputBook] = useState({ judul: "", pengarang: "" });
  const [formMode, setFormMode] = useState();

  useEffect(() => {
    setInputBook({ judul: "", pengarang: "" });
  }, [bookList]);

  function handleJudul(event) {
    setInputBook({ ...inputBook, judul: event.target.value });
  }

  function handlePengarang(event) {
    setInputBook({ ...inputBook, pengarang: event.target.value });
  }

  function submitAdd(event) {
    event.preventDefault();

    if (!inputBook.judul || !inputBook.pengarang) {
      alert("Judul dan Pengarang harus diisi.");
      return;
    }

    store(inputBook);
    setInputBook({ judul: "", pengarang: "" });
  }

  function submitEdit(event) {
    event.preventDefault();
    update(inputBook);
    setFormMode("");
  }

  function showCreateForm() {
    setFormMode("create");
  }

  function showEditForm(book) {
    setInputBook(book);
    setFormMode("edit");
  }

  function deleteBook(book) {
    remove(book);
  }

  return (
    <div className="container mt-3">
      <h1 className="text-center">Manajemen Buku</h1>

      {/* Form Tambah Buku */}
      <button className="btn btn-sm btn-primary my-2" onClick={showCreateForm}>
        Tambah Buku
      </button>

      {formMode === "create" && (
        <div id="formTambah" className="card py-2 my-3 bg-light">
          <div className="card-body">
            <h4 className="text-black">Form Buku</h4>
            <form
              onSubmit={submitAdd}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 2fr",
                gridGap: "16px",
              }}
            >
              <div className="col-12">
                <input
                  type="text"
                  name="judul"
                  className="form-control ml-4"
                  placeholder="Judul..."
                  onChange={handleJudul}
                  value={inputBook.judul}
                />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  name="pengarang"
                  className="form-control"
                  placeholder="Pengarang.."
                  onChange={handlePengarang}
                  value={inputBook.pengarang}
                />
              </div>
              <div className="col-2">
                <input type="submit" className="btn btn-success" value="Tambah" />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Form Edit Buku */}
      {formMode === "edit" && (
        <div id="formEdit" className="card py-2 my-3 bg-secondary">
          <div className="card-body">
            <h4 className="text-white">Edit Buku</h4>
            <form
              className="form-row"
              onSubmit={submitEdit}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 2fr",
                gridGap: "16px",
              }}
            >
              <div className="col-12">
                <input
                  type="text"
                  name="judul"
                  className="form-control ml-2"
                  placeholder="Judul..."
                  onChange={handleJudul}
                  value={inputBook.judul}
                />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  name="pengarang"
                  className="form-control"
                  placeholder="Pengarang.."
                  onChange={handlePengarang}
                  value={inputBook.pengarang}
                />
              </div>
              <div className="col-2">
                <input type="submit" className="btn btn-warning" value="Simpan" />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabel Data Buku */}
      <div>
        <h4>Tabel Data Buku</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No.</th>
              <th>Judul</th>
              <th>Pengarang</th>
              <th className="col-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((book, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{book.judul}</td>
                <td>{book.pengarang}</td>
                <td>
                  <button
                    className="btn btn-warning mx-2"
                    onClick={() => showEditForm(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteBook(book)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManajemenBuku;
