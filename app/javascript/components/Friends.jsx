import React from "react";
import { Link } from "react-router-dom";

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
      const url = "/api/v1/friends/index";
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ friends: response }))
        .catch(() => this.props.history.push("/"));
  }

  render() {
    const { friends } = this.state;
    const offsetAngle = 360/friends.length;
    const allFriends = friends.map((friend, index) => (
      
      <div key={index}
           className="profile"
           style={{position: 'absolute',
                   transform:`rotate(${offsetAngle * index}deg) translate(0, -300px) rotate(-${offsetAngle * index}deg)`}}>
          <Link to={`/friend/${friend.id}`}><img className="friendImage" src={friend.image} alt={`${friend.alias} image`}/></Link>
          <div className="profileBody">
            <Link to={`/friend/${friend.id}`}><h5 className="profileTitle">{friend.alias}</h5></Link> 
        </div>
      </div>
      // <div key={index} className="col-md-6 col-lg-4">
      //   <div className="card mb-4">
      //     <img
      //       src={friend.image}
      //       className="card-img-top"
      //       alt={`${friend.alias} image`}
      //     />
      //     <div className="card-body">
      //       <h5 className="card-title">{friend.alias}</h5>
      //       <Link to={`/friend/${friend.id}`} className="btn custom-button">
      //         View Friend Info
      //       </Link>
      //     </div>
      //   </div>
      // </div>
    ));

    const noFriend = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
        </h4>
      </div>
    );

    return (
      <>
        <div id="container_allFriends">

          {/* <img src="assets/ghost.png" id="yourself"/> */}
          <div id="addFriendsText">
            <Link to="/friend" id="addFriend" role="button">Add a friend</Link><br/><br/>
            to your astral plane by generating a new profile and sending them their profile code.
            You have the ability to customize that person's dream experience and to kick them from your dreamscape
            if you need to.
          </div>

          <div id="friendList">
              {friends.length > 0 ? allFriends : noFriend}
          </div>
        </div>

        {/* <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Friends</h1>
            <p className="lead text-muted">
              We’ve pulled together all of the friends that to whom you've given server access to your astral
              plane. Sweet dreams!
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/friend" className="btn custom-button">
                Connect New Friend
              </Link>
            </div>
            <div className="row">
              {friends.length > 0 ? allFriends : noFriend}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div> */}
      </>
    );
  }
}

export default Friends;