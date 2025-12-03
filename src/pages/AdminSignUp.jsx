import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Inputs from "../components/Inputs";
import mainimg from "../assets/main-img.png";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import Succesful from "../components/Succesful"; // ✅ import modal

function AdminSignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    track: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsgServer, setErrorMsgServer] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // ✅ NEW STATE
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsgServer("");
    setShowSuccess(false);

    try {
      const response = await fetch(
        "https://bckprj25-1.onrender.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      // const data = await response.json();
      // console.log("✅ Signup success:", data);

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: "", email: "", track: "", password: "" });
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/admin-signin");
        }, 3000);
      } else {
        setErrorMsgServer(data?.message || "Signup failed, try again!");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setErrorMsgServer("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Conditionally show success modal */}
      {showSuccess && <Succesful successTxt="Signup Successful 🎉" />}

      <div className="form-container ">
        <Header />

        <form
          onSubmit={handleSubmit}
          className="
          form 
          font-semibold 
          flex flex-col md:flex-row 
          items-center md:items-start 
          justify-between 
          gap-10 md:gap-16 
          mt-10 mb-10 
          bg-[#01D5961A]
          w-full max-w-6xl 
          mx-auto 
          p-6 sm:p-8 md:p-10 
          rounded-3xl 
          shadow-lg
        "
        >
          {/* LEFT SIDE — FORMS */}
          <div className="left w-full md:w-1/2 flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">
              Hello Admin
            </h2>

            <Inputs
              name="name"
              label="Full Name"
              type="text"
              placeholder="Favour Adeshina"
              value={formData.name}
              disabled={isLoading}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <Inputs
              name="email"
              label="Email"
              type="email"
              placeholder="example@gmail.com"
              value={formData.email}
              disabled={isLoading}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <Inputs
              name="track"
              label="Track"
              type="text"
              placeholder="Select Track"
              options={[
                "Data Analytics",
                "Fullstack Development",
                "Backend Development",
                "Cloud Computing",
                "Cyber Security",
              ]}
              value={formData.track}
              disabled={isLoading}
              onChange={(e) =>
                setFormData({ ...formData, track: e.target.value })
              }
            />

            <Inputs
              name="password"
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              value={formData.password}
              disabled={isLoading}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
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

            {errorMsgServer && <p className="text-red-500">{errorMsgServer}</p>}

            <p className="text-gray-500 font-medium">
              Already have an account?{" "}
              <Link to="/admin-signin" className="text-orange-600">
                Sign In
              </Link>
            </p>
          </div>

          {/* RIGHT SIDE — IMAGE */}
          <div className="right w-full md:w-1/2 flex justify-center">
            <img
              src={mainimg}
              alt="Admin Signup"
              className="w-64 sm:w-80 md:w-full max-w-sm object-contain"
            />
          </div>
        </form>

        <Footer />
      </div>
    </>
  );
}

export default AdminSignUp;
