import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";
import data from "../../../env.json"

export class MailtrapMailProvider implements IMailProvider{
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: data.MAIL.HOST, //inserir o host fornecido pelo Mailtrap
      port: 2525,
      auth: {
        user: data.MAIL.USER, //inserir o user fornecido pelo Mailtrap
        pass: data.MAIL.PASS //inserir o password fornecido pelo Mailtrap
      }
    })
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from:{
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    })
  }
  
}