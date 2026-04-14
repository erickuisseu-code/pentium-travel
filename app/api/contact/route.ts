import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { getPayload } from 'payload'
// @ts-ignore
import config from '@payload-config'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false, // STARTTLS sur le port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const SERVICE_LABELS: Record<string, string> = {
  'visa-etudiant':            'Visa étudiant',
  'accompagnement-academique': 'Accompagnement académique',
  'logement-etudiant':        'Logement étudiant',
  'visa-touristique':         'Visa touristique',
  'hotel':                    "Réservation d'hôtel",
  'billet-avion':             "Billet d'avion",
  'autre':                    'Autre',
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, service, message } = body

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const serviceLabel = SERVICE_LABELS[service] ?? service

    // 1. Sauvegarder dans Payload CMS
    try {
      const payload = await getPayload({ config })
      await payload.create({
        collection: 'contacts',
        data: {
          name,
          email,
          phone: phone ?? '',
          service,
          message,
        },
      })
    } catch (dbErr) {
      console.error('[Contact] Erreur sauvegarde Payload :', dbErr)
      // On continue — l'email reste prioritaire
    }

    // 2. Email de notification → Pentium Travel
    const notificationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #B91C1C; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Nouveau message — Pentium Travel</h1>
        </div>
        <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 130px;">Nom</td><td style="padding: 8px 0; font-weight: bold; color: #0D0D0D;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #B91C1C;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #666;">Téléphone</td><td style="padding: 8px 0; color: #0D0D0D;">${phone}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #666;">Service</td><td style="padding: 8px 0; color: #0D0D0D;">${serviceLabel}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
          <p style="color: #666; margin: 0 0 8px 0;">Message :</p>
          <p style="color: #0D0D0D; background: white; padding: 16px; border-radius: 6px; border: 1px solid #e5e5e5; margin: 0; white-space: pre-wrap;">${message}</p>
          <p style="color: #999; font-size: 12px; margin: 20px 0 0 0;">Reçu via le formulaire contact de pentium-travel.com</p>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: `"Pentium Travel Site" <${process.env.SMTP_FROM}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `[Pentium Travel] Nouveau message — ${serviceLabel} — ${name}`,
      html: notificationHtml,
    })

    // 3. Email de confirmation → client
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #B91C1C; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Pentium Travel — Votre message a bien été reçu</h1>
        </div>
        <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5;">
          <p style="color: #0D0D0D; font-size: 16px;">Bonjour <strong>${name}</strong>,</p>
          <p style="color: #444; font-size: 16px; line-height: 1.6;">
            Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais,
            généralement sous <strong>24h</strong>.
          </p>
          <p style="color: #444; font-size: 16px; line-height: 1.6;">
            Pour toute urgence, vous pouvez nous joindre directement :
          </p>
          <ul style="color: #444; font-size: 15px; line-height: 2;">
            <li>📞 +237 657 644 907 (Cameroun)</li>
            <li>📞 +33 605 69 33 75 (France)</li>
            <li>💬 <a href="https://wa.me/33605693375" style="color: #B91C1C;">WhatsApp</a></li>
          </ul>
          <p style="color: #444; font-size: 15px; margin-top: 24px;">
            À très bientôt,<br/>
            <strong>L'équipe Pentium Travel</strong>
          </p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px;">Douala · Yaoundé — Cameroun</p>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: `"Pentium Travel" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Pentium Travel — Votre message a bien été reçu',
      html: confirmationHtml,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[Contact API]', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
