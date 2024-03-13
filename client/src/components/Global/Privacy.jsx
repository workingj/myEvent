
import React from 'react';
import Lottie from 'lottie-react';
import privacyAnimation from '../../../public/annimation/privacy.json';
import { useTranslation } from 'react-i18next'; 

const Privacy = () => {
  const { t } = useTranslation(); 

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">{t("Privacy Policy")}</h1>
      <p className="mb-4">{t("Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website, https://www.myevents.com, and other sites we own and operate.")}</p>

      <p className="mb-4">{t("We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.")}</p>



      <p className="mb-4">{t("Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.")}</p>

      <p className="mb-4">{t("This policy is effective as of 1 March 2024.")}</p>
      <Lottie animationData={privacyAnimation} className='' style={{
          width: '100%',
          height: '500px',
          margin: 'auto',
          display: 'block',


        }}  
        />
    </div>
  );
};

export default Privacy;
