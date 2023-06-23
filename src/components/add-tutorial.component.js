import React, { Component } from "react";
import TutorialService from "../services/tutorial.service.js";
import { withRouter } from '../common/with-router.js';

 class AddTutorial extends Component {
    
    constructor(props) {

      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeArgument = this.onChangeArgument.bind(this);
      this.saveTutorial = this.saveTutorial.bind(this);
    
  
      this.state = {
        name: "",
        argument: ""
      };
    }

    onChangeName(e) {
        this.setState({
          name: e.target.value
        });
      }
  
    onChangeArgument(e) {
      this.setState({
        argument: e.target.value
      });
    }
  
    
  
    saveTutorial() {
      var data = {
        name: this.state.name,
        argument: this.state.argument
      };
  
      TutorialService.saveTutorial(data)
        .then(response => {
          this.setState({
            name: response.data.name,
            argument: response.data.argument
  
          });

          console.log(response.data);
          this.props.router.navigate('/tutorials');

        })
        .catch(e => {
          console.log(e);
        });
    }
  
    
    render() {
        return (
          <div className="submit-form">
              <div>
              <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={this.state.name}
                    onChange={this.onChangeName}
                    name="name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Argument</label>
                  <input
                    type="text"
                    className="form-control"
                    id="argument"
                    required
                    value={this.state.argument}
                    onChange={this.onChangeArgument}
                    name="argument"
                  />
                </div>
    
                
                <button onClick={this.saveTutorial} className="btn btn-success">
                  Submit
                </button>
              </div>
          </div>
        );
      }
    }

    export default withRouter(AddTutorial);
