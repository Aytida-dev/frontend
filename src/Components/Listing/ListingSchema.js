import {
  addDoc,
  collection,
  getDocs,
  where,
  orderBy,
  query,
  startAfter,
  getDoc,
  doc,
  getCountFromServer,
  limit,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase";

const listingCollection = collection(db, "listing");

const Listing = function (data) {
  this.title = data.title;
  this.description = data.description;
  this.category = data.category;
  this.type = data.type;
  this.payType = data.payType;
  this.createdBy = data.createdBy;
  this.skills = data.skills;
  this.whatsapp = data.whatsapp;
  this.email = data.email;
  this.applicants = data.applicants;
  this.createdAt = data.createdAt;
};

Listing.getAll = function () {
  return new Promise(async (resolve, reject) => {
    try {
      const snapshot = await getDocs(listingCollection);
      const listings = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      resolve(listings);
    } catch (error) {
      reject(error);
    }
  });
};

Listing.addListing = function (newListing) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = await addDoc(listingCollection, newListing);
      resolve(docRef);
    } catch (error) {
      reject(error);
    }
  });
};

Listing.getByEmail = async function (email, pageLimit, previousRecord) {
  try {
    let countQuery = null;

    if (!previousRecord) {
      countQuery = query(
        listingCollection,
        where("createdBy", "==", email),
        orderBy("createdAt", "desc")
      );
    } else {
      countQuery = query(
        listingCollection,
        where("createdBy", "==", email),
        orderBy("createdAt", "desc"),
        startAfter(previousRecord["createdAt"])
      );
    }

    const records = await getCountFromServer(countQuery);

    const hasNext = records.data().count > pageLimit;

    let fetchQuery = null;

    if (!previousRecord) {
      fetchQuery = query(
        listingCollection,
        where("createdBy", "==", email),
        orderBy("createdAt", "desc"),
        limit(pageLimit)
      );
    } else {
      fetchQuery = query(
        listingCollection,
        where("createdBy", "==", email),
        orderBy("createdAt", "desc"),
        limit(pageLimit),
        startAfter(previousRecord["createdAt"])
      );
    }

    const snapshot = await getDocs(fetchQuery);
    const listings = [];
    snapshot.docs.forEach((doc) => listings.push(doc.data()));
    return { listings, hasNext };
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

Listing.getApplicants = async function (applicantEmails) {
  try {
    const applicants = [];

    for (const applicantEmail of applicantEmails) {
      const userRef = doc(db, "users", applicantEmail);
      const user = await getDoc(userRef);
      applicants.push(user.data());
    }

    return applicants;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export default Listing;
