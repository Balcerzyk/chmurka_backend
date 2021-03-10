<script>
  import { createEventDispatcher } from "svelte";

  import {
    List,
    ListItem,
    NavigationDrawer,
    Button
  } from "smelte";

  import parseFields from '../utils/parseFields';

  import Fields from './Fields.svelte'

  export let show = false;
  export let item = null;

  const dispatch = createEventDispatcher();

  function parseData(fields){
    return [...fields].reduce((acc, item) => {
      acc[item.name] = item.value;
      
      return acc;
    }, {})
  }

  let fields = [];
  let form;

  $: if(item) {
    fields = parseFields(item);
  }
</script>

<NavigationDrawer
  bind:show={show}
  right={true}
  persistent={false}
  elevation={true}
  classes="fixed top-0 w-96 drawer overflow-hidden h-full";
>
<div class="py-16 px-4">
    Edit details (id: {item.id})
    <Fields {fields} bind:form={form}/>
    <Button add="mt-8" on:click={(e) => {
      console.log(form.elements);
      dispatch("saveItem", {
        data: parseData(form.elements),
        type: typeof item.id === 'number' ? 'update': 'create'
      });
  }}>Save</Button>
  </div>
</NavigationDrawer>