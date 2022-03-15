<script>
  import { createEventDispatcher } from 'svelte';
  import MeetUp from './MeetUpItem.svelte';
  import MeetUpFilter from './MeetUpFilter.svelte';
  import Button from '../UI/Button.svelte';

  export let meetUps;
  let favoritesOnly = false;

  $: filteredMeetUps = favoritesOnly ? meetUps.filter(m => m.isFavorite) : [...meetUps]

  function filter(event) {
    favoritesOnly = event.detail.favoritesOnly;
  }

  const dispatch = createEventDispatcher();
</script>
<section id="meetup-controls">
  <MeetUpFilter on:selected={filter} />
  <Button on:click={() => dispatch('add')}>New MeetUp</Button>
</section>
<section id="meetups">
  {#each filteredMeetUps as meetUp, i (meetUp.id)}
    <!-- svelte-ignore missing-declaration -->
    <MeetUp {...meetUp}  on:showdetails on:edit />
  {/each}
</section>

<style>
  #meetup-controls {
    margin: 0 1rem;
    display: flex;
    justify-content: space-between;
  }
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
