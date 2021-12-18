function praznoPolje(str) {
  return !str.trim().length;
}

const izracun_marze = () => {
  const prodajna_cijena = document.getElementById("marza_pc").value;
  const nabavna_cijena = document.getElementById("marza_nc").value;
  const rezultat_marze = document.getElementById("rezultat_marze");
  if (prodajna_cijena > 0 && nabavna_cijena > 0) {
    const a = prodajna_cijena - nabavna_cijena;
    const b = a * 100;
    const c = b / nabavna_cijena;
    rezultat_marze.innerHTML = "Marža je " + c.toFixed(2) + " %";
  } else {
    rezultat_marze.innerHTML = "Nešto ste krivo unjeli!";
  }
};

const izracun_stir_kubika = () => {
  const kvadratura = document.getElementById("kvadr_stir").value;
  const bunt = document.getElementById("kvadr_bunt").value;
  const rezultat_kubika = document.getElementById("rezultat_kubika");
  const a = kvadratura / bunt;
  const b = a / 4;
  return (rezultat_kubika.innerHTML = `Kubikaža je ${b} m³`);
};

const izracun_ostrbt = () => {
  const ostrbtNc = document.getElementById("ostrbt_nc").value;
  const ostrbtVpc = document.getElementById("ostrbt_vpc").value;
  const rezultat_ostrbt = document.getElementById("rezultat_ostrbt");
  const a = ostrbtNc / ostrbtVpc;
  const b = 1 - a;
  const c = b * 100;
  if (praznoPolje(ostrbtVpc) || praznoPolje(ostrbtNc)) {
    return (rezultat_ostrbt.innerHTML = "Nešto ste krivo upisali");
  } else {
    return (rezultat_ostrbt.innerHTML = `Ostaje ${c.toFixed(2)} % rabata.`);
  }
};
