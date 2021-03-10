<script>
  import { Router } from "svelte-router-spa";
  import { routes } from "./routes";
  import "smelte/src/tailwind.css";
</script>

<Router {routes} />

<style>
  :global(body) {
    overflow: hidden;
  }
</style>
