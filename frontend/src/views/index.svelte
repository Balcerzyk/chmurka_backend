<script>
  import DataTable from "smelte/src/components/DataTable";

  import Row from "../components/Row.svelte";
  import Drawer from "../components/Drawer.svelte";

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
  ];
  let showDrawer = false;
  let drawerItem = null;

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
</script>

<Drawer show={showDrawer} item={drawerItem} />
<div class="overflow-auto p-1">
  <DataTable {data} {loading} {columns}>
    <svelte:fragment slot="item" let:item let:index>
      <Row {item} {index} {columns} on:click={clickCallback} />
    </svelte:fragment>
  </DataTable>
</div>
