<template>
  <form class="form">
    {{ date }}
    <h2>Login</h2>
    <code>https://reqres.in/</code><br />
    <span>
      <code> { email: "eve.holt@reqres.in", password: "cityslicka", } </code>
    </span>
    <div class="form-field">
      <input
        v-model="email"
        name="login"
        autocomplete="off"
        class="form-input"
        type="text"
      />
    </div>
    <div class="form-field">
      <input
        v-model="password"
        name="password"
        autocomplete="off"
        class="form-input"
        type="password"
      />
    </div>

    <button
      :disabled="loading"
      @click="handleLogin($event)"
      class="form-submit"
    >
      Entrar
    </button>
  </form>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../composables/use-auth";
import moment from "moment";

const _teste = {
  email: "eve.holt@reqres.in",
  password: "cityslicka",
};

export default defineComponent({
  setup() {
    const { login, user, loading, error } = useAuth();
    const router = useRouter();

    const date = ref(moment().format("DD/MM/YYYY HH:mm:ss"));

    setInterval(() => {
      date.value = moment().format("DD/MM/YYYY HH:mm:ss");
    }, 1000);

    const email = ref("");
    const password = ref("");

    const handleLogin = async (e) => {
      e.preventDefault();

      await login(email.value, password.value);

      if (user.value) {
        router.push("/");
      } else {
        alert(error.value);
      }
    };

    return {
      email,
      password,
      handleLogin,
      loading,
      date,
    };
  },
});
</script>

<style>
.form {
  width: 500px;
  border-radius: 5px;
  margin: 100px 0 0 0;
}
.form-input {
  padding: 15px 25px;
  margin: 10px;
  width: 80%;

  font-size: 1rem;
  color: #232323;

  border-radius: 10px;
}

.form-submit {
  width: calc(80%);
  padding: 15px 25px;
  margin: 10px;
  transition: 0.1s;

  border-radius: 10px;

  text-transform: uppercase;
  font-size: 1rem;
}
.form-submit:hover {
  cursor: pointer;
}
.form-submit:active {
  transform: scale(0.9);
}
.form-submit:disabled {
  opacity: 0.5;
}
</style>
