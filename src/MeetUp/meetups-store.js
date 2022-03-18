import { writable } from 'svelte/store';
import http from '../helpers/http.js';

const resorce = 'meetups';
const meetups = writable([
  // {
  //   id: 1,
  //   title: "Svelte for hero's",
  //   subtitle: "Become a war hero coding in svelte",
  //   imageUrl:
  //     "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/498px-Svelte_Logo.svg.png?20191219133350",
  //   description:
  //     "Learn Svelte in a warcamp day coding svelte in 10 hours straight",
  //   address: "Casa do baralho",
  //   contactEmail: "Flinston@svelte.com",
  //   isFavorite: false
  // },
  // {
  //   id: 2,
  //   title: "Calisthenics",
  //   subtitle: "Start your fit journey with us",
  //   imageUrl:
  //     "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/calisthenics-1605096763.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*",
  //   description: "Learn the fundamentals and a first beginners workout",
  //   address: "Onde judas perdeu as botas",
  //   contactEmail: "fon@calisthenics.com",
  //   isFavorite: false
  // },
]);

function toggleFavorite(id, isFavorite) {
  http.patch(resorce, id, { isFavorite: !isFavorite })
  .then(res => {
    if (!res.ok)
      throw new Error('An error occurred. Please try again');
      meetups.update(items => {
        const meetUp = items.find(m => m.id === id)
        if(meetUp) {
          meetUp.isFavorite = !meetUp.isFavorite;
          
        }
    
        return items;
      })
  })
  .catch(err => console.log(err));
}

function addMeetUp(meetUpData) {
  const newMeetUp = {...meetUpData, isFavorite: false};
  http.post(resorce, newMeetUp)
  .then(res => {
    if(!res.ok)
      throw Error('An error occurred!');
    
    return res.json()
  })
  .then(data => {
    meetups.update(items => [{...newMeetUp, id: data.name}, ...items])
  })
  .catch(err => console.log(err));
}

function updateMeetUp(id, meetUpData) {
  delete meetUpData.id;
  http.put(resorce, id, meetUpData)
  .then(res => {
    if(!res.ok)
      throw Error('An error occurred!');
    
    return res.json()
  })
  .then(data => {
    meetups.update(items => {
      const index = items.findIndex(m => m.id === id);
      if(index >= 0) {
        items[index] = {...meetUpData, id };
        return [...items];
      }
    });
  })
  .catch(err => console.log(err));
}

function patch(id, meetUpData) {
  http.patch(resorce, id, meetUpData)
  .then(res => {
    if(!res.ok)
      throw Error('An error occurred!');
    
    return res.json()
  })
  .then(data => {
    meetups.update(items => {
      const index = items.findIndex(m => m.id === id);
      if(index >= 0) {
        items[index] = {...items[index], ...meetUpData};
        return [...items];
      }
    });
  })
  .catch(err => console.log(err));
}

function deleteMeetUp(id) {
  http.delete(resorce, id)
  .then(res => {
    if(!res.ok)
      throw Error('An error occurred!');
    
    return res.json()
  })
  .then(data => {
    meetups.update(items => items.filter(m => m.id !== id));
  })
  .catch(err => console.log(err));

}

const customStorage = {
  subscribe: meetups.subscribe,
  toggleFavorite,
  addMeetUp,
  updateMeetUp,
  patch,
  deleteMeetUp,
  get: () => { 
    http.get(resorce)
    .then(res => {
      if(!res.ok)
      throw Error('An error occurred!');
    
      return res.json()
    })
    .then(data => { 
      const meets = Object.entries(data).map(m => Object.values(m)).map(x => ({id: x[0], ...x[1]})).reverse()
      meetups.set(meets);
    })
    return true;
  }

}


export default customStorage;