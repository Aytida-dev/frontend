import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useFirebase from "../hooks/useFirebase";
import { doc, collection, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import useStatus from "../hooks/useStatus";
import AbsoluteSpinner from "../Components/Utils/AbsoluteSpinner";

const addApplicationToDB = async (applicantEmail, jobId) => {
  try {
    const col = collection(db, "listing");
    const jobRef = doc(col, jobId);
    const jobSnapshot = await getDoc(jobRef);

    if (!jobSnapshot.exists) {
      throw new Error("Job not found");
    }
    // Check if the applicant already exists
    const existingApplicants = jobSnapshot.data().applicants || [];

    if (existingApplicants.includes(applicantEmail)) {
      throw new Error("Applicant already exists for this job");
    }
    // Add the new applicant
    await updateDoc(jobRef, {
      applicants: [...existingApplicants, applicantEmail],
    });
  } catch (error) {
    console.error("Error adding applicant:", error.message);
    throw error;
  }
};

export const Card = ({ post }) => {
  const { user } = useFirebase();
  const [hasApplied, setHasApplied] = useState(
    post.applicants && post.applicants.includes(user.email)
  );
  const { isLoading, setLoading, setIdle } = useStatus();

  const postCategory =
    post.category === "Human Resource" ? "HR" : post.category;

  const handleClick = useCallback(async () => {
    try {
      setLoading();
      await addApplicationToDB(user.email, post.id);
      setIdle();
      toast("Successfully applied!");
      setHasApplied(true);
    } catch (error) {
      console.log(error.message);
      toast("Failed to apply");
    }
  }, [setHasApplied, setLoading]);

  return (
    <>
      <div className="text-left flex flex-col gap-2  rounded-xl shadow-xl p-[20px] mt-5 h-[max] border w-full">
        <div className="flex items-center gap-3">
          <Avatar className="h-[20px] w-[auto]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-[#ABAAAA]">{post.createdBy}</p>
        </div>
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <p className="text-[#ABAAAA] lg:w-[75vw]">{post.description}</p>
        <div className="flex flex-col lg:flex-row md:flex-row justify-between mt-5 gap-5 lg:gap-0">
          <div className="flex gap-3">
            {/* Add null checks for postCategory, post.type, and post.payType */}
            <div
              className={`rounded-full bg-[#BADDF4] lg:w-[100px] md:w-[100px] w-[100%] text-xs lg:text-sm h-[28px] flex justify-center items-center`}
            >
              {postCategory || "Category Not Specified"}
            </div>
            <div
              className={`rounded-full bg-[#75E2D9] lg:w-[100px] md:w-[100px] w-[100%] text-xs lg:text-sm h-[28px] flex justify-center items-center`}
            >
              {post.type || "Type Not Specified"}
            </div>
            <div
              className={`rounded-full bg-[#E8DBEE] lg:w-[100px] md:w-[100px] w-[100%] text-xs lg:text-sm h-[28px] flex justify-center items-center`}
            >
              {post.payType
                ? post.payType.split("/")[0]
                : "Payment Type Not Specified"}
            </div>
          </div>
          {!hasApplied ? (
            <button
              className=" bg-black px-4 h-[35px] rounded-[5px] text-white text-sm"
              onClick={() => handleClick("email")}
            >
              Easy Apply
            </button>
          ) : (
            <h3 className="text-md text-green-500 font-semibold">Applied</h3>
          )}
        </div>
      </div>
      {isLoading && <AbsoluteSpinner />}
    </>
  );
};
