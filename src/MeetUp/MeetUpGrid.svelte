<script>
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate'; 
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
{#if !filteredMeetUps || !filteredMeetUps.length}
  <p id="no-meetups">No meetups found, you can start adding some.</p>
{:else}
  <section id="meetups">
    {#each filteredMeetUps as meetUp (meetUp.id)}
      <div transition:scale animate:flip={{ duration: 500 }}>
        <MeetUp {...meetUp}  on:showdetails on:edit />
      </div>
    {/each}
  </section>
{/if}

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

  #no-meetups {
    margin: 1rem;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
