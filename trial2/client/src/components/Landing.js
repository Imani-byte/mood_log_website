import React, { useEffect, useState } from "react";
import axios from "axios";

function Landing() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data");
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="landing-page">
      <header>
        <h1>{message ? message : "Just Checking In"}</h1>
      </header>
      <section>
        <h2>Our Goals</h2>
        <p>
          Welcome to Mood Log! Take our quick quizzes to gain insights into
          your emotional well-being. While the results aren't a substitute for
          professional advice, they can guide you towards support if needed.
          Let's embark on a journey to brighter days together!
        </p>
      </section>
      <footer>
        <p>© 2024 Mood-Log. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
