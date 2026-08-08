import { motion } from 'framer-motion'
import { projects } from '../data/content'
import imgEcommerce from '../assets/project-ecommerce.svg'
import imgPortfolio from '../assets/project-portfolio.svg'
import imgTrackiza from '../assets/project-trackiza.svg'
import { ProjectPhoneSlideshow } from './ProjectPhoneSlideshow'
import GlareHover from './react-bits/GlareHover'
import ScrollReveal from './react-bits/ScrollReveal'
import SpotlightCard from './react-bits/SpotlightCard'
import TiltedMedia from './react-bits/TiltedMedia'
import { SectionHeading } from './SectionHeading'

const projectImages = {
  trackiza: imgTrackiza,
  'authentic-papad': imgEcommerce,
  'personal-portfolio': imgPortfolio,
}

function ProjectMedia({ project, src, mediaClass }) {
  const shots =
    project.screenshots?.filter((s) => s?.src?.trim?.()) ?? []

  const media =
    shots.length > 0 ? (
      <ProjectPhoneSlideshow
        shots={shots}
        intervalMs={project.screenshotIntervalMs ?? 3000}
        variant={
          project.previewVariant === 'browser' ? 'browser' : 'phone'
        }
        browserTitle={project.browserTitle}
      />
    ) : (
      <div className={mediaClass} aria-hidden>
        <motion.img
          src={src}
          alt=""
          className="project-card__img"
          initial={{ scale: 1.05, rotateY: -8 }}
          whileInView={{ scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="project-card__media-shine" />
      </div>
    )

  return (
    <GlareHover
      className="project-media-glare"
      width="100%"
      height="auto"
      background="transparent"
      borderColor="transparent"
      borderRadius="0"
      glareColor="#e0f2fe"
      glareOpacity={0.28}
      glareSize={240}
      transitionDuration={700}
    >
      <TiltedMedia rotateAmplitude={10} scaleOnHover={1.03}>
        {media}
      </TiltedMedia>
    </GlareHover>
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
              <motion.article
                className={[
                  'project-card',
                  reverse ? 'project-card--reverse' : '',
                  isFeatured ? 'project-card--featured' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                initial={{ opacity: 0, y: 48, rotateX: 12, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2, margin: '-60px' }}
                transition={{
                  duration: 0.65,
                  delay: 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformPerspective: 1400 }}
              >
                <div className="project-card__accent" aria-hidden />
                <div className="project-card__layout">
                  <div className="project-card__col project-card__col--text">
                    <div className="project-card__body">
                      {isFeatured ? (
                        <p className="project-card__badge">
                          Latest · Live on stores
                        </p>
                      ) : null}
                      <ScrollReveal
                        as="h3"
                        containerClassName="project-card__name"
                        textClassName="project-card__name-text"
                        baseOpacity={0.15}
                        baseRotation={2}
                        blurStrength={5}
                        enableBlur
                      >
                        {project.name}
                      </ScrollReveal>
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
            </SpotlightCard>
          )
        })}
      </div>
    </section>
  )
}
