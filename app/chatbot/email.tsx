import React, { useState, useEffect } from 'react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      setIsSending(true);
      setError('');
      await onSubmit(email);
      setEmail('');
      setShowSuccess(true);
    } catch {
      setError('Failed to send email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, onClose]);

  if (!isOpen && !showSuccess) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative text-center">
        <button
          onClick={() => {
            setShowSuccess(false);
            onClose();
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <i className="fas fa-times"></i>
        </button>

        {!showSuccess ? (
          <>
            <h3 className="text-lg font-medium mb-4 text-left">Send to Email</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-left">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="you@example.com"
                />
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSending}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSending ? 'Sending...' : 'Send Email'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-4">
          <h3 className="text-2xl font-semibold text-green-600 mb-2 animate-fade-in">
            Email Sent!
          </h3>
          <p className="text-sm text-gray-600 text-center max-w-xs">
            Your email was successfully sent. Please check your inbox or spam folder for the message.
          </p>
        </div>

        )}
      </div>
    </div>
  );
};

export default EmailModal;
