import React from 'react';
import CreateReviewButton from '../reviews/CreateReviewButton';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Loading } from '../../components/Loading';

const AccountPage = () => {
  const userData = {
    name: "John Doe",
    username: "johndoe123",
    email: "johndoe@example.com",
    biography: "Just a random person who loves coding and traveling.",
    reviews: [
      { id: 1, content: "Great product! Totally worth it." },
      { id: 2, content: "Not what I expected, could be improved." },
    ],
    likedPosts: [
      { id: 1, content: "Post about JavaScript tricks." },
      { id: 2, content: "Travel experiences in Italy." },
    ],
    likedReviews: [
      { id: 1, content: "This product saved me a lot of time!" },
      { id: 2, content: "I completely agree with this review." },
    ],
    likedComments: [
      { id: 1, content: "Thanks for the helpful tip!" },
      { id: 2, content: "I had the same issue, glad it’s resolved." },
    ],
  };

  return (
    <>
      <div className="account-page">
        <div className="profile-section">
          <h1>{userData.name}</h1>
          <p>@{userData.username}</p>
          <p>{userData.email}</p>
          <p>{userData.biography}</p>
        </div>

        <div className="section">
          <h2>Reviews</h2>
          <ul>
            {userData.reviews.map((review) => (
              <li key={review.id}>{review.content}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Posts You've Liked</h2>
          <ul>
            {userData.likedPosts.map((post) => (
              <li key={post.id}>{post.content}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Reviews You've Liked</h2>
          <ul>
            {userData.likedReviews.map((review) => (
              <li key={review.id}>{review.content}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Comments You've Liked</h2>
          <ul>
            {userData.likedComments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </div>
      </div>
      <CreateReviewButton />
    </>
  );
}

// export default AccountPage;
export default withAuthenticationRequired(AccountPage, {
  onRedirecting: () => <Loading />,
});