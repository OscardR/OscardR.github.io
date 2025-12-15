import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

// Components
import { SkillCard } from "../components/cv/SkillCard";
import { ExperienceItem } from "../components/cv/ExperienceItem";
import { ProjectCard } from "../components/cv/ProjectCard";

// Styles
import "@css/cv.scss";

// Resources
import me from "@images/cv/me.jpg";
import cdRaw1 from "@images/cv/cd_raw_1.jpg";
import cdRaw2 from "@images/cv/cd_raw_2.jpg";
import cdRaw3 from "@images/cv/cd_raw_3.jpg";
import sampleCdBack from "@images/cv/sample_cd_back.jpg";
import sampleCdFront from "@images/cv/sample_cd_front.jpg";

export const query = graphql`
  query SiteAndData {
    site {
      ...Site
    }
    # Get field names for Information block
    ...InformationFields
    information: allInformation {
      ...Information
    }
    jobs: allJob(sort: { fields: from, order: DESC }) {
      ...Jobs
    }
    education: allEducation(sort: { fields: from, order: DESC }) {
      ...Education
    }
    links: allFile(filter: { name: { eq: "links" } }) {
      ...Links
    }
    technicalSkills: allTechnicalSkill {
      nodes {
        title
        layout
        skills {
          name
          items {
            name
            icon
            description
            details
          }
        }
      }
    }
    personalSkills: allPersonalSkill {
      nodes {
        title
        body
      }
    }
  }
`;

class CV extends React.PureComponent {
  render() {
    console.log(this.props.data);
    const {
        site,
        jobs,
        education,
        // links,
        // information,
        technicalSkills,
        personalSkills,
      } = this.props.data,
      { siteMetadata: meta } = site;

    return (
      <>
        <Helmet>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Óscar Gómez Alcañiz — Curriculum Vitae ({meta.title})</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          />
        </Helmet>

        <div className="cv-container">
          <header>
            <img src={me} alt="Óscar Gómez Alcañiz" className="profile-image" />
            <h1>Óscar Gómez Alcañiz</h1>
            <h2>Senior Cloud Engineer & Platform Architect</h2>
            <p>
              Building scalable AWS platforms and automating infrastructure with
              DevOps & GitOps practices.
            </p>
          </header>

          {technicalSkills.nodes.map((skillset, index) => {
            if (skillset.layout === "list") {
              return (
                <section
                  id={`tech-skills-${index}`}
                  key={`tech-${index}`}
                  className="it-skills-section"
                >
                  <h3>{skillset.title}</h3>
                  <div className="it-skills-container">
                    {skillset.skills.map((category) => (
                      <div key={category.name} className="it-skill-category">
                        <h4>{category.name}</h4>
                        <ul>
                          {category.items.map((item) => (
                            <li key={item.name}>
                              <strong>{item.name}</strong>
                              {item.details && item.details.length > 0 && (
                                <span className="skill-details">
                                  : {item.details.join(", ")}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            // Default to cards layout
            return (
              <section id={`tech-skills-${index}`} key={`tech-${index}`}>
                <h3>{skillset.title}</h3>
                <div className="skills-grid">
                  {skillset.skills.map((category) => (
                    <React.Fragment key={category.name}>
                      {category.items.map((item) => (
                        <SkillCard
                          key={item.name}
                          icon={item.icon || "fas fa-check"}
                          title={item.name}
                          description={
                            item.description ||
                            (item.details && item.details.join(", ")) ||
                            ""
                          }
                        />
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </section>
            );
          })}

          <section id="experience">
            <h3>Professional Experience</h3>
            <div className="experience-timeline">
              {jobs.nodes.map((job, index) => (
                <ExperienceItem
                  key={index}
                  position={job.position}
                  title={job.title}
                  description={job.description}
                  date={`${job.from} - ${job.to || "Present"}`}
                >
                  <div dangerouslySetInnerHTML={{ __html: job.body }} />
                </ExperienceItem>
              ))}
            </div>
          </section>

          <section id="education">
            <h3>Education</h3>
            <div className="experience-timeline">
              {education.nodes.map((edu, index) => (
                <ExperienceItem
                  key={index}
                  title={edu.title}
                  position={edu.location}
                  date={`${edu.from} - ${edu.to || "Present"}`}
                >
                  <div dangerouslySetInnerHTML={{ __html: edu.body }} />
                </ExperienceItem>
              ))}
            </div>
          </section>

          {personalSkills.nodes.map((skillset, index) => (
            <section id={`personal-skills-${index}`} key={`personal-${index}`}>
              <h3>{skillset.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: skillset.body }} />
            </section>
          ))}

          <section id="projects">
            <h3>Projects & Open Source</h3>
            <div className="projects-grid">
              <ProjectCard
                image={sampleCdFront}
                title="Day Of Rising CD"
                description="Artwork design for Day Of Rising album."
                link="https://www.dayofrising.rocks"
              />
              <ProjectCard
                title="CERN Base Theme"
                description="Official CERN Drupal Base Theme."
                link="https://drupal.docs.cern.ch/themes/cern-theme/"
              />
              <ProjectCard
                title="Observable Notebooks"
                description="Data visualizations and experiments."
                link="https://observablehq.com/@oscardr"
              />
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default CV;
