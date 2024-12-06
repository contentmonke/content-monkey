package com.content.monkey.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "groups")
public class GroupEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "group_name")
    private String groupName;

    @Column(name = "description")
    private String description;

    @Column(name = "owner")
    private Long owner;

    @Column(name = "picture")
    private String picture;

    @Column(name = "is_public")
    private Boolean isPublic;

    @Column(name = "members")
    private List<Long> members;

    @Column(name = "join_requests")
    private List<Long> joinRequests;

    @Column(name = "discussion_boards")
    private List<Long> discussionBoards;

    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @Override
    public String toString() {
        return "GroupEntity{" +
                "id=" + id +
                ", groupName='" + groupName + '\'' +
                ", description='" + description + '\'' +
                ", owner=" + owner +
                ", isPublic=" + isPublic +
                ", memberIds=" + members +
                ", joinRequests=" + joinRequests +
                ", discussionBoardIds=" + discussionBoards +
                ", dateCreated=" + dateCreated +
                '}';
    }
}
