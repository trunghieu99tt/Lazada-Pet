import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCPWBfimBEbP4c_fVIMwsylWFc-a9xToc8",
	authDomain: "pet-shop-5061a.firebaseapp.com",
	databaseURL: "https://pet-shop-5061a.firebaseio.com",
	projectId: "pet-shop-5061a",
	storageBucket: "pet-shop-5061a.appspot.com",
	messagingSenderId: "1048232786630",
	appId: "1:1048232786630:web:4b104724d68e31f28af5c7",
	measurementId: "G-SWCC9MFQ98",
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const collectionRef = firestore.collection("users");

	const snapShot = await userRef.get();
	const collectionSnapshot = await collectionRef.get();

	console.log("userAuth", userAuth);
	console.log("additionalData", additionalData);

	if (!snapShot.exists) {
		const { name, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName: name,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log("Error creating user: ", error.message);
		}
	}

	return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
