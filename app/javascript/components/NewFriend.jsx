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
      const { alias, experience, likeability, sign, image, message } = this.state;
  
      if (alias.length == 0 || experience.length == 0 ) 
        return;
  
      const body = {
        alias,
        experience,
        likeability,
        sign,
        image,
        message
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
        .then(response => this.props.history.push(`/friends`))
        .catch(error => console.log(error.message));
    }
  
    render() {
      return (
        <div id="container_newFriend">
          <h1 id="formTitle">Add a new friend<br/>to your server</h1>
          <Link to="/friends" id="backToFriends">Back to friends</Link>

          <form id="newFriendForm" onSubmit={this.onSubmit}>
            <label htmlFor="friendAlias">Friend's alias *</label>
            <input type="text" name="alias" id="friendAlias" required onChange={this.onChange}/>


            <label htmlFor="friendExperience">Experience within the dream *</label>
            <div id="radioButtons">
              <div className="radioCol">
                <div className="radioSet">
                  <input type="radio" name="experience" id="friendExperience" value="realistic" required onChange={this.onChange}/>
                  <label for="realistic">Realistic</label>
                </div>
                <div className="radioSet">
                  <input type="radio" name="experience" id="friendExperience" value="pleasant" required onChange={this.onChange}/>
                  <label for="pleasant">Pleasant and plausible</label>
                </div>
                <div className="radioSet">
                  <input type="radio" name="experience" id="friendExperience" value="pleasantIncomp" required onChange={this.onChange}/>
                  <label for="pleasantIncomp">Pleasant and incomprehensible</label>
                </div>
                <div>
                  <input type="radio" name="experience" id="friendExperience" value="incomprehensible" required onChange={this.onChange}/>
                  <label for="incomprehensible">Truly incomprehensible</label>
                </div>
              </div>
              <div className="radioCol">
                <div className="radioSet">
                  <input type="radio" name="experience" id="friendExperience" value="flying" required onChange={this.onChange}/>
                  <label for="flying">Flying</label>
                </div>
                <div className="radioSet">
                  <input type="radio" name="experience" id="friendExperience" value="flyingNightmare" required onChange={this.onChange}/>
                  <label for="flyingNightmare">Flying but nightmarish</label>
                </div>
                <div className="radioSet">
                  <input type="radio" name="experience" id="friendExperience" value="nightmare.png" required onChange={this.onChange}/>
                  <label for="nightmare.png">Honestly just bad</label>
                </div>
              </div>
            </div>

            <label htmlFor="friendSign">Sign</label>
            <input list="signList" name="sign" id="friendSign" onChange={this.onChange}/>
            <datalist id="signList">
              <option value="Aries"/>
              <option value="Taurus"/>
              <option value="Gemini"/>
              <option value="Cancer"/>
              <option value="Leo"/>
              <option value="Virgo"/>
              <option value="Libra"/>
              <option value="Scorpio"/>
              <option value="Sagittarius"/>
              <option value="Capricorn"/>
              <option value="Aquarius"/>
              <option value="Pisces"/>
            </datalist>

            <label htmlFor="friendLikeability">How close are you to this person?<p id="scale">Not so close ⟵⟶ Quite close</p></label>
            <input type="range" min="0" max="10" name="likeability" id="friendLikeability" onChange={this.onChange}/>

            <label htmlFor="friendMessage">Personalized message for your friend upon entry to the dream</label>
            <textarea name="message" id="friendMessage" rows="3" cols="50" onChange={this.onChange}/>
            <button type="submit" id="createConnection">
              Create Connection
            </button>
          </form>
        </div>
      );
    }
  
  }
  
  export default NewFriend;