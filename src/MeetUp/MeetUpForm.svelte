<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import TextInput from '../UI/TextInput.svelte';
  import Modal from '../UI/Modal.svelte';
  import  Button from '../UI/Button.svelte';
  import { isEmpty } from '../helpers/validation.js';

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

  $: isTitleValid = !isEmpty(newMeetUP.title);
  $: isSubtitleValid = !isEmpty(newMeetUP.subtitle);
  $: isImageUrlValid = !isEmpty(newMeetUP.imageUrl);
  $: isDescriptionValid = !isEmpty(newMeetUP.description);
  $: isAddressValid = !isEmpty(newMeetUP.address);
  $: isContactEmailValid = !isEmpty(newMeetUP.contactEmail);
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
      value={newMeetUP.title} 
      on:input={e => newMeetUP.title = e.target.value} 
    />
    <TextInput 
      isValid = {isSubtitleValid}
      required="true"
      validityMessage='Please enter a subtitle.'
      label="subtitle" 
      id="subtitle" 
      value={newMeetUP.subtitle} 
      on:input={e => newMeetUP.subtitle = e.target.value} 
    />
    <TextInput 
      isValid = {isAddressValid}
      required="true"
      validityMessage='Please enter a address.'
      label="address" 
      id="address" 
      value={newMeetUP.address} 
      on:input={e => newMeetUP.address = e.target.value} 
    />
    <TextInput 
      isValid = {isImageUrlValid}
      required="true"
      validityMessage='Please enter a image url.'
      label="image" 
      id="image" 
      value={newMeetUP.imageUrl} 
      on:input={e => newMeetUP.imageUrl = e.target.value} 
    />
    <TextInput
      isValid = {isContactEmailValid}
      required="true"
      validityMessage='Please enter a email.'
      label="email"
      id="email"
      type="email"
      value={newMeetUP.contactEmail}
      on:input={e => newMeetUP.contactEmail
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
      bind:value={newMeetUP.description}
      on:input={e => newMeetUP.description
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