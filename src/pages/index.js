import React from 'react'
import { graphql } from 'gatsby'

import classNames from 'classnames'
import Layout from '../components/layout'
import { Link } from '../components/link'
import Logo from '../../static/logo.svg'

import classes from '../styles/index.module.sass'
import focusClasses from '../styles/focus.module.sass'

export default ({ data }) => {
    const siteMetadata = data.site.siteMetadata
    const chapters = data.allMarkdownRemark.edges.map(({ node }) => ({
        slug: node.fields.slug,
        title: node.frontmatter.title,
        description: node.frontmatter.description,
    }))
    const chapterClassName = classNames(classes.chapter, focusClasses.focused)
    return (
        <Layout isHome>
            <Logo className={classes.logo} aria-label={siteMetadata.title} />
            {chapters.map(({ slug, title, description }) => (
                <Link hidden to={slug}>
                    <section key={slug} className={chapterClassName}>
                        <h2 className={classes.chapterTitle}>{title}</h2>
                        <p className={classes.chapterDesc}>{description}</p>
                    </section>
                </Link>
            ))}
        </Layout>
    )
}

export const pageQuery = graphql`
    {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___title], order: ASC }
            filter: { frontmatter: { type: { eq: "chapter" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        description
                    }
                }
            }
        }
    }
`
