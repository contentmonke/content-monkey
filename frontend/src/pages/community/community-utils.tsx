import { api } from "../../api/requests";
import { GroupInvite } from "../../models/Models";
import { invitations } from "./my-groups/mock-groups";


function consolidateInvitations(invitations: GroupInvite[]) {
  var formattedInvitations = [];

  invitations.forEach((invite) => {
    var foundInvite = formattedInvitations.find((formattedInvite) => formattedInvite.groupId === invite.groupId);
    // Insert 
    if (foundInvite === undefined) {
      var formattedInvite = {
        groupId: invite.groupId,
        groupName: invite.groupName,
        inviteeId: invite.inviteeId,
        inviters: [invite.inviterName],
        dateSent: invite.dateSent
      };
      formattedInvitations.push(formattedInvite);
    }
    // Update
    else {
      foundInvite.inviters.push(invite.inviterName);
    }

  });

  return formattedInvitations;
}

export async function fetchGroup(groupId: number, setGroup: any) {
  api.groups.fetchGroup(groupId)
    .then((response) => {
      console.log(response.data);
      console.log("fetchGroup")
      setGroup(response.data);
    })
    .catch(() => {
      console.log("error fetching group");
    })
}

export async function fetchMyGroups(userId: number, setMyGroups: any) {
  api.groups.fetchMyGroups(userId)
    .then((response) => {
      console.log(response.data);
      setMyGroups(response.data);
    })
    .catch(() => {
      console.log("error fetching myGroups");
    })
}

export async function fetchPopularGroups(setPopularGroups: any) {
  api.groups.fetchPopularGroups()
    .then((response) => {
      console.log(response.data);
      setPopularGroups(response.data);
    })
    .catch(() => {
      console.log("error fetching popularGroups");
    })
}

export async function createGroup(group: any, setSuccess: any) {
  api.groups.createGroup(group)
    .then((response) => {
      console.log(response.data);
      setSuccess(true);
    })
    .catch(() => {
      console.log("error creating group");
    })
}

export async function joinGroup(groupId: number, userId: number, setGroup: any) {
  api.groups.joinGroup(groupId, userId)
    .then((response) => {
      console.log(response.data);
      console.log("joinGroup")
      return fetchGroup(groupId, setGroup)
    })
    .then((groupResponse) => {
      console.log(groupResponse);
      console.log("fetching group");
    })
    .catch(() => {
      console.log("error joining group");
    })
}

export async function leaveGroup(groupId: number, userId: number, setGroup: any) {
  api.groups.leaveGroup(groupId, userId)
    .then((response) => {
      console.log(response.data);
      return fetchGroup(groupId, setGroup);
    })
    .then((groupResponse) => {
      console.log(groupResponse);
      console.log("fetching group");
    })
    .catch(() => {
      console.log("error leaving group");
    })
}

export function fetchInvitations(userId: number, setGroupInvites: any) {
  api.groups.fetchInvites(userId)
    .then((response) => {
      console.log(response.data);
      setGroupInvites(consolidateInvitations(response.data));
    })
    .catch(() => {
      console.log("error leaving group");
    })
}

export function inviteToGroup(invite: any) {
  api.groups.inviteToGroup(invite)
    .then((response) => {
      console.log(response.data);
    })
    .catch(() => {
      console.log("error inviting user to group");
    })
}

export function handleInvite(userId: number, groupId: number, isAccepted: boolean) {
  api.groups.handleInvite(userId, groupId, isAccepted)
    .then((response) => {
      console.log(response.data);
    })
    .catch(() => {
      console.log("error handling invite");
    })
}

export function searchUsersByUsername(username: string, setUsers: any) {
  api.user.searchUsersByUsername(username)
    .then((response) => {
      console.log(response.data);
      setUsers(response.data);
    })
    .catch(() => {
      console.log("error searching users");
    })
}


export function getListOfUsers(userIds: any, setRequests: any) {
  api.user.getListOfUsers(userIds)
    .then((response) => {
      console.log(response.data);
      setRequests(response.data);
    })
    .catch(() => {
      console.log("error getting list of user");
    })
}

export function handleRequest(joinRequest: any, setNeedsUpdate: any) {
  api.groups.handleRequest(joinRequest)
    .then((response) => {
      console.log(response.data);
      setNeedsUpdate(true);
    })
    .catch(() => {
      console.log("error handling join request");
    })
}

export function fetchGroupDiscussionBoards(groupId: any, setDiscussionBoards) {
  api.groups.getGroupDiscussionBoards(groupId)
    .then((response) => {
      setDiscussionBoards(response.data)
    })
    .catch(() => {
      console.log("error getting discussion boards");
    })

}