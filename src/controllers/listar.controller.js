document.addEventListener("DOMContentLoaded", (event) => {
  const listarOption = document.getElementById("listarOption");
  const closeButton = document.getElementById("closeButton");
  const overlay = document.getElementById("overlay");
  const dialog = document.getElementById("dialogListar");
  const prevPage = document.getElementById("prevPage");
  const nextPage = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");

  let currentPage = 1;
  const itemsPerPage = 10;
  let items = [];
  let totalItems = 0;
  let totalPages = 0;

  listarOption.addEventListener("click", function (event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    fetchItems(currentPage);
  });

  closeButton.addEventListener("click", function () {
    closeDialog();
  });

  overlay.addEventListener("click", function () {
    closeDialog();
  });

  prevPage.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      fetchItems(currentPage);
    }
  });

  nextPage.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      fetchItems(currentPage);
    }
  });

  function fetchItems(page) {
    fetch(
      `http://localhost:3000/colaboradores?_page=${page}&_per_page=${itemsPerPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          items = data.data;
          totalItems = data.items;
          totalPages = data.pages;
        } else {
          throw new Error("Formato de dados inesperado.");
        }

        renderTable();
        dialog.style.display = "block";
        overlay.style.display = "block";
      })
      .catch((error) => {
        console.error("Erro ao buscar os itens:", error);
        alert(
          "Erro ao buscar os itens. Por favor, tente novamente mais tarde."
        );
      });
  }

  function closeDialog() {
    dialog.style.display = "none";
    overlay.style.display = "none";
  }

  function renderTable() {
    const itemTable = document.querySelector("#itemTable tbody");
    itemTable.innerHTML = ""; // Limpa a tabela antes de adicionar itens

    items.forEach((item) => {
      const row = document.createElement("tr");
      const idCell = document.createElement("td");
      idCell.textContent = item.id;
      const nomeCell = document.createElement("td");
      nomeCell.textContent = item.nome;
      const cpfCell = document.createElement("td");
      cpfCell.textContent = item.cpf;
      const dataAdmissaoCell = document.createElement("td");
      dataAdmissaoCell.textContent = item.dataAdmissao;
      const remuneracaoCell = document.createElement("td");
      remuneracaoCell.textContent = item.remuneracao;
      const cargoCell = document.createElement("td");
      cargoCell.textContent = item.cargo.id; // ou item.cargo.nome, dependendo do que você deseja exibir
      row.appendChild(idCell);
      row.appendChild(nomeCell);
      row.appendChild(cpfCell);
      row.appendChild(dataAdmissaoCell);
      row.appendChild(remuneracaoCell);
      row.appendChild(cargoCell);
      itemTable.appendChild(row);
    });

    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
  }
});
