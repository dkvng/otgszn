import React, { Component } from "react";
import "./App.css";
import LazyLoad from "react-lazyload";

class App extends Component {
  constructor() {
    super();
    this.state = {
      content: {},
      modal: false,
      modalIdx: -99999
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
  }

  toggleModalBackground() {
    this.setState({
      modal: false,
      modalIdx: -999999
    });
  }

  allContent() {
    return this.state.content.map((el, idx) => {
      return (
        <LazyLoad key={idx} height={200} offset={100}>
          <section onClick={() => this.toggleModal(idx)}>
            <img src={el.thumbnailUrl} alt={el.title} />
            {this.state.modal && this.state.modalIdx === idx ? (
              <div
                className="picture-modal"
                onClick={() => this.toggleModalBackground()}
              >
                <img src={el.url} alt={el.title} />
              </div>
            ) : (
              ""
            )}
          </section>
        </LazyLoad>
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
