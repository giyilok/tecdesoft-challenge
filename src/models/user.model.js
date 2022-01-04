export default function User({ idToken, refreshToken, displayName }) {
  (this.userName = displayName),
    (this.idToken = idToken),
    (this.refreshToken = refreshToken);
}
