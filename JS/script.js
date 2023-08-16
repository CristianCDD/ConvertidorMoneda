const dropList = document.querySelectorAll(".drop-list select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("form button");

//Primero agarramos el primer selected (0), y despues el segundo selected (1)
for(let i = 0; i<dropList.length;i++){

 for(currency_code in country_list){

    let selected;
    console.log(i);
    //Primer selected
    if(i == 0){
        selected = currency_code == "USD" ? "selected" : ""; 
    /* Segundo selected */
    }else if(i == 1){
        selected = currency_code == "NPR" ? "selected" : ""; 

    }

    let optionTag = `<option value = "${currency_code}" ${selected} >${currency_code}</option>`
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
 }


 dropList[i].addEventListener('change', (e)=>{
    loadFlag(e.target);
    console.log(e);

 });
}

function loadFlag(element) {
    for(code in country_list){
        if(code == element.value){
            console.log(element.querySelector("img"));

            let imgTag = element.parentElement.querySelector("img");
            console.log(imgTag);
            imgTag.src = `https://flagsapi.com/${country_list[code]}/flat/64.png`;
        }
    }
}

window.addEventListener('load', (e)=>{
   
    getExchange();

})

getButton.addEventListener('click', (e)=>{
    e.preventDefault();
    getExchange();
})

const exchangaIcon = document.querySelector(".drop-list .icon");
exchangaIcon.addEventListener('click', (e)=>{
    exchangaIcon.classList.add('rotation');
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchange();
    setInterval(() => {
        exchangaIcon.classList.remove('rotation');
    }, 2000);
    

})

function getExchange(){
    const amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    const exchangeRateText = document.querySelector('.exchange-rate');
    
    if(amountVal == '' || amountVal == "0"){
        amount.value = '1';
        amountVal = 1;
    }
    let url = `https://v6.exchangerate-api.com/v6/e3d641c4930a8e757eaaebc4/latest/${fromCurrency.value}`;

    exchangeRateText.innerText = 'Opteniendo tipo de cambio';
    fetch(url).then(response => response.json()).then(result=>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateText.innerText =  `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(()=>{
        exchangeRateText.innerText = 'Algo salio mal'; 
    });
}