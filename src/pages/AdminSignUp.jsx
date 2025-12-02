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
          navigate("/admin-signin")
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
          className="form everything font-semibold flex flex-col md:flex-row justify-center items-center gap-10 md:gap-70 mt-10 mb-10 bg-[#01D5961A] w-full max-w-7xl mx-auto p-6 rounded-3xl shadow-lg"
        >
          <div className="left flex flex-col items-start justify-center gap-6 mt-10 mb-10">
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              Hello Admin
            </h2>

            {/* ✅ Each input now updates its own key in formData */}
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

            {/* <Inputs
              name="passwordConfirm"
              label="Re-Enter Password"
              type="password"
              placeholder="Re-enter Password1234"
              value={formData.passwordConfirm}
              onChange={(e) =>
                setFormData({ ...formData, passwordConfirm: e.target.value })
              }
            /> */}

            <button
              type="submit"
              disabled={isLoading}
              className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition w-full duration-300"
            >
              {isLoading ? (
                <>
                  <div className="flex items-center justify-center space-x-2">
                    <FaSpinner className="animate-spin" />{" "}
                    <p className="">Loading</p>
                  </div>
                </>
              ) : (
                <p className=""> Sign Up</p>
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

          <div className="right">
            <img
              src={mainimg}
              alt="Admin Signup"
              className="w-96 h-auto object-contain"
            />
          </div>
        </form>

        <Footer />
      </div>
    </>
  );
}

export default AdminSignUp;
