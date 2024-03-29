package com.backend.ApiControllers;

import com.backend.Entities.Product;
import com.backend.Services.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController @RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService prodService;

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(prodService.findProductById(id));
    }

    @PostMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Product> insertProduct(@Valid @RequestBody Product product) {
        return ResponseEntity.ok().body(prodService.insertProduct(product));
    }

}
