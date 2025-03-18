import { Button } from "@interchain-ui/react";
import styles from "../../styles/postproject.module.css";
import { useState } from "react";
import SkillSelector from "../signup/SkillSelector";
import { CHAIN_ID, CONTRACT_ADDRESS, RPC_ENDPOINT } from "@/config";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

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

    // const submitPostProject = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     // Validate form data
    //     if (!formData.title || !formData.description || !formData.budget || !formData.timeframe || formData.skills.length === 0) {
    //         alert("All fields are required.");
    //         return;
    //     }

    //     try {
    //         if (!window.keplr) {
    //             alert("Keplr Wallet not detected. Please install the Keplr extension.");
    //             return;
    //         }

    //         // Example: Convert budget to smallest unit (assuming 6 decimals, like uATOM)
    //         const decimals = 6;
    //         const budgetInSmallestUnit = Math.floor(parseFloat(formData.budget) * Math.pow(10, decimals)).toString();

    //         // Get the connected wallet address
    //         const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
    //         const accounts = await offlineSigner.getAccounts();
    //         const address = accounts[0].address;

    //         // Create a CosmWasm client
    //         const client = await SigningCosmWasmClient.connectWithSigner(
    //             RPC_ENDPOINT,
    //             offlineSigner,
    //             { gasPrice: GasPrice.fromString("0.025untrn") }
    //         );

    //         const tokenAddress = "neutron1sr60e2velepytzsdyuutcmccl9n2p2lu3pjcggllxyc9rzyu562sqegazj";

    //         // Increase allowance for the contract to spend the client's tokens
    //         const increaseAllowanceBeforeJobPostMsg = {
    //             increase_allowance: {
    //                 spender: CONTRACT_ADDRESS,
    //                 amount: budgetInSmallestUnit,
    //             },
    //         };

    //         // Execute the increase_allowance message on the token contract
    //         const allowanceResult = await client.execute(
    //             address,
    //             tokenAddress,
    //             increaseAllowanceBeforeJobPostMsg,
    //             "auto"
    //         );
    //         console.log("Allowance increased successfully:", allowanceResult);

    //         // Prepare the PostJob message
    //         const postJobMsg = {
    //             post_job: {
    //                 title: formData.title,
    //                 description: formData.description,
    //                 budget: budgetInSmallestUnit,
    //                 deadline: parseInt(formData.timeframe) * 86400,
    //                 deliverables: formData.skills,
    //             },
    //         };
    //         console.log("Post Job Message:", postJobMsg);

    //         // Execute the transaction
    //         const result = await client.execute(
    //             address,
    //             CONTRACT_ADDRESS,
    //             postJobMsg,
    //             "auto",
    //         );


    //         console.log("Job posted successfully:", result);
    //         alert("Job posted successfully!");
    //         setPostProjectModalActive(false); // Close the modal
    //     } catch (err: any) {
    //         // console.error("Error posting job:", err);
    //         // alert("Failed to post job. Please check the console for details.");
    //         console.error("Error posting job:", err);
    //         if (err.message.includes("Overflow")) {
    //             alert("Failed to post job: There may be an issue with the smart contract's logic. Please contact the contract developer with the transaction details.");
    //         } else if (err.message.includes("insufficient funds")) {
    //             alert("Failed to post job: Insufficient funds in your wallet.");
    //         } else if (err.message.includes("Insufficient allowance")) {
    //             alert("Failed to post job: Insufficient allowance. Please try again to increase the allowance.");
    //         } else if (err.message.includes("Insufficient token balance")) {
    //             alert("Failed to post job: Insufficient tATOM balance in your wallet.");
    //         } else if (err.message.includes("Profile does not exists")) {
    //             alert("Failed to post job: You need to create a client profile before posting a job.");
    //         } else if (err.message.includes("Only clients can post jobs")) {
    //             alert("Failed to post job: Only client profiles can post jobs. Please update your profile type to 'Client'.");
    //         } else {
    //             alert("Failed to post job. Please check the console for details.");
    //         }
    //     }

    // };


    // const testTransferFrom = async () => {
    //     try {
    //         if (!window.keplr) {
    //             alert("Keplr Wallet not detected. Please install the Keplr extension.");
    //             return;
    //         }
    
    //         const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
    //         const accounts = await offlineSigner.getAccounts();
    //         const address = accounts[0].address;
    
    //         const client = await SigningCosmWasmClient.connectWithSigner(
    //             RPC_ENDPOINT,
    //             offlineSigner,
    //             { gasPrice: GasPrice.fromString("0.025untrn") }
    //         );
    
    //         const tokenAddress = "neutron1sr60e2velepytzsdyuutcmccl9n2p2lu3pjcggllxyc9rzyu562sqegazj";
    //         const jobContractAddress = CONTRACT_ADDRESS; // Use the correct job contract address
    //         const escrowAddress = "neutron1..."; // Replace with the actual escrow address (state.escrow_address)
    
    //         // Check current allowance
    //         const allowanceQuery = {
    //             allowance: {
    //                 owner: address,
    //                 spender: jobContractAddress,
    //             },
    //         };
    //         const currentAllowance = await client.queryContractSmart(tokenAddress, allowanceQuery);
    //         console.log("Current allowance before increase:", currentAllowance.allowance);
    
    //         // Increase allowance
    //         const amountToTransfer = "1000000"; // 1 tATOM
    //         if (parseInt(currentAllowance.allowance) < parseInt(amountToTransfer)) {
    //             const increaseAllowanceMsg = {
    //                 increase_allowance: {
    //                     spender: jobContractAddress,
    //                     amount: amountToTransfer,
    //                 },
    //             };
    //             const allowanceResult = await client.execute(
    //                 address,
    //                 tokenAddress,
    //                 increaseAllowanceMsg,
    //                 "auto"
    //             );
    //             console.log("Allowance increased successfully:", allowanceResult);
    
    //             // Query allowance again to confirm it updated
    //             const updatedAllowance = await client.queryContractSmart(tokenAddress, allowanceQuery);
    //             console.log("Allowance after increase:", updatedAllowance.allowance);
    //             if (parseInt(updatedAllowance.allowance) < parseInt(amountToTransfer)) {
    //                 throw new Error("Allowance did not update correctly after increase.");
    //             }
    //         }
    
    //         // Execute transfer_from directly on the token contract
    //         const transferFromMsg = {
    //             transfer_from: {
    //                 owner: address,
    //                 recipient: escrowAddress,
    //                 amount: amountToTransfer,
    //             },
    //         };
    //         const transferResult = await client.execute(
    //             address,
    //             tokenAddress,
    //             transferFromMsg,
    //             "auto"
    //         );
    //         console.log("TransferFrom successful:", transferResult);
    //     } catch (err) {
    //         console.error("Error in TransferFrom test:", err);
    //         alert("Failed to test TransferFrom. Please check the console for details.");
    //     }
    // };

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
            const address = accounts[0].address;

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
                    address: address,
                },
            };
            const walletBalance = await client.queryContractSmart(tokenAddress, balanceQuery);
            console.log("Your tATOM balance:", walletBalance.balance);
            if (parseInt(walletBalance.balance) < parseInt(budgetInSmallestUnit)) {
                alert(`Insufficient tATOM balance in your wallet. Required: ${budgetValue} tATOM, Available: ${parseInt(walletBalance.balance) / Math.pow(10, decimals)} tATOM`);
                return;
            }

            // Check current allowance
            const allowanceQuery = {
                allowance: {
                    owner: address,
                    spender: CONTRACT_ADDRESS,
                },
            };
            const currentAllowance = await client.queryContractSmart(tokenAddress, allowanceQuery);
            console.log("Current allowance:", currentAllowance.allowance);

            // Increase allowance if necessary
            if (parseInt(currentAllowance.allowance) < parseInt(budgetInSmallestUnit)) {
                const increaseAllowanceBeforeJobPostMsg = {
                    increase_allowance: {
                        spender: CONTRACT_ADDRESS,
                        amount: budgetInSmallestUnit,
                    },
                };
                const allowanceResult = await client.execute(
                    address,
                    tokenAddress,
                    increaseAllowanceBeforeJobPostMsg,
                    "auto"
                );
                console.log("Allowance increased successfully:", allowanceResult);
            }

            // Check job contract's token balance (for debugging purposes)
            const contractBalanceQuery = {
                balance: {
                    address: CONTRACT_ADDRESS,
                },
            };
            const contractBalance = await client.queryContractSmart(tokenAddress, contractBalanceQuery);
            console.log("Job contract's tATOM balance:", contractBalance.balance);

            // Prepare the PostJob message (must match the smart contract's expectations)
            const postJobMsg = {
                post_job: {
                    title: formData.title,
                    description: formData.description,
                    budget: budgetInSmallestUnit, // Must be a string representing a Uint128
                    deadline: parseInt(formData.timeframe) * 86400, // Convert days to seconds
                    deliverables: formData.skills, // Array of strings
                },
            };
            console.log("Post Job Message:", postJobMsg);

            // // Simulate the transaction to estimate gas and catch errors early
            // try {
            //     const estimatedGas = await client.simulate(
            //         address,
            //         [
            //             {
            //                 typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
            //                 value: {
            //                     sender: address,
            //                     contract: CONTRACT_ADDRESS,
            //                     msg: Buffer.from(JSON.stringify(postJobMsg)),
            //                     funds: [],
            //                 },
            //             },
            //         ],
            //         undefined // Memo (optional)
            //     );
            //     console.log("Simulation successful, estimated gas:", estimatedGas);
            // } catch (simulationError) {
            //     console.error("Simulation failed:", simulationError);
            //     throw new Error("Transaction simulation failed. Please check the console for details.");
            // }

            // Execute the transaction
            const result = await client.execute(
                address,
                CONTRACT_ADDRESS,
                postJobMsg,
                "auto"
            );

            console.log("Job posted successfully:", result);
            alert("Job posted successfully!");
            setPostProjectModalActive(false); // Close the modal
        } catch (err: any) {
            console.error("Error posting job:", err);
            if (err.message.includes("Overflow")) {
                alert("Failed to post job: There may be an issue with the smart contract's logic. Please contact the contract developer with the transaction details.");
            } else if (err.message.includes("insufficient funds")) {
                alert("Failed to post job: Insufficient funds in your wallet.");
            } else if (err.message.includes("Insufficient allowance")) {
                alert("Failed to post job: Insufficient allowance. Please try again to increase the allowance.");
            } else if (err.message.includes("Insufficient token balance")) {
                alert("Failed to post job: Insufficient tATOM balance in your wallet.");
            } else if (err.message.includes("Profile does not exists")) {
                alert("Failed to post job: You need to create a client profile before posting a job.");
            } else if (err.message.includes("Only clients can post jobs")) {
                alert("Failed to post job: Only client profiles can post jobs. Please update your profile type to 'Client'.");
            } else {
                alert("Failed to post job. Please check the console for details.");
            }
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