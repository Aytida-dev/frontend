import { useCallback, useState, useEffect } from "react";
import useStatus from "../../hooks/useStatus";
import ListingSchema from "./ListingSchema";
import { Button } from "flowbite-react";
import DropdownIcon from "../../assets/dropdown.png";
import Applicant from "./Applicant";
import AbsoluteSpinner from "../Utils/AbsoluteSpinner";

const APPLICANTS_PAGE_SIZE = import.meta.env
  .VITE_REACT_APP_APPLICANTS_PAGE_SIZE;

const Listing = ({ post }) => {
  const [showApplicants, setShowApplicants] = useState(false);
  const { getApplicants } = ListingSchema;
  const { isLoading, setLoading, setIdle } = useStatus();
  const [applicantsState, setApplicantsState] = useState({
    data: [],
    pageNumber: 0,
    isLastPage: false,
  });

  const toggleShowApplicants = useCallback(
    () => setShowApplicants((prev) => !prev),
    [setShowApplicants]
  );

  const fetchNextPage = useCallback(async () => {
    try {
      setLoading();
      const pageNumber = applicantsState.pageNumber;
      const newApplicants = await getApplicants(
        post.applicants.slice(
          pageNumber * APPLICANTS_PAGE_SIZE,
          Math.min(
            post.applicants.length,
            (pageNumber + 1) * APPLICANTS_PAGE_SIZE
          )
        )
      );
      setApplicantsState((prev) => ({
        data: [...prev.data, ...newApplicants],
        pageNumber: prev.pageNumber + 1,
        isLastPage:
          (prev.pageNumber + 1) * APPLICANTS_PAGE_SIZE >=
          post.applicants.length,
      }));
    } catch (error) {
      console.log(error.message);
      toast("Unable to fetch applicants");
    } finally {
      setIdle();
    }
  }, [getApplicants, setLoading, setIdle, applicantsState]);

  useEffect(() => {
    if (!showApplicants) return;

    setLoading();
    fetchNextPage();
  }, [showApplicants]);

  useEffect(() => {
    if (!showApplicants) {
      setApplicantsState({
        data: [],
        pageNumber: 0,
        isLastPage: false,
      });
    }
  }, [showApplicants]);

  return (
    <div className="text-left flex flex-col gap-2  rounded-xl shadow-xl p-[20px] mt-5 h-[max] border w-full relative">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <button onClick={toggleShowApplicants}>
          <img
            src={DropdownIcon}
            alt="drop"
            className={`w-6 h-6 ${showApplicants ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </div>
      <p className="text-[#ABAAAA] lg:w-[75vw]">{post.description}</p>
      <div className="flex flex-col lg:flex-row md:flex-row justify-between mt-5 gap-5 lg:gap-0">
        <div className="flex gap-3">
          <div
            className={`rounded-full bg-[#BADDF4] lg:w-[100px] md:w-[100px] w-[100%] text-xs lg:text-sm h-[28px] flex justify-center items-center`}
          >
            {post.category || "Category Not Specified"}
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
      </div>
      {showApplicants && (
        <div className="mt-5 p-5 relative">
          {applicantsState.data.map((applicant, i) => {
            return <Applicant applicant={applicant} key={i} />;
          })}
          {isLoading && <AbsoluteSpinner />}
          {!isLoading && !applicantsState.isLastPage && (
            <Button color="success" onClick={fetchNextPage}>
              Show more
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Listing;
