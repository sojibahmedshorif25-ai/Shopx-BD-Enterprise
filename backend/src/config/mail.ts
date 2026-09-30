import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'sojibahmedshorif25@gmail.com',
    pass: process.env.SMTP_PASS || 'txdx mdvk exmz oboa',
  },
});

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"ShopX BD Official" <sojibahmedshorif25@gmail.com>',
      replyTo: 'sojibahmedshorif25@gmail.com',
      to,
      subject,
      html,
    });
    console.log(`📧 [Nodemailer] Email successfully delivered to ${to}: ${info.messageId}`);
    return true;
  } catch (error: any) {
    console.warn(`⚠️ [Nodemailer] Failed to deliver email to ${to}: ${error.message}`);
    return false;
  }
};

/**
 * 1. 2FA & Login OTP Email Template (Bilingual Bangla & English)
 */
export const generateOTPEmailTemplate = (
  otp: string,
  name?: string,
  lang: 'en' | 'bn' = 'en'
): string => {
  const isBn = lang === 'bn';

  const title = isBn
    ? 'নিরাপদ জিমেইল ভেরিফিকেশন ও ২-ফ্যাক্টর সিকিউরিটি কোড'
    : 'Enterprise 2-Factor Authentication Code';
  const greeting = isBn
    ? `স্বাগতম <strong>${name || 'সম্মানিত ব্যবহারকারী'}</strong>,`
    : `Hello <strong>${name || 'Valued User'}</strong>,`;
  const message = isBn
    ? 'আপনার ShopX BD অ্যাকাউন্টে নিরাপদ প্রবেশের জন্য নিচের ৬-সংখ্যার ওটিপি (OTP) কোডটি ব্যবহার করুন। কোডটির মেয়াদ <strong>১০ মিনিট</strong>।'
    : 'Use the following 6-digit One-Time Password (OTP) to securely complete your login or authentication. This security token expires in <strong>10 minutes</strong>.';
  const codeLabel = isBn ? 'আপনার সিকিউরিটি ওটিপি কোড' : 'YOUR 2FA VERIFICATION CODE';
  const warning = isBn
    ? '⚠️ <strong>নিরাপত্তা বার্তা:</strong> এই কোডটি অত্যন্ত সংবেদনশীল। ShopX BD সাপোর্ট বা অন্য কারও সাথে কখনও এটি শেয়ার করবেন না।'
    : '⚠️ <strong>Security Notice:</strong> Never share this OTP with anyone, including ShopX BD staff or support.';
  const supportText = isBn
    ? 'যেকোনো সহায়তায় আমাদের অফিসিয়াল সাপোর্ট হেল্পডেস্ক সর্বদা নিয়োজিত:'
    : 'For immediate technical assistance, connect with our official support team:';
  const headOfficeLabel = isBn ? 'প্রধান কার্যালয়:' : 'Head Office:';
  const headOfficeAddress = isBn
    ? 'রৌমারী, কুড়িগ্রাম, রংপুর, বাংলাদেশ'
    : 'Rowmari, Kurigram, Rangpur, Bangladesh';
  const hotlineLabel = isBn ? '২৪/৭ হটলাইন:' : '24/7 Hotline:';
  const supportLabel = isBn ? 'অফিসিয়াল সাপোর্ট:' : 'Official Support:';
  const copyright = isBn
    ? '© ২০২৬ ShopX BD মাল্টি-ভেন্ডর ও SaaS ক্লাউড ইকোসিস্টেম। সর্বস্বত্ব সংরক্ষিত।'
    : '© 2026 ShopX BD Multi-Vendor & SaaS Cloud Ecosystem. All rights reserved.';

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
  </head>
  <body style="margin: 0; padding: 32px 0; background-color: #030712; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div style="max-width: 580px; margin: 0 auto; background: #0b1322; border-radius: 28px; overflow: hidden; border: 1px solid #1e293b; box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.85);">
      
      <!-- Top Brand Header with Luxury Gradient -->
      <div style="background: linear-gradient(135deg, #020617 0%, #064e3b 50%, #0f172a 100%); padding: 42px 32px 34px; text-align: center; border-bottom: 1px solid #1e293b; position: relative;">
        <div style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); width: 56px; height: 56px; border-radius: 18px; line-height: 56px; text-align: center; font-size: 26px; font-weight: 900; color: #ffffff; margin-bottom: 16px; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4); letter-spacing: -0.5px;">SX</div>
        <h1 style="margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.5px; color: #ffffff;">ShopX <span style="color: #34d399;">BD</span></h1>
        <p style="margin: 8px 0 0; color: #94a3b8; font-size: 13px; font-weight: 600; letter-spacing: 0.5px;">${title}</p>
      </div>

      <!-- Main Body Container -->
      <div style="padding: 38px 34px;">
        <p style="margin: 0 0 16px; font-size: 16px; color: #f1f5f9; line-height: 1.5;">
          ${greeting}
        </p>
        <p style="margin: 0 0 28px; font-size: 14px; color: #94a3b8; line-height: 1.7;">
          ${message}
        </p>

        <!-- 6-Digit Glowing OTP Card -->
        <div style="background: #030712; border: 2px dashed #10b981; border-radius: 20px; padding: 26px 16px; text-align: center; margin: 24px 0; box-shadow: 0 4px 25px rgba(16, 185, 129, 0.15);">
          <span style="display: block; font-size: 11px; font-weight: 800; text-transform: uppercase; color: #34d399; letter-spacing: 2.5px; margin-bottom: 10px;">${codeLabel}</span>
          <span style="font-size: 44px; font-weight: 900; letter-spacing: 14px; color: #6ee7b7; font-family: 'Courier New', Courier, monospace; display: inline-block; margin-left: 14px; text-shadow: 0 0 15px rgba(110, 231, 183, 0.5);">${otp}</span>
        </div>

        <!-- Security Warning Box -->
        <div style="background: rgba(239, 68, 68, 0.08); border-left: 4px solid #ef4444; padding: 16px 20px; border-radius: 10px; margin: 24px 0 30px;">
          <p style="margin: 0; font-size: 12px; color: #fca5a5; line-height: 1.6;">
            ${warning}
          </p>
        </div>

        <!-- Support Info Section with Dynamic Head Office Address -->
        <div style="border-top: 1px solid #1e293b; padding-top: 24px; font-size: 12px; color: #64748b; line-height: 1.9;">
          <p style="margin: 0 0 10px; color: #94a3b8; font-weight: 600;">${supportText}</p>
          <p style="margin: 4px 0;">
            📧 <strong>${supportLabel}</strong> <a href="mailto:sojibahmedshorif25@gmail.com" style="color: #34d399; text-decoration: none; font-weight: 600;">sojibahmedshorif25@gmail.com</a>
          </p>
          <p style="margin: 4px 0;">
            📞 <strong>${hotlineLabel}</strong> <a href="tel:+8801942791004" style="color: #38bdf8; text-decoration: none; font-weight: 600;">+880 1942-791004</a>
          </p>
          <p style="margin: 4px 0;">
            🏢 <strong>${headOfficeLabel}</strong> ${headOfficeAddress}
          </p>
        </div>
      </div>

      <!-- Professional Footer with Localized Head Office -->
      <div style="background: #030712; padding: 26px 34px; text-align: center; font-size: 11px; color: #475569; border-top: 1px solid #1e293b;">
        <p style="margin: 0 0 6px; font-weight: 600; color: #64748b;">${copyright}</p>
        <p style="margin: 0; line-height: 1.5; color: #94a3b8;">${headOfficeLabel} ${headOfficeAddress}</p>
      </div>

    </div>
  </body>
  </html>
  `;
};

/**
 * 2. Order Confirmation & Invoice Email Template (Bilingual Bangla & English)
 */
export const generateOrderEmailTemplate = (order: any, lang: 'en' | 'bn' = 'en'): string => {
  const isBn = lang === 'bn';
  const headOfficeLabel = isBn ? 'প্রধান কার্যালয়:' : 'Head Office:';
  const headOfficeAddress = isBn
    ? 'রৌমারী, কুড়িগ্রাম, রংপুর, বাংলাদেশ'
    : 'Rowmari, Kurigram, Rangpur, Bangladesh';
  const hotlineLabel = isBn ? '২৪/৭ হটলাইন:' : '24/7 Hotline:';
  const supportLabel = isBn ? 'অফিসিয়াল সাপোর্ট:' : 'Official Support:';

  const itemsHtml = (order.items || [])
    .map(
      (item: any) => `
    <tr style="border-bottom: 1px solid #1e293b;">
      <td style="padding: 14px 12px; color: #e2e8f0; font-size: 13px; font-weight: 600;">${item.title || item.product?.title || 'Product'}</td>
      <td style="padding: 14px 12px; text-align: center; color: #94a3b8; font-size: 13px;">x${item.quantity}</td>
      <td style="padding: 14px 12px; text-align: right; color: #34d399; font-weight: 800; font-family: monospace; font-size: 14px;">৳${item.price * item.quantity}</td>
    </tr>`
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin: 0; padding: 32px 0; background-color: #030712; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background: #0b1322; border-radius: 28px; overflow: hidden; border: 1px solid #1e293b; box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.85);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #020617 0%, #064e3b 50%, #0f172a 100%); padding: 38px 32px; text-align: center; border-bottom: 1px solid #1e293b;">
        <div style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); width: 52px; height: 52px; border-radius: 16px; line-height: 52px; text-align: center; font-size: 26px; font-weight: 900; color: #ffffff; margin-bottom: 12px;">SX</div>
        <h1 style="margin: 0; font-size: 26px; font-weight: 900; color: #ffffff;">ShopX <span style="color: #34d399;">BD</span></h1>
        <p style="margin: 6px 0 0; color: #94a3b8; font-size: 13px;">${isBn ? 'অর্ডার নিশ্চিতকরণ ও অফিসিয়াল ডিজিটাল ইনভয়েস' : 'Official Order Confirmation & Digital Invoice'}</p>
      </div>

      <!-- Content -->
      <div style="padding: 34px;">
        <div style="background: rgba(16, 185, 129, 0.12); border-left: 4px solid #10b981; padding: 16px 20px; border-radius: 12px; margin-bottom: 24px;">
          <h3 style="margin: 0 0 6px; color: #34d399; font-size: 16px;">${isBn ? `অভিনন্দন, ${order.customerInfo?.name || 'গ্রাহক'}!` : `Thank you, ${order.customerInfo?.name || 'Customer'}!`}</h3>
          <p style="margin: 0; color: #cbd5e1; font-size: 13px;">${isBn ? 'আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে। আমাদের দ্রুততম রাইডার পার্সেল পৌঁছে দেবে।' : 'Your order has been confirmed and scheduled for high-speed dispatch.'}</p>
        </div>

        <div style="background: #030712; border: 1px solid #1e293b; border-radius: 18px; padding: 20px; margin-bottom: 24px; font-size: 13px; color: #cbd5e1; line-height: 1.9;">
          <p style="margin: 0;"><strong>${isBn ? 'অর্ডার নম্বর:' : 'Order ID:'}</strong> <span style="font-family: monospace; color: #38bdf8; font-weight: bold;">#${order.orderNumber || order.orderId || 'SX-889894'}</span></p>
          <p style="margin: 0;"><strong>${isBn ? 'মোবাইল:' : 'Phone:'}</strong> ${order.customerInfo?.phone || '017XXXXXXXX'}</p>
          <p style="margin: 0;"><strong>${isBn ? 'ডেলিভারি ঠিকানা:' : 'Delivery Address:'}</strong> ${order.customerInfo?.address || 'N/A'}, ${order.customerInfo?.district || 'Bangladesh'}</p>
          <p style="margin: 0;"><strong>${isBn ? 'পেমেন্ট মেথড:' : 'Payment:'}</strong> ${String(order.paymentMethod || 'Cash on Delivery').toUpperCase()} (${order.paymentStatus || 'Pending on Delivery'})</p>
        </div>

        <!-- Items Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
          <thead>
            <tr style="background: #030712; text-align: left; border-bottom: 1px solid #1e293b;">
              <th style="padding: 12px; color: #94a3b8;">${isBn ? 'আইটেম বিবরণ' : 'Item Description'}</th>
              <th style="padding: 12px; text-align: center; color: #94a3b8;">${isBn ? 'পরিমাণ' : 'Qty'}</th>
              <th style="padding: 12px; text-align: right; color: #94a3b8;">${isBn ? 'মূল্য' : 'Total'}</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <!-- Summary -->
        <div style="border-top: 2px dashed #1e293b; padding-top: 18px; text-align: right; font-size: 13px; color: #94a3b8; line-height: 1.8;">
          <p style="margin: 0;">${isBn ? 'সাবটোটাল:' : 'Subtotal:'} ৳${order.subTotal || order.totalAmount}</p>
          <p style="margin: 0;">${isBn ? 'ডেলিভারি ফি:' : 'Shipping Fee:'} ৳${order.deliveryFee ?? 60}</p>
          <h2 style="margin: 12px 0 0; font-size: 22px; color: #ffffff;">${isBn ? 'সর্বমোট প্রদেয়:' : 'Total Payable:'} <span style="color: #34d399; font-family: monospace;">৳${order.totalAmount}</span></h2>
        </div>

        <!-- Support Info with Dynamic Head Office Address -->
        <div style="border-top: 1px solid #1e293b; margin-top: 28px; padding-top: 20px; font-size: 12px; color: #64748b; line-height: 1.9;">
          <p style="margin: 4px 0;">📧 <strong>${supportLabel}</strong> <a href="mailto:sojibahmedshorif25@gmail.com" style="color: #34d399; text-decoration: none;">sojibahmedshorif25@gmail.com</a></p>
          <p style="margin: 4px 0;">📞 <strong>${hotlineLabel}</strong> +880 1942-791004</p>
          <p style="margin: 4px 0;">🏢 <strong>${headOfficeLabel}</strong> ${headOfficeAddress}</p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #030712; padding: 24px 34px; text-align: center; font-size: 11px; color: #475569; border-top: 1px solid #1e293b;">
        <p style="margin: 0 0 4px; color: #64748b;">© 2026 ShopX BD Multi-Vendor & SaaS Ecosystem</p>
        <p style="margin: 0; color: #94a3b8;">${headOfficeLabel} ${headOfficeAddress}</p>
      </div>

    </div>
  </body>
  </html>
  `;
};

/**
 * 3. Password Reset OTP Email Template
 */
export const generatePasswordResetEmailTemplate = (
  otp: string,
  name?: string,
  lang: 'en' | 'bn' = 'en'
): string => {
  const isBn = lang === 'bn';
  const headOfficeLabel = isBn ? 'প্রধান কার্যালয়:' : 'Head Office:';
  const headOfficeAddress = isBn
    ? 'রৌমারী, কুড়িগ্রাম, রংপুর, বাংলাদেশ'
    : 'Rowmari, Kurigram, Rangpur, Bangladesh';

  const title = isBn ? '🔑 পাসওয়ার্ড রিসেট ও সিকিউরিটি ওটিপি' : '🔑 ShopX BD Password Reset Code';
  const greeting = isBn ? `সম্মানিত <strong>${name || 'ব্যবহারকারী'}</strong>,` : `Hello <strong>${name || 'Valued User'}</strong>,`;
  const message = isBn
    ? 'আপনার একাউন্টের পাসওয়ার্ড পরিবর্তন করার জন্য নিচের ওটিপি কোডটি ব্যবহার করুন। কোডটির মেয়াদ ১০ মিনিট।'
    : 'We received a request to reset your password. Use the following 6-digit verification code. It is valid for 10 minutes.';

  return `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"></head>
  <body style="margin: 0; padding: 32px 0; background-color: #030712; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="max-width: 580px; margin: 0 auto; background: #0b1322; border-radius: 28px; overflow: hidden; border: 1px solid #1e293b;">
      <div style="background: linear-gradient(135deg, #020617 0%, #312e81 50%, #0f172a 100%); padding: 38px 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 26px; font-weight: 900; color: #ffffff;">ShopX <span style="color: #818cf8;">BD</span></h1>
        <p style="margin: 6px 0 0; color: #cbd5e1; font-size: 13px;">${title}</p>
      </div>
      <div style="padding: 34px;">
        <p style="color: #f1f5f9; font-size: 15px; margin-bottom: 12px;">${greeting}</p>
        <p style="color: #94a3b8; font-size: 13px; line-height: 1.6;">${message}</p>
        
        <div style="background: #030712; border: 2px dashed #818cf8; border-radius: 18px; padding: 22px; text-align: center; margin: 24px 0;">
          <span style="font-size: 40px; font-weight: 900; letter-spacing: 12px; color: #a5b4fc; font-family: monospace;">${otp}</span>
        </div>
        
        <p style="color: #fca5a5; font-size: 12px; background: rgba(239, 68, 68, 0.1); padding: 12px; border-radius: 8px;">
          ${isBn ? '⚠️ আপনি যদি এই অনুরোধ না করে থাকেন, তবে অবিলম্বে আমাদের সাথে যোগাযোগ করুন।' : '⚠️ If you did not request this password reset, please secure your account immediately.'}
        </p>

        <div style="border-top: 1px solid #1e293b; margin-top: 24px; padding-top: 18px; font-size: 12px; color: #64748b; line-height: 1.8;">
          <p style="margin: 2px 0;">🏢 <strong>${headOfficeLabel}</strong> ${headOfficeAddress}</p>
          <p style="margin: 2px 0;">📞 <strong>${isBn ? 'হটলাইন:' : 'Hotline:'}</strong> +880 1942-791004</p>
        </div>
      </div>
    </div>
  </body>
  </html>`;
};

