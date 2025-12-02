import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Inputs from "../components/Inputs";
import mainimg from "../assets/main-img.png";
import Succesful from "../components/Succesful";
import { Link, useNavigate } from "react-router"; // ✅ use react-router-dom, not react-router

function AdminSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsgServer, setErrorMsgServer] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // ✅ NEW STATE
  const navigate = useNavigate();

  // ✅ Manage form data with useState
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsgServer("");
    setShowSuccess(false);

    try {
      const response = await fetch(
        "https://bckprj25-1.onrender.com/api/v1/auth/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json(); // get JSON response

      if (response.ok) {
        localStorage.setItem("authToken", data.token); // ✅ SAVE token here
        

        setShowSuccess(true);
        setFormData({ email: "", password: "" });
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/admin-dashboard");
        }, 3000);
      } else {
        setErrorMsgServer(data?.message || "Signin failed, try again!");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setErrorMsgServer("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      {/* ✅ Conditionally show success modal */}
      {showSuccess && <Succesful successTxt="Signin Successful 🎉" />}

      <Header />

      <form
        onSubmit={handleSubmit}
        className="form everything font-semibold flex flex-col md:flex-row justify-center items-center gap-10 md:gap-70 mt-10 mb-10 bg-[#01D5961A] w-full max-w-7xl mx-auto p-6 rounded-3xl shadow-lg"
      >
        <div className="left flex flex-col items-start justify-center gap-6 mt-10 mb-10">
          <h2 className="text-3xl font-bold text-orange-600 mb-4">
            Hello Admin
          </h2>

          <Inputs
            name="email"
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />

          <Inputs
            name="password"
            label="Password"
            type="password"
            placeholder="password1234@"
            value={formData.password}
            onChange={handleChange}
          />

          <Link to="/forgotPassword" className="text-orange-700">
            Forgot Password?
          </Link>

          <button
            type="submit"
            className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition w-full duration-300"
          >
            Sign In
          </button>

          {errorMsgServer && <p className="text-red-500">{errorMsgServer}</p>}

          <p className="text-gray-500 font-medium">
            Don’t have an account?{" "}
            <Link to="/SignupPage" className="text-orange-600">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="right">
          <img
            src={mainimg}
            alt="Admin Sign In"
            className="w-96 h-auto object-contain"
          />
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default AdminSignIn;
