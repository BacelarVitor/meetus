<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import TextInput from '../UI/TextInput.svelte';
  import Modal from '../UI/Modal.svelte';
  import  Button from '../UI/Button.svelte';

  onMount(() => {
    newMeetUP = {
      id: 0,
      title: "",
      subtitle: "",
      imageUrl: "",
      description: "",
      address: "",
      contactEmail: "",
      isFavorite: false
    };
  })

 export let newMeetUP = {
    id: Math.random() * 10,
    title: "",
    subtitle: "",
    imageUrl: "",
    description: "",
    address: "",
    contactEmail: "",
    isFavorite: false
  };

  const dispath = new createEventDispatcher();

  const submitForm = () => {
    dispath('save', newMeetUP)
  }

  const cancel = () => {
    dispath('cancel');
  }
</script>
<Modal title="Enter MeetUp data" on:cancel>
  <form>
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
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button"  on:click={submitForm}>Save</Button>
  </div>
</Modal>  
<style>
  form {
    /* width: 30rem; */
    max-width: 100%;
    /* margin: auto; */
  }
</style>