<script>
  import { TextField, Checkbox } from "smelte";

  export let name;
  export let label;
  export let value;

  let localValue;

  localValue = Array.isArray(value) ? value.join(",") : "";

  $: {
    localValue = localValue.replace(/[^a-zA-Z0-9,]/, "");
    value = localValue ? localValue.split(",") : [];
  }
</script>

<TextField {name} {label} bind:value={localValue} outlined textarea="true" />
