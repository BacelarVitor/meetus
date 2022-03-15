import { writable } from 'svelte/store';


const meetups = writable([
  {
    id: 1,
    title: "Svelte for hero's",
    subtitle: "Become a war hero coding in svelte",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/498px-Svelte_Logo.svg.png?20191219133350",
    description:
      "Learn Svelte in a warcamp day coding svelte in 10 hours straight",
    address: "Casa do baralho",
    contactEmail: "Flinston@svelte.com",
    isFavorite: false
  },
  {
    id: 2,
    title: "Calisthenics",
    subtitle: "Start your fit journey with us",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/calisthenics-1605096763.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*",
    description: "Learn the fundamentals and a first beginners workout",
    address: "Onde judas perdeu as botas",
    contactEmail: "fon@calisthenics.com",
    isFavorite: false
  },
]);

function toggleFavorite(id) {
  meetups.update(items => {
    const meetUp = items.find(m => m.id === id)
    if(meetUp) {
      meetUp.isFavorite = !meetUp.isFavorite;
    }
    return items;
  })
}

function addMeetUp(meetUpData) {
  meetups.update(items => [{...meetUpData, id: items.length + 1, isFavorite: false}, ...items]);
}

function updateMeetUp(id, meetUpData) {
  meetups.update(items => {
    const index = items.findIndex(m => m.id === id);
    if(index >= 0) {
      items[index] = meetUpData;
      return [...items];
    }
  });
}

function deleteMeetUp(id) {
  meetups.update(items => items.filter(m => m.id !== id));
}

const customStorage = {
  subscribe: meetups.subscribe,
  toggleFavorite,
  addMeetUp,
  updateMeetUp,
  deleteMeetUp
}


export default customStorage;