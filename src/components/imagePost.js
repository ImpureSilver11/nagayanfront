import React from 'react';
import { Formik, Form, Field } from "formik";
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

class ImagePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImage: '',
      title: '',
      error: null,
      isLoaded: false
    };
  }

  onSubmit(e) {
    e.preventDefault()
    this.postImage()
  }

  postImage() {
    fetch('http://127.0.0.1:3001/entertainers/1/images', {
      method: 'POST',
      body: JSON.stringify({
        image: this.state.previewImage,
        title: this.state.title
      }),
      headers: new Headers({ 'Content-type' : 'application/json' })
    }).then(() => {
      this.fetchResponse();
    }).then( (res) => {
      console.log(res)
    })
  }

  fetchResponse(){
    fetch('http://localhost:3001/entertainers/1/images', { method: 'GET'} )
    .then( res => res.json() )
    .then( res => {
      console.log(res)
      this.setState({ image : res })
    })
  }

  setImage = (e, setFieldValue) => {
    let files = e.target.files;
    let reader = new FileReader();
    // 画像をbase64にエンコードします.
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.setState({ previewImage: reader.result });
      setFieldValue("image_file_field", reader.result);
    };
  };

  render() {

    return (
      <Formik initialValues={{}} >
        {({ setFieldValue }) => {
          return (
            <Form onSubmit={this.onSubmit.bind(this)}>
              <img className="image" src={this.state.previewImage ? this.state.previewImage : ""} />
              <div>
                <React.Fragment>
                  <Field
                    id="select_image"
                    type="file"
                    name="file_image"
                    onChange={e => this.setImage(e, setFieldValue)}
                    />
                  <Field type="hidden" name="file_image_hidden" />
                </React.Fragment>
              </div>
              <div>
                <TextField id="standard-basic" label="タイトル" name="title" onChange={(e) => { this.setState({ title: e.target.value })}} />
                <Button variant="contained" color="primary" startIcon={<SaveIcon />} type="submit"> 追加 </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export default ImagePost