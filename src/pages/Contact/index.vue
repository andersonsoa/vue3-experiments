<template>
  <main>
    <h1>Contact</h1>
    <p>
      Este 'textarea' tem um bind com uma variavel gerada por um hook que cria e
      atualiza
    </p>
    <p>um localStorage em real time.</p>
    <p>Digite algo e de um refresh na pagina. Sim, os dados persistem</p>

    <textarea
      v-model="message"
      name="message"
      id="message"
      cols="30"
      rows="11"
    />
  </main>
</template>

<script>
import { useStorage } from "../../composables/use-storage";
export default {
  setup() {
    const [message] = useStorage("v3-app::message");

    return { message };
  },
};
</script>

<style>
textarea {
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
  width: 400px;
  outline: none;
  border: none;
}
</style>
