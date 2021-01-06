import { ref, watch } from "vue";

export const useStorage = (name, value = "") => {
  if (!name) {
    throw new Error("Passe um nome para o Storage");
  }

  const data = ref(value);

  if (localStorage.getItem(name)) {
    data.value = JSON.parse(localStorage.getItem(name));
  }

  watch(data, (cur) => {
    console.log(cur);
    if (cur === null) {
      localStorage.removeItem(name);
    } else {
      localStorage.setItem(name, JSON.stringify(cur));
    }
  });

  return [data];
};
