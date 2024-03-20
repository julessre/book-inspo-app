export default async function checkLoginStatus(path = '') {
  const sessionRequest = await fetch(`/api/login`).catch(console.error);
  const sessionResponse = await sessionRequest.json();
  console.log(`Login status ${path}:`, sessionResponse.message);
  return {
    isLoggedIn: sessionResponse.success,
    userId: sessionResponse.userId,
  };
}
