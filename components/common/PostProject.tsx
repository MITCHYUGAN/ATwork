import { Button } from "@interchain-ui/react"
import styles from "../../styles/postproject.module.css"
import { useState } from "react"

interface PostProjectProps {
    setPostProjectModalActive: (value: boolean) => void
}

export default function PostProject({ setPostProjectModalActive }: PostProjectProps) {
    const [formContent, setFormContent] = useState("title")
    const [num, setNum] = useState(1)
    const [spantext, setSpanText] = useState("Begin ")
    const [formH1text, setFormH1text] = useState("with a compelling title")
    const [formPtext, setFormPtext] = useState("A strong title grabs attention and ensures your project post resonates with the right candidates. Since it’s the first thing they’ll notice, make it impactful!")

    return (
        <section className={styles.postproject}>
            <div className={styles.postprojectheader}>
                <button className={styles.closepostprojectModal} onClick={() => setPostProjectModalActive(false)}>← close</button>
                <p className={styles.postprojectheaderprogress}>{num}/5</p>
                <h1 className={styles.postprojectheaderh1}><span className={styles.postprojectheaderh1Span}>{spantext}</span>{formH1text}</h1>
                <p className={styles.postprojectheaderP}>{formPtext}</p>
            </div>
            <form action="" className={styles.postprojectForm}>
                {formContent === "title" ? (
                    <div className={styles.postprojectFormTitle}>
                        <label htmlFor="title" className={styles.postprojectFormLabel}>
                            <p className={styles.postprojectFormLabelP}>Project Title</p>
                            <input className={styles.postprojectFormLabelInput} type="text" name="title" id="title" placeholder="Write a title for your job" />
                        </label>
                        <div className={styles.postprojectFormTitleExample}>
                            <p>Example of titles</p>
                            <ul>
                                <li>Creative Graphic Designer Wanted for Ad Campaign Design</li>
                                <li>Full-Stack Developer Wanted for E-Commerce Platform Development</li>
                                <li>SEO Specialist Needed to Optimize Website and Boost Rankings</li>
                                <li>Copywriter Needed for Email Marketing Campaigns</li>
                            </ul>
                            <Button onClick={(e) => {
                                e.preventDefault()
                                setFormContent("description_skills")
                                setNum(2)
                                setSpanText("Great! ")
                                setFormH1text("Now, provide a detailed project description. And skills required")
                                setFormPtext("Provide a clear and detailed description of your project, including goals, tasks and required skills. This helps freelancers understand your needs and apply confidently.")
                            }} className={styles.formbtn} rightIcon="arrowRightLine">Next</Button>
                        </div>
                    </div>
                ) : formContent === "description_skills" ? (

                    <div>
                        <label htmlFor="description">
                            <p>Description</p>
                            <textarea name="description" id="description"></textarea>
                        </label>
                        <label htmlFor="">
                            <p>Skills Required</p>
                            <input type="text" name="" id="" />
                        </label>

                        <div>
                            <Button onClick={(e) => {
                                e.preventDefault()
                                setFormContent("title")
                                setNum(1)
                                setSpanText("Begin ")
                                setFormH1text("with a compelling title")
                                setFormPtext("A strong title grabs attention and ensures your project post resonates with the right candidates. Since it’s the first thing they’ll notice, make it impactful!")
                            }} className={styles.formbtn}>← Back</Button>

                            <Button onClick={(e) => {
                                e.preventDefault()
                                setFormContent("budget_timeline")
                            }} className={styles.formbtn} rightIcon="arrowRightLine">Next</Button>
                        </div>
                    </div>
                ) : <>Something</>}
            </form>
        </section>
    )
}