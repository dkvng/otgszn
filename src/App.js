import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      content: {},
      modal: false,
      modalIdx: 99999
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          content: data
        });
      });
  }

  toggleModal(idx) {
    this.setState({
      modal: !this.state.modal,
      modalIdx: idx
    });
    console.log(this.state.modalIdx)
    console.log(idx.target)
  }

  allContent() {
    return this.state.content.map((el, idx) => {
      return (
        <section key={idx} onClick={() => this.toggleModal(idx)}>
          <img src={el.thumbnailUrl} alt={el.title}  />
          {this.state.modal && this.state.modalIdx === idx ? (
            <div className="picture-modal">
              <img src={el.url} alt={el.title} />
            </div>
          ) : (
            ""
          )}
        </section>
      );
    });
  }

  render() {
    return (
      <div className="App">
        {Object.values(this.state.content).length > 0 ? this.allContent() : ""}
      </div>
    );
  }
}

export default App;
