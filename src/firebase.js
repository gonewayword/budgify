import firebase from 'firebase';
const config = {
	apiKey: "AIzaSyB86y8jrY_ouPsC5UxJUawCeDWLPeSEGlg",
	 authDomain: "budgify-ce513.firebaseapp.com",
	 databaseURL: "https://budgify-ce513.firebaseio.com",
	 projectId: "budgify-ce513",
	 storageBucket: "",
	 messagingSenderId: "645046417164"
}
firebase.initializeApp(config);
export default firebase;