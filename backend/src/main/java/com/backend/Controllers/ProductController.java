package com.backend.Controllers;

import com.backend.Entities.Product;
import com.backend.Services.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProductController {

    @Autowired
    private ProductService prodService;

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(prodService.findProductById(id));
    }

    @PostMapping(path = "/product",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Product> insertProduct(@RequestBody Product product) {
        return ResponseEntity.ok().body(prodService.insertProduct(product));
    }

}
