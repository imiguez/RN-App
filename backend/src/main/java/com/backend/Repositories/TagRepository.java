package com.backend.Repositories;

import com.backend.Entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {

    public boolean existsTagByName(String name);

}
