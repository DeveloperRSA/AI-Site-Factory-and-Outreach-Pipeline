import { useState } from "react";
import "./App.css";

function App() {
  const [lead, setLead] = useState({});
  const [cleaned, setCleaned] = useState(null);
  const [content, setContent] = useState(null);

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const validateLead = () => {
    if (!lead.businessName || !lead.email || !lead.category) {
      alert("Missing required fields: Business Name, Email, and Category.");
      return;
    }
    alert("Lead is valid.");
  };

  const cleanLead = () => {
    const cleanedData = {
      businessName: lead.businessName?.trim(),
      email: lead.email?.trim().toLowerCase(),
      category: lead.category?.trim(),
      location: lead.location?.trim(),
      cleanSummary: lead.notes?.trim(),
      status: "CLEAN",
      readyForAI: "YES",
    };

    setCleaned(cleanedData);
  };

  const generateContent = () => {
    if (!cleaned) {
      alert("Clean the lead first.");
      return;
    }

    const generated = {
      headline: `${cleaned.businessName} - ${cleaned.category} Services in ${cleaned.location}`,
      summary: `${cleaned.businessName} provides reliable ${cleaned.category?.toLowerCase()} services in ${cleaned.location}. ${cleaned.cleanSummary || ""}`,
      services: [
        `Professional ${cleaned.category} support`,
        "Customer-focused service delivery",
        "Reliable local assistance",
      ],
      cta: `Contact ${cleaned.businessName} today to learn more.`,
    };

    setContent(generated);
  };

  const resetApp = () => {
    setLead({});
    setCleaned(null);
    setContent(null);
  };

  return (
    <div className="app">
      <header className="header">
        <span className="badge">Phase 1 Frontend</span>
        <h1>AI Site Factory</h1>
        <p>
          Lead intake, data cleaning, content generation, and preview website workflow.
        </p>
      </header>

      <section className="card">
        <h2>1. Lead Intake</h2>
        <p className="helper">Enter raw business lead details below.</p>

        <input name="businessName" placeholder="Business Name" onChange={handleChange} />
        <input name="email" placeholder="Email Address" onChange={handleChange} />
        <input name="category" placeholder="Category / Industry" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <textarea name="notes" placeholder="Business Notes" onChange={handleChange}></textarea>

        <div className="button-row">
          <button onClick={validateLead}>Validate Lead</button>
          <button onClick={cleanLead}>Clean Data</button>
        </div>
      </section>

      {cleaned && (
        <section className="card">
          <h2>2. Cleaned Data</h2>
          <p className="helper">This is the normalized lead record ready for AI generation.</p>
          <pre>{JSON.stringify(cleaned, null, 2)}</pre>

          <button onClick={generateContent}>Generate Content</button>
        </section>
      )}

      {content && (
        <section className="card">
          <h2>3. Generated Content Packet</h2>
          <p className="helper">This content would be sent to the site factory.</p>

          <div className="content-box">
            <h3>{content.headline}</h3>
            <p>{content.summary}</p>
            <ul>
              {content.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
            <strong>{content.cta}</strong>
          </div>
        </section>
      )}

      {content && (
        <section className="card">
          <h2>4. Preview Website</h2>
          <p className="helper">Reviewable website preview generated from the content packet.</p>

          <div className="preview">
            <h1>{content.headline}</h1>
            <p>{content.summary}</p>

            <div className="service-grid">
              {content.services.map((service, index) => (
                <div className="service-card" key={index}>
                  <span>0{index + 1}</span>
                  <p>{service}</p>
                </div>
              ))}
            </div>

            <button>{content.cta}</button>
          </div>

          <button className="reset" onClick={resetApp}>Start New Lead</button>
        </section>
      )}
    </div>
  );
}

export default App;