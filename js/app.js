const izracun_marze = () => {
  const prodajna_cijena = document.getElementById("marza_pc").value;
  const nabavna_cijena = document.getElementById("marza_nc").value;
  const rezultat_marze = document.getElementById("rezultat_marze");
  if (prodajna_cijena > 0 && nabavna_cijena > 0) {
    const a = prodajna_cijena - nabavna_cijena;
    const b = a * 100;
    const ce = b / nabavna_cijena;
    rezultat_marze.innerHTML = "Marža je " + ce;
  } else {
    rezultat_marze.innerHTML = "Nešto ste krivo unjeli!";
  }
  console.log(prodajna_cijena);
  console.log(nabavna_cijena);
  console.log(rezultat_marze);
};
