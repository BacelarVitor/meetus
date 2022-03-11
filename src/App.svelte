<script>
  import Header from "./UI/Header.svelte";
  import MeetUpGrid from "./MeetUp/MeetUpGrid.svelte";
  import Modal from './UI/Modal.svelte';
  import EditForm from './MeetUp/MeetUpForm.svelte';
  import Button from './UI/Button.svelte';

  let showForm = false;

  let meetUps = [
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
  ];

  function addMeetUp(event) {

    const newMeetUP = event.detail;

    const isValidMeetUp = newMeetUP.title && newMeetUP.subtitle && newMeetUP.imageUrl && newMeetUP.description && newMeetUP.address && newMeetUP.contactEmail;

    if (isValidMeetUp) {
      meetUps = [newMeetUP, ...meetUps];
      toggleShowForm();
    }
  }

  function toggleFavorite(event) {
    meetUps = meetUps.map(meetUp => meetUp.id === event.detail.id ? {...meetUp, isFavorite: !meetUp.isFavorite } : meetUp);
  }

  function toggleShowForm() {
    showForm = !showForm;
  }
</script>

<Header />
<main>
  <div class="meetup-controls">
    <Button on:click={toggleShowForm}>New MeetUp</Button>
  </div>

  {#if showForm}
      <EditForm on:save={addMeetUp}  on:cancel={toggleShowForm}/>
  {/if}
  <MeetUpGrid {meetUps} on:togglefavorite={toggleFavorite}/>
</main>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
  
</style>
