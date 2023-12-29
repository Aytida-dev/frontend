import { useEffect, useState } from "react";
import "./ListingPage.css";
import { Accordions } from "../../Pre Comps/Accordions";
import { Card } from "../../Pre Comps/Card";
import { Hero } from "../../Pre Comps/Hero";
import { TopNav } from "../../Pre Comps/TopNav";
import Listing from "./ListingSchema";
import { Skeleton } from "@/components/ui/skeleton";

function ListingPage() {
  const [searchKeys, setSearchKeys] = useState("");
  const [categoryKeys, setCategoryKeys] = useState([]);
  const [typekeys, setTypeKeys] = useState([]);
  const [payTypeKeys, setPayTypeKeys] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchKeys.toLowerCase()) &&
      (categoryKeys.includes(post.category) || categoryKeys.length === 0) &&
      (typekeys.includes(post.type) || typekeys.length === 0) &&
      (payTypeKeys.includes(post.payType) || payTypeKeys.length === 0)
  );

  useEffect(() => {
    getAllListings();
  }, []);

  async function getAllListings() {
    try {
      setLoading(true);
      const newPosts = await Listing.getAll();
      setPosts(newPosts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const categories = posts.reduce((acc, curr) => {
    if (!acc.includes(curr.category)) {
      acc.push(curr.category);
    }
    return acc;
  }, []);

  const types = posts.reduce((acc, curr) => {
    if (!acc.includes(curr.type)) {
      acc.push(curr.type);
    }
    return acc;
  }, []);

  const payTypes = posts.reduce((acc, curr) => {
    if (!acc.includes(curr.payType)) {
      acc.push(curr.payType);
    }
    return acc;
  }, []);

  return (
    <div className="w-full">
      <TopNav searchSetter={setSearchKeys} />
      <Hero refresh={getAllListings} />
      <div className="flex lg:flex-row flex-col gap-2 lg:gap-10 w-full">
        <Accordions
          categorySetter={setCategoryKeys}
          categoryKeys={categoryKeys}
          typeKeys={typekeys}
          typeSetter={setTypeKeys}
          payTypeSetter={setPayTypeKeys}
          payTypeKeys={payTypeKeys}
          categories={categories}
          types={types}
          payTypes={payTypes}
        />
        {!loading ? (
          <div className="flex flex-col lg:w[90%] w-[100%]">
            {filteredPosts.map((post) => (
              <Card post={post} key={post.id} />
            ))}
            {filteredPosts.length === 0 && (
              <p className="text-lg mt-5 font-semibold ">
                No Such Oppertunities 🙃
              </p>
            )}
          </div>
        ) : (
          // Skeleton for loading
          <div className="flex flex-col lg:w[90%] w-[80vw]">
            <div className="text-left flex flex-col gap-2 rounded-xl shadow-xl p-[20px] mt-5 h-[max] border w-full">
              <div className="flex items-center gap-3">
                <Skeleton className="h-[20px] w-[20px] rounded-full" />
                <Skeleton className="text-[#ABAAAA] w-[100px] h-[16px] rounded" />
              </div>
              <Skeleton className="text-xl font-semibold w-[200px] h-[24px] rounded" />
              <Skeleton className="text-[#ABAAAA] lg:w-[75vw] h-[16px] rounded" />
              <div className="flex flex-col lg:flex-row md:flex-row justify-between mt-5 gap-5 lg:gap-0">
                <div className="flex gap-3">
                  <Skeleton className="rounded-full bg-[#BADDF4] w-[100px] h-[28px] " />
                  <Skeleton className="rounded-full bg-[#75E2D9] w-[100px] h-[28px] " />
                  <Skeleton className="rounded-full bg-[#E8DBEE] w-[100px] h-[28px] " />
                </div>
                <Skeleton className="bg-[#252425] w-[100%] md:w-[85px] lg:w-[85px] h-[35px] rounded-[5px] text-white" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingPage;
