import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import PageHero from "../components/PageHero";
import { personalInfo } from "../data/portfolioData";
import "../styles/contact.css";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  projectType: "Job Opportunity",
  message: ""
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");

  const updateField = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("Please complete your name, email and message.");
      return;
    }

    setStatus("Message prepared successfully. Connect this form to your preferred email service before production.");
    setForm(initialForm);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s build something meaningful."
        description="Have a job opportunity, project or collaboration in mind? Send a message and start the conversation."
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="eyebrow">Contact details</span>
            <h2>Open to professional opportunities.</h2>
            <p>{personalInfo.availability}</p>

            <div className="contact-list">
              <a href={`mailto:${personalInfo.email}`}>
                <Mail size={20} />
                <span>
                  <small>Email</small>
                  {personalInfo.email}
                </span>
              </a>

              <div>
                <MapPin size={20} />
                <span>
                  <small>Location</small>
                  {personalInfo.location}
                </span>
              </div>
            </div>

            <div className="contact-socials">
              <a href={personalInfo.github} target="_blank" rel="noreferrer">
                <Github size={20} /> GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={20} /> LinkedIn
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={submitForm}>
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Aijaz Ahmed"
                />
              </label>

              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label>
              Subject
              <input
                name="subject"
                value={form.subject}
                onChange={updateField}
                placeholder="Project or opportunity"
              />
            </label>

            <label>
              Project type
              <select name="projectType" value={form.projectType} onChange={updateField}>
                <option>Job Opportunity</option>
                <option>Freelance Project</option>
                <option>Collaboration</option>
                <option>General Question</option>
              </select>
            </label>

            <label>
              Message
              <textarea
                name="message"
                rows="7"
                value={form.message}
                onChange={updateField}
                placeholder="Tell me about the opportunity..."
              />
            </label>

            <button className="button button--primary" type="submit">
              Send Message <Send size={18} />
            </button>

            {status && <p className="form-status" role="status">{status}</p>}
          </form>
        </div>
      </section>
    </>
  );
}

export default Contact;
