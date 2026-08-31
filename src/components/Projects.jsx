import { useReducedMotion } from 'framer-motion'
import { projects } from '../data/content'
import imgEcommerce from '../assets/project-ecommerce.svg'
import imgPortfolio from '../assets/project-portfolio.svg'
import imgTrackiza from '../assets/project-trackiza.svg'
import { ProjectPhoneSlideshow } from './ProjectPhoneSlideshow'
import SpotlightCard from './react-bits/SpotlightCard'
import ScrollFloat from './react-bits/ScrollFloat'
import ScrollReveal from './react-bits/ScrollReveal'
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
    return (
      <ProjectPhoneSlideshow
        shots={shots}
        intervalMs={project.screenshotIntervalMs ?? 3000}
        variant={
          project.previewVariant === 'browser' ? 'browser' : 'phone'
        }
        browserTitle={project.browserTitle}
      />
    )
  }

  return (
    <div className={mediaClass} aria-hidden>
      <img src={src} alt="" className="project-card__img" />
      <div className="project-card__media-shine" />
    </div>
  )
}

export function Projects() {
  const reduceMotion = useReducedMotion()

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
          const isFeatured = i === 0
          const spotlight =
            i % 2 === 0
              ? 'rgba(56, 189, 248, 0.2)'
              : 'rgba(167, 139, 250, 0.2)'

          return (
            <SpotlightCard
              key={project.slug}
              className="project-spotlight"
              spotlightColor={spotlight}
            >
              <article
                className={[
                  'project-card',
                  reverse ? 'project-card--reverse' : '',
                  isFeatured ? 'project-card--featured' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div className="project-card__layout">
                  <div className="project-card__col project-card__col--text">
                    <div className="project-card__body">
                      {isFeatured ? (
                        <p className="project-card__badge">
                          Latest · Live on stores
                        </p>
                      ) : null}

                      {reduceMotion ? (
                        <h3 className="project-card__name">{project.name}</h3>
                      ) : (
                        <ScrollReveal
                          as="h3"
                          containerClassName="project-card__name"
                          baseOpacity={0.12}
                          baseRotation={2}
                          blurStrength={3}
                          enableBlur
                          rotationEnd="top 75%"
                          wordAnimationEnd="top 58%"
                        >
                          {project.name}
                        </ScrollReveal>
                      )}

                      {reduceMotion ? (
                        <p className="project-card__stack">{project.stack}</p>
                      ) : (
                        <ScrollFloat
                          as="p"
                          containerClassName="project-card__stack"
                          animationDuration={1}
                          ease="back.inOut(2)"
                          scrollStart="top bottom-=10%"
                          scrollEnd="top 55%"
                          stagger={0.02}
                        >
                          {project.stack}
                        </ScrollFloat>
                      )}

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
                        {project.points.map((p) =>
                          reduceMotion ? (
                            <li key={p.slice(0, 40)}>{p}</li>
                          ) : (
                            <li key={p.slice(0, 40)}>
                              <ScrollReveal
                                as="span"
                                containerClassName="project-card__point"
                                baseOpacity={0.15}
                                baseRotation={1.5}
                                blurStrength={2}
                                enableBlur
                                rotationEnd="top 80%"
                                wordAnimationEnd="top 62%"
                              >
                                {p}
                              </ScrollReveal>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="project-card__col project-card__col--media">
                    {reduceMotion ? (
                      <ProjectMedia
                        project={project}
                        src={src}
                        mediaClass={mediaClass}
                      />
                    ) : (
                      <ScrollFloat
                        as="div"
                        containerClassName="project-card__media-float"
                        animationDuration={1.15}
                        ease="power2.out"
                        scrollStart="top bottom-=5%"
                        scrollEnd="center center"
                        stagger={0}
                      >
                        <ProjectMedia
                          project={project}
                          src={src}
                          mediaClass={mediaClass}
                        />
                      </ScrollFloat>
                    )}
                  </div>
                </div>
              </article>
            </SpotlightCard>
          )
        })}
      </div>
    </section>
  )
}
