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
                    transform:`rotate(${offsetAngle * index}deg) translate(0, -250px) rotate(-${offsetAngle * index}deg)`}}>
            <Link to={`/friend/${friend.id}`}>
              <img className="friendImage"
                   src={friend.experience}
                   style={{height: `${friend.likeability * 10 +20}px`, width:`${friend.likeability * 10+20}px`}}
                   alt={`${friend.alias} image`}/>
            </Link>
            <div className="profileBody">
              <Link to={`/friend/${friend.id}`}><h5 className="profileTitle">{friend.alias}</h5></Link> 
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
            to your astral plane by generating a new profile. Send them your astral plane code and their profile alias
             to sleep with under their pillow.
            You can customize that person's dream experience and even kick them from your dreamscape
            if you need to.<br/><br/>
            Your astral plane code:<p id='code'></p>
          </div>
          <a href="https://theastralproject.herokuapp.com/" id="close" role="button">close connection</a>
          <div id="friendList">
              {friends.length > 0 ? allFriends : noFriend}
          </div>
        </div>
      </>
    );
  }
}

export default Friends;