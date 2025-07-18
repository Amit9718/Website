const nodemailer = require('nodemailer');
require('dotenv').config();

// Gmail setup helper
async function setupGmail() {
    console.log('🔧 Setting up Gmail for Portfolio Contact Form...');
    console.log('📧 Email:', process.env.EMAIL_USER);
    
    // Test different configurations
    const configs = [
        {
            name: 'Gmail Service (App Password Required)',
            config: {
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            }
        },
        {
            name: 'Gmail SMTP with TLS',
            config: {
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
            }
        },
        {
            name: 'Gmail SMTP with SSL',
            config: {
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
        }
    ];

    for (let i = 0; i < configs.length; i++) {
        const { name, config } = configs[i];
        console.log(`\n🔄 Testing ${name}...`);
        
        try {
            const transporter = nodemailer.createTransport(config);
            
            // Test the connection
            await transporter.verify();
            console.log(`✅ ${name} - Connection successful!`);
            
            // Send test email
            const testEmail = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: 'Portfolio Contact Form Test',
                html: `
                    <h3>🎉 Gmail Setup Successful!</h3>
                    <p>Your portfolio contact form is now working properly.</p>
                    <p><strong>Configuration:</strong> ${name}</p>
                    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                `
            };
            
            await transporter.sendMail(testEmail);
            console.log(`📧 Test email sent successfully to ${process.env.EMAIL_USER}`);
            console.log(`\n🎊 Gmail setup complete! Your contact form is ready.`);
            return true;
            
        } catch (error) {
            console.log(`❌ ${name} - Failed:`, error.message);
            
            if (error.message.includes('Invalid login')) {
                console.log(`\n💡 Tip: Gmail requires an App Password instead of your regular password.`);
                console.log(`   Follow these steps:`);
                console.log(`   1. Go to https://myaccount.google.com/security`);
                console.log(`   2. Enable 2-Step Verification`);
                console.log(`   3. Generate App Password for "Mail"`);
                console.log(`   4. Update EMAIL_PASS in .env file with the App Password`);
            }
        }
    }
    
    console.log(`\n⚠️  All configurations failed. Contact form will log to console instead.`);
    return false;
}

// Auto-setup Gmail App Password (simplified approach)
async function autoSetupAppPassword() {
    console.log('\n🔐 Attempting to setup Gmail App Password...');
    
    // Since we can't programmatically create App Passwords, 
    // let's try a workaround with less secure app access
    const lessSecureConfig = {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        },
        // Additional options for older Gmail accounts
        requireTLS: true,
        connectionTimeout: 10000,
        greetingTimeout: 5000,
        socketTimeout: 10000
    };
    
    try {
        const transporter = nodemailer.createTransport(lessSecureConfig);
        await transporter.verify();
        
        // Send success email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: '🎉 Portfolio Contact Form - Setup Complete!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4CAF50;">✅ Gmail Setup Successful!</h2>
                    <p>Your portfolio contact form is now working perfectly!</p>
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3>📧 Email Configuration:</h3>
                        <p><strong>Email:</strong> ${process.env.EMAIL_USER}</p>
                        <p><strong>Status:</strong> Active and Ready</p>
                        <p><strong>Setup Time:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    <p>Your visitors can now send you messages through your portfolio website!</p>
                    <hr>
                    <p style="color: #666; font-size: 12px;">This email was sent automatically by your Portfolio Contact Form setup.</p>
                </div>
            `
        });
        
        console.log('🎊 SUCCESS! Gmail is now configured and working!');
        console.log('📧 Check your email for confirmation.');
        return true;
        
    } catch (error) {
        console.log('❌ Auto-setup failed:', error.message);
        return false;
    }
}

// Run the setup
async function main() {
    console.log('🚀 Starting Gmail Setup for Portfolio...\n');
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('❌ Missing email credentials in .env file');
        return;
    }
    
    // Try auto-setup first
    const autoSuccess = await autoSetupAppPassword();
    if (autoSuccess) return;
    
    // If auto-setup fails, try standard setup
    await setupGmail();
}

main().catch(console.error);