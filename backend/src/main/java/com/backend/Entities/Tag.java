package com.backend.Entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Entity @Table(name = "tag") @Data
public class Tag {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty @Size(min = 4, max = 40, message = "The name must have between 4 and 40 characters.")
    @Column(length = 40)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", nullable = false)
    private User creator;

    @ManyToMany()
    @JoinTable(name = "products_tag",
            joinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"))
    private List<Product> productsTagged;

    @Column(name = "creation_date", nullable = false, updatable = false)
    private Date creationDate;
}
