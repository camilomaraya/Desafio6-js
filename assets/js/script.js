const input = document.getElementById("clp");
const selectCoin = document.getElementById("selectMoneda");
const buttonBuscar = document.getElementById("btnBuscar");
const result = document.getElementById("resultado");
let codeMindicador = "";
let valorMoneda = "";
let inputMoneda = "";

async function consult(code , symbol){
  try{
    let returnApi = await fetch(`https://mindicador.cl/api/${code}`);
    let resultApi = await returnApi.json();
    console.log(resultApi.serie)
    valorMoneda = + resultApi.serie[0].valor;
    result.innerHTML = `El resultado de la conversión es igual ${symbol}${(inputMoneda / valorMoneda).toFixed(4)} `;
    graphic(resultApi.serie)
  }catch (e){
    e.message = "Api caída, intente mas tarde"
    alert(e.message)
    
  }
}

buttonBuscar.addEventListener("click", () => {
  let moneda = selectCoin.value;
  inputMoneda = input.value;
  if (inputMoneda != "" && inputMoneda > 0){
    if(moneda === "UF"){
      codeMindicador = "uf";
      symbol = "$"
      consult(codeMindicador , symbol)
     }else if(moneda === "Euro"){
      codeMindicador = "euro";
      symbol = "€"
      consult(codeMindicador , symbol)
     } else{
      code = "";
     }
  }else{
    alert("El número ingresado debe ser mayor que 0")
  }  
})
function graphic(valoresMoneda){

  const containerCanvas = document.getElementById("containerCanvas");
  containerCanvas.innerHTML = '<canvas id="myChart" style="width:100%" ></canvas>';
  let yValues = valoresMoneda.map(eachMoneda => eachMoneda.valor).slice(0,10).reverse();
  
  let xValues = valoresMoneda.map(eachMoneda => eachMoneda.fecha.slice(5,10)).slice(0,10).reverse();

  new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        label:"",
        data: yValues,
        fill: false,
        borderWidth:1,
        pointRadius: 1,
        borderColor: "#f0f0f2",
        backgroundColor:"#f0f0f2",       
      }]
    },    
    options: {
      scales:{       
        x:{
          grid:{
            color: "#f0f0f2",
          } 
        },
        y:{
          grid:{
            color: "#f0f0f2",
          }        
        }
      },
      plugins: {
        legend: {
            display: false,  
            }
        }
    }
  });
}