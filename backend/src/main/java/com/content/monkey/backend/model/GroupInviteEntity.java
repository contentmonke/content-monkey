package com.content.monkey.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "group_invites")
public class GroupInviteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "group_id")
    private Long groupId;

    @Column(name = "invitee_id")
    private Long inviteeId;

    @Column(name = "inviter_id")
    private Long inviterId;

    @Column(name = "date_sent")
    private LocalDateTime dateSent;

//    public static String inviteToJSON(GroupInviteEntity groupInvite) {
//        ObjectMapper objectMapper = new ObjectMapper();
//        Map<String, Object> invite = new HashMap<>();
//        invite.put("groupId", groupInvite.getGroupId());
//        invite.put("inviteeId", groupInvite.getInviteeId());
//        invite.put("inviterId", groupInvite.getInviterId());
//        invite.put("dateSent", groupInvite.getDateSent());
//        try {
//            return objectMapper.writeValueAsString(invite);
//        } catch(Exception e) {
//            System.out.println("Error writing Invite json data");
//            return "";
//        }
//    }
//    public static String inviteMapToJSON(Map<String, Object> map) {
//        ObjectMapper objectMapper = new ObjectMapper();
//        try {
//            return objectMapper.writeValueAsString(map);
//        } catch(Exception e) {
//            System.out.println("Error writing Invite json data");
//            return "";
//        }
//    }

//    public static List<Map<String, Object>> jsonToInvitesList(List<String> jsonInvites) {
//        ObjectMapper objectMapper = new ObjectMapper();
//        List<Map<String, Object>> invites = new ArrayList<>();
//        try {
////            for (int i = 0; i < 3; i++) {
////                Map<String, Object> map = objectMapper.readValue(jsonInvites.get(i), new TypeReference<>() {
////                });
////                map.replaceAll((k, v) -> (Object) v.longValue());
////                invites.add(map);
////            }
//            for (String jsonInvite : jsonInvites) {
////                Map<String, Long> map = objectMapper.readValue(jsonInvite, new TypeReference<>() {
////                });
////                map.replaceAll((k, v) -> v.longValue());
//                JsonNode jsonNode = objectMapper.readTree(jsonInvite);
//                System.out.println(jsonNode.get("groupId").asLong());
//                System.out.println(jsonNode.get("inviterId").asLong());
//                System.out.println(jsonNode.get("inviteeId").asLong());
//                System.out.println(jsonNode.get("dateSent").as);
//                invites.add(map);
//            }
//        } catch (Exception e) {
//            System.out.println("Error reading jsonInvites");
//        }
//        return invites;
//    }


    @Override
    public String toString() {
        return "GroupInviteEntity{" +
                "groupId=" + groupId +
                ", inviteeId=" + inviteeId +
                ", inviterId=" + inviterId +
                ", dateSent=" + dateSent +
                '}';
    }
}
