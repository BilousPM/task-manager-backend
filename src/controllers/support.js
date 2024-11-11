import createHttpError from "http-errors";
import { SMTP, TEMPLATES_DIR } from "../constants/index.js";
import { env } from "../utils/env.js";
import { sendEmailRequest } from "../utils/sendMail.js";
import path from 'node:path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';

export const sendSupportMessageController = async (req, res) => {
  const email = req.body.email;
  const message = req.body.message;
  const supportEmail = "bilouspm@gmail.com";
  //  const supportEmail = "taskpro.project@gmail.com"
  if (!email || !message) {
    throw createHttpError(400, 'Email and message are required');
  }


  const sendEmailTemplatePath = path.join(TEMPLATES_DIR, 'support-email.html');

  const templateSource = (
    await fs.readFile(sendEmailTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    email,
    message
  });

  try {
    await sendEmailRequest({
      to: supportEmail,
      from: env(SMTP.SMTP_FROM),
      sudject: 'Reset your password',
      html,
    });
  } catch (error) {
    console.log(error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }

  res.json({
    status:200,
    message: `Hello, ${email}. The message sent to support`
  });
};
