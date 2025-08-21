// src/components/ReportIssueForm.jsx
import { useState } from 'react';
import { submitIssueReport } from '../api';
import { IoIosSend, IoMdClose } from "react-icons/io";
import { MdBugReport, MdCode, MdDesignServices, MdSpeed, MdLightbulb, MdMoreHoriz } from "react-icons/md";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const ReportIssueForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        error_type: 'bugs',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const errorTypeOptions = [
        { value: 'bugs', label: 'Bugs', icon: MdBugReport },
        { value: 'ai', label: 'AI Issues', icon: MdCode },
        { value: 'ui', label: 'UI/UX Problems', icon: MdDesignServices },
        { value: 'performance', label: 'Performance Issues', icon: MdSpeed },
        { value: 'feature', label: 'Feature Request', icon: MdLightbulb },
        { value: 'other', label: 'Other', icon: MdMoreHoriz }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategorySelect = (category) => {
        setFormData(prev => ({
            ...prev,
            error_type: category
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await submitIssueReport(formData);
            setSubmitStatus({
                type: 'success',
                message: response.message || 'Report submitted successfully!'
            });
            
            // Clear form after successful submission
            setFormData({
                name: '',
                email: '',
                error_type: 'bugs',
                message: ''
            });
            
            // Auto close after 3 seconds
            setTimeout(() => {
                onClose();
                setSubmitStatus(null);
            }, 3000);
            
        } catch (error) {
            console.error('Report submission error:', error);
            setSubmitStatus({
                type: 'error',
                message: error.message || 'Failed to submit report. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            name: '',
            email: '',
            error_type: 'bugs',
            message: ''
        });
        setSubmitStatus(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="report-issue-modal-overlay">
            <div className="report-issue-modal-container">
                <div className="report-issue-modal">
                    {/* Header */}
                    <div className="modal-header">
                        <div className="header-content">
                            <div className="header-icon">
                                <MdBugReport size={20} />
                            </div>
                            <div className="header-text">
                                <h2>Report an Issue</h2>
                                <p>Help us improve by reporting bugs or issues</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="close-button"
                        >
                            <IoMdClose size={18} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="modal-content">
                        {/* Status Message */}
                        {submitStatus && (
                            <div className={`status-message ${submitStatus.type}`}>
                                {submitStatus.type === 'success' ? (
                                    <FaCheckCircle size={16} />
                                ) : (
                                    <FaExclamationCircle size={16} />
                                )}
                                <p>{submitStatus.message}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="issue-form">
                            {/* Name Field */}
                            <div className="form-field">
                                <label>Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    placeholder="Enter your full name"
                                    className="form-input"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="form-field">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    placeholder="Enter your email address"
                                    className="form-input"
                                />
                            </div>

                            {/* Issue Type */}
                            <div className="form-field">
                                <label>Type of Issue *</label>
                                <div className="category-grid">
                                    {errorTypeOptions.map(option => {
                                        const IconComponent = option.icon;
                                        const isSelected = formData.error_type === option.value;
                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => handleCategorySelect(option.value)}
                                                disabled={isSubmitting}
                                                className={`category-button ${isSelected ? 'selected' : ''}`}
                                            >
                                                <IconComponent size={16} />
                                                <span>{option.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Message Field */}
                            <div className="form-field">
                                <label>Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isSubmitting}
                                    placeholder="Please describe the issue in detail..."
                                    rows={4}
                                    className="form-textarea"
                                />
                            </div>

                            {/* Actions */}
                            <div className="form-actions">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    disabled={isSubmitting}
                                    className="cancel-button"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                                    className="submit-button"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="spinner"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <IoIosSend size={16} />
                                            Submit Report
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .report-issue-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 1rem;
                    animation: backdropFadeIn 0.3s ease-out;
                }
                
                .report-issue-modal-container {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1001;
                    width: 100%;
                    max-width: 480px;
                    animation: modalSlideIn 0.3s ease-out;
                }
                
                .report-issue-modal {
                    background: linear-gradient(145deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
                    border-radius: 1.5rem;
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                /* Header */
                .modal-header {
                    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                    padding: 1.5rem;
                    border-bottom: 1px solid rgba(71, 85, 105, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                }
                
                .header-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                
                .header-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2.5rem;
                    height: 2.5rem;
                    background: rgba(239, 68, 68, 0.15);
                    border-radius: 0.75rem;
                    color: #fca5a5;
                    border: 1px solid rgba(239, 68, 68, 0.2);
                }
                
                .header-text h2 {
                    margin: 0;
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #f8fafc;
                    line-height: 1.2;
                }
                
                .header-text p {
                    margin: 0.25rem 0 0 0;
                    font-size: 0.875rem;
                    color: #94a3b8;
                }
                
                .close-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2.5rem;
                    height: 2.5rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    color: #cbd5e1;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .close-button:hover:not(:disabled) {
                    background: rgba(255, 255, 255, 0.1);
                    color: #f8fafc;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
                }
                
                .close-button:disabled {
                    cursor: not-allowed;
                    opacity: 0.5;
                }
                
                /* Content */
                .modal-content {
                    padding: 1.5rem;
                    max-height: 70vh;
                    overflow-y: auto;
                }
                
                /* Status Message */
                .status-message {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    padding: 1rem;
                    border-radius: 0.75rem;
                    margin-bottom: 1.5rem;
                    font-size: 0.875rem;
                    line-height: 1.5;
                }
                
                .status-message.success {
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid rgba(34, 197, 94, 0.3);
                    color: #86efac;
                }
                
                .status-message.error {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    color: #fca5a5;
                }
                
                .status-message p {
                    margin: 0;
                    flex: 1;
                }
                
                /* Form */
                .issue-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }
                
                .form-field {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .form-field label {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #cbd5e1;
                    margin: 0;
                }
                
                .form-input, .form-textarea {
                    width: 100%;
                    padding: 0.875rem 1rem;
                    background: rgba(30, 41, 59, 0.6);
                    border: 1px solid rgba(71, 85, 105, 0.4);
                    border-radius: 0.75rem;
                    color: #f8fafc;
                    font-size: 0.875rem;
                    box-sizing: border-box;
                    transition: all 0.2s ease;
                    outline: none;
                    font-family: inherit;
                }
                
                .form-input:focus, .form-textarea:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }
                
                .form-textarea {
                    resize: vertical;
                    min-height: 100px;
                    line-height: 1.5;
                }
                
                /* Category Grid */
                .category-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 0.5rem;
                }
                
                .category-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem;
                    background: rgba(30, 41, 59, 0.6);
                    border: 1px solid rgba(71, 85, 105, 0.4);
                    border-radius: 0.75rem;
                    color: #cbd5e1;
                    font-size: 0.75rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-align: left;
                }
                
                .category-button:hover:not(:disabled) {
                    background: rgba(30, 41, 59, 0.8);
                    border-color: rgba(71, 85, 105, 0.6);
                }
                
                .category-button.selected {
                    background: rgba(59, 130, 246, 0.2);
                    border-color: #3b82f6;
                    color: #f8fafc;
                    box-shadow: 0 0 0 1px #3b82f6;
                }
                
                .category-button:disabled {
                    cursor: not-allowed;
                    opacity: 0.5;
                }
                
                /* Form Actions */
                .form-actions {
                    display: flex;
                    gap: 0.75rem;
                    justify-content: flex-end;
                    margin-top: 0.5rem;
                }
                
                .cancel-button, .submit-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.875rem 1.5rem;
                    border-radius: 0.75rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    min-height: 44px;
                }
                
                .cancel-button {
                    background: transparent;
                    color: #cbd5e1;
                    border: 1px solid rgba(71, 85, 105, 0.4);
                }
                
                .cancel-button:hover:not(:disabled) {
                    background: rgba(255, 255, 255, 0.05);
                    color: #f8fafc;
                }
                
                .submit-button {
                    border: none;
                    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
                    color: white;
                }
                
                .submit-button:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
                }
                
                .cancel-button:disabled, .submit-button:disabled {
                    cursor: not-allowed;
                    opacity: 0.5;
                }
                
                .submit-button:disabled {
                    background: #374151;
                    color: #6b7280;
                }
                
                /* Spinner */
                .spinner {
                    width: 1rem;
                    height: 1rem;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                
                /* Animations */
                @keyframes backdropFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes modalSlideIn {
                    from { 
                        opacity: 0; 
                        transform: translate(-50%, -60%); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translate(-50%, -50%); 
                    }
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                
                /* Responsive Design */
                @media (max-width: 640px) {
                    .report-issue-modal-container {
                        max-width: calc(100vw - 2rem);
                    }
                    
                    .category-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .form-actions {
                        flex-direction: column;
                    }
                    
                    .form-actions button {
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    );
};

export default ReportIssueForm;