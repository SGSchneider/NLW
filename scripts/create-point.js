
function getUF(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json() )
    .then( states=> {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })

}

getUF();

document.querySelector("select[name=uf]")
.addEventListener("change", getCity)




function getCity(event){

    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const indexUF = event.target.selectedIndex
    stateInput.value = event.target.options[indexUF].text

    const ufID = event.target.value;

    fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufID}/municipios`
        )
    .then(res => res.json() )
    .then( cities=>{
        citySelect.innerHTML= null;
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }
    })

    citySelect.disabled = false
}