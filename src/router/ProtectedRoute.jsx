// // src/router/ProtectedRoute.jsx
// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { auth } from "../data/firebase";
// import { onAuthStateChanged } from "firebase/auth";

// const ProtectedRoute = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       console.log("Auth state changed:", currentUser?.email);
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">កំពុងពិនិត្យការចូលប្រើ...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/admin" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

// import { Navigate } from "react-router-dom";
// import { auth } from "../data/firebase";
// import { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../data/firebase";

// const ProtectedRoute = ({ children, roleRequired }) => {

//   const [allowed, setAllowed] = useState(null);

//   useEffect(() => {

//     const checkRole = async () => {

//       const user = auth.currentUser;

//       if (!user) {
//         setAllowed(false);
//         return;
//       }

//       const snap =
//         await getDoc(doc(db, "users", user.uid));

//       if (!snap.exists()) {
//         setAllowed(false);
//         return;
//       }

//       const role = snap.data().role;

//       setAllowed(role === roleRequired);
//     };

//     checkRole();

//   }, [roleRequired]);


//   if (allowed === null) return <h1>Loading...</h1>;

//   return allowed
//     ? children
//     : <Navigate to="/admin" />;
// };

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";
import { auth, db } from "../data/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children, roleRequired }) => {
  const [allowed, setAllowed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ប្រើ onAuthStateChanged ដើម្បីចាំមើល User ឱ្យច្បាស់
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const role = snap.data().role;
          // បើមិនបានកំណត់ roleRequired ឱ្យចូលទាំងអស់ (Admin/User)
          // បើមានកំណត់ ត្រូវឆែកឱ្យត្រូវគ្នា
          if (!roleRequired || role === roleRequired) {
            setAllowed(true);
          } else {
            setAllowed(false);
          }
        } else {
          setAllowed(false);
        }
      } catch (error) {
        console.error("Role check error:", error);
        setAllowed(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [roleRequired]);

  if (loading) return <h1>Loading...</h1>;

  return allowed ? children : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;