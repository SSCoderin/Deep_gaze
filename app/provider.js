"use client";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";



 const  Provider = ({ children }) => {
  const { user } = useUser();
  useEffect(() => {
    user && CheckIsNewUser();
  }, [user]);

  const CheckIsNewUser = async () => {
    console.log("this is a user", user.id , user?.fullName , user?.emailAddresses[0]?.emailAddress);
    const resp = await axios.post('/api/create-user', { userid : user?.id , username : user?.fullName , useremail : user?.emailAddresses[0]?.emailAddress });
    console.log("this is a resp", resp.data);
  };

  return <div>{children}</div>;
};

export default Provider;
