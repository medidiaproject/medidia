import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './blogs.css';
import '@testing-library/jest-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
 
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAw-NQtTDnu5HG2nyIZlC4GLnHhG53-sVU",
    authDomain: "medidiaproject.firebaseapp.com",
    databaseURL: "https://medidiaproject-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "medidiaproject",
    storageBucket: "medidiaproject.appspot.com",
    messagingSenderId: "276942428473",
    appId: "1:276942428473:web:fa0e53b2bbcd13291030e8",
    measurementId: "G-QGHFEET1RG"
  };
   
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { firebase, auth, db };



import React from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import { auth, db } from './firebase';
import { useState, useEffect } from 'react';
import './blogs.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db.collection("blogposts").onSnapshot((querySnapshot) => {querySnapshot.forEach((doc) => {getPostsFromFirebase.push({...doc.data(), key: doc.id, });
        });
        setPosts(getPostsFromFirebase);
        setLoading(false);
      });

    
    return () => subscriber();}, [loading]); 

  if (loading) {
    return <h2>loading firebase...</h2>;
  }

  return (
    <div className='title'>
      <h1><i>Medidia</i></h1><h3>Home</h3><h3>About Us</h3><h3>Services</h3><h3>News</h3><h3>Blogs</h3><h3><button>Login</button><button>Sign Up</button></h3>
      <div className="container">
        {posts.length > 0 ? (
          posts.map((post) => <div key={post.BlogName}><p><h2>Article Title: {post.BlogName}</h2></p><p>URL: {post.BlogURL}</p><p>Expert's Opinion{post.ExpertComment}</p><p>Timestamp: {post.TimeStamp}</p></div>)
        ) : (<h2>No data found!</h2>)} 
      </div>
      <div className='end'>
        <h1>Contact Us</h1>
        <p>Med-Di-Dia Limited: Galway Technology Centre, Mervue Business Park, Galway, Ireland</p>
        <p>Tel: +353 (0)91-704804 | Email: mdd@mddltd.com</p>
        <h1>Chat with us</h1>
        <p>We're here to answer your questions and help you with anything you need.</p>
        <button>Start Chatting</button>
      </div>
    </div>
  );
};

export default App;


import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
