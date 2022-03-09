<script>
  import Header from "./UI/Header.svelte";
  import MeetUpGrid from "./MeetUp/MeetUpGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from './UI/Button.svelte';

  let newMeetUP = {
    id: Math.random() * 10,
    title: "",
    subtitle: "",
    imageUrl: "",
    description: "",
    address: "",
    contactEmail: "",
  };

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
    },
  ];

  function addMeetUp() {
    const isValidMeetUp = 6;

    if (isValidMeetUp) {
      meetUps = [newMeetUP, ...meetUps];
      newMeetUP = {
        id: meetUps.length + 1,
        title: "",
        subtitle: "",
        imageUrl: "",
        description: "",
        address: "",
        contactEmail: "",
      };
    }
  }
</script>

<Header />
<main>
  <form on:submit|preventDefault={addMeetUp}>
    <TextInput label="title" id="title" value={newMeetUP.title} on:input={e => newMeetUP.title = e.target.value} />
    <TextInput label="subtitle" id="subtitle" value={newMeetUP.subtitle} on:input={e => newMeetUP.subtitle = e.target.value} />
    <TextInput label="address" id="address" value={newMeetUP.address} on:input={e => newMeetUP.address = e.target.value} />
    <TextInput label="image" id="image" value={newMeetUP.imageUrl} on:input={e => newMeetUP.imageUrl = e.target.value} />
    <TextInput
      label="email"
      id="email"
      type="email"
      value={newMeetUP.contactEmail}
      on:input={e => newMeetUP.contactEmail
       = e.target.value}
    />
    <TextInput
      label="description"
      id="description"
      controlType="textarea"
      rows="3"
      value={newMeetUP.description}
      on:input={e => newMeetUP.description
        = e.target.value}
    />
    <Button type="submit" caption="Save"/>

  </form>
  <MeetUpGrid {meetUps} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>
