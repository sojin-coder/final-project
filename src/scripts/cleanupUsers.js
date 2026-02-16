// scripts/cleanupUsers.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtqnj_6By_5PpEx4szGUqrvYUmLcLVn64",
  authDomain: "my-website-cms.firebaseapp.com",
  projectId: "my-website-cms",
  storageBucket: "my-website-cms.firebasestorage.app",
  messagingSenderId: "344143826164",
  appId: "1:344143826164:web:86556e46a537b4ceade2a1",
  measurementId: "G-NJ9H7R8RGY"
};

// បញ្ជីអ៊ីមែលដែលចង់រក្សាទុក (អ្នកប្រើប្រាស់ត្រឹមត្រូវ)
const KEEP_EMAILS = [
  "jing@gmail.com",
  "raksa@gmail.com",
  "sophoeurs668@gmail.com"
];

async function cleanupUsers() {
  console.log("🚀 ចាប់ផ្តើមសម្អាតអ្នកប្រើប្រាស់...");
  
  try {
    // ចាប់ផ្តើម Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log("📁 កំពុងភ្ជាប់ទៅ Firestore...");
    
    // ទាញយកអ្នកប្រើប្រាស់ទាំងអស់ពី Firestore
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    
    console.log(`📊 រកឃើញអ្នកប្រើប្រាស់ ${snapshot.size} នាក់ក្នុង Firestore`);
    
    let deletedCount = 0;
    let keptCount = 0;
    
    // ពិនិត្យអ្នកប្រើប្រាស់ម្នាក់ៗ
    for (const document of snapshot.docs) {
      const userData = document.data();
      const userEmail = userData.email;
      
      if (!KEEP_EMAILS.includes(userEmail)) {
        // លុបអ្នកប្រើប្រាស់ដែលមិនចង់បាន
        console.log(`🗑️ កំពុងលុប: ${userEmail} (${document.id})`);
        await deleteDoc(doc(db, "users", document.id));
        deletedCount++;
      } else {
        console.log(`✅ រក្សាទុក: ${userEmail}`);
        keptCount++;
      }
    }
    
    console.log("\n📋 **របាយការណ៍សម្អាត**");
    console.log(`   អ្នកប្រើប្រាស់ដែលបានលុប: ${deletedCount} នាក់`);
    console.log(`   អ្នកប្រើប្រាស់ដែលបានរក្សា: ${keptCount} នាក់`);
    console.log("✅ សម្អាតបានបញ្ចប់ដោយជោគជ័យ!");
    
  } catch (error) {
    console.error("❌ មានបញ្ហាក្នុងការសម្អាត:", error);
  }
}

// រត់ Function
cleanupUsers();