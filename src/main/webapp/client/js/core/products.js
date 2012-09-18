

var ProductProxy = function( baseUri ){
    
    this.baseUri = baseUri; 
}


ProductProxy.prototype = (function (){ 
    
    return {
        find: function( id ){
            return $.ajax({
                type: 'GET',
                url: this.baseUri+"/get/"+id
            }); 
        },
        
        getAll: function() {
            return $.getJSON(this.baseUri);
        },
        
        add: function( product ){
            return $.ajax({
                type: 'POST',
                url: this.baseUri+"/add/",
                data: product   
            }); 
        },
        
        update: function ( product ){  
        // Not implemented
        },
        
        remove: function ( id ){ 
            return $.ajax({
                type: 'DELETE',
                url: this.baseUri + "/delete/" + id
            });
        }  
    }  
}());






