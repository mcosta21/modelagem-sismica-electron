
<h1 align="center">
<a target="_blank" href="https://github.com/mcosta21"><img src="https://raw.githubusercontent.com/mcosta21/ModeSS/master/images/modess-banner.jpg" alt="ModeSS"/></a>
</h1>

<h3 align="center">Modelagem Sísmica em Meios Isotrópicos</h3>
<h5 align="center">Iniciação Científica • <a href="http://www.fsma.edu.br/site/" target="_blank">Faculdade Católica Salesiana Macaé</a></h5>

<p align="center">
  <a href="#projeto">Projeto</a> •
  <a href="#funções">Funções</a> •
   <a href="#layout">Layout</a> •
  <a href="#tecnologias">Tecnologias</a> •
  <a href="#como-usar">Como usar</a> •
  <a href="#contribuir">Contribuir</a> •
  <a href="#licença">Licença</a> 
</p>

## Projeto

De modo geral, o projeto visa a implementação de um software capaz de realizar rotinas de cálculo do tempo de
chegada de modelagens 2D de dados sísmicos provenientes de meios isotrópicos. Com isso, além do trabalho teórico sobre conceitos de processos de aquisição, processamento e intepretação de dados sísmicos, será confeccionado modelos geológicos simplificados a fim de obter o tempo de chegada dos sinais de reflexão e refração.

## Funções

> **Modelagem Sísmica Símplificada**


<p align="center">
<img width="800" src="https://raw.githubusercontent.com/mcosta21/modelagem-sismica-electron/master/images/modelagem-simplificada.jpg"  alt="Modelagem Sísmica Símplificada"/>
</p>
<br/>

> **Modelagem Sísmica por Refletores de Mergulho**

<p align="center">
<img width="800" align="center" src="https://raw.githubusercontent.com/mcosta21/modelagem-sismica-electron/master/images/modelagem-ref-mergulho.jpg"  alt="Modelagem Sísmica por Refletores de Mergulho"/>
</p>

## Layout

<p align="center">
<img width="800" src="https://raw.githubusercontent.com/mcosta21/ModeSS/master/images/function-banner-1.jpg"  alt="Layout"/>
</p>

## Tecnologias

Com objetivo de criar uma ferramenta de fácil acesso no meio academico, o projeto foi desenvolvido com base no framework **Electron**, dado a possibilidade de desenvolvimento com recursos web (Frontend e Backend) e multiplataforma. Para a construção das interfaces, utilizou-se o framework **Bootstrap 4.5** em conjunto com a biblioteca **Charts.js** para construção dos gráficos.
<strong>
* [Electron](https://www.electronjs.org/)
* [Bootstrap v4.5](https://getbootstrap.com/)
* [ChartJs](https://www.chartjs.org/)
</strong>

## Como usar
Para clonar e rodar a aplicação, você vai precisar ter instalado em seu computador as seguintes ferramentas: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) (Que dispõe do [npm](http://npmjs.com)). Além disso, recomendo a utilização do [VSCode](https://code.visualstudio.com/) como editor de código.

```bash
# Clonar o repositório
$ git clone https://github.com/mcosta21/ModeSS.git

# Acessa a pasta do ModeSS
$ cd ModeSS

# Instalar as dependências
$ npm install

# Iniciar a aplicação
$ npm start

```

## Contribuir

1. Faça um fork do projeto.
2. Crie uma nova branch com as suas alterações: git checkout -b my-feature
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: git commit -m "feature: My new feature"
4. Envie as suas alterações: git push origin my-feature

> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://github.com/firstcontributions/first-contributions)


## Licença

Este projeto está sob a licença MIT.
> Desenvolvido por  [Marcio Costa](https://www.linkedin.com/in/marcio-costa-03131a149/).
