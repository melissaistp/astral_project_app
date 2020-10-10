import React from "react";
import { Link } from "react-router-dom";

class NewFriend extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        alias: "",
        experience: "",
        // instruction: ""
      };
  
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }
  
    stripHtmlEntities(str) {
      return String(str)
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
  
    onChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }
  
    onSubmit(event) {
      event.preventDefault();
      const url = "/api/v1/friends/create";
      const { alias, experience } = this.state; //add other params here?
  
      if (alias.length == 0 || experience.length == 0 ) //include checks for other params?
        return;
  
      const body = {
        alias,
        experience
       // instruction: instruction.replace(/\n/g, "<br> <br>")
      };
  
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.props.history.push(`/friend/${response.id}`))
        .catch(error => console.log(error.message));
    }
  
    render() {
      return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">
                Add a new friend to your server.
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="friendAlias">Friend's name (required)</label>
                  <input
                    type="text"
                    name="alias"
                    id="friendAlias"
                    className="form-control"
                    required
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="friendExperience">Experience (required)</label>
                  <input
                    type="text"
                    name="experience"
                    id="friendExperience"
                    className="form-control"
                    required
                    onChange={this.onChange}
                  />
                  <small id="ingredientsHelp" className="form-text text-muted">
                    Dream experience you would like your friend to have
                  </small>
                </div>
                {/* <label htmlFor="instruction">Preparation Instructions</label>
                <textarea
                  className="form-control"
                  id="instruction"
                  name="instruction"
                  rows="5"
                  required
                  onChange={this.onChange}
                /> */}
                <button type="submit" className="btn custom-button mt-3">
                  Create Connection
                </button>
                <Link to="/friends" className="btn btn-link mt-3">
                  Back to friends
                </Link>
              </form>
            </div>
          </div>
        </div>
      );
    }
  
  }
  
  export default NewFriend;