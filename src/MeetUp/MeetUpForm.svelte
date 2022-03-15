<script>
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  import TextInput from '../UI/TextInput.svelte';
  import Modal from '../UI/Modal.svelte';
  import  Button from '../UI/Button.svelte';
  import { isEmpty } from '../helpers/validation.js';
  import meetUps from './meetups-store'


  export let id; 
  export let meetUp = {
    title: "",
    subtitle: "",
    imageUrl: "",
    description: "",
    address: "",
    contactEmail: ""
  };
  
  const unsubscribe = meetUps.subscribe(items => {
    if(id) {
      const selectedMeetUp = items.find(m => m.id === id);
      if(selectedMeetUp) {
        meetUp = selectedMeetUp;
      }
    }
  });

  unsubscribe();
  // onMount(() => {
  //   meetUp = {
  //     id: 0,
  //     title: "",
  //     subtitle: "",
  //     imageUrl: "",
  //     description: "",
  //     address: "",
  //     contactEmail: "",
  //     isFavorite: false
  //   };

    
  // })

 
  const dispath = new createEventDispatcher();

  function submitForm() {
    const isValidMeetUp = meetUp.title && meetUp.subtitle && meetUp.imageUrl && meetUp.description && meetUp.address && meetUp.contactEmail;

    if (isValidMeetUp) {
      if(id) {
        meetUps.updateMeetUp(id,meetUp);
      } else {
        meetUps.addMeetUp(meetUp);
      }

      dispath('save')
    }
  }

  function deleteMeetUp() {
    meetUps.deleteMeetUp(id);
    dispath('save');
  }

  const cancel = () => {
    dispath('cancel');
  }

  $: isTitleValid = !isEmpty(meetUp.title);
  $: isSubtitleValid = !isEmpty(meetUp.subtitle);
  $: isImageUrlValid = !isEmpty(meetUp.imageUrl);
  $: isDescriptionValid = !isEmpty(meetUp.description);
  $: isAddressValid = !isEmpty(meetUp.address);
  $: isContactEmailValid = !isEmpty(meetUp.contactEmail);
  $: isFormValid = isTitleValid && isSubtitleValid && isImageUrlValid && isDescriptionValid && isAddressValid && isContactEmailValid
  


</script>
<Modal title="Enter MeetUp data" on:cancel>
  <form>
    <TextInput 
      isValid = {isTitleValid}
      required="true"
      validityMessage='Please enter a title.'
      label="title" 
      id="title" 
      value={meetUp.title} 
      on:input={e => meetUp.title = e.target.value} 
    />
    <TextInput 
      isValid = {isSubtitleValid}
      required="true"
      validityMessage='Please enter a subtitle.'
      label="subtitle" 
      id="subtitle" 
      value={meetUp.subtitle} 
      on:input={e => meetUp.subtitle = e.target.value} 
    />
    <TextInput 
      isValid = {isAddressValid}
      required="true"
      validityMessage='Please enter a address.'
      label="address" 
      id="address" 
      value={meetUp.address} 
      on:input={e => meetUp.address = e.target.value} 
    />
    <TextInput 
      isValid = {isImageUrlValid}
      required="true"
      validityMessage='Please enter a image url.'
      label="image" 
      id="image" 
      value={meetUp.imageUrl} 
      on:input={e => meetUp.imageUrl = e.target.value} 
    />
    <TextInput
      isValid = {isContactEmailValid}
      required="true"
      validityMessage='Please enter a email.'
      label="email"
      id="email"
      type="email"
      value={meetUp.contactEmail}
      on:input={e => meetUp.contactEmail
       = e.target.value}
    />
    <TextInput
      isValid = {isDescriptionValid}
      required="true"
      validityMessage='Please enter a description.'
      label="description"
      id="description"
      controlType="textarea"
      rows="3"
      bind:value={meetUp.description}
      on:input={e => meetUp.description
        = e.target.value}
    />
  </form>
  <div slot="footer" class="flex justify-between">
    <div>
      <Button mode="outline" on:click={cancel}>Cancel</Button>
      <Button disabled={!isFormValid} on:click={submitForm}>Save</Button>
    </div>
    {#if id}
      <Button mode="outline" on:click={deleteMeetUp}>Delete</Button> 
    {/if}
  </div>
</Modal>  
<style>
  form {
    /* width: 30rem; */
    max-width: 100%;
    /* margin: auto; */
  }

  .flex {
    display: flex;
  }

  .justify-between {
    justify-content: space-between;
  }
</style>