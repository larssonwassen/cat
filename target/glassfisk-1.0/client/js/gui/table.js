/*
 *  A Table GUI component
 *  
 *  NOTE: this is used with XHTML
 */
var Table = function(headers, rows, id){
    this.headers = headers || [];
    this.rows = rows || [];
    if( id ){
        this.id = id;
    }
}

Table.prototype = (function(){ 
 
    var CLASS = "'table'"; 

    return{ 
        addRow: function( row ){
            this.rows.push( row );
        },
        
        addRows: function( rows ){
            this.rows = this.rows.concat(rows);
        },
        
        removeRow : function ( nr ){
            // Return removed row 
            return this.rows.splice(nr, 1);
        },
        
        clear : function(){
            this.rows.length = 0; // Reuse same array
        },
        
        addHandler: function( handler ){ // Callback event handler
            this.handler = handler;
        },
        
        setParent: function( selector ){ // Where to render 
            this.parent = selector;  
        },
       
        render: function( ){
            if( ! this.parent ){ // Should work for null and undefined
                throw "No parent found, can't render";
            }

            var html = this.toHtml();
            // Insert (replace) the HTML into the DOM
            $(this.parent).html(html);

            //Set up the events
            var self = this;  // 'this' will change!
                       
            $(this.parent).find('tr')
            .on('click', function(){
                var product = {};
                product.id =  $(this).find('td').eq(0).html();
                product.name = $(this).find('td').eq(1).html();
                product.price =  $(this).find('td').eq(2).html();                             
                if( self.handler ){
                    self.handler(product);
                }
            });        
        },
        // VERY tricky when Xhtml (the X) if not correct DOM invalid state exception
        toHtml : function(){
            var hLen= this.headers.length;
            var html;
            if( this.id ){
                html = "<table id=" + this.id + " class=" + CLASS + "><thead><tr>";
            }else{
                html = "<table class=" + CLASS + "><thead><tr>"; 
            }
            for(var i=0; i < hLen; i++) {
                html += "<th>" + this.headers[i] + "</th>";
            }
            html += "</tr></thead><tbody>";
            var tLen = this.rows.length;
            for(var j = 0; j < tLen; j++) {
                html += "<tr>";
                for (var prop in this.rows[j]) {
                    html += "<td>" + this.rows[j][prop] + "</td>";
                }
                html += "<td><input type='checkbox'/></td>"; 
                html += "</tr>";
            }
            html += "</tbody></table>";
            return html;
        }
    }
}());

