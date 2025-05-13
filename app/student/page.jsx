"use client";
import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import DeepgazeTask from "./_components/deepgazetask";
export default function Student() {
  const searchParams = useSearchParams();
  const [TopicData, setTopicData] = useState();
  const [DeepGaze, SetDeepGaze] = useState(false);

  const userId = searchParams.get("user_id");
  const taskTitle = searchParams.get("task_title");
  const type = searchParams.get("type");
  const { user } = useUser();
  useEffect(() => {
    if (userId && taskTitle && type) {
      GetTopicData();
    }
  }, [userId, taskTitle, type]);
  const GetTopicData = async () => {
    try {
      console.log(userId, taskTitle, type);

      const response = await axios.post("/api/selectedtask", {
        user_id: userId,
        task_title: taskTitle,
        type: type,
      });

      setTopicData(response.data.task);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {DeepGaze ? (
        <DeepgazeTask taskData = {TopicData}/>
      ) : (
        <>
          {user && TopicData ? (
            <div className="flex flex-col h-screen">
              <Header />
              <div className="mt-20 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Topic</h1>
                <h1 className="text-4xl font-bold text-blue-800 underline">
                  {taskTitle}
                </h1>
              </div>
              <div className="h-full flex justify-center items-center">
                <div className="p-12 border-2 border-gray-300 shadow-md rounded-2xl">
                  <h1 className="text-3xl font-bold text-gray-800 mb-">
                    Welcome, {user.fullName}!
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    You are currently logged in as a student.
                  </p>
                  <h1 className="mb-2 font-bold text-gray-800 text-xl">
                    Name :{" "}
                    <span className="text-blue-500">{user.fullName}</span>{" "}
                  </h1>
                  <h1 className="mb-4 font-bold text-gray-800 text-xl">
                    Email :{" "}
                    <span className="text-blue-500">
                      {user.emailAddresses[0].emailAddress}
                    </span>
                  </h1>
                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={() => SetDeepGaze(true)}
                      className="bg-green-600 hover:bg-green-700 px-6"
                    >
                      Start →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>"loading"</>
          )}
        </>
      )}
    </>
  );
}
