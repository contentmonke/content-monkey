package com.content.monkey.backend.repository;

import com.content.monkey.backend.model.MediaEntity;
import com.content.monkey.backend.model.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MediaRepository extends JpaRepository<MediaEntity, Long> {

    List<MediaEntity> findByMediaTitle(String mediaTitle);

    List<MediaEntity> findByMediaTitleAndMediaType(String mediaTitle, String mediaType);

    List<MediaEntity> findByMediaTitleAndAuthor(String mediaTitle, String author);

    List<MediaEntity> findByMediaDurationLessThan(int duration);


    List<MediaEntity> findByid(Long id);

//    @Query("select * from media m where m.media_type='Book'")
//    List<MediaEntity> findHighestRatedBook();
    @Query(value = "SELECT DISTINCT * FROM media m WHERE m.media_type = :mediaType ORDER BY m.average_rating DESC LIMIT 7", nativeQuery = true)
    List<MediaEntity> findHighestRated(@Param("mediaType") String mediaType);

}
