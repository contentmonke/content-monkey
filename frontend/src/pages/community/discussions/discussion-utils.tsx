import { Container, Typography } from "@mui/material";
import { api } from "../../../api/requests";
// import { Media, MediaLabel, MediaType } from "../../models/Models";
// import { fieldContent, fieldLabel, resultImage, resultImageContainer } from "../../style/review-page";
import { DateTime } from 'luxon';
import { loadUser } from "../../reviews/review-utils";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";



export async function fetchDiscussionPosts(discussion: any, setPosts: any) {
  // let mediaId = parseInt(idString);
  api.discussions.fetchDiscussionPosts(discussion)
    .then((response) => {
      console.log(response.data);
      setPosts(response.data);
    })
    .catch((error) => {
      setPosts(null);
      console.log(error)
    })
}

export async function fetchDiscussionBoard(discussionId: any, setDiscussion: any) {
  api.discussions.getDiscussionBoard(discussionId)
    .then((response) => {
      setDiscussion(response.data);
    })
}

export async function createDiscussionPost(discussionId: any, postBody: any, username: any, setPosts: any, setModalOpen: any) {

  api.discussions.createDiscussionPost(discussionId, postBody, username)
    .then((response) => {
      setPosts(response.data);
      setModalOpen(false);
    })
}

export async function createDiscussionComment(comment: any, setComments: any, postId: any, setBody: any, setIsLoading: any, setIsSuccess: any, setIsError: any, setNeedsUpdate: any, setPosts: any) {
  setIsLoading(true);
  api.discussionComments.createDiscussionComment(comment.userId, comment.body, comment.postId)
    .then((response) => {
      setIsSuccess(true)
      setComments(response.data)
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, commentIds: response.data.map(comment => comment.id) } // Set comment IDs to the array of all comment IDs
            : post
        )
      );
      
      setBody("")
    })
    .catch((error) => {
      console.log(error)
      setIsError(true)
    })
    .finally(() => {
      setIsLoading(false)
      setNeedsUpdate(true)
      setBody("")
    });
}

export async function fetchDiscussionComments(commentIds: any, setComments: any, setIsLoading: any) {
  setIsLoading(true);
  api.discussionComments.getDiscussionComments(commentIds)
    .then((response) => {
      console.log(response.data);
      // setComments((prevItems) => {
      //   const currentItems = prevItems || [];
      //   const newItems = []
      //   response.data.forEach(element => {
      //     if (!currentItems.some(item => item.id === element.id)) {
      //       newItems.push(element);
      //     }
      //   });
      //   return [...currentItems, ...newItems]
      // });
      setComments(response.data)
    })
    .catch((error) => {
      setComments([]);
      console.log(error)
    })
    .finally(() => {
      setIsLoading(false)
    });
}

export async function updateUpVotes(user: any, postId: any, addedVote: any, setUser: any, setNeedsUpdate: any) {
  api.reviews.updateUpVotes(user.id, postId, addedVote)
    .then((response) => {
      console.log(response.data);
      return loadUser(user.name, setUser);
    })
    .catch(() => {
      console.log("error updating upVotes");
    })
    .finally(() => {
      setNeedsUpdate(true)
    })
}

export async function updateDownVotes(user: any, reviewId: any, addedVote: any, setUser: any, setNeedsUpdate) {
  api.reviews.updateDownVotes(user.id, reviewId, addedVote)
    .then((response) => {
      console.log(response.data);
      return loadUser(user.name, setUser);
    })
    .catch(() => {
      console.log("error updating upVotes");
    })
    .finally(() => {
      setNeedsUpdate(true)
    })
}
