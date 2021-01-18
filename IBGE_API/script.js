angular.module("app", []);
angular.module("app").controller("Main", function($http, $scope,$filter) {
    $scope.Buscar=function(){
        var nome=document.getElementById('nome').value;
        var dados=[]
        var resultado = document.getElementById("resultado");
        if (nome==""){
            resultado.value="";
            resultado.innerHTML="<br><h4>Digite um nome!</h4>"
        }
        else{
            $http({method: "GET", url:'https://servicodados.ibge.gov.br/api/v2/censos/nomes/'+nome}).then(function (response){
                if(response.data[0]!=null){
                    resultado.value=""
                    var quantidade=0;
                    var valores=[];
                    var datas=[];
                    for(x=0;x<response.data[0].res.length;x++){
                        valores.push(response.data[0].res[x].frequencia)
                        datas.push( ((response.data[0].res[x].periodo).replace('[', '')) ) 
                        quantidade+=response.data[0].res[x].frequencia
                    }
                    resultado.innerHTML="<br><h5>Total: "+quantidade+"</h5>"
                    Grafico(valores,datas)
                    console.log(response.data);
                }
                else{
                    resultado.value=""
                    resultado.innerHTML="<br><h4>Nome não encontrado</h4>"
                }
            });
        }
        function Grafico(valores,datas){
            var data = [
                {
                  x: datas,
                  y: valores,
                  type: 'scatter'
                }
              ];
              Plotly.newPlot('myDiv', data);
        }
    }
});

