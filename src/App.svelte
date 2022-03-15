<script>
  import Header from './UI/Header.svelte';
  import MeetUpGrid from './MeetUp/MeetUpGrid.svelte';
  import MeetUpDetails from './MeetUp/MeetUpDetails.svelte';

  import EditForm from './MeetUp/MeetUpForm.svelte';
  import Button from './UI/Button.svelte';

  import meetUps from './MeetUp/meetups-store'

  let showForm = false;
  let page = 'list'
  let meetUpId = null;

  function toggleShowForm() {
    showForm = !showForm;
  }

  function showDetails(event) {
    meetUpId = event.detail.id;
    page = 'details';
  }

  function editMeetUp(event) {
    meetUpId = event.detail.id; 
    toggleShowForm();
  }

  function goToList() {
    meetUpId = null;
    page = 'list';
  }
</script>

<Header />
<main>
  {#if page === 'list'}
    {#if showForm}
        <EditForm on:save={toggleShowForm}  on:cancel={toggleShowForm} id={meetUpId} />
    {/if}
    <MeetUpGrid meetUps={$meetUps}  on:showdetails={showDetails} on:edit={editMeetUp} on:add={toggleShowForm}/>
  {:else} 
    <MeetUpDetails id={meetUpId} on:close={goToList} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
