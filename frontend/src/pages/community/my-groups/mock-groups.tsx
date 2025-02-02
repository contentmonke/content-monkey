import dayjs from "dayjs"
import { Group, GroupInvite } from "../../../models/Models"

export const longMockGroups: Group[] = [
  {
    id: 1156,
    groupName: "First Group",
    description: "This is the first group",
    owner: 838,
    picture: null,
    isPublic: true,
    members: [
      838,
      919,
      916
    ],
    joinRequests: [],
    discussionBoards: [],
    dateCreated: new Date("2024-11-09T20:36:00")
  },
  {
    id: 1157,
    groupName: "Second Group",
    description: "This is the second group",
    owner: 838,
    picture: null,
    isPublic: false,
    members: [
      838,
      919,
      919,
    ],
    joinRequests: [],
    discussionBoards: [],
    dateCreated: new Date("2024-11-09T22:47:00")
  },
  {
    id: 1156,
    groupName: "First Group with a pretty long name yay yyyyyy yay",
    description: "This is the first group lsdfo jsdof jaosid fjoasdjfoa isdjfosidj foasid jfoasi djfoasid fjosidj foasidjf oasid jfoasidfjoasdijfoasid fjoasidjfoasidj fosidf jaosdifuoae utaw09iojhodir y9P8IHGW;OE8T YAWOEIHFSET YA;WOEIYGAWE8TY",
    owner: 838,
    picture: null,
    isPublic: true,
    members: [
      838,
      919,
      916,
    ],
    joinRequests: [],
    discussionBoards: [],
    dateCreated: new Date("2024-11-09T20:36:00")
  },
  {
    id: 1157,
    groupName: "Second Group",
    description: "This is the second group",
    owner: 838,
    picture: null,
    isPublic: false,
    members: [
      838,
      919,
      919
    ],
    joinRequests: [],
    discussionBoards: [],
    dateCreated: new Date("2024-11-09T22:47:00")
  },
  {
    id: 1156,
    groupName: "First Group",
    description: "This is the first group",
    owner: 838,
    picture: null,
    isPublic: true,
    members: [
      838,
      919,
      916
    ],
    joinRequests: [],
    discussionBoards: [],
    dateCreated: new Date("2024-11-09T20:36:00")
  },
  {
    id: 1157,
    groupName: "Second Group",
    description: "This is the second group",
    owner: 838,
    picture: null,
    isPublic: false,
    members: [
      838,
      919,
      919
    ],
    joinRequests: [],
    discussionBoards: [],
    dateCreated: new Date("2024-11-09T22:47:00")
  },
  {
    id: 1156,
    groupName: "First Group",
    description: "This is the first group",
    owner: 838,
    picture: null,
    isPublic: true,
    members: [
      838,
      919,
      916
    ],
    joinRequests: [],
    discussionBoards: [],
    dateCreated: new Date("2024-11-09T20:36:00")
  },
  {
    id: 1157,
    groupName: "Second Group",
    description: "This is the second group",
    owner: 838,
    picture: null,
    isPublic: false,
    members: [
      838,
      919,
      919
    ],
    joinRequests: [],
    discussionBoards: [],
    dateCreated: new Date("2024-11-09T22:47:00")
  }
]

export const shortMockGroups = [
  {
    id: 1156,
    groupName: "First Group",
    description: "This is the first group",
    owner: 838,
    picture: null,
    isPublic: true,
    members: [
      838,
      919,
      916
    ],
    joinRequests: [],
    discussionBoards: [],
    dateCreated: new Date("2024-11-09T20:36:00")
  },
  // {
  //   id: 1157,
  //   groupName: "Second Group",
  //   description: "This is the second group",
  //   owner: 838,
  //   picture: null,
  //   isPublic: false,
  //   members: [
  //     838,
  //     919,
  //     919
  //   ],
  //   joinRequests: [],
  //   discussionBoards: [],
  //   dateCreated: "2024-11-09T22:47:00"
  // },
  // {
  //   id: 1156,
  //   groupName: "First Group",
  //   description: "This is the first group",
  //   owner: 838,
  //   picture: null,
  //   isPublic: true,
  //   members: [
  //     838,
  //     919,
  //     916
  //   ],
  //   joinRequests: [],
  //   discussionBoards: [],
  //   dateCreated: "2024-11-09T20:36:00"
  // },
  // {
  //   id: 1157,
  //   groupName: "Second Group",
  //   description: "This is the second group",
  //   owner: 838,
  //   picture: null,
  //   isPublic: false,
  //   members: [
  //     838,
  //     919,
  //     919
  //   ],
  //   joinRequests: [],
  //   discussionBoards: [],
  //   dateCreated: "2024-11-09T22:47:00"
  // },
  // {
  //   id: 1156,
  //   groupName: "First Group",
  //   description: "This is the first group",
  //   owner: 838,
  //   picture: null,
  //   isPublic: true,
  //   members: [
  //     838,
  //     919,
  //     916
  //   ],
  //   joinRequests: [],
  //   discussionBoards: [],
  //   dateCreated: "2024-11-09T20:36:00"
  // },
]

export const invitations: GroupInvite[] = [
  {
    id: 0,
    groupId: 1259,
    groupName: "Third Group",
    inviteeId: 916,
    inviterId: 838,
    inviterName: "fakeemail@gmail.com",
    dateSent: new Date("2024-11-27T11:56:00")
  },
  {
    id: 1,
    groupId: 1259,
    groupName: "Third Group",
    inviteeId: 916,
    inviterId: 844,
    inviterName: "fakeemail@gmail.com",
    dateSent: new Date("2024-11-27T11:56:00")

  },
  {
    id: 2,
    groupId: 1259,
    groupName: "Third Group",
    inviteeId: 916,
    inviterId: 855,
    inviterName: "fakeemail@gmail.com",
    dateSent: new Date("2024-11-27T11:56:00")

  },
  {
    id: 3,
    groupId: 1260,
    groupName: "Third Group",
    inviteeId: 916,
    inviterId: 838,
    inviterName: "fakeemail@gmail.com",
    dateSent: new Date("2024-11-27T11:56:00")

  },
]

export const mockInvite: GroupInvite[] = [{
  id: 1,
  groupId: 1338,
  groupName: "Fortnite gamers",
  inviteeId: 1246,
  inviterId: 1274,
  inviterName: "drew@fluffy.com",
  dateSent: new Date("2024-12-04T20:15:12.231")
}]