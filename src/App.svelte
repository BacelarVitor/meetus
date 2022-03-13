<script>
  import Header from "./UI/Header.svelte";
  import MeetUpGrid from "./MeetUp/MeetUpGrid.svelte";

  import EditForm from './MeetUp/MeetUpForm.svelte';
  import Button from './UI/Button.svelte';

  import meetUps from './MeetUp/meetups-store'

  let showForm = false;

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
      <EditForm on:save={toggleShowForm}  on:cancel={toggleShowForm}/>
  {/if}
  <MeetUpGrid meetUps={$meetUps}/>
</main>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
  
</style>
