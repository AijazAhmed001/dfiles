import { footerLinks } from "../../src/constants";

const Footer = () => {
  return (
    <footer id="contact">
      <div className="info">
        <p>
          Available for remote software engineering roles, internships and meaningful collaborations. Contact: aijazahmed@example.com
        </p>
        <img src="/logo.svg" alt="Aijaz Ahmed logo" />
      </div>
      <hr />
      <div className="links">
        <p>Copyright © 2026 Aijaz Ahmed. All rights reserved.</p>
        <ul>
          {footerLinks.map(({ link, label }) => (
            <li key={label}>
              <a href={link} target={link.startsWith("http") ? "_blank" : undefined} rel={link.startsWith("http") ? "noreferrer" : undefined}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
