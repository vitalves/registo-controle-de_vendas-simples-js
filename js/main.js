var list = [
    {"desc":"rice", "amount":"1", "value":"5.40" },
    {"desc":"beer", "amount":"12", "value":"1.99" },
    {"desc":"meat", "amount":"1", "value":"15.00" }
];

function getTotal(list){
    var total = 0;
    for(var key in list){
        total += list[key].value * list[key].amount;
    }
    document.getElementById("totalValue").innerHTML = formatValue(total);
}

function setList(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>';
    for (var key in list) {
        table += '<tr><td>'+ formatDesc(list[key].desc) +'</td>';
        table += '<td>'+ formatAmount(list[key].amount) +'</td>';
        table += '<td>'+ formatValue(list[key].value) +'</td>';
        table += '<td><button class="btn btn-primary" onclick="setUpdate('+key+')">Edit</button> &nbsp ' + 
        '<button class="btn btn-danger" onclick="deleteData('+key+')">Delete</button></td></tr>';
    }
    table += '</tbody>';
    document.querySelector("table#listTable").innerHTML = table;

    getTotal(list);
    saveListStorage(list);
}

function formatDesc(desc){
    //transforma tudo para minusculo
    var str = desc.toLowerCase();
    //Pega o 1º caractere [0] . transforma em maius. Concatena com o restante [1]
    str = str.charAt(0).toUpperCase() + str.slice(1); 
    return str;
}

function formatValue(value){
    //transforma em FLoat .  define 2 num após o "." . transforma para string novamente (+"")
    var str = parseFloat(value).toFixed(2) + "";
    //altera o ponto para uma vírgula
    str = str.replace(".", ",");
    str = "R$ " + str;
    return str;
}

function formatAmount(amount){
    return parseInt(amount);
}

function addData(){
    if(!validation()){
        return;
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc": desc, "amount": amount, "value": value });

    resetForm();
    setList(list);
}

function setUpdate(id){
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("desc").focus();
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input type="hidden" id="idUpdate" value="'+id+'">';
}

function resetForm(){
    document.getElementById("desc").value = "";
    document.getElementById("desc").focus();
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}

function updateData(){
    if(!validation()){
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {"desc":desc, "amount":amount, "value":value };

    resetForm();
    setList(list);
}

function deleteData(id){
    if(confirm("Deseja realmente deletar esse item?")){
        if(id === list.length - 1) { //se for o ultimo item
            list.pop();
        } else if(id === 0) { //se for o primeiro item [0]
            list.shift();
        } else {
            //slice - cria um novo array do 0 ao ID (sem pegar o ID)
            var arrAuxIni = list.slice(0,id);
            //slice - cria um novo array do ID ao ultimo (ou +1) (sem pegar o ID)
            var arrAuxEnd = list.slice(id+1); //ou slice(id, list.length-1)
            //concatena os novos arrays sem o id (atualizado)
            list = arrAuxIni.concat(arrAuxEnd);
        }
        setList(list);
    }
}

function validation(){
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    //document.getElementById("errors").style.display = "none";

    var errors = "";

    if(desc === ""){
        errors += "<p>Insira uma descrição.</p>";
    }
    if(amount === ""){
        errors += "<p>Insira uma quantidade</p>";
    } else if(amount != parseInt(amount)){
        errors += "<p>A quantidade inserida é inválida</p>";
    }
    if(value === ""){
        errors += "<p>Insira uma quantidade</p>";
    } else if(value != parseFloat(value)){
        errors += "<p>O valor inserido é inválido</p>";
    }

    if(errors != ""){
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "#C3C3C3";
        document.getElementById("errors").style.color = "#FFF";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "5px";
        document.getElementById("errors").style.borderRadius = "10px";

        document.getElementById("errors").innerHTML = "<h3>Erro:</h3>" + errors;
        return 0;
    } else {
        return 1;
    }
}

function deleteList(){
    if(confirm("Deseja realmente apagar essa lista?")){
        list = [];
        setList(list);
    }
}

function saveListStorage(list){
    //transforma o array em uma string no formato JSON
    var jsonStr = JSON.stringify(list);
    //salva no localstorage
    localStorage.setItem("list", jsonStr);
}

//funcao de inicializacão
function iniListStorage(){
    //pega os valores no localstorage
    var testList = localStorage.getItem("list");
    if(testList){
        //transforma de sting no localstorage para Array novamente
        list = JSON.parse(testList);
    }
    setList(list);
}

iniListStorage();
//setList(list);
//console.log(getTotal(list));