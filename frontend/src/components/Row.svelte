<script>
  import { createEventDispatcher } from "svelte";
  import { ClassBuilder } from "smelte/src/utils/classes.js";
  import { Spacer } from "smelte/src/components/Util";
  import Icon from "smelte/src/components/Icon";

  export let item = {};
  export let columns = [];
  export let editing = false;

  let classesDefault = "hover:bg-gray-50 dark-hover:bg-dark-400 border-gray-200 dark:border-gray-400 border-t border-b px-3";
  let classes = classesDefault;

  const dispatch = createEventDispatcher();

  const cb = new ClassBuilder(classes, classesDefault);
  $: c = cb
    .flush()
    .add(classes, true, classesDefault)
    .add($$props.class)
    .get();

  function columnClass(column) {
    const cb = new ClassBuilder('relative p-3 font-normal text-right');
    if (column.replace) {
      cb.replace(column.replace)
    }
    if (column.add || column.class) {
      cb.add(column.add || column.class);
    }
    if (column.remove) {
      cb.remove(column.remove);
    }
    return cb.get();
  }
</script>

<tr
  class={c}
  on:click={(e) => {
    editing = true;
    dispatch("click", item);
  }}
  class:selected={editing}
>
  {#each columns as column, i}
    <td
      class={columnClass(column)}
      class:cursor-pointer={true}
    >
      {#if column.component}
        <svelte:component this={column.component} {...(column.componentProps ? column.componentProps(item) : {})} />
      {:else if column.value}
        {@html column.value(item)}
      {:else}
        {@html item[column.field]}
      {/if}
    </td>
  {/each}
</tr>