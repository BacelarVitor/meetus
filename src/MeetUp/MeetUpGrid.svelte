<script>
  import MeetUp from "./MeetUpItem.svelte";
  export let meetUps;
</script>

<section id="meetups">
  {#each meetUps as meetUp, i (meetUp.id)}
    <!-- svelte-ignore missing-declaration -->
    <MeetUp {...meetUp}  on:showdetails on:edit />
  {/each}
</section>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
