import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import SingleComment from "./forms/comment";
import CommentSection from "./forms/comment";
import axios from "axios";

function AppPosts(props) {
  const { posts } = props;
  const [users, setUsers] = useState([]);
  const [isLoading,setIsLoading] = useState(true)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?page=1');
        // console.log(response)
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false)
    };

    fetchUsers();
    
  }, []);

  return (
    <div>
      {!isLoading && posts != null && (
        <Card.Group centered>
          {posts.map((post, index) => {
            return (
              <Card key={`post_${index}`}>
                <Card.Content>
                  <Card.Header>{post.title}</Card.Header>
                  {/* <Card.Meta>Co-Worker</Card.Meta> */}
                  <Card.Description>
                    {post.post}

                    <CommentSection users={users} posts={posts} index={index} />
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
