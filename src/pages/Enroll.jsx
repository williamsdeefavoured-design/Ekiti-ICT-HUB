import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Inputs from "../components/Inputs";
import Succesful from "../components/Succesful";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Enroll() {
  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    email: "",
    phoneNumber: "",
    gender: "",
    learningTrack: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsgServer, setErrorMsgServer] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsgServer("");
    setShowSuccess(false);

    try {
      const response = await fetch(
        "https://bckprj25-1.onrender.com/api/v1/enrolls",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log("Enrollment Response:", data);

      if (response.ok) {
        setShowSuccess(true);

        setFormData({
          Firstname: "",
          Lastname: "",
          email: "",
          phoneNumber: "",
          gender: "",
          learningTrack: "",
        });

        setTimeout(() => {
          setShowSuccess(false);
          navigate("/");
        }, 3000);
      } else {
        setErrorMsgServer(data?.message || "Enrollment failed, try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsgServer("Something went wrong. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="enroll">
      <Header />

      {showSuccess && <Succesful successTxt="Enrollment Successful 🎉" />}

      <div className="enroll-form h-screen flex flex-col items-center justify-center">
        <div className="bg-[#ffd82a] px-30 py-20 flex flex-col rounded-3xl shadow-xl items-center gap-15">
          <h1 className="text-orange-600 font-black text-3xl">
            Student Enrollment Form
          </h1>

          <form onSubmit={handleSubmit}>
            <Inputs
              name="Firstname"
              bgcolor="white"
              placeholder="First Name"
              value={formData.Firstname}
              onChange={(e) =>
                setFormData({ ...formData, Firstname: e.target.value })
              }
            />

            <Inputs
              name="Lastname"
              bgcolor="white"
              placeholder="Last Name"
              value={formData.Lastname}
              onChange={(e) =>
                setFormData({ ...formData, Lastname: e.target.value })
              }
            />

            <Inputs
              name="email"
              bgcolor="white"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <Inputs
              name="phoneNumber"
              bgcolor="white"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />

            <Inputs
              name="learningTrack"
              bgcolor="white"
              placeholder="Select Learning Track"
              options={[
                "Data Analytics",
                "Fullstack Development",
                "Backend Development",
                "Cloud Computing",
                "Cyber Security",
              ]}
              value={formData.learningTrack}
              onChange={(e) =>
                setFormData({ ...formData, learningTrack: e.target.value })
              }
            />

            <Inputs
              name="gender"
              bgcolor="white"
              placeholder="Select Gender"
              options={["Male", "Female"]}
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />

            <button
              type="submit"
              disabled={isLoading}
              className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition w-full duration-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <FaSpinner className="animate-spin" />
                  <p>Loading</p>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>

            {errorMsgServer && (
              <p className="text-red-600 mt-2">{errorMsgServer}</p>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Enroll;
