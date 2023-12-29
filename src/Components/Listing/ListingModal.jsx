import { useState } from "react";
import { Button } from "../../components/ui/button";
import { DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import Listing from "./ListingSchema";

// Define Zod schema
const listingSchema = z.object({
  title: z.string().min(1).max(255),
  createdBy: z.string().min(1).max(255),
  description: z.string().min(1).max(1000),
  skills: z.string().min(1).max(255),
  whatsapp: z.string().min(0).max(40),
  category: z.string().min(1).max(255),
  payType: z.string().min(1).max(255),
  type: z.string().min(1).max(255),
  email: z.string().min(1).max(255),
});

export default function ListingModal({ refresh, closeModal }) {
  const [title, setTitle] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [category, setCategory] = useState("");
  const [payType, setPayType] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const inputData = {
        title,
        createdBy,
        description,
        skills,
        whatsapp,
        category,
        payType,
        type,
        email,
        createdAt: Date.now(),
      };

      listingSchema.parse(inputData);

      Listing.addListing(inputData);
      clearForm();
      refresh();
    } catch (error) {
      console.error("Validation error or Listing addition error:", error);
    } finally {
      setLoading(false);
      closeModal(false);
    }
  };

  const clearForm = () => {
    setTitle("");
    setCreatedBy("");
    setDescription("");
    setSkills("");
    setWhatsapp("");
    setCategory("");
    setPayType("");
    setType("");
  };

  return (
    <div className="flex flex-col justify-between items-center gap-10 ">
      <DialogTitle className="text-3xl font-mono text-center">
        List for Job/Internship here.
      </DialogTitle>
      <div className="flex flex-col gap-5 w-full">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Listed by (email)"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
        />
        <Textarea
          placeholder="Role Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Skills tag"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <Input
          placeholder="Type of opportunity"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <Input
          placeholder="category of your project"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Input
          placeholder="pay type"
          value={payType}
          onChange={(e) => setPayType(e.target.value)}
        />
        <Input
          placeholder="whatsapp number"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button
        className="bg-[#a573bd] text-lg font-bold hover:w-full hover:bg-[#a573bd] rounded-3xl w-3/4 transition-all ease-out hover:rounded-lg hover:shadow-xl"
        onClick={() => handleSubmit()}
        disabled={loading}
      >
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "list"}
      </Button>
    </div>
  );
}
