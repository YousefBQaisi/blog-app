import React, { useState, useEffect } from 'react';
import { Comment, Form, Button, Icon } from 'semantic-ui-react';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments'));
    if (storedComments) {
      setComments(storedComments);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() !== '') {
      const comment = {
        id: Date.now(),
        text: newComment,
        replies: [],
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleReplySubmit = (parentId, replyText) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === parentId) {
        const reply = {
          id: Date.now(),
          text: replyText,
        };
        return {
          ...comment,
          replies: [...comment.replies, reply],
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleEditComment = (commentId, editedText) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          text: editedText,
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
  };

  const handleEditReply = (commentId, replyId, editedText) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === replyId) {
            return {
              ...reply,
              text: editedText,
            };
          }
          return reply;
        });
        return {
          ...comment,
          replies: updatedReplies,
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDeleteReply = (commentId, replyId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.filter((reply) => reply.id !== replyId);
        return {
          ...comment,
          replies: updatedReplies,
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <Comment.Group>
      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id}>
            <Comment.Content>
              <Comment.Text>{comment.text}</Comment.Text>
              <Form reply onSubmit={(e) => handleReplySubmit(comment.id, e.target.replyText.value)}>
                <Form.TextArea name="replyText" placeholder="Reply..." />
                <Button content="Reply" labelPosition="left" icon="reply" primary />
              </Form>
              {comment.replies.length > 0 && (
                <Comment.Group>
                  {comment.replies.map((reply) => (
                    <Comment key={reply.id}>
                      <Comment.Content>
                        <Comment.Text>{reply.text}</Comment.Text>
                        <Comment.Actions>
                          <Comment.Action onClick={() => handleDeleteReply(comment.id, reply.id)}>
                            <Icon name="trash" />
                            Delete
                          </Comment.Action>
                          <Comment.Action onClick={() => handleEditReply(comment.id, reply.id, 'Edited Reply')}>
                            <Icon name="edit" />
                            Edit
                          </Comment.Action>
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  ))}
                </Comment.Group>
              )}
              <Comment.Actions>
                <Comment.Action onClick={() => handleDeleteComment(comment.id)}>
                  <Icon name="trash" />
                  Delete
                </Comment.Action>
                <Comment.Action onClick={() => handleEditComment(comment.id, 'Edited Comment')}>
                  <Icon name="edit" />
                  Edit
                </Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
      <Form reply onSubmit={handleCommentSubmit}>
        <Form.TextArea
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
