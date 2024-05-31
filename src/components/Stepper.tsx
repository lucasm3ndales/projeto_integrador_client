import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'

interface StepperProps {
    stepsArr: string[]
    current: number
}

export const Stepper: React.FC<StepperProps> = ({ stepsArr, current }) => {
    const [steps, setSteps] = useState<string[]>([])
    const [currentStep, setCurrentStep] = useState<number>(1)
    const [complete, setComplete] = useState<boolean>(false)

    useEffect(() => {
        if (stepsArr && stepsArr.length > 0) {
            setSteps(stepsArr)
        }
    }, [stepsArr])

    useEffect(() => {
        if (current >= 0 && current < stepsArr.length) {
            setCurrentStep(current + 1)
        }

        if (current === stepsArr.length - 1) {
            setComplete(true)
        } else {
            setComplete(false)
        }
    }, [current, stepsArr.length])

    return (
        <div className='flex justify-between'>
            {steps?.map((step, i) => (
                <div
                    key={i}
                    className={`step-item ${currentStep === i + 1 ? 'active' : ''} ${i + 1 < currentStep || complete ? 'complete' : ''}`}
                >
                    <div className='step'>
                        {i + 1 < currentStep || complete ? (
                            <Check className='h-6 w-6' />
                        ) : (
                            i + 1
                        )}
                    </div>
                    <p className='text-xs font-medium opacity-50'>{step}</p>
                </div>
            ))}
        </div>
    )
}
