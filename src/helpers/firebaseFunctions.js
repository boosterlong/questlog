import { collection, doc, setDoc, getDocs, runTransaction, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence } from "firebase/auth";

export async function addEntry(db, data, userID) {
  if (userID == null) {
    console.log("Cannot write to DB, user is not logged in.")
  }
  else {
    try {
    const docRef = await setDoc(doc(db, "users", userID), {
      name: "New User",
      quests: [data]
    });
    console.log("Document written with ID: ", userID);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
  }
}

export async function readEntries(db) {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().quests[0].desc}`);
  });
}

export function signIn(auth, email, password) {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Successful sign in.")
          const user = userCredential.user;
        })
        .catch((error) => {
          console.log("Wrong password boy")
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    })
}

export function registerNewUser(auth, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('User Registered')
      const user = userCredential.user;
    })
    .catch((error) => {
      alert('User could not be registered')
      const errorCode = error.code;
      const errorMessage = error.message;
    })
}

export async function signOutReload(auth) {
  signOut(auth);
  window.location.reload();
}

export async function addQuestToArray(db, data, uid) {

  const sfDocRef = doc(db, "users", uid);

  try {
    const newQuest = await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
  
      const questTotal = sfDoc.data().quests.length + 1;
      const questArray = sfDoc.data().quests
      questArray.push(data)
      if (questTotal <= 12) {
        transaction.update(sfDocRef, { quests: questArray });
        return questTotal;
      } else {
        return Promise.reject("Sorry! Population is too big");
      }
    });
  
    console.log("Population increased to ", newQuest);
  } catch (e) {
    // This will be a "population is too big" error.
    console.error(e);
  }
}