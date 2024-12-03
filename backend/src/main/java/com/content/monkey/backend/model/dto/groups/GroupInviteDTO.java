package com.content.monkey.backend.model.dto.groups;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupInviteDTO {
    private Long groupId;
    private String groupName;
    private Long inviteeId;
    private Long inviterId;
    private String inviterName;
    private LocalDateTime dateSent;

    @Override
    public String toString() {
        return "GroupInviteDTO{" +
                "groupId=" + groupId +
                ", groupName='" + groupName + '\'' +
                ", inviteeId=" + inviteeId +
                ", inviterId=" + inviterId +
                ", inviterName='" + inviterName + '\'' +
                ", dateSent=" + dateSent +
                '}';
    }
}
