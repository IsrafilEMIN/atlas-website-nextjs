// components/home/OurProcess.tsx
const steps = [
    {
      id: '01',
      name: 'Free Consultation & Quote',
      description: 'We start with a detailed discussion about your project and provide a transparent, no-obligation quote.',
    },
    {
      id: '02',
      name: 'Prep & Protect',
      description: 'We meticulously prepare all surfaces and protect your furniture and floors before a single drop of paint is used.',
    },
    {
      id: '03',
      name: 'Expert Painting',
      description: 'Our skilled painters apply premium paint using professional techniques for a smooth, uniform, and durable finish.',
    },
    {
      id: '04',
      name: 'Cleanup & Final Walk-through',
      description: 'We conduct a thorough cleanup and a final walk-through with you to ensure you are 100% satisfied with the results.',
    },
  ]
  
  export default function OurProcess() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Simple, Stress-Free Process</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              From the initial call to the final reveal, we make getting your space painted an easy and enjoyable experience.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
              {steps.map((step) => (
                <div key={step.id} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <span className="absolute left-1 top-1 text-blue-600 font-bold">{step.id}</span>
                    {step.name}
                  </dt>
                  <dd className="inline pl-2">{step.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    )
  }