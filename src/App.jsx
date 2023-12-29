import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import BlogList from "./Components/Blog/Bloglist";
import New_Blog from "./Components/Blog/New_Blog";
import LandingPage from "./Components/LandingPage/LandingPage";
import Blog from "./Components/Blog/Blog";
import SignIn from "./Components/Auth/Signin";
import Signup from "./Components/Auth/Signup";
import Profile from "./Components/Profile/Profile";
import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

import { FirebaseProvider } from "./Context/FirebaseContext.jsx";
import PrivateRoute from "./Components/Routes/PrivateRoute.jsx";
import ListingPage from "./Components/Listing/ListingPage.jsx";
import MyListings from "./Components/Listing/MyListings.jsx";

const App = () => {
  const blogs = [
    {
      id: 1,
      title: "Moving towards Blockchain",
      imageUrl: "https://picsum.photos/200",
      shortDescription:
        "Short description of Blog 1 lorejfdsnqxijadsnxnIDJN IADSHMIjxmMdskxxndas",
      author: "Somya",
      tags: ["Web3", "Javascript"],
    },
    {
      id: 2,
      title: "A roadmap to Consulting",
      imageUrl: "https://picsum.photos/100",
      shortDescription: "Short description of Blog 2",
      author: "Sudeep",
      tags: ["Case studies", "Markets"],
    },
    {
      id: 3,
      title: "Competitive programming",
      imageUrl: "https://picsum.photos/43",
      shortDescription: "Short description of Blog 3",
      author: "Somya",
      tags: ["DSA", "Codeforces"],
    },
    // Add more blog objects here...
  ];

  return (
    <FirebaseProvider>
      <div className="App ">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route index element={<Navigate to={"/blogs"} />} />
              <Route path="blogs/:id" element={<Blog />} />
              <Route path="blogs" element={<BlogList blogs={blogs} />} />
              <Route path="new_blog" element={<New_Blog />} />
              <Route path="profile" element={<Profile />} />
              <Route path="/listing" element={<ListingPage />}></Route>
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/intro" element={<LandingPage />} />
            <Route path="/mylisting" element={<MyListings />} />
          </Routes>
        </Router>
      </div>
      <ToastContainer autoClose={1000} />
    </FirebaseProvider>
  );
};

export default App;
