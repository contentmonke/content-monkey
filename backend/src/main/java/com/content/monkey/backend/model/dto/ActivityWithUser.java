package com.content.monkey.backend.model.dto;

import com.content.monkey.backend.model.ReviewEntity;
import com.content.monkey.backend.model.CommentEntity;

public class ActivityWithUser {
    private final Object activity;
    private final String userName;

    public ActivityWithUser(Object activity, String userName) {
        this.activity = activity;
        this.userName = userName;
    }

    public Object getActivity() {
        return activity;
    }

    public String getUserName() {
        return userName;
    }

    // Helper method to get the dateCreated based on the activity type
    public java.time.LocalDateTime getDateCreated() {
        if (activity instanceof ReviewEntity) {
            return ((ReviewEntity) activity).getDateCreated();
        } else if (activity instanceof CommentEntity) {
            return ((CommentEntity) activity).getDateCreated();
        }
        return null;
    }

    // Add other helper methods as needed
    public String getActivityType() {
        return (activity instanceof ReviewEntity) ? "Review" : "Comment";
    }

    public String getActivityContent() {
        if (activity instanceof ReviewEntity) {
            return ((ReviewEntity) activity).getBody();  // Assuming `body` is the review text
        } else if (activity instanceof CommentEntity) {
            return ((CommentEntity) activity).getBody(); // Assuming `body` is the comment text
        }
        return "";
    }
}