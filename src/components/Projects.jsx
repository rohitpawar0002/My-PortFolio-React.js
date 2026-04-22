import { motion } from 'framer-motion'
import { projects } from '../data/content'
import imgEcommerce from '../assets/project-ecommerce.svg'
import imgPortfolio from '../assets/project-portfolio.svg'
import imgTrackiza from '../assets/project-trackiza.svg'
import { ProjectPhoneSlideshow } from './ProjectPhoneSlideshow'
import { SectionHeading } from './SectionHeading'

const projectImages = {
  trackiza: imgTrackiza,
  'authentic-papad': imgEcommerce,
  'personal-portfolio': imgPortfolio,
}

function ProjectMedia({ project, src, mediaClass }) {
  const shots =
    project.screenshots?.filter((s) => s?.src?.trim?.()) ?? []
  if (shots.length > 0) {
    const previewVariant =
      project.previewVariant === 'browser' ? 'browser' : 'phone'
    return (
      <ProjectPhoneSlideshow
        shots={shots}
        intervalMs={project.screenshotIntervalMs}
        variant={previewVariant}
        browserTitle={project.browserTitle}
      />
    )
  }
  return (
    <div className={mediaClass} aria-hidden>
      <motion.img
        src={src}
        alt=""
        className="project-card__img"
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.04 }}
      />
      <div className="project-card__media-shine" />
    </div>
  )
}

export function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="proj-title">
      <SectionHeading eyebrow="Work" title="Projects" titleId="proj-title" />
      <div className="projects">
        {projects.map((project, i) => {
          const src =
            project.image?.trim?.() || projectImages[project.slug]
          const mediaClass =
            project.mediaVariant === 'phone'
              ? 'project-card__media project-card__media--phone'
              : 'project-card__media'
          const reverse = i % 2 === 1
          return (
            <motion.article
              key={project.slug}
              className={
                reverse
                  ? 'project-card project-card--reverse'
                  : 'project-card'
              }
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
            >
              <div className="project-card__accent" aria-hidden />
              <div className="project-card__layout">
                <div className="project-card__col project-card__col--text">
                  <div className="project-card__body">
                    <h3 className="project-card__name">{project.name}</h3>
                    <p className="project-card__stack">{project.stack}</p>
                    {(project.appStoreUrl || project.playStoreUrl) && (
                      <p className="project-card__links">
                        {project.appStoreUrl ? (
                          <a
                            href={project.appStoreUrl}
                            className="project-card__store"
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            App Store
                          </a>
                        ) : null}
                        {project.appStoreUrl && project.playStoreUrl ? (
                          <span
                            className="project-card__links-sep"
                            aria-hidden
                          >
                            ·
                          </span>
                        ) : null}
                        {project.playStoreUrl ? (
                          <a
                            href={project.playStoreUrl}
                            className="project-card__store"
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            Google Play
                          </a>
                        ) : null}
                      </p>
                    )}
                    <ul className="project-card__list">
                      {project.points.map((p) => (
                        <li key={p.slice(0, 40)}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="project-card__col project-card__col--media">
                  <ProjectMedia
                  
                    project={project}
                    src={src}
                    mediaClass={mediaClass}
                    
                    
                  />
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
