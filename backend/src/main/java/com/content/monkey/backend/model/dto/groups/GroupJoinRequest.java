package com.content.monkey.backend.model.dto.groups;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupJoinRequest {
    private Long groupId;
    private Long approverId;
    private Long requesterId;
    private Boolean isApproved;

    @Override
    public String toString() {
        return "GroupJoinRequest{" +
                "groupId=" + groupId +
                ", approverId=" + approverId +
                ", requesterId=" + requesterId +
                ", isApproved=" + isApproved +
                '}';
    }
}
