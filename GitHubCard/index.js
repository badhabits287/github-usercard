/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

// const head = document.querySelector('header');
// head.style.border = '2px solid black '

document.querySelector("body > div > div.header > img:nth-child(1)").style.borderRadius = '100%';
const head = document.querySelector("body > div > div.header");

head.style.border = '2px solid black'
head.style.margin = '20px'
head.style.padding = '10px'
head.style.borderRadius = '10px';


function createCrd(obj) {


  // create elements

  
  const card = document.createElement('div');
  const cardImg = document.createElement('img');
  cardImg.style.borderRadius = '100%';
  const cardInfo = document.createElement('div');
  const cardName = document.createElement('h3');
  const cardUserName = document.createElement('p');
  const cardLocation = document.createElement('p');
  const cardProfile = document.createElement('p');
  const cardProfileLink = document.createElement('a');
  const cardFollowers = document.createElement('p');
  const cardFollowing = document.createElement('p');
  const cardBio = document.createElement('p');

  //add button 
  const cardButtons = document.createElement('div')
  const btnOpen = document.createElement('button')
  const btnClose = document.createElement('button')


  // add classes to elements
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  cardName.classList.add('name');
  cardUserName.classList.add('username');

  cardButtons.classList.add('card-buttons')
  btnOpen.classList.add('card-btn-open')
  btnClose.classList.add('card-btn-close', 'hide-btn')

  // nest elements for structure
  card.appendChild(cardButtons)
  cardButtons.appendChild(btnOpen)
  cardButtons.appendChild(btnClose)
//style 
card.style.border = ' 2px solid black'
// cardButtons.style.border = ' 2px solid black'

  // card.append(cardImg);
  // card.append(cardInfo);
  // cardInfo.append(cardName);
  // cardInfo.append(cardUserName);
  // cardInfo.append(cardLocation);
  // cardInfo.append(cardProfile);
  // cardProfile.append(cardProfileLink);
  // cardInfo.append(cardFollowers);
  // cardInfo.append(cardFollowing);
  // cardInfo.append(cardBio);

// add content inside of buttons & text elements
const open = '\u25bc' // unicode triangle
btnOpen.textContent = open

const close = '\u25b2'
btnClose.textContent = close


//  add event listener 

btnOpen.addEventListener('click', () => {
  console.log('open')
  card.append(cardImg);
  card.append(cardInfo);
  cardInfo.append(cardName);
  cardInfo.append(cardUserName);
  cardInfo.append(cardLocation);
  cardInfo.append(cardProfile);
  cardProfile.append(cardProfileLink);
  cardInfo.append(cardFollowers);
  cardInfo.append(cardFollowing);
  cardInfo.append(cardBio);
 
})



btnClose.addEventListener('click', () => {
  console.log('close')
  
  card.removeChild(cardImg);
  card.removeChild(cardInfo);
  cardInfo.removeChild(cardName);
  cardInfo.removeChild(cardUserName);
  cardInfo.removeChild(cardLocation);
  cardInfo.removeChild(cardProfile);
  cardProfile.removeChild(cardProfileLink);
  cardInfo.removeChild(cardFollowers);
  cardInfo.removeChild(cardFollowing);
  cardInfo.removeChild(cardBio);
})

  // pass userd data to card

  cardImg.src = obj.avatar_url;
  cardName.textContent = obj.name;
  cardUserName.textContent = obj.login;
  cardLocation.textContent = `Location: ${obj.location}`;
  cardProfileLink.href = obj.html_url;
  cardProfileLink.textContent = obj.html_url;
  cardProfile.textContent = "Profile: ";
  cardFollowers.textContent = `Followers: ${obj.followers}`;
  cardFollowing.textContent = `Following: ${obj.following}`;
  cardBio.textContent = `Bio: ${obj.bio}`;

  // return DOM element

  return card;
  }
 // select .card element

  const cards = document.querySelector(".cards");


 // create new card with my data

axios.get("https://api.github.com/users/badhabits287")
 .then(response => {
  cards.append(createCrd(response.data));
})

.catch(error => {
  console.log('this is an error', error);
});

 // followers card

axios.get("https://api.github.com/users/badhabits287/followers")
 .then(response => {
    console.log(response);
    response.data.forEach(follower => {
      axios.get(follower.url)
        .then(followerResponse => {
          console.log(followerResponse);
          cards.append(createCrd(followerResponse.data));
        })
        .catch(followerError => {
          console.log(followerError);
        });
    });
  })
  .catch(error => {
    console.log(error);
  });

