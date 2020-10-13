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
    let experience = "No ingredients available";

    // if (friend.ingredients.length > 0) {
    //   ingredientList = recipe.ingredients
    //     .split(",")
    //     .map((ingredient, index) => (
    //       <li key={index} className="list-group-item">
    //         {ingredient}
    //       </li>
    //     ));
    // }
    // const recipeInstruction = this.addHtmlEntities(recipe.instruction);

    return (
      <div id="container_friend">
        <img src={friend.image} alt={`${friend.alias} image`}/>
        <p id="friendName">{friend.alias}</p>
        {friend.sign != null ?
          <p id="friendSign">Sign:<br/>{friend.sign}</p>
          :
          <p></p>
        }
        Dream experience: <p id="friendExperience">{friend.experience}</p>
        {friend.message != null ?
          <p id="friendMessage">Personal message:<br/>{friend.message}</p>
          :
          <p></p>
        }

        <div id="deleteButton" role="button" onClick={this.deleteFriend}>remove profile</div>
        <Link to="/friends" id="backToList">← back to list</Link>
      </div>
      // <div className="">
      //   <div className="hero position-relative d-flex align-items-center justify-content-center">
      //     <img
      //       src={friend.image}
      //       alt={`${friend.alias} image`}
      //       className="img-fluid position-absolute"
      //     />
      //     <div className="overlay bg-dark position-absolute" />
      //     <h1 className="display-4 position-relative text-white">
      //       {friend.alias}
      //     </h1>
      //   </div>
      //   <div className="container py-5">
      //     <div className="row">
      //       {/* <div className="col-sm-12 col-lg-3">
      //         <ul className="list-group">
      //           <h5 className="mb-2">Ingredients</h5>
      //           {ingredientList}
      //         </ul>
      //       </div> */}
      //       {/* <div className="col-sm-12 col-lg-7">
      //         <h5 className="mb-2">Instructions</h5>
      //         <div
      //           dangerouslySetInnerHTML={{
      //             __html: `${friendInstruction}`
      //           }}
      //         />
      //       </div> */}
      //       <div className="col-sm-12 col-lg-2">
      //         <button type="button" className="btn btn-danger" onClick={this.deleteFriend}>
      //           Delete Connection
      //         </button>
      //       </div>
      //     </div>
      //     <Link to="/friends" className="btn btn-link">
      //       Back to list
      //     </Link>
      //   </div>
      // </div>
    );
  }
}

export default Friend;