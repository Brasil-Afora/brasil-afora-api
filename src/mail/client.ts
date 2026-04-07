import { Resend } from "resend"
import { env } from "@/lib/env"

const resend = new Resend(env.RESEND_API_KEY)

type SendEmailParams = {
  to: string
  subject: string
  content: React.JSX.Element
}

export function sendEmail({ to, subject, content }: SendEmailParams) {
  return resend.emails.send({
    to,
    subject,
    react: content,
    from: "Passaporte Global <noreply@resend.dev>",
  })
}
