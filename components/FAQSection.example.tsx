/**
 * Example usage of FAQSection component
 * 
 * This file demonstrates how to use the FAQSection component
 * with default FAQ items and custom configurations.
 */

import FAQSection from './FAQSection'

export default function FAQSectionExample() {
  // Example 1: Default FAQ items
  return <FAQSection />

  // Example 2: Custom title and subtitle
  /*
  return (
    <FAQSection
      title="Common Questions"
      subtitle="Find answers to the most frequently asked questions about CraftlyAI."
    />
  )
  */

  // Example 3: Custom FAQ items
  /*
  return (
    <FAQSection
      items={[
        {
          id: '1',
          question: 'How do I get started?',
          answer:
            'Getting started is easy! Sign up for a free account, choose your plan, and start creating proposals and invoices within minutes. No credit card required for the free trial.',
        },
        {
          id: '2',
          question: 'Can I cancel anytime?',
          answer:
            'Yes, you can cancel your subscription at any time from your account settings. Your data will remain accessible for 30 days after cancellation, giving you time to export everything you need.',
        },
        // Add more custom FAQ items...
      ]}
    />
  )
  */

  // Example 4: Allow multiple items open at once
  /*
  return (
    <FAQSection
      allowMultipleOpen={true}
      title="FAQ - Multiple Open"
      subtitle="You can expand multiple questions at once."
    />
  )
  */

  // Example 5: Custom styling with className
  /*
  return (
    <FAQSection
      className="my-custom-class"
      items={[
        {
          id: '1',
          question: 'Custom FAQ Question 1',
          answer: 'This is a custom answer for question 1.',
        },
        {
          id: '2',
          question: 'Custom FAQ Question 2',
          answer: 'This is a custom answer for question 2.',
        },
      ]}
    />
  )
  */
}
