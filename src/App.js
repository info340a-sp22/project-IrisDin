import React, { useEffect, useState } from "react";
import { About } from "./About";
import { Nav, Footer } from "./Footer&Header";
import { Homepage } from "./Homepage";
import {ItemGenerate } from "./ItemGenerate";
import { Startquiz, Quiz } from "./Quiz"
import { Mycloset } from "./MyCloset"
import products from "./data/item.json";
import { Routes, Route, Navigate, Link, useNavigate, Outlet } from 'react-router-dom';
import { Whole } from "./Formpage";
import shoes from "./data/shoes.json";
import everything from "./data/clothes.json";
import blog from "./data/blog.json";
import SignIn from "./SignInPage";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import database from "./data/database.json";



function App(props) {
    const nullUser = { userId: null, userName: null }
    const [currentUser, setCurrentUser] = useState(nullUser);
    const navigateTo = useNavigate();
    const dataArray = Transform(database);
    

    useEffect(() => {

        const auth = getAuth();
        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) { //is defined, so "logged in"
                console.log("authentication state changed");
                console.log(firebaseUser);
                //add in the keys for the terms we want to use
                firebaseUser.userId = firebaseUser.uid;
                firebaseUser.userName = firebaseUser.displayName;
                setCurrentUser(firebaseUser);
            }
            else { //not defined, so logged out
                setCurrentUser(nullUser);
            }
        });
    }, [])

    const loginUser = (userObject) => {
        //can do more checking here if we want
        setCurrentUser(userObject);
        navigateTo('outfitgenerator'); //go to chat "after" we log in!
    }


    return (
        <div>
            <Routes>
                <Route element={<AppLayout currentUser={currentUser} />}>
                    {/* protected routes */}
                    <Route element={<ProtectedPage currentUser={currentUser} />}>
                        <Route path="/closet" element={
                            <Mycloset currentUser={currentUser} />
                        } />
                    </Route>
                    <Route path='/' element={<Homepage />} />
                    <Route path='outfitgenerator' element={<Whole require={shoes} />} />
                    <Route path='itemgenerator' element={<ItemGenerate item={dataArray}/>} />
                    <Route path='/closet' element={<Mycloset />} />
                    <Route>
                        <Route path="/quiz" element={<Startquiz />} />
                        <Route path="/quizquestion" element={<Quiz />} />
                    </Route>
                    <Route path='/about' element={<About />} />
                    <Route path='signin' element={<SignIn currentUser={currentUser} />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Route>

            </Routes>
            <Footer />
        </div>
    );
}

function AppLayout({ currentUser }) {
    return (
        <>
            <Nav currentUser={currentUser} />
            {/* the nested route */}
            <Outlet />
        </>
    )
}

function ProtectedPage(props) {
    //...determine if user is logged in
    if (!props.currentUser.uid) { //if no user, send to sign in
        return <Navigate to="signin" />
    }
    else { //otherwise, show the child route content
        return <Outlet />
    }
}


function IdExtract(categoryValue) {
    let categoryInfo = []; 
    let itemId = Object.keys(categoryValue); //[top, bottom];
    for (let a = 0; a < itemId.length; a++) {
        let id = itemId[a]; // values of top or bottom
        let itemInfo = [];
        let itemValueObject = categoryValue[id]; // top value is an object of object
        let itemValueKeys = Object.keys(itemValueObject); // keys of top value object
        for (let b = 0; b < itemValueKeys.length; b++) {
            let column = itemValueKeys[b]; // keys of top value object
            let value = itemValueObject[itemValueKeys[b]];
            let itemColumn = [];
            if (typeof(value) === 'object') {
                let valueKeys = Object.keys(value);
                for (let c = 0; c < valueKeys.length; c++) {
                    itemColumn.push(value[valueKeys[c]]);  
                }
            } else {
                itemColumn.push(value);
            }
            let info = {[column]: itemColumn}; // info is an object of object
            itemInfo.push(info);
        }
        let item = {[id]: itemInfo};
        categoryInfo.push(item);
    }
    return categoryInfo;
}

 function Transform (database) {
    let dataCopy = database;
    let dataArray = [];
    let key = Object.keys(dataCopy);
    let keyLength = key.length; // it should be 5
    for (let i = 0; i < keyLength; i++) {
        let category = key[i]; //read each category at one time
        let categoryValue = dataCopy[category]; //reads in the value of correspond key
        categoryValue = IdExtract(categoryValue);
        let singleCategory = {[category]: categoryValue};
        dataArray.push(singleCategory);
        
    }
    return dataArray;
}

export default App;