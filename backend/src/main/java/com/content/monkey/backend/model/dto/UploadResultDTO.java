package com.content.monkey.backend.model.dto;

import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.SearchEntity;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UploadResultDTO {

    private SearchEntity searchEntity;
    private ReviewEntity reviewEntity;

    @Override
    public String toString() {
        return "UploadResultDTO{" +
                "searchEntity=" + searchEntity +
                ", reviewEntity=" + reviewEntity +
                '}';
    }
}
