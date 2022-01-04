import store from "@/store";

export default function getIdToken() {
  const idToken = store.state.users.user.idToken;

  if (idToken) {
    return idToken;
  }
  return;
}
