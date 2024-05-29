document.addEventListener("DOMContentLoaded", function () {
  const pesquisarColaboladores = document.getElementById(
    "pesquisarColaboladores"
  );
  const dialogPesquisar = document.getElementById("dialogPesquisar");
  const overlay = document.getElementById("overlay");
  const searchInput = document.getElementById("searchInput");
  const colaboradoresTable = document.getElementById("colaboradoresTable");

  function openDialogPesquisar() {
    dialogPesquisar.style.display = "block";
    overlay.style.display = "block";
    searchInput.focus();
  }

  function closeDialogPesquisar() {
    dialogPesquisar.style.display = "none";
    overlay.style.display = "none";
  }

  pesquisarColaboladores.addEventListener("click", openDialogPesquisar);

  overlay.addEventListener("click", closeDialogPesquisar);

  dialogPesquisar.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  searchInput.addEventListener("input", function () {
    const nome = searchInput.value.trim();

    if (nome !== "") {
      fetch(`http://localhost:3000/colaboradores?nome_like=${nome}`)
        .then((response) => response.json())
        .then((data) => {
          renderColaboradores(data);
          colaboradoresTable.style.display = "block";
        });
    } else {
      colaboradoresTable.style.display = "none";
    }
  });

  function renderColaboradores(colaboradores) {
    const colaboradoresBody = document.getElementById("colaboradoresBody");
    colaboradoresBody.innerHTML = "";

    const nomePesquisado = searchInput.value.trim().toLowerCase();

    colaboradores.forEach((colaborador) => {
      const nomeColaborador = colaborador.nome.toLowerCase();

      if (nomeColaborador.includes(nomePesquisado)) {
        fetch(`http://localhost:3000/cargos/${colaborador.cargo.id}`)
          .then((response) => response.json())
          .then((cargo) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${colaborador.id}</td>
              <td>${colaborador.nome}</td>
              <td>${colaborador.cpf}</td>
              <td>${colaborador.dataAdmissao}</td>
              <td>${colaborador.remuneracao}</td>
              <td>${cargo.descricao}</td>
            `;
            colaboradoresBody.appendChild(row);
          });
      }
    });
  }
});
