<template>
  <TestTabView>
    <TestTabPanel header="Peers" paginator :rows="5">
      <div class="card">
        <TestDataTable :value="peersdata" class="p-datatable-sm">
          <TestColumn field="addr" header="Address"></TestColumn>
          <TestColumn field="version" header="Version"></TestColumn>
        </TestDataTable>
      </div>
    </TestTabPanel>
    <TestTabPanel header="Add Nodes">
      <TestDataTable :value="nodesdata" class="p-datatable-sm">
        <TestColumn field="node" header="Nodes"></TestColumn>
      </TestDataTable>
    </TestTabPanel>
  </TestTabView>
</template>

<script>
export default {
  props: {
    peersdata: null,
    nodesdata: null
  },

  mounted() {
  }
};
</script>