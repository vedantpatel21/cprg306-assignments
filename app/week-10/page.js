
"use client";

import { useUserAuth } from "./_utils/auth-context";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

 
  const handleLogin = async () => {
    try {
      await gitHubSignIn();
      router.push("/week-10/shopping-list");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };


  const handleLogout = async () => {
    try {
      await firebaseSignOut();
      router.push("/week-10"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <main className="flex items-start justify-between min-h-screen bg-gray-900 p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold mb-4 text-white">Welcome</h1>

        {/* Display login/logout button based on user state */}
        {user ? (
          <>
            <p className="text-white">Welcome, {user.displayName} ({user.email})</p>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
              Logout
            </button>
          </>
        ) : (
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
            Login with GitHub
          </button>
        )}
      </div>
    </main>
  );
};

export default Page;
