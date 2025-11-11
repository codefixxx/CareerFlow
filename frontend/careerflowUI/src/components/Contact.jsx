
import { useState } from 'react';
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to a backend.
    // For this demo, we'll just show a success message.
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800 dark:bg-opacity-40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Have questions or want to partner with us? We'd love to hear from
            you.
          </p>
        </div>
        {submitted ? (
          <div className="mt-12 p-6 bg-white shadow-sm border border-gray-200 dark:bg-gray-800 rounded-lg dark:shadow-lg text-center dark:border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Thank You!
            </h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Your message has been sent. We'll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full px-4 py-3 rounded-md bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full px-4 py-3 rounded-md bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="4"
                required
                className="mt-1 block w-full px-4 py-3 rounded-md bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="How can we help?"
              ></textarea>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="inline-flex justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 focus:ring-blue-500"
              >
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
export default Contact;