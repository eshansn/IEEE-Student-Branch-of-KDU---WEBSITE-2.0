import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const sendContactEmail = async (req: Request, res: Response) => {
  try {
    const { name, email, message }: ContactFormData = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and message',
      });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address',
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: `"IEEE KDU Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'ieeekdu@gmail.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background: linear-gradient(135deg, #0066CC 0%, #3399FF 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: white;
              padding: 30px;
              border-radius: 0 0 10px 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .field {
              margin-bottom: 20px;
              padding-bottom: 15px;
              border-bottom: 1px solid #eee;
            }
            .label {
              font-weight: bold;
              color: #0066CC;
              display: block;
              margin-bottom: 5px;
            }
            .value {
              color: #555;
              word-wrap: break-word;
            }
            .message-box {
              background: #f8f9fa;
              padding: 15px;
              border-left: 4px solid #0066CC;
              margin-top: 10px;
              border-radius: 5px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #777;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">📧 New Contact Form Message</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">IEEE Student Branch of KDU</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">From:</span>
                <span class="value">${name}</span>
              </div>
              
              <div class="field">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${email}" style="color: #0066CC; text-decoration: none;">${email}</a></span>
              </div>
              
              <div class="field" style="border-bottom: none;">
                <span class="label">Message:</span>
                <div class="message-box">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div class="footer">
                <p>This message was sent via the IEEE KDU website contact form.</p>
                <p>You can reply directly to this email to respond to ${name}.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New Contact Form Submission
        
        From: ${name}
        Email: ${email}
        
        Message:
        ${message}
        
        ---
        This message was sent via the IEEE KDU website contact form.
        Reply to this email to respond to the sender.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
    });

  } catch (error: any) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
