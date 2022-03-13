<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import TextInput from '../UI/TextInput.svelte';
  import Modal from '../UI/Modal.svelte';
  import  Button from '../UI/Button.svelte';
  import { isEmpty } from '../helpers/validation.js';
  import meetUps from './meetups-store'

  onMount(() => {
    newMeetUp = {
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

  export let newMeetUp = {
    title: "",
    subtitle: "",
    imageUrl: "",
    description: "",
    address: "",
    contactEmail: ""
  };
  const dispath = new createEventDispatcher();

  const submitForm = () => {
    const isValidMeetUp = newMeetUp.title && newMeetUp.subtitle && newMeetUp.imageUrl && newMeetUp.description && newMeetUp.address && newMeetUp.contactEmail;

    if (isValidMeetUp) {
      meetUps.addMeetUp(newMeetUp);
      dispath('save')
    }
  }


  const cancel = () => {
    dispath('cancel');
  }

  $: isTitleValid = !isEmpty(newMeetUp.title);
  $: isSubtitleValid = !isEmpty(newMeetUp.subtitle);
  $: isImageUrlValid = !isEmpty(newMeetUp.imageUrl);
  $: isDescriptionValid = !isEmpty(newMeetUp.description);
  $: isAddressValid = !isEmpty(newMeetUp.address);
  $: isContactEmailValid = !isEmpty(newMeetUp.contactEmail);
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
      value={newMeetUp.title} 
      on:input={e => newMeetUp.title = e.target.value} 
    />
    <TextInput 
      isValid = {isSubtitleValid}
      required="true"
      validityMessage='Please enter a subtitle.'
      label="subtitle" 
      id="subtitle" 
      value={newMeetUp.subtitle} 
      on:input={e => newMeetUp.subtitle = e.target.value} 
    />
    <TextInput 
      isValid = {isAddressValid}
      required="true"
      validityMessage='Please enter a address.'
      label="address" 
      id="address" 
      value={newMeetUp.address} 
      on:input={e => newMeetUp.address = e.target.value} 
    />
    <TextInput 
      isValid = {isImageUrlValid}
      required="true"
      validityMessage='Please enter a image url.'
      label="image" 
      id="image" 
      value={newMeetUp.imageUrl} 
      on:input={e => newMeetUp.imageUrl = e.target.value} 
    />
    <TextInput
      isValid = {isContactEmailValid}
      required="true"
      validityMessage='Please enter a email.'
      label="email"
      id="email"
      type="email"
      value={newMeetUp.contactEmail}
      on:input={e => newMeetUp.contactEmail
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
      bind:value={newMeetUp.description}
      on:input={e => newMeetUp.description
        = e.target.value}
    />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" disabled={!isFormValid} on:click={submitForm}>Save</Button>
  </div>
</Modal>  
<style>
  form {
    /* width: 30rem; */
    max-width: 100%;
    /* margin: auto; */
  }
</style>