package com.backend.Services;

import com.backend.Entities.Product;
import com.backend.Exceptions.ConflictException;
import com.backend.Exceptions.NotFoundException;
import com.backend.Repositories.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service @Slf4j
public class ProductService {
    @Autowired
    private ProductRepository prodRepo;

    @Transactional
    public Product findProductById(Long id) {
        return prodRepo.findById(id).orElseThrow(
                () -> new NotFoundException("product", "id", id.toString())
        );
    }

    @Transactional
    public Product insertProduct(Product product) {
        product.setCreationDate(new Date());
        return this.prodRepo.save(product);
    }

    @Transactional
    public Product updateProduct(Product product) {
        if (!this.prodRepo.existsById(product.getId()))
            throw new NotFoundException("product", "id", product.getId().toString());
        return this.prodRepo.save(product);
    }


}
