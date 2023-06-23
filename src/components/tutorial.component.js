import React, { Component } from "react";
import TutorialService from "../services/tutorial.service.js";
import { withRouter } from '../common/with-router.js';

class Tutorial extends Component {

  constructor(props) {

    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeArgument = this.onChangeArgument.bind(this);
    this.findTutorialById = this.findTutorialById.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.removeTutorial = this.removeTutorial.bind(this);

    this.state = {
      currentTutorial: {
        name: "",
        argument: ""
      }
    };
  }

  componentDidMount() {

   
    this.findTutorialById(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          name: name
        }
      };
    });
  }

  onChangeArgument(e) {
    const argument = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        argument: argument
      }
    }));
  }

  

  findTutorialById(id) {
   
    TutorialService.findTutorialById(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      name: this.state.currentTutorial.name,
      argument: this.state.currentTutorial.argument
      
    };

    TutorialService.updateTutorial(data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorial() {

    TutorialService.updateTutorial(
      
      this.state.currentTutorial
    )
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/tutorials');
      })
      .catch(e => {
        console.log(e);
      });
  }

  removeTutorial() {    
    TutorialService.removeTutorial(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/tutorials');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorial} = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentTutorial.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="argument">Argument</label>
                <input
                  type="text"
                  className="form-control"
                  id="argument"
                  value={currentTutorial.argument}
                  onChange={this.onChangeArgument}
                />
              </div>

              
            </form>

            
            <br/>
            <button
              className="btn btn-danger"
              onClick={this.removeTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateTutorial}
            >
              Update
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Tutorial);
