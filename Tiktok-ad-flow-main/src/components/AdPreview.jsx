import React from 'react';

const AdPreview = ({ formData }) => {
  return (
    <div style={styles.phoneContainer}>
      {/* 1. Phone "Screen" */}
      <div style={styles.screen}>
        
        {/* BACKGROUND IMAGE (Simulating the Video Ad) */}
        <img 
          src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" 
          alt="Ad Creative"
          style={styles.backgroundImage}
        />

        {/* 2. TikTok Overlay UI */}
        <div style={styles.overlay}>
          
          {/* Right Side Icons (Static) */}
          <div style={styles.sidebar}>
            <div style={styles.iconCircle}>
               <div style={{width: '100%', height: '100%', borderRadius: '50%', background: '#eee', overflow: 'hidden'}}>
                 <img src="https://ui-avatars.com/api/?name=My+Brand&background=random" alt="profile" style={{width: '100%'}} />
               </div>
               <div style={styles.plusIcon}>+</div>
            </div>
            <div style={styles.icon}><span style={{fontSize: '28px', textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>❤</span> <span style={styles.iconText}>12.5K</span></div>
            <div style={styles.icon}><span style={{fontSize: '28px', textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>💬</span> <span style={styles.iconText}>408</span></div>
            <div style={styles.icon}><span style={{fontSize: '28px', textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>↪</span> <span style={styles.iconText}>Share</span></div>
          </div>

          {/* Bottom Info Area */}
          <div style={styles.bottomArea}>
            <div style={{fontWeight: 'bold', marginBottom: '8px', fontSize: '16px'}}>@MyBrand</div>
            
            {/* The Ad Text (Live Update) */}
            <div style={styles.caption}>
              {formData.adText || "Your awesome ad caption goes here... #tiktok #ads"}
            </div>
            
            {/* Music Ticker */}
            <div style={styles.musicRow}>
               <span style={{animation: 'spin 2s linear infinite'}}>🎵 </span>
               <div style={{marginLeft: '10px', overflow: 'hidden', whiteSpace: 'nowrap', width: '150px'}}>
                 {formData.musicMode === 'no_music' 
                    ? "Original Sound - No Music" 
                    : `Music Track: ${formData.musicId || 'Waiting for selection...'}`}
               </div>
            </div>
          </div>

        </div>

        {/* 3. The CTA Button (Dynamic) */}
        <div style={styles.ctaBanner}>
           <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
             <span style={{fontSize: '12px', opacity: 0.8}}>Sponsored</span>
             <div style={styles.ctaButton}>
                {formData.cta || "Learn More"}
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// Styles
const styles = {
  phoneContainer: {
    width: '320px',
    height: '580px',
    backgroundColor: 'black',
    borderRadius: '30px',
    border: '8px solid #333',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: 'white',
    margin: '0 auto',
  },
  screen: {
    height: '100%',
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#000'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
    opacity: 0.8 // Slightly dark so text pops
  },
  overlay: {
    padding: '15px',
    paddingBottom: '60px', // Space for CTA
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%'
  },
  sidebar: {
    position: 'absolute',
    right: '10px',
    bottom: '120px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '25px'
  },
  icon: { textAlign: 'center', cursor: 'pointer' },
  iconText: { display: 'block', fontSize: '11px', fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.8)' },
  iconCircle: { width: '48px', height: '48px', borderRadius: '50%', border: '1px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', position: 'relative' },
  plusIcon: { position: 'absolute', bottom: '-8px', background: '#FE2C55', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' },
  bottomArea: {
    width: '75%',
    textShadow: '0 1px 2px rgba(0,0,0,1)',
    marginBottom: '10px'
  },
  caption: {
    fontSize: '14px',
    lineHeight: '1.4',
    marginBottom: '10px',
    maxHeight: '80px',
    overflow: 'hidden'
  },
  musicRow: {
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  ctaBanner: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background: '#111',
    padding: '12px 15px',
    boxSizing: 'border-box',
    borderTop: '1px solid #333',
    zIndex: 2
  },
  ctaButton: {
    background: '#FE2C55',
    color: 'white',
    padding: '6px 12px',
    textAlign: 'center',
    borderRadius: '2px',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
    minWidth: '80px'
  }
};

export default AdPreview;