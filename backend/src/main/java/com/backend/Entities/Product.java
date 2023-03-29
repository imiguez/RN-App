package com.backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity @Table(name = "product") @Data
public class Product {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(nullable = false, updatable = false)
    private Long id;

    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", referencedColumnName = "id", nullable = false)
    private User owner;
*/
    @JsonIgnore
    @ManyToMany(mappedBy = "productsTagged", fetch = FetchType.LAZY)
    private List<Tag> tags = new ArrayList<>();

    @Size(max = 255, message = "The description must have less than 255 characteres.")
    @Column()
    private String description;

    @Column(columnDefinition = "BYTEA")
    private byte[] image;
    @Column(name = "creation_date", nullable = false, updatable = false)
    private Date creationDate;


    public void addTag(Tag tag) {
        if (!tags.contains(tag))
            tags.add(tag);
    }

}
