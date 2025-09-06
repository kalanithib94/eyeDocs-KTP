/**
 * File: referral-form.js
 * Purpose: Referral form functionality for Eye-Docs KTP Demo
 * Created: 2025-01-27 v1.0.0
 * Last Modified: 2025-01-27 v1.0.0
 * Author: AI Development Team
 * 
 * Dependencies: config.js, main.js, Bootstrap 5
 * API Endpoints: /referrals (POST), /opticians (GET)
 * 
 * Changelog:
 * v1.0.0 - Initial creation with form validation and submission
 */

// Referral form functionality
window.ReferralForm = {
    // Form state
    state: {
        form: null,
        isSubmitting: false,
        isDraft: false,
        validationEnabled: false
    },
    
    // Initialize form
    init: function() {
        EyeDocsApp.log('Initializing referral form...');
        
        this.state.form = document.getElementById('referral-form');
        if (!this.state.form) {
            EyeDocsApp.logError('Referral form not found');
            return;
        }
        
        this.setupEventListeners();
        this.setupValidation();
        this.loadOpticians();
        
        EyeDocsApp.log('Referral form initialized');
    },
    
    // Setup event listeners
    setupEventListeners: function() {
        // Form submission
        this.state.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitReferral();
        });
        
        // Character counter for clinical notes
        const notesField = document.getElementById('clinical-notes');
        const notesCounter = document.getElementById('notes-counter');
        
        if (notesField && notesCounter) {
            notesField.addEventListener('input', () => {
                notesCounter.textContent = notesField.value.length;
                
                // Visual feedback for character limit
                if (notesField.value.length > 1800) {
                    notesCounter.style.color = '#dc3545'; // Bootstrap danger color
                } else if (notesField.value.length > 1500) {
                    notesCounter.style.color = '#ffc107'; // Bootstrap warning color
                } else {
                    notesCounter.style.color = '#6c757d'; // Bootstrap muted color
                }
            });
        }
        
        // Real-time validation
        const formInputs = this.state.form.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (this.state.validationEnabled) {
                    this.validateField(input);
                }
            });
            
            input.addEventListener('input', () => {
                // Clear validation state on input
                input.classList.remove('is-valid', 'is-invalid');
            });
        });
        
        // Postcode formatting
        const postcodeField = document.getElementById('patient-postcode');
        if (postcodeField) {
            postcodeField.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
            });
        }
        
        // NHS number formatting
        const nhsField = document.getElementById('patient-nhs');
        if (nhsField) {
            nhsField.addEventListener('input', (e) => {
                // Remove non-digits
                e.target.value = e.target.value.replace(/\D/g, '');
                
                // Limit to 10 digits
                if (e.target.value.length > 10) {
                    e.target.value = e.target.value.substring(0, 10);
                }
            });
        }
        
        // Phone number formatting
        const phoneField = document.getElementById('patient-phone');
        if (phoneField) {
            phoneField.addEventListener('input', (e) => {
                // Basic phone number formatting (UK style)
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.startsWith('44')) {
                        value = '+' + value.substring(0, 13);
                    } else if (value.startsWith('0')) {
                        value = value.substring(0, 11);
                    }
                }
                e.target.value = value;
            });
        }
    },
    
    // Setup form validation
    setupValidation: function() {
        // Custom validation messages
        const requiredFields = this.state.form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('invalid', (e) => {
                e.preventDefault();
                this.showFieldError(field, this.getValidationMessage(field));
            });
        });
    },
    
    // Get validation message for field
    getValidationMessage: function(field) {
        if (field.validity.valueMissing) {
            switch (field.name) {
                case 'optician_id':
                    return 'Please select your practice.';
                case 'patient_name':
                    return 'Please enter the patient\'s name.';
                case 'condition':
                    return 'Please select the primary condition.';
                case 'clinical_notes':
                    return 'Please provide clinical notes.';
                case 'consent':
                    return 'You must confirm patient consent.';
                case 'gdpr':
                    return 'You must confirm GDPR compliance.';
                default:
                    return 'This field is required.';
            }
        }
        
        if (field.validity.patternMismatch) {
            switch (field.name) {
                case 'patient_nhs_number':
                    return 'NHS number must be 10 digits.';
                default:
                    return 'Please enter a valid value.';
            }
        }
        
        if (field.validity.tooLong) {
            return `Maximum ${field.maxLength} characters allowed.`;
        }
        
        return 'Please check this field.';
    },
    
    // Show field validation error
    showFieldError: function(field, message) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        
        const feedback = field.parentNode.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.textContent = message;
        }
    },
    
    // Show field validation success
    showFieldSuccess: function(field) {
        field.classList.add('is-valid');
        field.classList.remove('is-invalid');
    },
    
    // Validate individual field
    validateField: function(field) {
        if (field.checkValidity()) {
            this.showFieldSuccess(field);
            return true;
        } else {
            this.showFieldError(field, this.getValidationMessage(field));
            return false;
        }
    },
    
    // Validate entire form
    validateForm: function() {
        this.state.validationEnabled = true;
        let isValid = true;
        
        const formInputs = this.state.form.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        // Custom validations
        const clinicalNotes = document.getElementById('clinical-notes');
        if (clinicalNotes && clinicalNotes.value.trim().length < 10) {
            this.showFieldError(clinicalNotes, 'Clinical notes must be at least 10 characters.');
            isValid = false;
        }
        
        return isValid;
    },
    
    // Load opticians list
    loadOpticians: async function() {
        try {
            const response = await EyeDocsApp.apiRequest(EyeDocsConfig.ENDPOINTS.OPTICIANS);
            
            if (response.status === 'success' && response.data) {
                this.populateOpticiansDropdown(response.data);
            } else {
                EyeDocsApp.logWarning('Failed to load opticians, using default options');
            }
        } catch (error) {
            EyeDocsApp.logWarning('Error loading opticians:', error.message);
            // Form already has default options, so this is not critical
        }
    },
    
    // Populate opticians dropdown
    populateOpticiansDropdown: function(opticians) {
        const select = document.getElementById('optician-select');
        if (!select) return;
        
        // Clear existing options except the first one
        const firstOption = select.querySelector('option[value=""]');
        select.innerHTML = '';
        select.appendChild(firstOption);
        
        // Add opticians from API
        opticians.forEach(optician => {
            const option = document.createElement('option');
            option.value = optician.id;
            option.textContent = `${optician.practice_name} - ${optician.contact_person}`;
            select.appendChild(option);
        });
    },
    
    // Collect form data
    collectFormData: function() {
        const formData = new FormData(this.state.form);
        const data = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Clean up empty values
        Object.keys(data).forEach(key => {
            if (data[key] === '' || data[key] === null) {
                delete data[key];
            }
        });
        
        // Convert checkboxes to boolean
        data.consent = data.consent === 'on';
        data.gdpr = data.gdpr === 'on';
        
        // Set default urgency if not selected
        if (!data.urgency) {
            data.urgency = 'routine';
        }
        
        return data;
    },
    
    // Submit referral
    submitReferral: async function() {
        if (this.state.isSubmitting) return;
        
        EyeDocsApp.log('Submitting referral...');
        
        // Validate form
        if (!this.validateForm()) {
            EyeDocsApp.showAlert('Please correct the errors in the form before submitting.', 'danger');
            
            // Scroll to first error
            const firstError = this.state.form.querySelector('.is-invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }
        
        // Show loading state
        this.setSubmittingState(true);
        
        try {
            // Collect form data
            const referralData = this.collectFormData();
            
            EyeDocsApp.log('Submitting referral data:', referralData);
            
            // Submit to API
            const response = await EyeDocsApp.apiRequest(EyeDocsConfig.ENDPOINTS.REFERRALS, {
                method: 'POST',
                data: referralData
            });
            
            if (response.status === 'success') {
                EyeDocsApp.log('Referral submitted successfully:', response.data);
                this.showSuccessModal(response.data);
            } else {
                throw new Error(response.message || 'Submission failed');
            }
            
        } catch (error) {
            EyeDocsApp.logError('Error submitting referral:', error);
            EyeDocsApp.showAlert(
                'Failed to submit referral: ' + error.message, 
                'danger'
            );
        } finally {
            this.setSubmittingState(false);
        }
    },
    
    // Set submitting state
    setSubmittingState: function(isSubmitting) {
        this.state.isSubmitting = isSubmitting;
        
        const submitBtn = document.getElementById('submit-btn');
        const submitText = document.getElementById('submit-text');
        const submitLoading = document.getElementById('submit-loading');
        
        if (submitBtn && submitText && submitLoading) {
            submitBtn.disabled = isSubmitting;
            submitText.style.display = isSubmitting ? 'none' : 'inline';
            submitLoading.style.display = isSubmitting ? 'inline' : 'none';
        }
    },
    
    // Show success modal
    showSuccessModal: function(referralData) {
        const modal = new bootstrap.Modal(document.getElementById('successModal'));
        const referralNumberSpan = document.getElementById('referral-number');
        
        if (referralNumberSpan) {
            referralNumberSpan.textContent = referralData.referral_number || 'REF-' + Date.now();
        }
        
        modal.show();
        
        // Reset form after showing success
        setTimeout(() => {
            this.resetForm();
        }, 1000);
    },
    
    // Save as draft
    saveAsDraft: function() {
        EyeDocsApp.showAlert('Draft functionality coming soon...', 'info');
        
        // For now, just save to local storage
        try {
            const formData = this.collectFormData();
            localStorage.setItem('referral_draft', JSON.stringify({
                data: formData,
                timestamp: new Date().toISOString()
            }));
            
            EyeDocsApp.showAlert('Draft saved locally', 'success');
        } catch (error) {
            EyeDocsApp.logError('Error saving draft:', error);
            EyeDocsApp.showAlert('Failed to save draft', 'danger');
        }
    },
    
    // Load draft
    loadDraft: function() {
        try {
            const draft = localStorage.getItem('referral_draft');
            if (draft) {
                const draftData = JSON.parse(draft);
                
                // Confirm with user
                if (confirm('Would you like to load your saved draft?')) {
                    this.populateForm(draftData.data);
                    EyeDocsApp.showAlert('Draft loaded successfully', 'success');
                    
                    // Clear the draft
                    localStorage.removeItem('referral_draft');
                }
            }
        } catch (error) {
            EyeDocsApp.logError('Error loading draft:', error);
        }
    },
    
    // Populate form with data
    populateForm: function(data) {
        Object.keys(data).forEach(key => {
            const field = this.state.form.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'checkbox') {
                    field.checked = data[key];
                } else {
                    field.value = data[key];
                }
            }
        });
        
        // Update character counter
        const notesField = document.getElementById('clinical-notes');
        const notesCounter = document.getElementById('notes-counter');
        if (notesField && notesCounter) {
            notesCounter.textContent = notesField.value.length;
        }
    },
    
    // Reset form
    resetForm: function() {
        this.state.form.reset();
        this.state.validationEnabled = false;
        
        // Clear validation classes
        const formFields = this.state.form.querySelectorAll('.is-valid, .is-invalid');
        formFields.forEach(field => {
            field.classList.remove('is-valid', 'is-invalid');
        });
        
        // Reset character counter
        const notesCounter = document.getElementById('notes-counter');
        if (notesCounter) {
            notesCounter.textContent = '0';
            notesCounter.style.color = '#6c757d';
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        EyeDocsApp.showAlert('Form has been reset', 'info', 2000);
    }
};

// Global functions for form
window.resetForm = function() {
    if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
        ReferralForm.resetForm();
    }
};

window.saveAsDraft = function() {
    ReferralForm.saveAsDraft();
};

// Initialize form when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for main app to initialize
    setTimeout(() => {
        ReferralForm.init();
        
        // Check for draft on page load
        setTimeout(() => {
            ReferralForm.loadDraft();
        }, 1000);
    }, 100);
});

// Handle page unload (warn about unsaved changes)
window.addEventListener('beforeunload', function(e) {
    const form = document.getElementById('referral-form');
    if (form) {
        const formData = new FormData(form);
        let hasData = false;
        
        for (let [key, value] of formData.entries()) {
            if (value && value.trim() !== '') {
                hasData = true;
                break;
            }
        }
        
        if (hasData && !ReferralForm.state.isSubmitting) {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            return e.returnValue;
        }
    }
});