const dataToShow = require('./index.json');
const showElements = (value) => {
    const row = `<label>${value.label}:</label>
                 <input type="text" name="${value.item}"/><br>`;
    document.getElementById("Root").innerHTML += row;
}

function updateElementsToDisplay(){
    debugger;
    if(dataToShow.length > 0){
        dataToShow.forEach((value) => {
            showElements(value);
        });
    }
}

document.addEventListener('DOMContentLoaded', updateElementsToDisplay(), false);

document.addEventListener('submit', function(){
    console.log('Submitted');
    const fs = require('fs');
    const JSONdata = fs.readFileSync('./resultJSON.json','utf8');
    console.log('>>'+JSONdata);
    var arrayOfJSONData;
    if(JSONdata == '' || JSONdata.length<0 || JSONdata === 'undefined'){
        arrayOfJSONData = new Array();
    }
    else{
        arrayOfJSONData = JSON.parse(JSONdata);
    }
    var jsonObject = {"FirstName":document.getElementsByName('FirstName')[0].value,
    "LastName":document.getElementsByName('LastName')[0].value,
    "Position":document.getElementsByName('Position')[0].value,
    "Tenure":document.getElementsByName('Tenure')[0].value
    };
    try{
    arrayOfJSONData.push(jsonObject);
    }catch(e){
        console.log('message: '+e.message);
    }
    fs.writeFileSync('./resultJSON.json', JSON.stringify(arrayOfJSONData));
});