angular.module("app", []);
angular.module("app").controller("Main", function($http, $scope,$filter) {
    function Grafico(valores,datas,div){
        var data = [
            {
              x: datas,
              y: valores,
              type: 'scatter'
            }
          ];
          Plotly.newPlot(div, data);
    }
    $scope.Buscar=function(){
        var nome=document.getElementById('nome').value;
        var dados=[];
        var resultado = document.getElementById("resultado");
        if (nome==""){
            resultado.value="";
            resultado.innerHTML="<br><h4>Digite um nome!</h4>";
        }
        else{
            $http({method: "GET", url:'https://servicodados.ibge.gov.br/api/v2/censos/nomes/'+nome}).then(function (response){
                if(response.data[0]!=null){
                    resultado.value="";
                    var quantidade=0,valores=[],datas=[];
                    for(x=0;x<response.data[0].res.length;x++){
                        valores.push(response.data[0].res[x].frequencia);
                        datas.push( ((response.data[0].res[x].periodo).replace('[', '')) );
                        quantidade+=response.data[0].res[x].frequencia;
                    }
                    resultado.innerHTML="<br><h5>Total: "+quantidade+"</h5>";
                    Grafico(valores,datas,"myDiv");
                    console.log(response.data);
                }
                else{
                    resultado.value="";
                    document.getElementById("myDiv").innerHTML="";
                    resultado.innerHTML="<br><h4>Nome não encontrado</h4>";
                }
            });
        }

    }
    $scope.Pib=function(){
        $http({method: "GET", url:"https://servicodados.ibge.gov.br/api/v3/agregados/6784/periodos/1996|1997|1998|1999|2000|2001|2002|2003|2004|2005|2006|2007|2008|2009|2010|2011|2012|2013|2014|2015|2016|2017|2018/variaveis/9808?localidades=N1[all]"}).then(function (response){
            anos=[],valores=[];
            for(x=1996;x<2018;x++){
                anos.push(x);
                valores.push(response.data[0].resultados[0].series[0].serie[x]);
            }
            document.getElementById("titulo").innerHTML="Evolução do PIB"
            Grafico(valores,anos,"PIB");
        });
    }
});