document.addEventListener("DOMContentLoaded", function () {
  const delColaboladores = document.getElementById("delColaboladores");
  const dialogDel = document.getElementById("dialogDel");
  const overlay = document.getElementById("overlay");
  const IdBuscarDel = document.getElementById("IdBuscarDel");
  const btnIdBuscarDel = document.getElementById("btnIdBuscarDel");
  const deleteForm = document.getElementById("deleteForm");
  const btnDeletar = document.getElementById("btnDeletar");

  delColaboladores.addEventListener("click", function () {
    dialogDel.style.display = "block";
    overlay.style.display = "block";
  });

  overlay.addEventListener("click", function () {
    dialogDel.style.display = "none";
    overlay.style.display = "none";
  });

  dialogDel.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  btnIdBuscarDel.addEventListener("click", function () {
    const userId = IdBuscarDel.value.trim();
    if (userId !== "") {
      fetch(`http://localhost:3000/colaboradores/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Usuário não encontrado");
          }
          return response.json();
        })
        .then(() => {
          deleteForm.style.display = "block";
        })
        .catch((error) => {
          console.error("Erro ao buscar usuário:", error);
          alert("Usuário não encontrado");
          deleteForm.style.display = "none";
        });
    } else {
      alert("Por favor, digite um ID de usuário válido");
    }
  });

  btnDeletar.addEventListener("click", function () {
    const userId = IdBuscarDel.value.trim();
    if (userId !== "") {
      const confirmar = confirm("Tem certeza que deseja deletar este usuário?");
      if (confirmar) {
        fetch(`http://localhost:3000/colaboradores/${userId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Falha ao deletar usuário");
            }
            return response.json();
          })
          .then(() => {
            alert("Usuário deletado com sucesso");
            dialogDel.style.display = "none";
            overlay.style.display = "none";
            IdBuscarDel.value = "";
            btnDeletar.style.display = "none";
          })
          .catch((error) => {
            console.error("Erro ao deletar usuário:", error);
            alert("Erro ao deletar usuário");
          });
      }
    } else {
      alert("Por favor, digite um ID de usuário válido");
    }
  });
});
