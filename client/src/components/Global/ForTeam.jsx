import React from 'react';
import Lottie from 'lottie-react';
import teamsAnimation from '../../../public/annimation/1.json';
import { useTranslation } from "react-i18next";

function ForTeam() {
  
  const { t } = useTranslation();
  return (
    <div className="settings m-4 text-center flex-1 rounded-md p-4 border border-gray-300 w-full">
    <h2>{t("Our Team")}</h2>
    <div className="Container m-4 text-center flex justify-center items-center flex-col gap-5 w-full">


        <p>
          {t("We are a team of developers, designers, and creators. We are passionate about creating tools that help people connect and communicate. We believe that the best tools are simple, intuitive, and easy to use. We are constantly working to improve our products and services, and we welcome your feedback and suggestions. If you have any questions or comments, please don't hesitate to contact us.")}
        </p>
        <br />
        <br />
        <b>
          <h3>Faramarz 😊</h3>
          <h3>Johannas 😄</h3>
          <h3>Issa 😠</h3>
        </b>
        <br />
        <br />
        <p>{t("We are here to help you and we look forward to hearing from you!")}</p>

        <Lottie animationData={teamsAnimation} className='' style={{
          width: '100%',
          height: '300px',
          margin: 'auto',
          display: 'block',
        }} />
      </div>
    </div>
  );
}

export default ForTeam;
