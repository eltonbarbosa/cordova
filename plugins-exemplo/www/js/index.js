var app = {
    initialize: function() {
        this.bindEvents();
    },
   
    bindEvents: function() {
        //evento cordova para sinalizar que todos os recursos necessarios foram carregados
        document.addEventListener('deviceready', this.onDeviceReady, false);

        //adicionando listeners para os botoes de acoes
       document.getElementById('save').addEventListener("click", app.save);
       document.getElementById('infoDevice').addEventListener("click", app.info);
    },
  
    onDeviceReady: function() {
      //habilita os botoes depois que tudo estiver devidamente carregado'
       var actions = document.getElementsByClassName("acoes-plugin");
       if(actions){
           for(var i = 0; i < actions.length; i++){
               actions[i].style.display = 'block';
           }
       }
    },
    
    info: function(){
        var parentElement = document.getElementById("info");
             parentElement.innerHTML = 
             "<p>Modelo: " + device.model + "</p>" +
             "<p>Plataforma:" + device.platform + "</p>"+
             "<p>Versão: " + device.version + "</p>" +
             "<p>UUID: " + device.uuid + "</p>"
    },

    save : function(){

        var campoNome = document.getElementById("nome").value;
        var campoPhone = document.getElementById("phone").value;
       
        var novoContato = navigator.contacts.create();

        //Adicionando um nome
        novoContato.displayName = campoNome;

        //Adicionando um telefone
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('mobile', campoPhone , true);
        novoContato.phoneNumbers = phoneNumbers;

        //salvando no dispositivo
        novoContato.save(app.saveSuccess, app.saveError);

    },
    //callback para o recurso contact.save
    saveSuccess : function(){
        alert('Contato Salvo!');
    },
    //callback para o recurso contact.save
    saveError : function(){
        alert('Erro ao salvar Contato');
    }

};

app.initialize();