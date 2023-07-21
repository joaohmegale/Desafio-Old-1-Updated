
const data = {
    "insurances": [{
        "id": 3322,
        "name": "Amil"
    }, {
        "id": 3293,
        "name": "Bradesco"
    }, {
        "id": 99231,
        "name": "Hapvida"
    }, {
        "id": 1322,
        "name": "CASSI"
    }, {
        "id": 23111,
        "name": "Sulamérica"
    }],
    "guides": [{
        "number": "3210998321",
        "start_date": "2021-04-23T19:18:47.210Z",
        "patient": {
            "id": 9321123,
            "name": "Augusto Ferreira",
            "thumb_url": "https://nosbastidores.com.br/wp-content/uploads/2019/12/James-Cameron-diz-que-tem-certeza-que-Avatar-ultrapassar%C3%A1-Vingadores.jpg"
        },
        "insurance_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 5567.2
    }, {
        "number": "287312832",
        "start_date": "2021-04-23T19:18:47.210Z",
        "patient": {
            "id": 93229123,
            "name": "Caio Carneiro",
            "thumb_url": "http://3.bp.blogspot.com/-XG5bGlqGnJw/T9lIcssnybI/AAAAAAAADTA/B23ezXOkx8Y/s1600/Aang.jpg"
        },
        "insurance_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 213.3
    }, {
        "number": "283718273",
        "start_date": "2021-04-22T19:18:47.210Z",
        "patient": {
            "id": 213122388,
            "name": "Luciano José",
            "thumb_url": "https://i.ytimg.com/vi/yUXd-enstO8/maxresdefault.jpg"
        },
        "insurance_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 88.99
    }, {
        "number": "009090321938",
        "start_date": "2021-04-20T19:18:47.210Z",
        "patient": {
            "id": 3367263,
            "name": "Felício Santos",
            "thumb_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSxlYabmRlKk43uvsBMIqjA7Rw_YCwK4TyA&usqp=CAU"
        },
        "insurance_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 828.99
    }, {
        "number": "8787128731",
        "start_date": "2021-04-01T19:18:47.210Z",
        "patient": {
            "id": 777882,
            "name": "Fernando Raposo"
        },
        "insurance_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 772
    }, {
        "number": "12929321",
        "start_date": "2021-04-02T19:18:47.210Z",
        "patient": {
            "id": 221,
            "name": "Paciente com nome grante pra colocar text ellipsis testando nome com paciente grande"
        },
        "insurance_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 221
    }]
};

let input = document.getElementById("search");
let select = document.getElementById("select");
let table = document.querySelector(`.table`);
let button = document.querySelector('#button');

renderTable(data.guides);
renderSelectOptions(data.insurances);


function renderTable(data) {
    
    let visual = '';

    data.forEach((el) => {
        let thumbnail = el.patient.thumb_url || " https://via.placeholder.com/150x150.jpg";
        let date = new Date(el.start_date);
        let formatedDate = date.toLocaleDateString('pt-BR');
        let price = el.price;
        let formatedprice = price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        let insuranceName = el.health_insurance.is_deleted ? `<s>${el.health_insurance.name}</s>` : el.health_insurance.name;

        visual+= `
            <tr>
            <td>${formatedDate}</td>
            <td>${el.number}</td>
            <td><img src ="${thumbnail}" alt = "profile" class = "profile-pick">${el.patient.name}</td>        
            <td title="${el.health_insurance.is_deleted ? 'Convênio Apagado' : ''}">${insuranceName}</td>        
            <td>${formatedprice}</td>        
            </tr>
        `
    });

    table.innerHTML = visual;

}

const searchBox = () => {
    
    let digited = input.value;
    let select_option = Number(select.value);
    
    let filtered = data.guides.filter(guide => { 
        let equals = true;

        if (select_option && guide.insurance_id !== select_option) {
            equals = false;
        }

        if (digited && !guide.patient.name.toLowerCase().includes(input.value.toLowerCase()) && !guide.number.includes(input.value)) {
            equals = false;
        }

        return equals;
    });

    renderTable(filtered);
}

function renderSelectOptions(data) {
    const select = document.getElementById("select");
    data.forEach(insurance=>{
        select.innerHTML += `<option value="${insurance.id}">${insurance.name}</option>`
    });
    
}

button.addEventListener("click",function() {
    renderTable(data.guides); 
    select.innerHTML = `<option value="0">Todas as opções.</option>`
    renderSelectOptions(data.insurances)
})
