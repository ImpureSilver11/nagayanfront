import React from 'react';

class ImagePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      title: '',
      error: null,
      isLoaded: false,
      items: []
    };
  }

  uploadImage() {

  }

  postImage() {
    fetch('http://127.0.0.1:3001/entertainers/1/images', {
      method: 'POST',
      body: JSON.stringify({
        image: this.state.image,
        title: this.state.title,
        path: 1
      }),
      headers: new Headers({ 'Content-type' : 'application/json' })
    }).then(() => {
      // リストの更新
      this.fetchResponse();
    })
  }

  fetchResponse(){
    fetch('http://localhost:3001/entertainers/1/images', { method: 'GET'} )
    .then( res => res.json() )
    .then( res => {
      this.setState({
        image : res
      });
    })
  }
  render() {
    return (
      <div>
        <form method="post" enctype="multipart/form-data">
          <ul>
            <li>
              <input type="file"
                      accept="image/*"
                      name="image"
                      value={this.state.image}
                      onChange={(e) => { this.setState({ image: e.target.value })}}
                />
              <input type="text" name="title" onChange={(e) => { this.setState({ title: e.target.value })}} />
            </li>
          </ul>
          <button type="submit" onClick={() => this.postImage()}>追加</button>
        </form>
      </div>
    );
  }
}

export default ImagePost