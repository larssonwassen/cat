/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.chl.larsdan.glassfisk;

import edu.chl.hajo.shop.core.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author xclose
 */
@Path("/products")
public class ProductCatalogueResource {

    private final static IProductCatalogue prodcat = ProductCatalogue.newInstance();
    private final static Logger log = Logger.getAnonymousLogger();
    
    @GET
    @Path("{name}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<ProductProxy> getByName(@PathParam("name") String name) {
        List<ProductProxy> found = new ArrayList<ProductProxy>();
        for (Product p : prodcat.getAll()) {
            if (p.getName().equals(name)) {
                ProductProxy pp = new ProductProxy(p.getName(), p.getPrice());
                found.add(pp);
            }
        }
        return found;
    }

    @GET
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<ProductProxy> getAll() {
        log.log(Level.INFO, "getAll()");
        List<ProductProxy> all = new ArrayList<ProductProxy>();
        for (Product p : prodcat.getAll()) {
            all.add(new ProductProxy(p));
        }
        return all;
    }

    @GET
    @Path("/get/{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public ProductProxy getById(@PathParam("id") Long id) {
        Product p = prodcat.find(id);
        return new ProductProxy(p);
    }

    @DELETE
    @Path("/delete/{id}")
    public void removeById(@PathParam("id") Long id) {
        prodcat.remove(id);
    }

    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public void add(@FormParam("name") String name, @FormParam("price") double price) {

        log.log(Level.INFO, "add()");
        prodcat.add(new Product(name, price));

    }

    @PUT
    @Path("/update/{id}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public ProductProxy update(@PathParam("id") Long id, @FormParam("name") String name, @FormParam("price") double price) {
        Product p = new Product(id, name, price);
        prodcat.update(p);
        return new ProductProxy(p);
    }

    @GET
    @Path("/range")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<ProductProxy> getRange(@QueryParam("first") int firstResult, @QueryParam("max") int maxResults) {
        List<ProductProxy> subList = new ArrayList<ProductProxy>();
        for (Product p : prodcat.getAll().subList(firstResult, firstResult + maxResults)) {
            subList.add(new ProductProxy(p));
        }

        return subList;
    }

    @GET
    @Path("/count")
    public String getCount() {
        return Integer.toString(prodcat.getAll().size());
    }
}
