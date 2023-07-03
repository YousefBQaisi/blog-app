
import React, { useState } from 'react';
import { Comment, Form, Button } from 'semantic-ui-react';



export default function SingleComment ({ comment })  {
    const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text || '');

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsReplying(false);
    setIsEditing(false);
    setEditText(comment.text || '');
  };

  const handleSaveClick = () => {
    // Code to save the edited comment
    setIsEditing(false);
  };

  return (
    <Comment>
      <Comment.Content>
        <Comment.Author>{comment.author}</Comment.Author>
        {!isEditing ? (
          <Comment.Text>{comment.text}</Comment.Text>
        ) : (
          <Form>
            <Form.TextArea
              value={editText}
              onChange={(event) => setEditText(event.target.value)}
            />
          </Form>
        )}
        <Comment.Actions>
          {!isReplying && !isEditing && (
            <Comment.Action onClick={handleReplyClick}>
              Reply
            </Comment.Action>
          )}
          {!isEditing && (
            <Comment.Action onClick={handleEditClick}>
              Edit
            </Comment.Action>
          )}
          {isEditing && (
            <>
              <Comment.Action onClick={handleSaveClick}>
                Save
              </Comment.Action>
              <Comment.Action onClick={handleCancelClick}>
                Cancel
              </Comment.Action>
            </>
          )}
        </Comment.Actions>
      </Comment.Content>
      {(isReplying || (comment.comments && comment.comments.length > 0)) && (
        <Comment.Group>
          {isReplying && (
            <Form>
              <Form.TextArea placeholder="Reply..." />
            </Form>
          )}
          {comment.comments &&
            comment.comments.map((nestedComment) => (
              <SingleComment key={nestedComment.id} comment={nestedComment} />
            ))}
        </Comment.Group>
      )}
    </Comment>
  );
  };
  