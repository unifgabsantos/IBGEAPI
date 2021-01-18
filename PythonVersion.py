def Busca(nome):
    import requests,json,matplotlib.pyplot,platform
    from os import system
    site='https://servicodados.ibge.gov.br/api/v2/censos/nomes/'+nome
    dados=json.loads(requests.get(site).text)
    periodo=[]
    frequencia=[]
    contador=0
    try:
        for i in range(len(dados[0]['res'])):
            periodo.append((dados[0]['res'][i]['periodo'].replace(",","-")).replace("[",""))
            valor=dados[0]['res'][i]['frequencia']
            contador+=valor
            frequencia.append(valor)
    except:
        print("Nome não encontrado. =(\n")
        return 0
    matplotlib.pyplot.plot(periodo, frequencia)
    matplotlib.pyplot.xlabel('\nPeriodo\n\nTotal: %s'%str(contador))
    matplotlib.pyplot.ylabel('Frequencia\n')
    matplotlib.pyplot.title('IBGE API Pessoas')
    matplotlib.pyplot.show()
import PySimpleGUI as sg
layout = [[sg.Text("Digite o nome: ")],
          [sg.Input(key='nome')],
          [sg.Button('Buscar')]]
window = sg.Window('IBGE API', layout)
while True:
    event, values = window.read()
    if event == sg.WINDOW_CLOSED or event == 'Quit':
        break
    elif event=="Buscar":
        Busca(values['nome'])
window.close()

