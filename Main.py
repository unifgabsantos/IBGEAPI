def Busca():
    from os import system
    system('cls')
    import requests,json
    import matplotlib.pyplot
    site='https://servicodados.ibge.gov.br/api/v2/censos/nomes/'+input("Digite o nome: ")
    dados=json.loads(requests.get(site).text)
    periodo=[]
    frequencia=[]
    try:
        for i in range(len(dados[0]['res'])):
            periodo.append((dados[0]['res'][i]['periodo'].replace(",","-")).replace("[",""))
            frequencia.append(dados[0]['res'][i]['frequencia'])
    except:
        print("Nome não encontrado. =(")
        return 0
    matplotlib.pyplot.plot(periodo, frequencia)
    matplotlib.pyplot.show()
Busca()