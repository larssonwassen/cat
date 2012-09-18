/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.chl.larsdan.glassfisk;

import edu.chl.hajo.shop.core.Product;
import javax.xml.bind.annotation.*;


/**
 *
 * @author xclose
 */
@XmlRootElement(name="product")
@XmlAccessorType(XmlAccessType.PROPERTY)
public class ProductProxy {
    
    private Product prod;
    
    public ProductProxy(){
        
    }
    
    public ProductProxy(String name, double price) {
        this.prod = new Product(name, price);    
    }
    public ProductProxy(Product prod){
        this.prod = prod;
    }
    public ProductProxy(Long id, String name, double price) {
        this.prod = new Product(id, name, price);
    }

    @XmlAttribute(required=true)
    public Long getId() {
        return prod.getId();
    }
    @XmlElement(required=true)
    public double getPrice() {
        return prod.getPrice();
    }
    @XmlElement(required=true)
    public String getName(){
        return prod.getName();
    }  
    
    
    
}
