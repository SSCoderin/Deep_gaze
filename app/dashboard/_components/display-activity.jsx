"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Para from "../../images/para.webp";
import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
export default function DisplayActivity({
  type,
  select = false,
  handlecallbackdata,
}) {
  const [selectType, setSelectType] = useState(type);
  const [paragraphs, setParagraphs] = useState([
    {
      user_id: "",
      type: "",
      title: "",
      content: "",
    },
  ]);
  const [selectuploadParagraph, setSelectUploadParagraph] = useState([]);
  const { user } = useUser();
  console.log("thi sis the user  from the displau activity", user);
  console.log("thi si user id", user.id);
  useEffect(() => {
    getallParagraphs();
  }, [user]);
  const getallParagraphs = async () => {
    try {
      if (!user?.id) return;
      const response = await axios.get(`/api/paragraph?userId=${user.id}`);
      setParagraphs(response.data.paragraphs);
    } catch (error) {
      console.error("Error fetching paragraphs:", error);
    }
  };

  const handelSelection = (paragraph) => {
    if (selectuploadParagraph.includes(paragraph)) {
      setSelectUploadParagraph(
        selectuploadParagraph.filter((item) => item !== paragraph)
      );
    } else {
      setSelectUploadParagraph([...selectuploadParagraph, paragraph]);
    }
    handlecallbackdata(paragraph);
  };

  return (
    <div>
      {(selectType === "Paragraph" || selectType === "null") && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-green-600 mb-5  pl-6">
            Paragraph Activities
          </h2>
          {paragraphs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {paragraphs.map((items, index) => (
                  <div
                    onClick={() => select && handelSelection(items)}
                    key={index}
                    className={
                      `border-2 border-gray-300 rounded-2xl flex flex-row cursor-pointer ` +
                      (selectuploadParagraph.includes(items)
                        ? "bg-green-100"
                        : "")
                    }
                  >
                    <Image src={Para} alt="image" width={100} height={50} />
                    <div className="mt-4 m-2">
                      <h1 className="font-bold text-gray-800 mb-2 text-2xl">
                        {items.title.split(" ").slice(0, 10).join(" ")}
                      </h1>
                      <p className="text-gray-600">
                        {items.content.split(" ").slice(0, 8).join(" ")}...
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-12 flex flex-col items-center justify-center text-center">
              <div className="text-gray-500 mb-4">
                You don't have any paragraph Acticity!
              </div>
              <Button
                onClick={() =>
                  (window.location.href = "/dashboard/new-activity")
                }
                className="bg-green-600 hover:bg-green-700 cursor-pointer"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Create paragraph
                Activity
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
