<template>
  <div class="bg-primary-100 h-screen flex align-items-center justify-content-center">
    <div class="grid" style="max-width: 1200px">
      <div class="col-12">
        <div class="card relative z-2 surface-0 shadow-2 p-3 border-round-lg">
          <TestMenubar :model="items">
            <template #start>
              <div class="flex align-items-center">
                <img alt="logo" src="/gio.png" height="30" class="mr-2"/>
                <h2>Graviocoin explorer</h2>
              </div>
            </template>
            <template #item="{ label, item, props, root, hasSubmenu }">
                <router-link v-if="item.route" v-slot="routerProps" :to="item.route" custom>
                    <a :href="routerProps.href" v-bind="props.action">
                        <span v-bind="props.icon" />
                        <span v-bind="props.label">{{ label }}</span>
                    </a>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span v-bind="props.icon" />
                    <span v-bind="props.label">{{ label }}</span>
                    <span :class="[hasSubmenu && (root ? 'pi pi-fw pi-angle-down' : 'pi pi-fw pi-angle-right')]" v-bind="props.submenuicon" />
                </a>
            </template>
            <template #end>
            </template>
          </TestMenubar>
        </div>
      </div>
      <div class="col-4">
        <div class="surface-0 shadow-2 p-3 border-round-lg">
          <div class="text-500">Blocks</div>
          <div class="text-900">{{ blocks }}</div>
        </div>
      </div>
      <div class="col-4">
        <div class="surface-0 shadow-2 p-3 border-round-lg">
          <div class="text-500">Supply</div>
          <div class="text-900">{{ supply }}</div>
        </div>
      </div>
      <div class="col-4">
        <div class="surface-0 shadow-2 p-3 border-round-lg">
          <div class="text-500">Difficulty</div>
          <div class="text-900">{{ difficulty }}</div>
        </div>
      </div>
      <div class="col-12">
        <div class="surface-0 shadow-2 p-3 border-round-lg">
          <div class="p-inputgroup flex-1">
            <TestInputText placeholder="Transaction" v-model="txid"/>
            <TestButton icon="pi pi-search" @click="gettx(), visible = true"/>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="surface-0 shadow-2 p-3 border-round-lg">
          <router-view :blocksdata="lastblocks" :peersdata="peersdata" :nodesdata="nodesdata"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from "vue";


export default {
  data() {
    return {
      info: null,
      blocks: null,
      supply: null,
      difficulty: null,
      lastblocks: null,
      peerinfo: null,
      tx_pretty: null,
      txid: null,
      tx_locktime: null,
      items: null,
      peersdata: null,
      nodesdata: null
    }
  },
  methods: {
    async fetch() {
      try {
        const response = await axios.get('http://185.103.132.26:4444/rpc/getblockchaininfo')
        const last_blocks = await axios.get('http://185.103.132.26:4444/rpc/getlastblocks')
        const peer_info = await axios.get('http://185.103.132.26:4444/rpc/getpeerinfo')
        //console.log(response)
        this.info = response
        this.blocks = response.data["result"]["blocks"]
        this.supply = response.data["result"]["moneysupply"]
        this.difficulty = response.data["result"]["difficulty"]
        this.lastblocks = last_blocks.data["result"]
        this.peerinfo = peer_info
        //console.log(this.lastblocks)
        this.peersdata = []
        this.nodesdata = []
        for( var i in peer_info.data["result"] ) {
          if(i < 5) {
            this.peersdata.push({ "addr": peer_info.data["result"][i]["addr"], "version": peer_info.data["result"][i]["version"] })
          }
          if( peer_info.data["result"][i]["addnode"] ) {
            this.nodesdata.push( { "node": "addnode=" + peer_info.data["result"][i]["addr"] })
          }
        }
      } catch(error) {
        console.log(error);
      }

      this.items = ref([
        {
            label: 'Blocks',
            icon: 'pi pi-fw',
            route: '/'
        },
        {
            label: 'Peers',
            icon: 'pi pi-fw',
            route: '/peers'
        }
    ]);
    },
    async gettx() {
      try {
        const tx = await axios.get(`http://185.103.132.26:4444/rpc/gettransaction/${this.txid}`)
        //console.log(tx)
        this.txid = tx.data["txid"]
        this.tx_locktime = tx.data["locktime"]
        console.log(JSON.stringify(tx.data, null, 2))
        this.tx_pretty = JSON.stringify(tx.data, null, 2)
        this.$router.push(`/tx/${this.txid}`)
      } catch(error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.fetch();
    setInterval(this.fetch, 60000); 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
