import { useEffect, useState } from 'react'

interface StepperContentProps {
    content: React.ReactNode[]
    current: number
}

export const StepperContent: React.FC<StepperContentProps> = ({
    content,
    current,
}) => {
    const [currentStep, setCurrentStep] = useState(1)

    useEffect(() => {
        if (current >= 0 && current < content.length) {
            setCurrentStep(current + 1)
        }
    }, [current, content.length])

    return (
        <>
            {content.map((step, i) => (
                <div
                    key={i}
                    className={`${currentStep === i + 1 ? 'block' : 'hidden'} flex h-auto w-full px-1 py-2`}
                >
                    {step}
                </div>
            ))}
        </>
    )
}
