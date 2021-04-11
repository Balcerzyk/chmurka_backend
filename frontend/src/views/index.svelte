<script>
  import DataTable from "smelte/src/components/DataTable";

  import Row from "../components/Row.svelte";
  import Drawer from "../components/Drawer.svelte";
  import { Button } from "smelte";

  const apiUrl = __process.env.API_URL;

  let data = [];
  let statsData = null;

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
    const res = await fetch(`//${apiUrl}/api/movies`);
    const body = await res.json();

    data = body.data;

    const statsRes = await fetch(`//${apiUrl}/api/statistics`);
    const statsBody = await statsRes.json();

    statsData = statsBody.data;

    showDrawer = false;

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
        const res = await fetch(`//${apiUrl}/api/movies/${data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const body = await res.json();

        getData();
        break;
      }
      case "create": {
        const res = await fetch(`//${apiUrl}/api/movies`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const body = await res.json();

        getData();
        break;
      }
    }
  }

  async function removeCallback({ detail }) {
    const { id } = detail;

    const res = await fetch(`//${apiUrl}/api/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await res.json();

    getData();
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

<Drawer
  bind:show={showDrawer}
  item={drawerItem}
  on:saveItem={saveCallback}
  on:removeItem={removeCallback}
/>

<Button add="m-8" on:click={createCallback}>Create New Item</Button>
<div class="px-8">
  <DataTable {data} {loading} {columns} sortBy={{ field: "id" }} asc={true}>
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
<section class="my-4 px-8">
  <h2>Statistics</h2>
  {#if statsData}
    <ul>
      {#each Object.entries(statsData) as [key, value]}
        <li><b>{key}:</b> {value}</li>
      {/each}
    </ul>
  {/if}
</section>
