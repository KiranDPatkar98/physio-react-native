import { Redirect } from "expo-router";

export default function Index() {
  const isLoggedIn = false; // Set to false to show login screen

  if (isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/login" />;
}
