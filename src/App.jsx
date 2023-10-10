import { useState } from "react"
import { useEffect } from "react";

export default function App() {
  // Set up State variables
  const [friends, setFriend] = useState([]);
  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');
  
  // Get data from API
  const getSavedFriends = async () => {
    const {friends} = await axios.get('/api/friends');
  }

  // Add friend object to the friends array
  const addFriend = () => {
    // set the friend array to a copy of the old array + the new friend object
    setFriend([...friends, {name: name, picture: picture}]) 
    // Clear entry fields / state variables
    setPicture('');
    setName('');
  }

  // Create HTML for every friend in the array
  const friendData = friends.map((friend) => {
    // ensure that user has entered data
    if (friend.name && friend.picture) {
      return (
        // Set key equal to the index of the friend
        <div key={`${friends.indexOf(friend)}`}>
          {/* Create an image and span for the friend */}
          <img src={friend.picture} alt={friend.name} width="100px" />
          <span>{friend.name}</span>
        </div>
      )
    }
    else { // if no data entered, tell user
      return (<div>Missing a name and picture pairing!</div>)
    }
  });

  // HTML Data to send to the root tag
  return (
    <div>
      {/* Create input fields for picture + name */}
      <label htmlFor="imgURL">Enter a Picture URL: </label>
      <input 
        id="imgURL"
        placeholder="Enter a picture's URL"
        value={picture} 
        onChange={(evt) => {setPicture(evt.target.value)}}/>
      <br />
      <label htmlFor="name">Enter a person's name: </label>
      <input 
        id="name" 
        placeholder="Enter a person's name"
        value={name}
        onChange={(evt) => {setName(evt.target.value)}}/>
      <br />

      {/* Button for storing data */}
      <button onClick={addFriend}>Add a Friend!</button>

      {/* HTML for friend data */}
      {friendData}
    </div>
  )
}
