// Envoie un courriel de test avec la configuration SMTP du conteneur, sans
// passer par le formulaire : aucune fausse demande n'est écrite dans le dépôt.
// Usage : ./test-mail.sh (à la racine du stack)
import nodemailer from 'nodemailer';

const { SMTP_HOST, SMTP_PORT = '587', SMTP_USER, SMTP_PASS, DEVIS_MAIL_TO, DEVIS_MAIL_FROM } = process.env;
const from = DEVIS_MAIL_FROM || SMTP_USER;

if (!SMTP_HOST || !DEVIS_MAIL_TO || !from) {
  console.error('Configuration incomplète : SMTP_HOST, DEVIS_MAIL_TO et SMTP_USER (ou DEVIS_MAIL_FROM) sont requis dans mail.env.');
  process.exit(2);
}

const port = Number(SMTP_PORT);
const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure: port === 465,
  requireTLS: port !== 465,
  auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  connectionTimeout: 10_000,
});

try {
  await transport.verify();
  const info = await transport.sendMail({
    from,
    to: DEVIS_MAIL_TO,
    subject: 'Test — alertes de devis sn.broadcastsn.com',
    text: "Ce courriel confirme que les alertes de demandes de devis du site sont bien configurées.\nAucune action n'est nécessaire.",
  });
  console.log(`Envoyé à ${DEVIS_MAIL_TO} (id ${info.messageId}).`);
} catch (err) {
  console.error(`Échec : ${err.message}`);
  process.exit(1);
}
