<template>
  <section class="container">
    <aside class="position-container">
      <h1 class="position-title">M0US3 P0S1T10N</h1>
      <h3 class="position-text">{{ `{ x: ${x}, y: ${y} }` }}</h3>
    </aside>

    <nav class="navbar">
      <router-link
        v-for="({ path }, idx) in routes"
        :key="idx"
        :to="path"
        custom
        v-slot="{ navigate, route, isActive }"
      >
        <button
          class="link"
          :class="[isActive && 'link-active']"
          @click="navigate"
        >
          {{ route.meta.protected && "🔒" }}
          {{ route.name }}
        </button>
      </router-link>
    </nav>

    <router-view v-slot="{ Component }">
      <transition name="bounce">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script>
import { useMousePosition } from "./composables/use-mouse-position";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { x, y } = useMousePosition();

    const router = useRouter();

    return {
      x,
      y,
      routes: router.getRoutes(),
    };
  },
};
</script>

<style>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.position-container {
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: 2px dotted #fafafa;
  border-radius: 5px;
  padding: 10px 20px;
}
.position-title {
  font-size: 1.2rem;
}
.position-text {
  font-size: 1rem;
}

.navbar {
  display: flex;
  justify-content: space-evenly;
  /* width: 800px; */
  padding: 10px 0;
  margin-bottom: 40px 20px;
}

.link {
  cursor: pointer;
  padding: 10px;
  border: 1px dashed #fff;
  border-radius: 5px;
  background: transparent;
  color: #fafafa;
  margin: 0 10px;
  width: 150px;
  transition: all 0.1s ease-in-out;
  text-transform: capitalize;
  font-size: 1rem;
}
.link-active {
  background: #fafafa;
  color: #2C3E50;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  display: none;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
