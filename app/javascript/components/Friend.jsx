import React from "react";
import { Link } from "react-router-dom";

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friend: { experience: "" } };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);

  }

  deleteFriend() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/friends"))
      .catch(error => console.log(error.message));
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ friend: response }))
      .catch(() => this.props.history.push("/friends"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  render() {
    const { friend } = this.state;
    let experienceText = "";
    if (friend.experience == "flying.png") {
      experienceText = "Flying";
    } else if (friend.experience == "flyingnightmare.png") {
      experienceText = "Flying but nightmarish";
    } else if (friend.experience == "realistic.png") {
      experienceText = "Realistic";
    } else if (friend.experience == "pleasant.png") {
      experienceText = "Pleasant and plausible";
    } else if (friend.experience == "pleasantincomp.png") {
      experienceText = "Pleasant and incomprehensible";
    } else if (friend.experience == "incomprehensible.png") {
      experienceText = "Truly incomprehensible";
    }
    return (
      <div id="container_friend">
        <img src={friend.experience} alt={`${friend.alias} image`}/>
        <p id="friendName">{friend.alias}</p>
        {friend.sign != null ?
          <p id="friendSign">Sign:<br/>{friend.sign}</p>
          :
          <p></p>
        }
        Dream experience: <p id="friendExperience">{experienceText}</p>
        {friend.message != null ?
          <p id="friendMessage">Personal message:<br/>{friend.message}</p>
          :
          <p></p>
        }

        <div id="deleteButton" role="button" onClick={this.deleteFriend}>remove profile</div>
        <Link to="/friends" id="backToList">← back to list</Link>
      </div>
    );
  }
}

export default Friend;