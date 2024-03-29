package com.backend.ApiControllers;

import com.backend.Entities.Tag;
import com.backend.Services.TagService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController @RequestMapping("/api/tags")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping("/{id}")
    public ResponseEntity<Tag> getTagById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(tagService.findTagById(id));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Tag> insertTag(@Valid @RequestBody Tag tag) {
        return ResponseEntity.ok().body(tagService.insertTag(tag));
    }

}
