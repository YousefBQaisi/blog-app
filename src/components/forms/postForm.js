import React, { useEffect, useState } from "react";
import { Button, Form, TextArea } from "semantic-ui-react";

function PostFrom() {
  const [data, setData] = useState([]);
  useEffect(() => {
    var dataPost = localStorage.getItem("posts");
    setData(JSON.parse(dataPost));
  }, []);
  const handleSubmit = (e) => {
    var formdata = {
      title: e.target.title.value,
      post: e.target.post.value,
      comments : []
    };
    console.log(formdata);

    localStorage.setItem(
      "posts",
      data != null
        ? JSON.stringify([...data, formdata])
        : JSON.stringify([formdata])
    );
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Field>
        <label>Title</label>
        <input name="title" placeholder="Title" />
      </Form.Field>
      <Form.TextArea
        label="Post"
        name="post"
        placeholder="Tell us more about you..."
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default PostFrom;
