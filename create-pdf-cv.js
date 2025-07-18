// Script to create PDF version of CV
const fs = require('fs');
const path = require('path');

console.log('📄 Creating PDF version of your CV...');

// Since we don't have puppeteer installed, let's create a simple solution
// We'll update the server to serve the HTML version and convert it

const htmlContent = fs.readFileSync(path.join(__dirname, 'assets', 'Amit_Das_CV.html'), 'utf8');

// Create a print-optimized version
const printOptimizedHTML = htmlContent.replace(
    '<style>',
    `<style>
        @page {
            margin: 0.5in;
            size: A4;
        }
        `
);

fs.writeFileSync(path.join(__dirname, 'assets', 'Amit_Das_CV_Print.html'), printOptimizedHTML);

console.log('✅ CV HTML files created successfully!');
console.log('📋 To create PDF:');
console.log('   1. Open: http://localhost:3000/assets/Amit_Das_CV_Print.html');
console.log('   2. Press Ctrl+P (Print)');
console.log('   3. Select "Save as PDF"');
console.log('   4. Save as "Amit_Das_CV.pdf" in the assets folder');
console.log('');
console.log('🔄 Alternatively, the download button will serve the HTML version for now.');

// Update the server to handle CV download better
const serverPath = path.join(__dirname, 'server.js');
let serverContent = fs.readFileSync(serverPath, 'utf8');

// Check if we need to update the CV download endpoint
if (!serverContent.includes('Amit_Das_CV.html')) {
    console.log('🔧 Updating server to handle CV download...');
    
    const newCVEndpoint = `
// CV download endpoint
app.get('/api/download-cv', (req, res) => {
    try {
        // Try PDF first, fallback to HTML
        const pdfPath = path.join(__dirname, 'assets', 'Amit_Das_CV.pdf');
        const htmlPath = path.join(__dirname, 'assets', 'Amit_Das_CV.html');
        
        const fs = require('fs');
        
        if (fs.existsSync(pdfPath)) {
            // Serve PDF if available
            res.download(pdfPath, 'Amit_Das_CV.pdf', (err) => {
                if (err) {
                    console.error('PDF download error:', err);
                    res.status(500).json({ 
                        success: false, 
                        message: 'Error downloading CV' 
                    });
                }
            });
        } else if (fs.existsSync(htmlPath)) {
            // Serve HTML version as fallback
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Content-Disposition', 'attachment; filename="Amit_Das_CV.html"');
            res.sendFile(htmlPath);
        } else {
            return res.status(404).json({ 
                success: false, 
                message: 'CV file not found' 
            });
        }
        
    } catch (error) {
        console.error('CV download error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Please try again later.' 
        });
    }
});`;

    // Replace the existing CV endpoint
    const updatedServerContent = serverContent.replace(
        /\/\/ CV download endpoint[\s\S]*?}\);/,
        newCVEndpoint
    );
    
    fs.writeFileSync(serverPath, updatedServerContent);
    console.log('✅ Server updated successfully!');
}

console.log('🎉 CV setup complete! Your download button will now work.');