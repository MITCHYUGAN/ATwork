import { Button } from "@interchain-ui/react";
import styles from "../../styles/postproject.module.css";
import { useState } from "react";

interface PostProjectProps {
    setPostProjectModalActive: (value: boolean) => void;
}

const steps = [
    {
        id: "title",
        spanText: "Begin ",
        h1Text: "with a compelling title",
        pText: "A strong title grabs attention and ensures your project post resonates with the right candidates. Since it’s the first thing they’ll notice, make it impactful!",
        fields: [
            {
                type: "text",
                name: "title",
                placeholder: "Write a title for your job",
                label: "Project Title",
            },
        ],
        examples: [
            "Creative Graphic Designer Wanted for Ad Campaign Design",
            "Full-Stack Developer Wanted for E-Commerce Platform Development",
            "SEO Specialist Needed to Optimize Website and Boost Rankings",
            "Copywriter Needed for Email Marketing Campaigns",
        ],
    },
    {
        id: "description_skills",
        spanText: "Great! ",
        h1Text: "Now, provide a detailed description. And skills required",
        pText: "Provide a clear and detailed description of your project, including goals, tasks and required skills. This helps freelancers understand your needs and apply confidently.",
        fields: [
            {
                type: "textarea",
                name: "description",
                placeholder: "Describe your project",
                label: "Description",
            },
            {
                type: "text",
                name: "skills",
                placeholder: "List required skills",
                label: "Skills Required",
            },
        ],
    },
    // Add more steps as needed
];

export default function PostProject({ setPostProjectModalActive }: PostProjectProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const step = steps[currentStep];

    const handleNext = (e: any) => {
        e.preventDefault()
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <section className={styles.postproject}>
            <div className={styles.postprojectheader}>
                <button className={styles.closepostprojectModal} onClick={() => setPostProjectModalActive(false)}>
                    ← close
                </button>
                <p className={styles.postprojectheaderprogress}>{currentStep + 1}/{steps.length}</p>
                <h1 className={styles.postprojectheaderh1}>
                    <span className={styles.postprojectheaderh1Span}>{step.spanText}</span>
                    {step.h1Text}
                </h1>
                <p className={styles.postprojectheaderP}>{step.pText}</p>
            </div>
            <form action="" className={styles.postprojectForm}>
                {step.fields.map((field, index) => (
                    <label key={index} htmlFor={field.name} className={styles.postprojectFormLabel}>
                        <p className={styles.postprojectFormLabelP}>{field.label}</p>
                        {field.type === "textarea" ? (
                            <textarea
                                className={styles.postprojectFormLabelInput}
                                name={field.name}
                                id={field.name}
                                placeholder={field.placeholder}
                            />
                        ) : (
                            <input
                                className={styles.postprojectFormLabelInput}
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                placeholder={field.placeholder}
                            />
                        )}
                    </label>
                ))}
                {step.examples && (
                    <div className={styles.postprojectFormTitleExample}>
                        <p>Example of titles</p>
                        <ul>
                            {step.examples.map((example, index) => (
                                <li key={index}>{example}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className={styles.formNavigation}>
                    {currentStep > 0 && (
                        <Button onClick={handleBack} className={styles.formbtn}>
                            ← Back
                        </Button>
                    )}
                    <Button onClick={handleNext} className={styles.formbtn} rightIcon="arrowRightLine">
                        {currentStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                </div>
            </form>
        </section>
    );
}