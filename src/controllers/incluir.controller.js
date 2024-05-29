document.addEventListener("DOMContentLoaded", function () {
  const openDialogButton = document.getElementById("incluirColaboladores");
  const btnCancelar = document.getElementById("btnCancelar");
  const dialogColaboladores = document.getElementById("dialogColaboladores");
  const overlay = document.getElementById("overlay");
  const addDtAdmInput = document.getElementById("addDtAdmInput");
  const addCpfInput = document.getElementById("addCpfInput");

  openDialogButton.addEventListener("click", function () {
    dialogColaboladores.style.display = "block";
    overlay.style.display = "block";
  });

  btnCancelar.addEventListener("click", function () {
    dialogColaboladores.style.display = "none";
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", function () {
    dialogColaboladores.style.display = "none";
    overlay.style.display = "none";
  });

  dialogColaboladores.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  addCpfInput.addEventListener("input", function () {
    let cpf = this.value.replace(/\D/g, "");
    if (cpf.length > 11) {
      cpf = cpf.slice(0, 11);
    }
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    this.value = cpf;
  });

  function aplicarMascara(addDtAdmInput) {
    let data = addDtAdmInput.value.replace(/\D/g, "");
    if (data.length > 0) {
      data = data.replace(/^(\d{2})(\d)/, "$1/$2");
      data = data.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
    }
    addDtAdmInput.value = data;
  }

  addDtAdmInput.addEventListener("input", function () {
    aplicarMascara(this);
  });

  const form = document.querySelector("#dialogColaboladores form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      if (key === "cargo") {
        data[key] = { id: parseInt(value) };
      } else {
        data[key] = value;
      }
    });

    fetch("http://localhost:3000/colaboradores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Erro ao enviar dados:", error);
      });
    dialogColaboladores.style.display = "none";
    overlay.style.display = "none";
    form.reset();
  });
});
