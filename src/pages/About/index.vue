<template>
  <main class="about-container">
    <h1>About</h1>

    <article class="users" v-if="users.length">
      <transition-group name="fade">
        <div v-for="user in users" :key="user.id">
          <img :src="user.avatar" alt="avatar" />
          <p>{{ `${user.first_name} ${user.last_name}` }}</p>
          <p>{{ user.email }}</p>
        </div>
      </transition-group>
    </article>
    <button :disabled="idx <= 1" @click="idx--">&lt;</button>
    <button :disabled="idx >= 2" @click="idx++">&gt;</button>
  </main>
</template>

<script>
import { ref, watchEffect } from "vue";
import { get } from "axios";
export default {
  setup() {
    const idx = ref(1);
    const users = ref([]);

    watchEffect(() => {
      get(`https://reqres.in/api/users?page=${idx.value}`).then((res) => {
        users.value = res.data.data;
      });
    });

    return { users, idx };
  },
};
</script>

<style>
.about-container {
  max-width: 80vw;
  min-width: 800px;
}
.about-container h1 {
  margin-top: 30px;
}
.about-container h2 {
  margin-top: 50px;
}
.about-container button {
  margin: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}
.about-container button:active {
  transform: scale(0.9);
}
.users {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}
.users div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.users div img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.fade-enter-active {
  animation: fade-enter 0.8s ease-in-out;
}
.fade-leave-active {
  display: none;
}
@keyframes fade-enter {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-leave {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
