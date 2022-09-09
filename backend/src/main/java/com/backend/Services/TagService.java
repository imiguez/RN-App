package com.backend.Services;

import com.backend.Entities.Tag;
import com.backend.Exceptions.ConflictException;
import com.backend.Exceptions.NotFoundException;
import com.backend.Repositories.TagRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service @Slf4j
public class TagService {
    @Autowired
    private TagRepository tagRepo;

    @Transactional
    public Tag findTagById(Long id) {
        return this.tagRepo.findById(id).orElseThrow(
                () -> new NotFoundException("tag", "id",id.toString())
        );
    }

    @Transactional
    public Tag insertTag(Tag tag) {
        if (tagRepo.existsTagByName(tag.getName()))
            throw new ConflictException("Tag with name '"+tag.getName()+"' already exists.");
        tag.setCreationDate(new Date());
        return this.tagRepo.save(tag);
    }



}
