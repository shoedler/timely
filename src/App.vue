<template>
  <div class="dragbar" />

  <!-- 
    Options
   -->
  <details class="details-reset mt-3">
    <summary class="btn-octicon">Options</summary>
    <div class="mx-2 my-2 p-3 custom-border">
      <button class="btn btn-sm btn-primary" type="button" @click="setDatabasePath()">Set Database Path</button>
    </div>
  </details>

  <div class="mx-3 my-2">
    <!-- 
      Timer & Timer controls
     -->
    <h2 class="text-white my-3">{{ timer.time }}</h2>

    <input class="form-control input-dark" type="text" v-model="nameField" placeholder="name" />
    <input class="form-control input-dark ml-2" type="text" v-model="typeField" placeholder="type" />

    <div class="ml-2 d-inline">
      <button v-if="timer.isRunning" type="button" class="btn-octicon btn-octicon-danger" @click="stop">
        <octicon octicon="square" :size="24" />
      </button>
      <button v-else @click="start" type="button" class="btn-octicon">
        <octicon octicon="chevron-right" :size="24" />
      </button>
    </div>

    <!-- 
      Stamps-list
     -->
    <div class="Box Box--condensed mt-4 input-dark border-0">
      <div class="Box-row border-black-fade d-flex flex-justify-between" v-for="stamp in stampsCollection" :key="stamp.name">
        <span>
          <span class="Counter mr-1">1</span>
          {{ stamp.name }}
          <span class="IssueLabel bg-red text-white ml-1">{{ stamp.type }}</span>
        </span>
        <div>
          <span>{{ stamp.snapshot.time }}</span>
          <button @click="newFromStamp(stamp)" type="button" class="btn-octicon">
            <octicon octicon="chevron-right" :size="16" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Octicon from "@/components/Octicon.vue";
import { computed, ComputedRef, defineComponent, reactive, ref } from "vue";
import { Timer } from '@/classes/timer'
import { Stamp } from '@/classes/stamp'
import { OpenDialogReturnValue } from "electron";
import { useElectronStorage } from "./storage";

export default defineComponent({
  name: "App",
  components: {
    Octicon,
  },
  setup() {
    const nameField = ref<string>("");
    const typeField = ref<string>("");

    const timer = reactive<Timer>(new Timer({ delay: 100 }));
    const stamps = reactive<Array<Stamp>>([]);
    const stampsCollection: ComputedRef<Array<Stamp>> = computed<Array<Stamp>>(() =>
      stamps.sort((a, b) => a.snapshot.startDate.getTime() - b.snapshot.startDate.getTime())
    );

    const start = () => timer.start();

    const stop = () => {
      const snapshot = timer.stop();
      if (snapshot) {
        stamps.push(new Stamp(snapshot, nameField.value, typeField.value));
        nameField.value = "";
        typeField.value = "";
        timer.clear();
      }
    };

    const newFromStamp = (stamp: Stamp) => {
      stop();
      nameField.value = stamp.name;
      typeField.value = stamp.type;
      start();
    };

    const setDatabasePath = async () => {
      // COMBAK --> Persist DB Path setting
      //        --> Query if path was already set
      //        --> Implement DB with incremental querying
      // let path = ''
      // const es = useElectronStorage()

      // if (!es.getDatabasePath()) {
      //   const res: OpenDialogReturnValue = await window.dialog.showOpenDialog({
      //     title: 'Set Database Directory',
      //     message: 'Define where the databse should be stored / is located at',
      //     properties: ["openDirectory"]
      //   })
      //   path = res.filePaths[0]
      //   es.setDatabasePath(path)
      // }

      let path = ''
      const res: OpenDialogReturnValue = await window.dialog.showOpenDialog({
        title: 'Set Database Directory',
        message: 'Define where the database should be stored / is located at',
        properties: ["openDirectory"]
      })
      path = res.filePaths[0]

      console.log(path);
    }

    return {
      nameField,
      typeField,
      timer,
      start,
      stop,
      stamps,
      stampsCollection,
      newFromStamp,
      setDatabasePath
    };
  },
});
</script>

<style lang="scss">
button:focus {
  outline: none !important;
}

summary.btn-octicon:focus {
  outline: none !important;
}

.custom-border {
  border: 3px rgba(255,255,255,0.15) dashed;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar {
  display: none;
  background-color: #ffffff;
  width: 10px;
}

::-webkit-scrollbar-thumb:window-inactive,
::-webkit-scrollbar-thumb {
  background: #f1f0f5;
  border-radius: 5px;
}

.dragbar {
  height: 10px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: #282e33;
  -webkit-app-region: drag;
}
</style>
