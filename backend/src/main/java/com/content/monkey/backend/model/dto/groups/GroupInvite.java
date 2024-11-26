package com.content.monkey.backend.model.dto.groups;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupInvite {
    private Long groupId;
    private Long inviteeId;
    private Long inviterId;

    public static String inviteToJSON(GroupInvite groupInvite) {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Long> invite = new HashMap<>();
        invite.put("groupId", groupInvite.getGroupId());
        invite.put("inviteeId", groupInvite.getInviteeId());
        invite.put("inviterId", groupInvite.getInviterId());
        try {
            return objectMapper.writeValueAsString(invite);
        } catch(Exception e) {
            System.out.println("Error writing Invite json data");
            return "";
        }
    }
    public static String inviteMapToJSON(Map<String, Long> map) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(map);
        } catch(Exception e) {
            System.out.println("Error writing Invite json data");
            return "";
        }
    }

    public static List<Map<String, Long>> jsonToInvitesList(List<String> jsonInvites) {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Map<String, Long>> invites = new ArrayList<>();
        try {
            for (String jsonInvite : jsonInvites) {
                Map<String, Long> map = objectMapper.readValue(jsonInvite, new TypeReference<>() {
                });
                map.replaceAll((k, v) -> v.longValue());
                invites.add(map);
            }
        } catch (Exception e) {
            System.out.println("Error reading jsonInvites");
        }
        return invites;

    }

    @Override
    public String toString() {
        return "GroupInvite{" +
                "groupId=" + groupId +
                ", inviteeId=" + inviteeId +
                ", inviterId=" + inviterId +
                '}';
    }
}
