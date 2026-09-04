import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import PageHero from "../components/PageHero";
import { posts } from "../data/portfolioData";
import "../styles/blog.css";

function Blog() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Thoughts on software engineering."
        description="Practical articles about React, .NET, architecture, AI, deployment and building better software."
      />

      <section className="section">
        <div className="container blog-grid">
          {posts.map((post) => (
            <article className="blog-card" key={post.title}>
              <span className="blog-card__category">{post.category}</span>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>

              <div className="blog-card__meta">
                <span><CalendarDays size={16} /> {post.date}</span>
                <span><Clock3 size={16} /> {post.readTime}</span>
              </div>

              <button type="button">
                Read article <ArrowRight size={17} />
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Blog;
