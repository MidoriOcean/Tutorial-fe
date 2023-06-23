import React, { Component } from "react";
import { Link } from "react-router-dom";
import TutorialService from "../services/tutorial.service.js";
import { withRouter } from '../common/with-router.js';

class Tutorials extends Component {

  constructor(props) {
    super(props);
    this.findAllTutorials = this.findAllTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
  

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1
    };
  }

  componentDidMount() {

  this.findAllTutorials();

  }

  findAllTutorials() {

   
    TutorialService.findAllTutorials()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.findAllTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  render() {
    const {tutorials,tutorial,currentTutorial,currentIndex} = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
          </div>
        </div>
        <div className="col-md-6">
          <h4>Tutorials</h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.name}
                </li>
              ))}
          </ul>

        
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>id:</strong>
                </label>{" "}
                {currentTutorial.id}
              </div>
              <div>
                <label>
                  <strong>name:</strong>
                </label>{" "}
                {currentTutorial.name}
              </div>
              <div>
                <label>
                  <strong>argument:</strong>
                </label>{" "}
                {currentTutorial.argument}
              </div>
              
              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="btn btn-success"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Tutorials);
