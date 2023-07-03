import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import SingleComment from "./forms/comment";

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

                    <SingleComment
                      comment={{
                        id: 1,
                        author: "John",
                        text: "First comment",
                        comments: [
                          {
                            id: 2,
                            author: "Alice",
                            text: "Reply to first comment",
                            comments: [
                                {
                                  id: 2,
                                  author: "Alice",
                                  text: "Reply to first comment",
                                },
                                {
                                  id: 3,
                                  author: "Bob",
                                  text: "Another reply to first comment",
                                },
                              ],
                          },
                          {
                            id: 3,
                            author: "Bob",
                            text: "Another reply to first comment",
                          },
                        ],
                      }}
                    />
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
