
import { CartItem } from '../types';

interface OrderDetails {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  cart: CartItem[];
  participants: Array<{
    assessmentName: string;
    name: string;
    email: string;
  }>;
  total: number;
  paymentMethod: 'card' | 'bank';
  orderId: string;
  debriefHours?: number;
}

export interface EmailData {
  to: string;
  subject: string;
  body: string; // HTML body
  type: 'admin' | 'customer';
}

export interface SimulationResult {
  adminEmail: EmailData;
  customerEmail: EmailData;
}

export const generateOrderEmails = (order: OrderDetails): SimulationResult => {
  const date = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  
  // Helper to generate participant table row
  const participantRows = order.participants.map(p => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${p.assessmentName}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${p.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${p.email}</td>
    </tr>
  `).join('');

  const participantTable = `
    <table style="width: 100%; border-collapse: collapse; text-align: left; margin-top: 10px; font-size: 13px;">
      <thead>
        <tr style="background: #f4f4f4;">
          <th style="padding: 8px;">Assessment</th>
          <th style="padding: 8px;">Participant Name</th>
          <th style="padding: 8px;">Participant Email</th>
        </tr>
      </thead>
      <tbody>
        ${participantRows}
      </tbody>
    </table>
  `;

  // Additional Services Row
  const debriefRow = order.debriefHours ? `
    <tr style="background-color: #f9fafb;">
      <td style="padding: 8px; border-bottom: 1px solid #eee; color: #0C3963; font-weight: bold;">Expert Debriefing Session</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${order.debriefHours} hr</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">$${(order.debriefHours * 750).toFixed(2)}</td>
    </tr>
  ` : '';

  // 1. Generate Admin Email
  const adminEmail: EmailData = {
    to: 'info@lhh.com.vn',
    subject: `[New Order] #${order.orderId} - $${order.total.toFixed(2)} (${order.paymentMethod === 'card' ? 'Paid' : 'Pending'})`,
    type: 'admin',
    body: `
      <div style="font-family: sans-serif; color: #333;">
        <h2 style="color: #0C3963;">New Order Notification</h2>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p><strong>Date:</strong> ${date}</p>
        <hr />
        <h3>Buyer Details</h3>
        <p>
          <strong>Name:</strong> ${order.customer.firstName} ${order.customer.lastName}<br/>
          <strong>Email:</strong> ${order.customer.email}
        </p>
        <hr />
        <h3>Participant Assignments</h3>
        ${order.participants.length > 0 ? participantTable : '<p>No specific participants entered (Buyer is taker).</p>'}
        <hr />
        <h3>Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="background: #f4f4f4;">
              <th style="padding: 8px;">Item</th>
              <th style="padding: 8px;">Qty</th>
              <th style="padding: 8px;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${order.cart.map(item => `
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.quantity}</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">$${item.price}</td>
              </tr>
            `).join('')}
            ${debriefRow}
          </tbody>
        </table>
        <p><strong>Total Value: $${order.total.toFixed(2)}</strong></p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod === 'card' ? 'Credit Card' : 'Bank Transfer'}</p>
        <div style="background: #eee; padding: 10px; margin-top: 20px;">
          <strong>Action Required:</strong> 
          ${order.paymentMethod === 'card' 
            ? 'None. Payment captured automatically. Ensure participants receive codes.' 
            : 'Verify bank transfer receipt before releasing codes to participants.'}
          ${order.debriefHours ? '<br/><br/><strong style="color:#C7593A;">NOTE: Customer purchased Expert Debriefing. Assign consultant ASAP.</strong>' : ''}
        </div>
      </div>
    `
  };

  // 2. Generate Customer Email
  let customerBody = '';
  let customerSubject = '';
  
  const additionalServicesSection = order.debriefHours ? `
    <h3>Additional Services Included</h3>
    <ul style="list-style: none; padding: 0;">
        <li style="padding: 10px; background: #f0f9ff; border: 1px solid #b9e6fe; border-radius: 4px; color: #0C3963;">
           <strong>Expert Debriefing Session (1 Hour)</strong><br/>
           <span style="font-size: 13px;">A consultant will contact you within 24 hours to schedule your session.</span>
        </li>
    </ul>
  ` : '';

  if (order.paymentMethod === 'bank') {
    customerSubject = `Action Required: Transfer Instructions for Order #${order.orderId}`;
    customerBody = `
      <div style="font-family: sans-serif; color: #333;">
        <h2 style="color: #0C3963;">Order Received: #${order.orderId}</h2>
        <p>Dear ${order.customer.firstName},</p>
        <p>Thank you for your order. To complete your purchase, please proceed with the bank transfer using the details below:</p>
        
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>BENEFICIARY:</strong> LEE HECHT HARRISON INDOCHINE</p>
          <p style="margin: 5px 0;"><strong>ACCOUNT NUMBER:</strong> 503 527 574 301 (USD)</p>
          <p style="margin: 5px 0;"><strong>SWIFT CODE:</strong> OCBCSGSG</p>
          <p style="margin: 5px 0;"><strong>BANK:</strong> OCBC Bank</p>
          <p style="margin: 15px 0 0 0; color: #C7593A; font-weight: bold;">IMPORTANT: Please include Ref "${order.orderId}" in the transfer description.</p>
        </div>

        <h3>Participants to be Registered</h3>
        ${order.participants.length > 0 ? participantTable : '<p>You will be registered for the assessments.</p>'}
        
        ${additionalServicesSection}

        <p>Total Amount Due: <strong>$${order.total.toFixed(2)}</strong></p>
        <p>Once we receive the funds, we will email the assessment access codes to the registered participants immediately.</p>
        <hr />
        <p style="font-size: 12px; color: #666;">Talentassess by Lee Hecht Harrison Indochine<br/>info@lhh.com.vn | +84 28 3511 6022</p>
      </div>
    `;
  } else {
    customerSubject = `Order Confirmation & Access Codes #${order.orderId}`;
    customerBody = `
      <div style="font-family: sans-serif; color: #333;">
        <h2 style="color: #0C3963;">Order Confirmed!</h2>
        <p>Dear ${order.customer.firstName},</p>
        <p>Thank you for your purchase. We have received your payment of <strong>$${order.total.toFixed(2)}</strong>.</p>
        
        <h3>Participant Assignments</h3>
        ${order.participants.length > 0 ? participantTable : '<p>Self-registration confirmed.</p>'}
        
        ${additionalServicesSection}

        <h3>Access Details</h3>
        <p>Each participant listed above will receive (or has been sent) a separate email with their unique login link.</p>
        
        <div style="margin-bottom: 20px; border-left: 4px solid #0C3963; padding-left: 15px;">
           <p style="font-style:italic; color:#555;">If you assigned assessments to others, please inform them to check their inbox (including spam folders).</p>
        </div>

        <p>If you need assistance, please reply to this email.</p>
        <hr />
        <p style="font-size: 12px; color: #666;">Talentassess by Lee Hecht Harrison Indochine<br/>info@lhh.com.vn | +84 28 3511 6022</p>
      </div>
    `;
  }

  const customerEmail: EmailData = {
    to: order.customer.email,
    subject: customerSubject,
    body: customerBody,
    type: 'customer'
  };

  return { adminEmail, customerEmail };
};
