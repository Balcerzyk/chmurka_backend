<script>
  import DataTable from "smelte/src/components/DataTable";

  import Row from "../components/Row.svelte";
  import Drawer from "../components/Drawer.svelte";
  import Remove from "../components/Remove.svelte";
  import { Button } from "smelte";

  let data = [];
  let loading = true;
  let columns = [
    { label: "ID", field: "id", class: "md:w-10" },
    { field: "originalTitle", class: "md:w-10" },
    { field: "titleType", class: "md:w-10" },
    { field: "primaryTitle", class: "md:w-10" },
    { field: "isAdult", class: "md:w-10" },
    { field: "startYear", class: "md:w-10" },
    { field: "endYear", class: "md:w-10" },
    { field: "runtimeMinutes", class: "md:w-10" },
    { field: "genres", class: "md:w-10" },
    { label: "Remove", class: "md:w-10", component: Remove },
  ];

  let showDrawer = false;
  let drawerItem = null;

  $: {
    const classList = document.body.classList;

    if (showDrawer) {
      classList.add("overflow-hidden");
      classList.remove("overflow-auto");
    } else {
      classList.add("overflow-auto");
      classList.remove("overflow-hidden");
    }
  }

  async function getData() {
    if (typeof window === "undefined") return;

    loading = true;
    const res = await fetch("//localhost:8000/api/movies");
    const body = await res.json();

    data = body.data;

    setTimeout(() => (loading = false), 500);
  }

  getData();

  async function clickCallback(event) {
    drawerItem = event.detail;
    showDrawer = true;
  }

  async function saveCallback({ detail }) {
    const { data, type } = detail;

    switch (type) {
      case "update": {
        const res = await fetch(`//localhost:8000/api/movies/${data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data),
        });
        const body = await res.json();

        getData();
      }
      case "create": {
        const res = await fetch(`//localhost:8000/api/movies`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data),
        });
        const body = await res.json();

        getData();
      }
    }
  }

  async function createCallback() {
    drawerItem = {
      tconst: "",
      titleType: "",
      primaryTitle: "",
      originalTitle: "",
      isAdult: false,
      startYear: new Date().getFullYear(),
      endYear: new Date().getFullYear(),
      runtimeMinutes: 1,
      genres: [],
    };
    showDrawer = true;
  }
</script>

<Drawer bind:show={showDrawer} item={drawerItem} on:saveItem={saveCallback} />

<Button add="m-8" on:click={createCallback}>Create New Item</Button>
<div class="px-8">
  <DataTable {data} {loading} {columns}>
    <svelte:fragment slot="item" let:item let:index>
      <Row
        {item}
        {index}
        {columns}
        on:click={clickCallback}
        editing={drawerItem && drawerItem.id === item.id}
      />
    </svelte:fragment>
  </DataTable>
</div>
