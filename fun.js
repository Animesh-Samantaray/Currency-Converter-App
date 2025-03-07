const base_url="https://api.exchangerate-api.com/v4/latest/";
const dropdowns = document.querySelectorAll(".dropdowns select");
const btn = document.querySelector("form button");
let amount = document.querySelector(".getter");
let From=document.querySelector(".From");
let To = document.querySelector(".To");
let output=document.querySelector(".output");
for(let select of dropdowns){ 
    for(let code in countryList){
        const opt = document.createElement("option");
        opt.value= code;
        opt.innerHTML=code;
        select.append(opt);
        if(select.name=="From" && code=="USD"){
            opt.selected="selected";
        }
        else if(select.name=="To" && code=="INR"){
            opt.selected="selected";
        }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

function updateFlag(element){
    let code = element.value;
    let country = countryList[code];
    let img = element.parentElement.querySelector("img");
    img.src=`https://flagsapi.com/${country}/flat/64.png`;
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    if(amount.value=="" || amount.value<1){
        amount.value=1;
    }
    
    const url=`${base_url}${From.value}`;
    let response = await fetch(url);
    let data = await response.json();
    let exchangeRate = data.rates[To.value];
    console.log(exchangeRate);
    output.innerHTML=`${amount.value} ${From.value} = ${amount.value*exchangeRate} ${To.value}`;
})
