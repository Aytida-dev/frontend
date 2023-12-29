import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";

import { Suspense, lazy, useState } from "react";
const ListingModal = lazy(() => import("../Components/Listing/ListingModal"));

export const Hero = ({ refresh }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[#F2ACBF] py-5 lg:pl-[60px] md:pl-[30px] pl-[10px] pr-[10px] lg:pr-10 rounded-xl flex flex-col items-start text-left">
      <a
        href=""
        className="text-sm lg:text-xl underline text-[#6476EA] font-medium"
      >
        How we fuel Creativity in College
      </a>
      <h1 className="text-2xl lg:text-6xl md:text-4xl mt-3 lg:mt-6 mb-2 lg:mb-5 font-bold">
        Looking for Partners or Interns?
      </h1>
      <p className="font-medium text-[#7a696d] text-sm lg:text-lg">
        Find right partners to fuel innovation and collaboration
      </p>
      <div className="w-[100%] flex justify-end mt-5">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <div className="bg-[#F36D68] w-[100px] h-[40px] rounded-[5px] text-white flex items-center justify-center">
              List Here
            </div>
          </DialogTrigger>
          <DialogContent className="bg-red ">
            <Suspense fallback={<div>Loading...</div>}>
              <ListingModal refresh={refresh} closeModal={setOpen} />
            </Suspense>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
