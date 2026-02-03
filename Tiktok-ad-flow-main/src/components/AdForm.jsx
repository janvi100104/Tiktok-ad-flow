import React, { useState, useEffect } from 'react';
import { tiktokService } from '../services/tiktokService';
import AdPreview from './AdPreview';
import { useNavigate } from 'react-router-dom';

const AdForm = () => {
  const navigate = useNavigate();

  // 1. Form State
  const [formData, setFormData] = useState({
    campaignName: '',
    objective: 'Traffic',
    adText: '',
    cta: 'Learn More', // Added CTA as per requirements 
    musicMode: 'existing_id',
    musicId: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState(null); // For System-level errors [cite: 81]

  // 2. Logic: "No Music" is forbidden for Conversions [cite: 68]
  useEffect(() => {
    if (formData.objective === 'Conversions' && formData.musicMode === 'no_music') {
      setFormData(prev => ({ ...prev, musicMode: 'existing_id' }));
    }
  }, [formData.objective]);

  // 3. Validation Logic
  const validate = () => {
    const newErrors = {};
    // Campaign Name: Min 3 chars [cite: 42]
    if (formData.campaignName.length < 3) {
      newErrors.campaignName = "Campaign name must be at least 3 characters.";
    }
    // Ad Text: Required, max 100 chars [cite: 46]
    if (!formData.adText) {
      newErrors.adText = "Ad text is required.";
    } else if (formData.adText.length > 100) {
      newErrors.adText = "Ad text cannot exceed 100 characters.";
    }

    // Music Logic: Only validate ID if we are in that mode [cite: 53]
    if (formData.musicMode === 'existing_id' && !formData.musicId) {
      newErrors.musicId = "Music ID is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 4. REAL API SUBMISSION HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError(null); // Reset previous errors
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const result = await tiktokService.createAd(formData);
      alert("Success! Ad Campaign '" + result.campaign_name + "' created. Status: " + result.status);
      // Maybe redirect or reset form?
      setFormData({ ...formData, campaignName: '', adText: '' });
    } catch (err) {
      console.error("Submission Error", err);
      setGlobalError(err.message || "Failed to create ad campaign.");

      // Handle specific field errors if returned structured
      // (Assuming simple error message for now based on backend)

      if (err.message.includes("401") || err.message.includes("Session")) {
        // Redirect to login if session expired
        // navigate('/');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px' }}>

      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Create TikTok Ad</h2>

      {/* Global Error Banner */}
      {globalError && (
        <div style={{ padding: '15px', background: '#ffe6e6', color: '#d00', marginBottom: '20px', borderRadius: '4px', textAlign: 'center' }}>
          <strong>Submission Failed:</strong> {globalError}
        </div>
      )}

      {/* GRID LAYOUT: Left = Form, Right = Preview */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>

        {/* LEFT COLUMN: THE FORM */}
        <div style={{ flex: '1', minWidth: '350px', background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <form onSubmit={handleSubmit}>

            {/* ... KEEP ALL YOUR EXISTING INPUTS HERE ... */}
            {/* (Campaign Name, Objective, Ad Text, CTA, Music Section, Submit Button) */}
            {/* Paste your existing form fields here exactly as they were */}

            {/* --- Example: Campaign Name --- */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Campaign Name</label>
              <input
                value={formData.campaignName}
                onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
                placeholder="Tip: Type 'GEO' or 'EXPIRED' to test errors"
                style={{ width: '100%', padding: '10px', border: errors.campaignName ? '1px solid red' : '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
              />
              {errors.campaignName && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.campaignName}</span>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Objective</label>
              <select
                value={formData.objective}
                onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              >
                <option value="Traffic">Traffic (Allows 'No Music')</option>
                <option value="Conversions">Conversions (Requires Music)</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Ad Text</label>
              <textarea
                value={formData.adText}
                onChange={(e) => setFormData({ ...formData, adText: e.target.value })}
                maxLength={100}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: errors.adText ? '1px solid red' : '1px solid #ccc', minHeight: '80px', boxSizing: 'border-box', fontFamily: 'inherit' }}
              />
              <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#666' }}>{formData.adText.length}/100</div>
              {errors.adText && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.adText}</span>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Call to Action (CTA)</label>
              <select
                value={formData.cta}
                onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              >
                <option value="Learn More">Learn More</option>
                <option value="Shop Now">Shop Now</option>
                <option value="Sign Up">Sign Up</option>
                <option value="Contact Us">Contact Us</option>
              </select>
            </div>

            {/* Music Section (Keep your existing one) */}
            <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Music Selection</label>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
                <label style={{ cursor: 'pointer' }}><input type="radio" checked={formData.musicMode === 'existing_id'} onChange={() => setFormData({ ...formData, musicMode: 'existing_id' })} /> Existing ID</label>
                <label style={{ cursor: 'pointer' }}><input type="radio" checked={formData.musicMode === 'upload'} onChange={() => setFormData({ ...formData, musicMode: 'upload' })} /> Upload</label>
                <label style={{ cursor: formData.objective === 'Conversions' ? 'not-allowed' : 'pointer', opacity: formData.objective === 'Conversions' ? 0.5 : 1 }}>
                  <input type="radio" checked={formData.musicMode === 'no_music'} onChange={() => setFormData({ ...formData, musicMode: 'no_music' })} disabled={formData.objective === 'Conversions'} /> No Music</label>
              </div>

              {formData.musicMode === 'existing_id' && (
                <div>
                  <input placeholder="Enter Music ID (Type 'BAD_ID' to test error)" value={formData.musicId} onChange={(e) => setFormData({ ...formData, musicId: e.target.value })} style={{ width: '100%', padding: '10px', border: errors.musicId ? '1px solid red' : '1px solid #ccc', boxSizing: 'border-box' }} />
                  {errors.musicId && <span style={{ color: 'red', display: 'block', marginTop: '5px' }}>{errors.musicId}</span>}
                </div>
              )}

              {formData.musicMode === 'upload' && (
                <div style={{ padding: '20px', border: '2px dashed #ccc', textAlign: 'center', background: 'white' }}>
                  {!formData.musicId || formData.musicId.startsWith("BAD") ? (
                    <>
                      <p style={{ marginBottom: '10px', color: '#666' }}>Select a music file (Simulated)</p>
                      <button type="button" id="uploadBtn" onClick={() => { const btn = document.getElementById('uploadBtn'); btn.innerText = "Uploading 65%..."; btn.disabled = true; setTimeout(() => { setFormData(prev => ({ ...prev, musicId: 'UPLOADED_TRACK_99' })); }, 1000); }} style={{ padding: '8px 16px', cursor: 'pointer', background: '#f0f0f0', border: '1px solid #999', borderRadius: '4px' }}>Choose File to Upload</button>
                    </>
                  ) : (
                    <div style={{ color: 'green', fontWeight: 'bold' }}><span>✓ Music File Uploaded</span><br /><small style={{ color: '#666', fontWeight: 'normal' }}>ID: {formData.musicId}</small><br /><button type="button" onClick={() => setFormData(prev => ({ ...prev, musicId: '' }))} style={{ marginTop: '10px', fontSize: '0.8rem', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color: '#d00' }}>Remove</button></div>
                  )}
                </div>
              )}
            </div>

            <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '15px', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1.1rem', cursor: 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>{isSubmitting ? "Submitting Campaign..." : "Submit Ad"}</button>

          </form>
        </div>

        {/* RIGHT COLUMN: THE PREVIEW */}
        <div style={{ flex: '0 0 300px' }}>
          <h3 style={{ textAlign: 'center', marginTop: 0 }}>Ad Preview</h3>
          {/* PASS THE FORM DATA TO THE PREVIEW */}
          <AdPreview formData={formData} />
        </div>

      </div>
    </div>
  );
};

export default AdForm;