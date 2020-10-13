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
    const offsetAngle = 360/(friends.length-1);
    const allFriends = friends.map((friend, index) => (
      //formatting for regular friends
      friend.alias != "you" ?
        <div key={index}
            className="profile"
            style={{position: 'absolute',
                    transform:`rotate(${offsetAngle * index}deg) translate(0, -275px) rotate(-${offsetAngle * index}deg)`}}>
            <Link to={`/friend/${friend.id}`}>
              <img className="friendImage"
                   src={friend.image}
                   style={{height: `${friend.likeability * 10}px`, width:`${friend.likeability * 10}px`}}
                   alt={`${friend.alias} image`}/>
            </Link>
            <div className="profileBody">
              <Link to={`/friend/${friend.id}`}><h5 className="profileTitle">{friend.alias}</h5></Link> 
              {/* <p>{friend.likeability}</p> */}
          </div>
        </div>
        :
        //formatting for the host's profile
        <div key={index} className="profile" id="hostProfile">
            <img className="friendImage" src={friend.image} alt={`${friend.alias} image`}/>
            <div className="profileBody">
              <h5 className="profileTitle">{friend.alias}</h5>
          </div>
        </div>
    ));

    const noFriend = (
      <div></div>
    );

    return (
      <>
        <div id="container_allFriends">

          <div id="addFriendsText">
            <Link to="/friend" id="addFriend" role="button">Add a friend</Link><br/><br/>
            to your astral plane by generating a new profile and sending them their profile code.
            You have the ability to customize that person's dream experience and to kick them from your dreamscape
            if you need to.
          </div>
          <a href="https://theastralproject.herokuapp.com/" id="close" role="button">close connection</a>
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