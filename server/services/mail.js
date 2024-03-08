import FormData from 'form-data';
import fetch from 'node-fetch';

async function sendMail(mailAddr, subject, htmlText) {
    const form = new FormData();
    form.append('from', 'remember@myEvents.de');
    form.append('to', mailAddr);
    form.append('subject', subject);
    form.append('html', htmlText);

    const domainName = 'sandbox26a553fae9cd4b10a45549ea6c1662ce.mailgun.org';
    const resp = await fetch(
        `https://api.mailgun.net/v3/${domainName}/messages`,
        {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + Buffer.from('api:7c31eba44409c6fe1cafe066b57fa3fc-2c441066-45c05334').toString('base64')
            },
            body: form
        }
    );

    const data = await resp.text();
    console.log("Mail Responde:", data);
    return data;
}

export default sendMail;