sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("projetonetflix.controller.Home", {
            onInit: function () {
                var menu = {
                    home: "Home",
                    series: "Séries",
                    movies: "Filmes",
                    categories: "Categorias"
                }

                var menuModel = new JSONModel();
                menuModel.setData(menu);

                var tela = this.getView();
                tela.setModel(menuModel, "ModeloMenu");

                var resultados = {
                    titles: []
                }
                var moviesModel = new JSONModel();
                moviesModel.setData(resultados);
                tela.setModel(moviesModel, "APIMovies");

            },
            onClickHome: function(){
                alert("Você clicou em 'Home' :)");
            },
            onClickSeries: function(){
                alert("Você clicou em 'Séries' :)");
            },
            onClickFilmes: function(){
                alert("Você clicou em 'Filmes' :)");
            },
            onClickCategorias: function(){
                alert("Você clicou em 'Categorias' :)");
            },
            onSearchClick: function(){
                var query = this.byId("inputSearch").getValue();
                //alert(query);

                const settings = {
                    async: true,
                    crossDomain: true,
                    url: 'https://netflix54.p.rapidapi.com/search/?query=' + query + '&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '274cdf02f1msh20e61c9e7e32eedp1a1f2ejsn5cdab2d732f9',
                        'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                    }
                };
                
                $.ajax(settings).done(function (response) {
                    console.log(response);

                    var view = this.getView();
                    var model = view.getModel("APIMovies");
                    var data = model.getData();

                    data.titles = [];
                    data.titles = response.titles;
                    model.refresh();

                }.bind(this));

            }
        });
    });
