document.addEventListener("DOMContentLoaded", function () {
  const pesquisarOption = document.getElementById("pesquisarOption");
  const dialogPesquisar = document.getElementById("dialogPesquisar");
  const closeButtonPesquisar = document.getElementById("closePesquisarButton");
  const overlay = document.getElementById("overlay");
  const searchInput = document.getElementById("searchInput");
  const colaboradoresTable = document.getElementById("colaboradoresTable");

  // Função para abrir o diálogo de pesquisa
  function openDialogPesquisar() {
    dialogPesquisar.style.display = "block";
    overlay.style.display = "block"; // Mostrar overlay
    searchInput.focus(); // Dar foco ao campo de entrada
  }

  // Função para fechar o diálogo de pesquisa
  function closeDialogPesquisar() {
    dialogPesquisar.style.display = "none";
    overlay.style.display = "none"; // Ocultar overlay
  }

  // Evento de clique no botão de pesquisa
  pesquisarOption.addEventListener("click", openDialogPesquisar);

  // Evento de clique no botão de fechar
  closeButtonPesquisar.addEventListener("click", closeDialogPesquisar);

  // Evento de clique no overlay para fechar o diálogo
  overlay.addEventListener("click", closeDialogPesquisar);

  // Impedir o fechamento do diálogo quando o conteúdo interno é clicado
  dialogPesquisar.addEventListener("click", function (event) {
    event.stopPropagation(); // Impede a propagação do evento de clique para o overlay
  });

  // Evento de input no campo de pesquisa
  searchInput.addEventListener("input", function () {
    const nome = searchInput.value.trim(); // Obtém o valor do input e remove espaços em branco no início e no final

    if (nome !== "") {
      // Se o input não estiver vazio
      fetch(`http://localhost:3000/colaboradores?nome_like=${nome}`)
        .then((response) => response.json())
        .then((data) => {
          renderColaboradores(data);
          colaboradoresTable.style.display = "block"; // Exibir a tabela
        });
    } else {
      colaboradoresTable.style.display = "none"; // Ocultar a tabela se o input estiver vazio
    }
  });

  // Função para renderizar os colaboradores na tabela
  function renderColaboradores(colaboradores) {
    const colaboradoresBody = document.getElementById("colaboradoresBody");
    colaboradoresBody.innerHTML = ""; // Limpa o conteúdo atual da tabela

    const nomePesquisado = searchInput.value.trim().toLowerCase(); // Obtém o nome pesquisado em letras minúsculas

    colaboradores.forEach((colaborador) => {
      const nomeColaborador = colaborador.nome.toLowerCase(); // Obtém o nome do colaborador em letras minúsculas

      if (nomeColaborador.includes(nomePesquisado)) {
        // Se o nome do colaborador incluir o nome pesquisado
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
