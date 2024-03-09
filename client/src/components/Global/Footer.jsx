import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <div>
      <footer className="footer text-light ">
        <div className="container-fluid">
          <div className="row ">
            <div className="col-lg-6 h-100 text-center text-lg-left my-auto">
              <ul className="list-inline mb-2 flex flex-wrap justify-center">
                <li className="list-inline-item font-semibold mb-4">
                  <h3>MyEvents</h3>
                  <h3>MyEvents</h3>
                  <h3>MyEvents</h3>

                </li>
                <li className="list-inline-item mx-16 mb-4">
                  <h3 className="font-bold">Follow us</h3>
                  <div className="flex gap-4">
                    <SocialIcon url="www.youtube.com" />
                    <SocialIcon url="www.facebook.com" />
                    <SocialIcon url="www.instagram.com" />
                    <SocialIcon url="www.twitter.com" />
                  </div>
                </li>
                <li className="list-inline-item font-semibold mb-4">
                  <h3>Contact</h3>
                  <h3>+491234567</h3>
                  <h3>info@myevents.com</h3>
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