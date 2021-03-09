<template>
  <div class="dragbar" />

  <div class="mx-3 my-2">
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

    <div class="Box Box--condensed mt-4 input-dark border-0">
      <div class="Box-row border-black-fade d-flex flex-justify-between" v-for="stamp in stampsCollection" :key="stamp.name">
        <span>{{ stamp.name }} [{{ stamp.type }}] </span>
        <div>
          <span>{{ stamp.snapshot.time }}</span>
          <button @click="useStamp(stamp)" type="button" class="btn-octicon">
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
import { Stamp, Timer } from "@/classes";

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

    const useStamp = (stamp: Stamp) => {
      stop();
      nameField.value = stamp.name;
      typeField.value = stamp.type;
      start();
    };

    return {
      nameField,
      typeField,
      timer,
      start,
      stop,
      stamps,
      stampsCollection,
      useStamp,
    };
  },
});
</script>

<style lang="scss">
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
