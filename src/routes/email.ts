import express from 'express';
import { transporter } from '../utils/email';

const router = express.Router();

router.post('/send-email', async (req, res) => {
    try {
        const { to, cart, totalAmount } = req.body;

        const rows = cart
            .map(
                (item: any) => `
<tr>
    <td>${item.name}</td>
    <td>${item.quantity}</td>
    <td>₹${item.price}</td>
    <td>₹${item.price * item.quantity}</td>
</tr>
`
            )
            .join('');

        const html = `
<h2>Purchase Receipt</h2>

<table border="1" cellpadding="10" cellspacing="0">
<tr>
<th>Product</th>
<th>Qty</th>
<th>Price</th>
<th>Total</th>
</tr>

${rows}

<tr>
<td colspan="3"><strong>Grand Total</strong></td>
<td><strong>₹${totalAmount}</strong></td>
</tr>

</table>
`;

        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject: 'Purchase Receipt',
            html,
        });

        res.json({
            success: true,
            message: 'Email sent',
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Unable to send email',
        });
    }
});

export default router;