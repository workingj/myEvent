import FormData from 'form-data';
import fetch from 'node-fetch';

async function sendMail(mailAddr, subject, htmlText) {
    const form = new FormData();
    form.append('from', 'remember@myEvents.de');
    form.append('to', mailAddr);
    form.append('subject', subject);
    form.append('html', htmlText);

    const domainName = `${process.env.MAILGUN_API_KEY}.mailgun.org`;
    const resp = await fetch(
        `https://api.mailgun.net/v3/${domainName}/messages`,
        {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString('base64')
            },
            body: form
        }
    );

    const data = await resp.text();

    return new Promise((resolve, reject) => {
        resolve(JSON.parse(data))
    })
}

async function sendGreeting(Mail) {
    try {
        const form = new FormData();
        form.append('from', `${Mail.userMail}`);
        form.append('to', Mail.contactMail);
        form.append('subject', `MyEvents: ${Mail.userName} Greets You!`);
        form.append('html', Mail.html);

        console.log(`SEND GREETING    FROM: ${Mail.userName} TO: ${Mail.contactName}`);

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

        return new Promise((resolve, reject) => {
            resolve(JSON.parse(data))
        })
    } catch (error) {
        console.error("ERROR: sendGreeting", error.stack);
        return new Promise((resolve, reject) => {
            reject(error.stack);
        })
    }
}
async function sendNotification(Mail) {
    try {
        const form = new FormData();
        form.append('from', 'remember@myEvents.de');
        form.append('to', Mail.userMail)    ;
        form.append('subject', `${Mail.subject} - ${Mail.contactName}`);
        form.append('html', `<h1>MyEvent</h1><p>Reminder:<b></b> You have Send a Greeting to ${Mail.contactName} for ${Mail.subject}</p>`);

        console.log(`SEND NOTIFICATION FOR: ${Mail.subject} TO: ${Mail.userMail}`);

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

        return new Promise((resolve, reject) => {
            resolve(JSON.parse(data))
        })
    } catch (error) {
        console.error("ERROR: sendNotification", error.stack);
        return new Promise((resolve, reject) => {
            reject(error.stack);
        })
    }
}
export { sendMail, sendGreeting, sendNotification };