/*
 *  A Dialog GUI component
 *  
 *   NOTE: this is used with XHTML
 *  
 */
var Dialog = function(product, id){
    // Instance attributes
    this.product = product;
    if( id ){
        this.id = id;
    }
}

// Shared methods
Dialog.prototype = (function(){ 
     
    var CLASS = "dialog"; 
    
    // Public API
    return{
        addHandler: function( handler ){
            this.handler = handler;
        },
        
        setParent: function( selector ){
            this.parent = selector;  
        },
           
        render: function(){
            if( ! this.parent ){ // Should work for null and undefined
                throw "No parent defined";
            }
           
            var html = this.toHtml();
            // Must render befor attaching listeners (will overwrite)
            $(this.parent).html(html);
            // "this" will be the control inside listener function
            var self = this; 
            
            // Eventhandler
            $(this.parent).find("#save")  
            .on('click', function(){
                var product = {};
                product.id =  $(self.parent).find("#id").val();
                product.name = $(self.parent).find("#name").val();
                product.price = $(self.parent).find("#price").val();
                if( self.handler ){
                    self.handler( "save", product ) // if defined!
                }
                $(self.parent).html("");  
            }); 
            $(this.parent).find( "#cancel").click(function(){
                $(self.parent).html("");
            });
            $(this.parent).find( "#del").click(function(){
                var product = {};
                product.id =  $(self.parent).find("#id").val();
                product.name = $(self.parent).find("#name").val();
                product.price =  $(self.parent).find("#price").val();           
                self.handler( "del", product );
                $(self.parent).html("");
            });
        },
        // This is EXTREMLY when using Xhtml every single space, quote, etc must be correct!!!
        toHtml : function(){
            var product = this.product || {
                id:"", 
                name:"", 
                price:""
            };
            // This should of course be configurable
            var html;
            if( this.id ){
                html = "<div id='"+ this.id +"' class='"+ CLASS + "'>"; 
            }else{
                html = "<div class='"+ CLASS + "'>"; 
            }
            html += "<table>"  
            + "<tr><td><label for='id'>id</label></td><td>"
            + "<input id='id' type='text' size='6' value='"+ product.id + "'/></td></tr>" 
            + "<tr><td><label for='name'>name</label></td><td>" 
            + "<input id='name' type='text' size='14' value='"+ product.name + "'/></td></tr>" 
            + "<tr><td><label for='price'>price</label></td><td>" 
            + "<input id='price' type='text' size='6' value='"+ product.price +"'/></td></tr>" 
            + "</table>"
            + "<input id='save' type='button' value='Save'/>" 
            + "<input id='cancel' type='button' value='Cancel'/>"
            + "</div>";
            return html;
        }
    }
})();


