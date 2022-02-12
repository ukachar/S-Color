const dropdown = document.getElementById("jubZavrsni");
dropdown.length = 0;
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
  if (praznoPolje(kvadratura) || praznoPolje(bunt)) {
    return (rezultat_kubika.innerHTML = "Nešto ste krivo upisali");
  } else {
    return (rezultat_kubika.innerHTML = `Kubikaža je ${b} m³`);
  }
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

const onLoad = () => {
  //Dodavanje vrijednosti u dropdown

  let defaultOption = document.createElement("option");
  defaultOption.text = "Izaberite završni sloj";
  defaultOption.value = null;

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  const url = "./js/jub_materijali.json";

  fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.warn("Nastao je problem. Status Code: " + response.status);
        return;
      }

      response.json().then(function (data) {
        let option;
        console.log(data);
        console.log(data.ljepilo);
        for (let i = 0; i < data.zavrsni.length; i++) {
          option = document.createElement("option");
          option.text = data.zavrsni[i].naziv;
          option.value = data.zavrsni[i].id_value;
          dropdown.add(option);
        }
      });
    })
    .catch(function (err) {
      console.error("Fetch Error -", err);
    });
};

const izracunJubFasade = () => {
  const rezultatiJUB = document.getElementById("rezultatiJub");

  const kvadraturaJub = document.getElementById("kvadraturaJub").value;
  if (praznoPolje(kvadraturaJub)) {
    rezultatiJUB.innerHTML =
      '<p style="color:red">Morate upisati kvadraturu i odabrati završnu žbuku!</p>';
  } else {
    fetch("./js/jub_materijali.json")
      .then((response) => response.json())
      .then((data) => {
        const value = dropdown.options[dropdown.selectedIndex].value;
        const arej = data.zavrsni;

        // Filtriranje JSON-a
        let pretraga = arej.filter(function (zbuka) {
          return zbuka.id_value == value;
        });
        let preracunZbuke = pretraga[0].potrosnja * kvadraturaJub;
        const spaletni = pretraga[0];
        console.log(preracunZbuke);
        console.log(kvadraturaJub);

        //Prikaz rezultata
        rezultatiJUB.innerHTML = `<p>Za ${kvadraturaJub}m2 Vam treba: <br> ${preracunZbuke}kg žbuke. <br> 
      ${data.grund[0].potrosnja * kvadraturaJub} kg grunda. <br>
      ${(data.tiple[1].potrosnja * kvadraturaJub).toFixed(
        2
      )} m2 armaturne mrežice.<br> 
      ${8 * kvadraturaJub} kg ljepila. <br>
      ${data.dodaci[0].potrosnja * kvadraturaJub} metara cokl profila <br> ${
          data.dodaci[1].potrosnja * kvadraturaJub
        } metara kutnika s mrežicom <br>
        ${
          data.dodaci[2].potrosnja * kvadraturaJub
        } metara špaletnog profila <br> ${
          data.dodaci[3].potrosnja * kvadraturaJub
        } metara okapnog profila <br>
      ${data.tiple[0].potrosnja * kvadraturaJub} komada tipli.<br> </p> `;
      });
  }
};

//Izračun kubika u kvadrate
const izracunKuk = () => {
  const kukCijena = document.getElementById("kukCijena").value;
  const kukStiropor = document.getElementById("kukStiropor").value;
  const rezultatiKuk = document.getElementById("rezultatiKuk");
  let izracun = (kukCijena / 100) * kukStiropor;
  rezultatiKuk.innerHTML = `<p>${izracun.toFixed(3)} m2</p>`;
};
