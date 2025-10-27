import React from 'react'


const Card = ({ courseName, courseDet, bgColor, icon }) => {
  return (
    <div
      className="card w-80 h-70 hover:scale-105 flex flex-col items-center justify-center text-center transition-all p-6 rounded-2xl shadow-md"
      style={{ backgroundColor: bgColor }}
    >
      <h3 className="text-2xl font-bold mb-2 flex flex-col items-center gap-2">
        <i className={`fa-solid ${icon} text-3xl mb-2`}></i>
        {courseName}
      </h3>
      <p className="text-sm">{courseDet}</p>
      <button className="button-2 mt-4">Enroll</button>
    </div>
  );
};

function Courses() {
  return (
    <div className="courses flex items-center justify-center max-w-7xl flex-col mx-auto">
      <h2 className="text-5xl border-b-2 border-black text-orange-600 font-extrabold mb-5">
        Courses
      </h2>
      <p className="text-center font-medium mb-10">
        Gain in-demand tech skills and unlock exciting job opportunities locally and globally.
        Our expert-led training, offered at Essential, Advanced, and Professional levels, prepares you
        for success in the ever-evolving tech industry. Explore our courses below!
      </p>

      <div className="cards flex flex-wrap gap-10 items-center justify-center mb-20">
        <Card
          bgColor="#FFD82A"
          courseName="Data Analysis"
          icon="fa-chart-simple"
          courseDet="The demand for data analysts has been on the rise due to the increasing reliance on big data and predictive analytics in driving business growth."
        />

        <Card
          bgColor="#FF7936"
          courseName="Backend Development"
          icon="fa-server"
          courseDet="Learn how to design, build, and manage the backend of web applications and systems."
        />

        <Card
          bgColor="#40FF46"
          courseName="Full Stack Development"
          icon="fa-laptop-code"
          courseDet="Become a software and application developer, working on both front-end and back-end technologies."
        />

        <Card
          bgColor="#40FF46"
          courseName="Cybersecurity"
          icon="fa-shield-halved"
          courseDet="Protect networks, systems, and data from cyber threats using modern security practices."
        />

        <Card
          bgColor="#FFD82A"
          courseName="Cloud Computing"
          icon="fa-cloud"
          courseDet="Master cloud technologies and learn how to deploy, manage, and scale cloud-based solutions."
        />
      </div>
    </div>
  );
}

export default Courses