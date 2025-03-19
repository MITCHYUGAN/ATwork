import { Button } from "@interchain-ui/react";
import styles from "../../styles/postproject.module.css";
import { useState } from "react";
import SkillSelector from "../signup/SkillSelector";
import { CHAIN_ID, CONTRACT_ADDRESS, RPC_ENDPOINT } from "@/config";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { db } from "@/lib/firebase" // Import Firebase Firestore
import { collection, addDoc } from "firebase/firestore"

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
        ],
    },
    {
        id: "budget_timeframe",
        spanText: "Now, ",
        h1Text: "Set your budget and Timeframe of the project",
        pText: "Your budget and timeframe will be displayed to freelancers on the job page and in search results once published. You can adjust it at any time to align with the scope and requirements of your project",
        fields: [
            {
                type: "number",
                name: "budget",
                placeholder: "0.00 $ATOM",
                label: "Budget"
            },
            {
                type: "number",
                name: "timeframe",
                placeholder: "Duration in days",
                label: "TimeFrame"
            }
        ]
    },
];

export default function PostProject({ setPostProjectModalActive }: PostProjectProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        skills: [] as string[],
        budget: "",
        timeframe: "",
    });
    const step = steps[currentStep];

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSkillsChange = (skills: string[]) => {
        setFormData({ ...formData, skills });
    };

    const submitPostProject = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form data
        if (!formData.title || !formData.description || !formData.budget || !formData.timeframe || formData.skills.length === 0) {
            alert("All fields are required.");
            return;
        }

        // Validate budget (ensure it's a valid positive number)
        const budgetValue = parseFloat(formData.budget);
        if (isNaN(budgetValue) || budgetValue <= 0) {
            alert("Budget must be a valid positive number.");
            return;
        }

        try {
            // Check if Keplr is installed
            if (!window.keplr) {
                alert("Keplr Wallet not detected. Please install the Keplr extension.");
                return;
            }

            // Get the connected wallet address
            const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
            const accounts = await offlineSigner.getAccounts();
            const clientAddress = accounts[0].address;

            // Create a CosmWasm client
            const client = await SigningCosmWasmClient.connectWithSigner(
                RPC_ENDPOINT,
                offlineSigner,
                { gasPrice: GasPrice.fromString("0.025untrn") }
            );

            const tokenAddress = "neutron1sr60e2velepytzsdyuutcmccl9n2p2lu3pjcggllxyc9rzyu562sqegazj";

            // Convert budget to smallest unit (assuming 6 decimals for tATOM)
            const decimals = 6;
            const budgetInSmallestUnit = Math.floor(budgetValue * Math.pow(10, decimals)).toString();
            console.log(`Budget in smallest unit (utATOM): ${budgetInSmallestUnit}`);

            // Check wallet balance
            const balanceQuery = {
                balance: {
                    address: clientAddress,
                },
            };
            const walletBalance = await client.queryContractSmart(tokenAddress, balanceQuery);
            console.log("Your tATOM balance:", walletBalance.balance);
            if (parseInt(walletBalance.balance) < parseInt(budgetInSmallestUnit)) {
                alert(`Insufficient tATOM balance in your wallet. Required: ${budgetValue} tATOM, Available: ${parseInt(walletBalance.balance) / Math.pow(10, decimals)} tATOM`);
                return;
            }

            // Add job to Firestore
            const jobData = {
                clientAddress,
                title: formData.title,
                description: formData.description,
                budget: budgetInSmallestUnit,
                deadline: parseInt(formData.timeframe) * 86400,
                deliverables: formData.skills,
                status: "Open",
                createdAt: new Date().toISOString(),
            }

            const docRef = await addDoc(collection(db, "jobs"), jobData)

            console.log("Job posted successfully with ID:", docRef.id);
            alert("Job posted successfully!");
            setPostProjectModalActive(false);
        } catch (err: any) {
            console.error("Error posting job:", err);
            alert("Failed to post job. Please check the console for details.");
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
            <form onSubmit={submitPostProject} className={styles.postprojectForm}>
                {step.fields.map((field, index) => (
                    <label key={index} htmlFor={field.name} className={styles.postprojectFormLabel}>
                        <p className={styles.postprojectFormLabelP}>
                            {field.label}
                            <span className={styles.required}> *</span>
                        </p>
                        {field.type === "textarea" ? (
                            <textarea
                                className={`${styles.postprojectFormLabelInput} ${styles.postprojectFormTextArea}`}
                                name={field.name}
                                id={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name as keyof typeof formData]}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                className={styles.postprojectFormLabelInput}
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name as keyof typeof formData]}
                                onChange={handleChange}
                            />
                        )}
                    </label>
                ))}
                {step.id === "description_skills" && (
                    <div className={styles.formskills}>
                        <SkillSelector
                            value={formData.skills}
                            onSkillsChange={handleSkillsChange}
                        />
                    </div>
                )}
                {step.examples && (
                    <div className={styles.postprojectFormTitleExample}>
                        <p>Example of titles</p>
                        <ul>
                            {step.examples.map((example, index) => (
                                <li className={styles.postprojectFormTitleExampleli} key={index}>{example}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className={styles.formNavigation}>
                    {currentStep > 0 && (
                        <Button onClick={handleBack} className={`${styles.formbtn} ${styles.formbtnback}`}>
                            ← Back
                        </Button>
                    )}
                    {currentStep < steps.length - 1 ? (
                        <Button onClick={handleNext} className={styles.formbtn} rightIcon="arrowRightLine">
                            Next
                        </Button>
                    ) : (
                        <Button onClick={ () => {
                            // testTransferFrom
                            submitPostProject
                        }} className={`${styles.formbtn} ${styles.formbtnsubmit}`}>
                            Submit
                        </Button>
                    )}
                </div>
            </form>
        </section>
    );
}