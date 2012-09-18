/********************************* 
 *  
 *  Control part of application
 *  NOTE: this is used with XHTML
 */
// Connect controls (buttons etc.) on page to listener below
// Using JQuery style
$(document).ready(function(){
    $('#btnList').on('click', control.menuListener);
    $('#btnAdd').on('click', control.menuListener);
    $('#btnDel').on('click', control.menuListener);
    control.init();
})

{
    var table;
}
/*
 *   Listeners for the controls on person.html
 *   This is a singleton (no contructor function)
 */   
var control = (function (){
    
    // NOTE: Extra part "rs" in path
    var proxy = new ProductProxy("http://localhost:8080/glassfisk/rs/products");
    var selectedProduct;
    var table;
    
    // Listeners
    return {
        init: function(){ 
            table = new Table(["id", "name", "price"]); 
            table.addHandler(control.tableListener);
            table.setParent('#mainSec'); 
        },
        
        menuListener: function(){
            var deferred;
            if( this.id === "btnAdd"){
                var d = new Dialog();
                d.addHandler(control.dialogListener);
                d.setParent("#dialog");
                d.render();
            }else if( this.id === "btnList"){
                deferred = proxy.getAll();
                deferred.done(function(products){
                    table.clear();
                    table.addRows(products);
                    table.render(); 
                }); 
                deferred.fail(function(){
                    alert("Failed")
                });
            } else if( this.id === "btnDel"){
                if( ! selectedProduct){
                    return;
                }
                deferred = proxy.remove(selectedProduct.id);
                deferred.done(function(){
                    selectedProduct = null;
                    alert("Done");
                });
                deferred.fail(function(){
                    alert("Fail");
                });
            }
        }, 
        
        tableListener: function( product ){
            selectedProduct = product;
        },
        
        dialogListener: function(action, data ){
            var deferred;
            if( action === "save"){  // Always = = = (3)
                deferred = proxy.add(data);
                deferred.done(function(){
                    alert("Done");
                });
                deferred.fail(function(){
                    alert("Fail");
                });
            }
        }
        
    }       
}()); 
