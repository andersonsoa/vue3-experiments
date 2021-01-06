<template>
  <main>
    <h1>-* DASHBOARD *-</h1>

    <button @click="handleLogout()" class="btn-logout">Logout</button>

    <article class="itens">
      <input
        @keypress.enter="addItem()"
        v-model="input"
        type="text"
        placeholder="Produto"
      />

      <div v-for="(item, idx) in store" :key="idx">
        {{ item }} <button @click="removeItem(idx)">x</button>
      </div>
    </article>
  </main>
</template>

<script>
import { ref } from "vue";
import { useAuth } from "../../composables/use-auth";
import { useStorage } from "../../composables/use-storage";
import { useRouter } from "vue-router";

export default {
  name: "PaginaDashboard",

  setup() {
    const { logout } = useAuth();
    const router = useRouter();

    const { store, input, addItem, removeItem } = useItemList();

    const handleLogout = () => {
      logout();
      router.push({ name: "login" });
    };

    return {
      handleLogout,
      store,
      input,
      addItem,
      removeItem,
    };
  },
};

const useItemList = () => {
  const [store] = useStorage("v3-app::items", ["Maçã"]);
  const input = ref("");

  const addItem = () => {
    store.value = [...store.value, input.value];
    input.value = "";
  };

  const removeItem = (idx) => {
    store.value = store.value.filter((_item, k) => k !== idx);
  };

  return {
    store,
    input,
    addItem,
    removeItem,
  };
};
</script>

<style lang="scss">
.itens {
  padding: 20px;
  width: 300px;
  border: 1px solid #fafafa;
  box-shadow: 0px 10px 20px -5px #1115;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.9, 1);

  input {
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    width: 100%;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    button {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      color: red;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
    }
    button:active {
      transform: scale(0.9);
    }
  }
}

.btn-logout {
  padding: 15px 25px;
  position: relative;
  background-color: #2C3E50;
  color: #fafafa;
  text-transform: uppercase;

  cursor: pointer;

  margin-top: 20px;
  border: 1px solid #fafafa;
  transition: 0.1s ease;
  z-index: 100;

  top: -5px;
  left: -5px;
}
.btn-logout:hover {
  color: indianred;
}
.btn-logout:active {
  top: 0;
  left: 0;
}
.btn-logout::after {
  content: "";
  background: #2C3E50;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -101;
}
.btn-logout::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 5px;
  left: 5px;
  border: 1px solid #fafafa;
  z-index: -102;
  transition: 0.1s ease;
}
.btn-logout:active::before {
  content: "";
  top: 0;
  left: 0;
}
</style>
