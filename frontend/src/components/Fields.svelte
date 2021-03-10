<script>
  import { TextField, Checkbox
 } from "smelte";
 import Switch from './Switch.svelte'
 
  export let fields;

  export let form;
</script>



<form bind:this={form}>
  {#each fields as field}
    {#if field.readonly}
      <TextField name={field.name} label={field.name} bind:value={field.value} outlined disabled/>
		{:else if field.type === 'string'}
      <TextField name={field.name} label={field.name} bind:value={field.value} outlined type="text" />
    {:else if field.type === 'number'}
      <TextField name={field.name} bind:value={field.value} type="number" label={field.name} outlined/>
    {:else if field.type === 'boolean'}
      <Switch label={field.name} name={field.name} bind:value={field.value}/>
    {:else}
      Not supported type
    {/if}
	{/each}
</form>