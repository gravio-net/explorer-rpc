<template>
  <TestTabView>
    <TestTabPanel header="In/Out">
      <div class="flex">
        <TestPanel style="width:50%" class="" header="in" :pt="{
        header: { class: 'bg-red-200' } }">
          <tx-out v-for="input in inputs" v-bind:key="input.id" v-bind:addr="input.addr" v-bind:amount="input.amount"/>
        </TestPanel>
        <TestPanel style="width:50%" header="out" :pt="{
        header: { class: 'bg-green-200' } }">
          <tx-out v-for="output in outputs" v-bind:key="output.id" v-bind:addr="output.addr" v-bind:amount="output.amount"/>
        </TestPanel>
      </div>
    </TestTabPanel>
    <TestTabPanel header="Raw">
      <div class="card">
        <div class="flex flex-column md:flex-row gap-5">
          <div class="flex-auto">
            <TestScrollPanel style="width: 1100px; height: 200px" :pt="{
                        wrapper: {
                            style: { 'border-right': '10px solid var(--surface-ground)' }
                        },
                        bary: 'hover:bg-primary-400 bg-primary-300 opacity-100',
                        barx: 'hover:bg-primary-400 bg-primary-300 opacity-100'
                    }"
                >
            <pre class="text-xs text-justify line-height-1">
              <code>
{{ tx_pretty }}
              </code>
            </pre>
            </TestScrollPanel>
          </div>
        </div>
      </div>
    </TestTabPanel>                
  </TestTabView>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tx: null,
      tx_pretty: null,
      txid: null,
      tx_locktime: null,
      items: null,
      inputs: null,
      outputs: null
    }
  },
  methods: {
    async gettx() {
      try {
        var url = `http://185.103.132.26:4444/rpc/gettransaction/${this.$route.params.id}`
        //console.log(url)
        const tx = await axios.get(url)
        //console.log(tx)
        this.tx = tx
        this.txid = tx.data["txid"]
        this.tx_locktime = tx.data["locktime"]
        //console.log(JSON.stringify(tx.data, null, 2))
        this.tx_pretty = JSON.stringify(tx.data, null, 2)
        //this.outputs = [{"id": 0, "addr": "OutAddResS", "amount": 2.1}]
        this.outputs = []
        for( var i in tx.data["vout"] ) {
          var addr = tx.data["vout"][i]["scriptPubKey"]["addresses"][0]
          this.outputs.push({ "id": tx.data["vout"][i]["n"], "addr": addr, "amount": tx.data["vout"][i]["value"] })
        }
        this.inputs = []
        for( var j in tx.data["vin"] ) {
          url = `http://185.103.132.26:4444/rpc/gettransaction/${tx.data["vin"][j]["txid"]}`
          const tx_in = await axios.get(url)
          const vout_ix = tx.data["vin"][j]["vout"]
          const vout = tx_in.data["vout"][vout_ix]
          addr = vout["scriptPubKey"]["addresses"][0]
          this.inputs.push({ "id": vout["n"], "addr": addr, "amount": vout["value"] })
        }
      } catch(error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.gettx();
  }
}
</script>
