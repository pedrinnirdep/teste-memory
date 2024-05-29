document.addEventListener("DOMContentLoaded", function () {
  const updtColaboladores = document.getElementById("updtColaboladores");
  const dialogUpdt = document.getElementById("dialogUpdt");
  const IdBuscar = document.getElementById("IdBuscar");
  const btnIdBuscar = document.getElementById("btnIdBuscar");
  const overlay = document.getElementById("overlay");
  const updateForm = document.getElementById("updateForm");
  const updtNomeInput = document.getElementById("updtNomeInput");
  const updtCpfInput = document.getElementById("updtCpfInput");
  const updtDtAdmInput = document.getElementById("updtDtAdmInput");
  const updtRmnInput = document.getElementById("updtRmnInput");
  const updtCargoInput = document.getElementById("updtCargoInput");
  const btnUpdate = document.getElementById("btnUpdate");

  updtColaboladores.addEventListener("click", function () {
    dialogUpdt.style.display = "block";
    overlay.style.display = "block";
  });

  overlay.addEventListener("click", function () {
    dialogUpdt.style.display = "none";
    overlay.style.display = "none";
    updateForm.style.display = "none";
    limparFormulario();
  });

  dialogUpdt.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  function aplicarMascara(updtDtAdmInput) {
    let data = updtDtAdmInput.value.replace(/\D/g, "");
    if (data.length > 0) {
      data = data.replace(/^(\d{2})(\d)/, "$1/$2");
      data = data.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
    }
    updtDtAdmInput.value = data;
  }

  updtCpfInput.addEventListener("input", function () {
    let cpf = this.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cpf.length > 11) {
      cpf = cpf.slice(0, 11); // Limita o tamanho do CPF a 11 caracteres
    }
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Insere o primeiro ponto
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Insere o segundo ponto
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Insere o hífen
    this.value = cpf; // Atualiza o valor do campo
  });

  updtDtAdmInput.addEventListener("input", function () {
    aplicarMascara(this);
  });

  function limparFormulario() {
    IdBuscar.value = "";
    updtNomeInput.value = "";
    updtCpfInput.value = "";
    updtDtAdmInput.value = "";
    updtRmnInput.value = "";
    updtCargoInput.value = "";
  }

  btnIdBuscar.addEventListener("click", function () {
    const userId = IdBuscar.value.trim();
    if (userId !== "") {
      fetch(`http://localhost:3000/colaboradores/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Usuário não encontrado");
          }
          return response.json();
        })
        .then((userData) => {
          updtNomeInput.value = userData.nome;
          updtCpfInput.value = userData.cpf;
          updtDtAdmInput.value = userData.dataAdmissao;
          updtRmnInput.value = userData.remuneracao;
          updtCargoInput.value = userData.cargo.id;

          updateForm.style.display = "block";
        })
        .catch((error) => {
          console.error("Erro ao buscar usuário:", error);
          alert("Usuário não encontrado");
          updateForm.style.display = "none";
        });
    } else {
      alert("Por favor, digite um ID de usuário válido");
    }

    btnUpdate.addEventListener("click", function () {
      const userId = IdBuscar.value.trim();
      const userDataToUpdate = {
        nome: updtNomeInput.value,
        cpf: updtCpfInput.value,
        dataAdmissao: updtDtAdmInput.value,
        remuneracao: updtRmnInput.value,
        cargo: {
          id: updtCargoInput.value,
        },
      };

      fetch(`http://localhost:3000/colaboradores/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDataToUpdate),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Falha ao atualizar usuário");
          }
          return response.json();
        })
        .then(() => {
          dialogUpdt.style.display = "none";
          overlay.style.display = "none";

          limparFormulario();
          alert("Usuário atualizado com sucesso");
        })
        .catch((error) => {
          console.error("Erro ao atualizar usuário:", error);
          alert("Erro ao atualizar usuário");
        });
    });
  });
});
