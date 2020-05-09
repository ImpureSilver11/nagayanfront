import React from 'react';
import { Formik, Form, Field } from "formik";
import { Button, CardMedia, InputLabel } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
const API_HOST = "https://nagayandb.herokuapp.com/"
// const API_HOST = "http://localhost:3001/"

class ImagePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImage: '',
      title: '',
      error: '',
      isLoaded: false
    };
  }

  onSubmit(e) {
    e.preventDefault()
    this.postImage()
  }

  postImage() {
    fetch(API_HOST + 'entertainers/1/images', {
      method: 'POST',
      body: JSON.stringify({
        image: this.state.previewImage,
        title: this.state.title
      }),
      headers: new Headers({ 'Content-type' : 'application/json' })
    }).then( (res) => {
      this.fetchResponse();
      console.log(res)
      this.setState({ previewImage: '' })
      if(res.status == 200){
        this.setState({ error: '画像が登録されました。' })
      }else{
        this.setState({ error: res.statusText })
      }
    })
  }

  fetchResponse(){
    fetch(API_HOST + 'entertainers/1/images', { method: 'GET'} )
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
              <InputLabel id="standard-basic"name="errorMessage"  disabled={this.state.error == '' ? false : true}>{this.state.error}</InputLabel>
              <CardMedia component="img" className="image" src={this.state.previewImage ? this.state.previewImage : ""} image={this.state.previewImage ? this.state.previewImage : ""} />
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