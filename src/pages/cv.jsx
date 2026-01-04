import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

// Components
import { SkillCard } from "@components/cv/SkillCard";
import { ExperienceItem } from "@components/cv/ExperienceItem";
import { ProjectCard } from "@components/cv/ProjectCard";
import { CVMenu } from "@components/cv/CVMenu";
import { SkillsetList } from "@components/cv/SkillsetList";
import { CVFooter } from "@components/cv/CVFooter";
import { Background } from "@components/cv/Background";

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
        links,
        technicalSkills,
        personalSkills,
      } = this.props.data,
      { siteMetadata: meta } = site;

    const itSkills = technicalSkills.nodes.filter(
      (skillset) => skillset.layout === "list"
    );
    const devOpsSkills = technicalSkills.nodes.filter(
      (skillset) => skillset.layout === "cards"
    );

    // Construct menu data dynamically
    const menuSections = [];

    devOpsSkills.forEach((skillset, index) => {
      menuSections.push({
        title: skillset.title,
        id: `devops-skills-${index}`,
      });
    });

    menuSections.push({ title: "Experience", id: "experience" });
    menuSections.push({ title: "Education", id: "education" });

    itSkills.forEach((skillset, index) => {
      const id = `skills-${index}`;
      menuSections.push({ title: skillset.title, id });
    });

    personalSkills.nodes.forEach((skillset, index) => {
      const id = `personal-skills-${index}`;
      menuSections.push({ title: skillset.title, id });
    });

    menuSections.push({ title: "Projects", id: "projects" });

    return (
      <>
        <Helmet>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          />
        </Helmet>

        <Background />
        <CVMenu sections={menuSections} />

        <div className="cv-container" style={{ paddingTop: "80px" }}>
          <header style={{ marginBottom: "4rem" }}>
            <img src={me} alt="Óscar Gómez Alcañiz" className="profile-image" />
            <h1>Óscar Gómez Alcañiz</h1>
            <h2>Senior Cloud Architect & DevOps Engineer</h2>
            <p>
              Passionate about technology, automation, and building scalable
              solutions. With over 10 years of experience in the IT industry, I
              specialize in designing and implementing cloud-native
              architectures.
            </p>
          </header>

          {devOpsSkills.map((skillset, index) => {
            // Default to cards layout
            return (
              <section id={`devops-skills-${index}`} key={`devops-${index}`}>
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
                  date={`${job.from} – ${job.to || "Present"}`}
                  skills={job.skills}
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
                  position={edu.degree}
                  description={edu.description}
                  date={`${edu.from} – ${edu.to || "Present"}`}
                  skills={edu.skills}
                >
                  <div dangerouslySetInnerHTML={{ __html: edu.body }} />
                </ExperienceItem>
              ))}
            </div>
          </section>

          {itSkills.map((skillset, index) => (
            <SkillsetList
              key={`tech-${index}`}
              skillset={skillset}
              index={index}
            />
          ))}

          {personalSkills.nodes.map((skillset, index) => (
            <section
              id={`personal-skills-${index}`}
              className="personal-skills"
              key={`personal-${index}`}
            >
              <h3>{skillset.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: skillset.body }} />
            </section>
          ))}

          <section id="projects">
            <h3>Projects & Open Source</h3>
            <div className="projects-grid">
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

            <div className="project-gallery">
              <h4>Day Of Rising CD Artwork</h4>
              <p>
                Graphic design project transforming raw photos into a complete
                CD artwork package using Photoshop.
              </p>
              <div className="gallery-grid">
                <img src={cdRaw1} alt="Raw Element 1" />
                <img src={cdRaw2} alt="Raw Element 2" />
                <img src={cdRaw3} alt="Raw Element 3" />
                <img src={sampleCdFront} alt="CD Front Cover" />
                <img src={sampleCdBack} alt="CD Back Cover" />
              </div>
            </div>
          </section>
        </div>
        <CVFooter links={links.nodes.map((n) => n.links).flat()} />
      </>
    );
  }
}

export default CV;
