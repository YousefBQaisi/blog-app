import React, { useState, useEffect } from 'react';
import { Comment, Form, Button, Header, Icon, Modal, TextArea } from 'semantic-ui-react';

const CommentSection = (props) => {
  const { posts, index, users } = props;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editVal, setEditVal] = useState('');
  const [editValIds, setEditValids] = useState([0, -1]);
  const [open, setOpen] = useState(false)
  var post = posts[index];
  useEffect(() => {
    const storedComments = post['comments'];
    if (storedComments) {
      setComments(storedComments);
    }
  }, []);

  // useEffect(() => {
  //   console.log(users)
  //   console.log(getRandomItemFromArray(users))

  // }, [comments]);
  function getRandomItemFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  const addSingleComment = (comment) => {
    post["comments"].push(comment);
    posts[index] = post;
    localStorage.setItem(
      "posts",
      JSON.stringify(posts)
    );
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  }
  const EditAllComment = (comment) => {
    post["comments"] = comment;
    posts[index] = post;
    localStorage.setItem(
      "posts",
      JSON.stringify(posts)
    );
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  }
  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() !== '') {
      const comment = {
        id: Date.now(),
        text: newComment,
        user: getRandomItemFromArray(users),
        replies: [],
      };

      addSingleComment(comment);
      // setComments([...comments, comment]);
      // setNewComment('');
    }
  };

  const handleReplySubmit = (parentId, replyText) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === parentId) {
        const reply = {
          id: Date.now(),
          text: replyText,
          user: getRandomItemFromArray(users),
        };
        return {
          ...comment,
          replies: [...comment.replies, reply],
        };
      }
      return comment;
    });
    EditAllComment(updatedComments);
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
    EditAllComment(updatedComments);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    EditAllComment(updatedComments)
    // setComments(updatedComments);
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
    EditAllComment(updatedComments);
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
    EditAllComment(updatedComments);
  };

  return (<>
    <Comment.Group>
      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id}>
            <Comment.Content>
              <Comment.Avatar src={comment.user.avatar} />
              <Comment.Author as='div'>{" "}{comment.user.first_name} {comment.user.last_name}</Comment.Author>
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
                        <Comment.Avatar src={reply.user.avatar} />
                        <Comment.Author as='div'>{" "}{reply.user.first_name} {reply.user.last_name}</Comment.Author>
                        <Comment.Text>{reply.text}</Comment.Text>
                        <Comment.Actions>
                          <Comment.Action onClick={() => handleDeleteReply(comment.id, reply.id)}>
                            <Icon name="trash" />
                            Delete
                          </Comment.Action>
                          <Comment.Action onClick={() => 
                            {
                              setEditVal(reply.text)
                              setEditValids([comment.id, reply.id])
                              setOpen(true)
                            }
                            // handleEditReply(comment.id, reply.id, 'Edited Reply')
                            }>
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
                <Comment.Action onClick={() => {
                  setEditVal(comment.text)
                  setEditValids([comment.id, -1])
                  setOpen(true)
                  // handleEditComment(comment.id, 'Edited Comment')
                }}>
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
    <ModalEdit open={open} setOpen={setOpen} isRepley={editValIds[1] != -1} val={editVal} onChangeVal={setEditVal} handleEditComment={editValIds[1] != -1 ? handleEditReply : handleEditComment} ids={editValIds} />
  </>



  );
};

export default CommentSection;
export function ModalEdit(props) {
  const { open, setOpen, isRepley, val, onChangeVal, handleEditComment, ids } = props;

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'

    >
      <Header icon>
        <Icon name='edit' />
        Edit Old Messages
      </Header>
      <Modal.Content>
        <Form>
          <Form.TextArea value={val} onChange={(v) => {
            console.log(v.target.value)
            onChangeVal(v.target.value)
          
          }} placeholder='Tell us more' />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={() => {
          if (isRepley) {
            handleEditComment(ids[0],ids[1],val)
          }else{
            handleEditComment(ids[0],val)
          }
          setOpen(false)
        }


        }>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}