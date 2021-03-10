<script>
  // This is top src/routes/_layout.svelte.

  import {
    List,
    ListItem,
    NavigationDrawer
  } from "smelte";

  const menu = [
      { to: "components/text-fields", text: 'Text fields' },
      { to: "components/buttons", text: 'Buttons' },
      { to: "components/selection-controls", text: 'Selection controls' },
      { to: "components/lists", text: 'Lists' },
      { to: "components/navigation-drawers", text: 'Navigation Drawers' },
      { to: "..", text: 'Go back' },
    ];
  
  let path = "components/navigation-drawers";

  export let show = false;
  export let item = null;

</script>

<NavigationDrawer
  bind:show={show}
  right={true}
  persistent={false}
  elevation={true}
  classes="fixed top-0 md:pt-16 w-auto drawer overflow-hidden h-full";
>
Hello
</NavigationDrawer>