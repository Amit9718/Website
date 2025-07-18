const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Email transporter configuration with multiple fallback options
let transporter;

// Try different Gmail configurations
const emailConfigs = [
    // Configuration 1: Standard Gmail with App Password (recommended)
    {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    },
    // Configuration 2: Gmail with explicit SMTP settings
    {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    },
    // Configuration 3: Gmail with SSL
    {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    }
];

// Try each configuration
for (let i = 0; i < emailConfigs.length; i++) {
    try {
        transporter = nodemailer.createTransport(emailConfigs[i]);
        console.log(`Email transporter configured successfully (Config ${i + 1})`);
        break;
    } catch (error) {
        console.log(`Email configuration ${i + 1} failed:`, error.message);
        if (i === emailConfigs.length - 1) {
            console.log('All email configurations failed. Contact form will log to console.');
            transporter = null;
        }
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email format' 
            });
        }
        
        // Check if email is configured
        if (!transporter) {
            console.log('Email not configured, logging contact form data:');
            console.log(`Name: ${name}`);
            console.log(`Email: ${email}`);
            console.log(`Message: ${message}`);
            
            return res.json({ 
                success: true, 
                message: 'Message received! (Email service not configured - check server logs)' 
            });
        }
        
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
            subject: `Portfolio Contact: Message from ${name}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };
        
        // Send email
        await transporter.sendMail(mailOptions);
        
        res.json({ 
            success: true, 
            message: 'Message sent successfully!' 
        });
        
    } catch (error) {
        console.error('Contact form error:', error);
        
        // Log the contact data even if email fails
        console.log('Contact form data (email failed):');
        console.log(`Name: ${req.body.name}`);
        console.log(`Email: ${req.body.email}`);
        console.log(`Message: ${req.body.message}`);
        
        res.status(500).json({ 
            success: false, 
            message: 'Email service error. Your message has been logged on the server.' 
        });
    }
});


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
});

// Get portfolio data endpoint
app.get('/api/portfolio', (req, res) => {
    const portfolioData = {
        name: "Amit Das",
        title: "Fullstack Developer",
        description: "Hey I am FullStack Developer and Apart From this i am Content Creator making video about coding",
        services: [
            {
                id: "ui",
                title: "UI/UX Design",
                description: "Creating beautiful and user-friendly interfaces with modern design principles."
            },
            {
                id: "web",
                title: "Web Development",
                description: "Building responsive and dynamic websites using modern technologies."
            },
            {
                id: "mobile",
                title: "Android Development",
                description: "Developing native Android applications with great user experience."
            }
        ],
        projects: [
            {
                title: "Snake Game",
                description: "Snake Game using HTML, CSS and JavaScript",
                image: "https://s3.ap-south-1.amazonaws.com/s3.studytonight.com/curious/uploads/pictures/1592415011-1.jpg",
                github: "https://github.com/Amit9718/Snake_Game.git"
            },
            {
                title: "Spotify Clone",
                description: "Spotify Clone using HTML, CSS and JavaScript",
                image: "https://foolishdeveloper.com/wp-content/uploads/2024/05/thumbnail-9.png",
                github: "https://github.com/Amit9718/SPOTIFY_CLONE.git"
            },
            {
                title: "Netflix Clone",
                description: "Netflix Clone using HTML and CSS",
                image: "https://codewithcurious.com/wp-content/uploads/2024/02/thumbnail-8-1536x860.png.webp",
                github: "https://github.com/Amit9718/Netflix-Clone.git"
            },
            {
                title: "Perfume E-commerce Website",
                description: "Perfume E-commerce Website using HTML, CSS and JavaScript",
                image: "https://as2.ftcdn.net/v2/jpg/04/50/42/23/1000_F_450422345_zwIAICRBuHIc9y0mzXbqRZFD595u6x7I.jpg",
                github: "https://github.com/Amit9718/Perfume-E-commerce-Website"
            }
        ]
    };
    
    res.json(portfolioData);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!' 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Route not found' 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});