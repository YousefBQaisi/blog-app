import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import SingleComment from "./forms/comment";
import CommentSection from "./forms/comment";

function AppPosts(props) {
  const { posts } = props;

  return (
    <div>
      {posts != null && (
        <Card.Group>
          {posts.map((post, index) => {
            return (
              <Card key={`post_${index}`}>
                <Card.Content>
                  <Card.Header>{post.title}</Card.Header>
                  {/* <Card.Meta>Co-Worker</Card.Meta> */}
                  <Card.Description>
                    {post.post}

                    <CommentSection />
                  </Card.Description>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      )}
    </div>
  );
}

export default AppPosts;
