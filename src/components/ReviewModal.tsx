import React, { useState } from 'react';
import { X, Star, CheckCircle2 } from 'lucide-react';
import { ReviewItem } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: ReviewItem) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newRev: ReviewItem = {
      id: 'rev-' + Date.now(),
      author,
      location: location || 'United States',
      rating,
      date: 'Just now',
      title: title || 'Exceptional Smart Staircase Lighting Controller',
      comment,
      verified: true,
      helpfulCount: 1,
    };

    onSubmitReview(newRev);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div id="review-modal-backdrop" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Review Published!</h3>
            <p className="text-xs text-slate-500">
              Thank you for sharing your experience with the Relights community.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">
              Write a Verified Customer Review
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Share your thoughts on the Relights Smart Motion Sensor Controller
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Rating Selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Your Overall Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="City, State / Country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <input
                type="text"
                placeholder="Review Headline (e.g. Magnificent transformation!)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-500"
              />

              <textarea
                required
                rows={4}
                placeholder="Write your detailed review about installation, brightness, sensor response, or appearance..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-blue-500 resize-none"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-blue-500/20 text-xs transition-all cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
