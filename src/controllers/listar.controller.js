document.addEventListener("DOMContentLoaded", (event) => {
  const listarOption = document.getElementById("listarColaboladores");
  const prevPage = document.getElementById("prevPage");
  const nextPage = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");
  const homepage = document.getElementById("homepage");
  const tableColaboladores = document.getElementById("tableColaboladores");

  let currentPage = 1;
  const itemsPerPage = 10;
  let items = [];
  let totalItems = 0;
  let totalPages = 0;

  listarOption.addEventListener("click", function (event) {
    event.preventDefault();
    fetchItems(currentPage);
    homepage.style.display = "none";
    tableColaboladores.style.display = "block";
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
      })
      .catch((error) => {
        console.error("Erro ao buscar os itens:", error);
        alert(
          "Erro ao buscar os itens. Por favor, tente novamente mais tarde."
        );
      });
  }

  function renderTable() {
    const itemTable = document.querySelector("#itemTable tbody");
    itemTable.innerHTML = "";

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
      cargoCell.textContent = item.cargo.id;
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
