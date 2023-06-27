let data = [];
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
.then((response) => response.json())
.then((responseData) => {
   data = responseData;
   console.log(data);
    renderTable(data);
    
});

function renderTable(data){
   const tableBody = document.getElementById("tableBody");

   tableBody.innerHTML = "";
   data.forEach((item) => {
   const price_change_Class = item.price_change_percentage_24h > 0 ? 
    "positive" : "negative";
    const row = document.createElement("tr");
    row.innerHTML = `<td class="coin"><img src ="${item.image}" alt = "${item.name}" width = "30"/>${item.name}</td>
    <td class = "symbol">${(item.symbol).toUpperCase()}</td>
    <td>&dollar;${item.current_price}</td>
    <td class="perc-change ${price_change_Class}">${item.price_change_percentage_24h}</td>
    <td class="mkt-cap">${item.market_cap}</td>
    `
    
    tableBody.appendChild(row);
   })
}

let searchInput = document.getElementById("search");
searchInput.addEventListener("keyup",(e)=> {
    searchValue = e.target.value.trim();
    if(searchValue === ''){
        renderTable(data);
        return;
    }
    else{
        let filteredData = data.filter((item) => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.symbol.toLowerCase().includes(searchValue.toLowerCase());
        })
        renderTable(filteredData);
    }
})


// sort the percentage change
const percentageBtn = document.getElementById("sortPercentChange");
percentageBtn.addEventListener('click', ()=>{
   data.sort((a,b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
   renderTable(data);
})

// sort the market cap change
const mktBtn = document.getElementById("sortMktCap");
mktBtn.addEventListener('click', ()=>{
 data.sort((a,b) => b.market_cap - a.market_cap);
   renderTable(data);
//    mktBtn.addEventListener('click', ()=>{
//     data.sort((a,b) => a.market_cap - b.market_cap);
//       renderTable(data);
//    })
})