import React, { useState } from 'react';
import { Comment, Form, Button } from 'semantic-ui-react';
 
 function  CommentSection(){
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <Comment.Group>
      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <Comment key={index}>
            <Comment.Content>
            <Comment.Author>author</Comment.Author>
              <Comment.Text>{comment}</Comment.Text>
            <Form reply onSubmit={handleCommentSubmit}>
            <Form.TextArea
                   rows={1}
                   width={20}
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleInputChange}
            />
            <Button content="Add Comment" labelPosition="left" icon="edit" primary />
        </Form>
            </Comment.Content>
          </Comment>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
      <Form reply onSubmit={handleCommentSubmit}>
        <Form.TextArea
        rows={2}
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleInputChange}
        />
        <Button content="Add Comment" labelPosition="left" icon="edit" primary />
      </Form>
    </Comment.Group>
  );
};

export default CommentSection;
