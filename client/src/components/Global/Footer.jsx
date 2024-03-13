import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <div>
      <footer className="footer text-light mt-8 mb-8 flex row-auto justify-center">
        <div className="container-fluid p-5 rounded-md">
          <div className="row ">
            <div className="col-lg-6 h-100 text-center text-lg-left my-auto">
              <ul className="list-inline mb-2 flex flex-wrap justify-center">
                <li className="list-inline-item mb-4">
                  <p>MyEvents</p>
                  <p>Silver Street</p>
                  <p>Asc City</p>
                </li>
                <li className="list-inline-item mx-16 mb-4">
                  <p className="">Follow us</p>
                  <p>&nbsp;</p>
                  <div className="flex gap-4">
                    <SocialIcon url="www.youtube.com" />
                    <SocialIcon url="www.facebook.com" />
                    <SocialIcon url="www.instagram.com" />
                    <SocialIcon url="www.twitter.com" />
                  </div>
                </li>
                <li className="list-inline-item  mb-4">
                  <p>Contact</p>
                  <p>+491234567</p>
                  <p>info@myevents.com</p>
                </li>
              </ul>
              <div className="flex justify-center mt-4">
                <p>&copy; Website 2024. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;