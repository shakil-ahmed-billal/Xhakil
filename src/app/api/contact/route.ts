import { NextResponse } from "next/server"
import { Resend } from "resend"
import { contactSchema } from "@/features/portfolio/validators/contact"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured" },
        { status: 500 }
      )
    }

    const body = await req.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.format() },
        { status: 400 }
      )
    }

    const { name, email, message } = result.data

    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // Replace with verified domain when ready
      to: ["shakil.dev99@gmail.com"],
      subject: `New Contact Request from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Contact API Error:", error)
    return NextResponse.json(
      { error: "Internal Server Error", message: error?.message || "Unknown error", stack: error?.stack },
      { status: 500 }
    )
  }
}
