import React from "react";

const EmailTemplate = ({
  bgURL,
  bgColor,
  headerImage,
  topImgTitle,
  topImgAltText,
  topHeading,
  welcomeMsg,
  emailText,
  titleText,
  accountBgImage,
  accountColor,
  accountCtaText,
  bottomTextSection,
  colA,
  colB,
  supportHelpText,
  bottomImgTitle,
  bottomImgUrl,
  bottomImgBgColor,
  bottomImgAltText,
  footerText,
  componentOrder,
}) => {
  return (
    <div className="template-info-section2">
      <div
        className="template-info-section2-1"
        style={{
          backgroundImage: `url(${bgURL})`,
        }}
      >
        <div
          className="top-image"
          style={{
            order: `${componentOrder.indexOf("top_image")}`,
          }}
        >
          <img
            src={headerImage}
            title={topImgTitle}
            alt={topImgAltText}
            style={{ backgroundColor: `${bgColor}` }}
          />
        </div>
        <div
          className="top-heading"
          style={{
            order: `${componentOrder.indexOf("heading")}`,
          }}
        >
          {topHeading.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
        <div
          className="custom_welcome_message"
          style={{
            order: `${componentOrder.indexOf("custom_welcome_message")}`,
          }}
        >
          {welcomeMsg.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
        <div
          className="email_text"
          style={{ order: `${componentOrder.indexOf("email_text")}` }}
        >
          <p>{emailText}</p>
          <div className="account_cta">
            <button
              title={titleText}
              style={{
                backgroundColor: `${accountBgImage}`,
                color: `${accountColor}`,
              }}
            >
              {accountCtaText}
            </button>
          </div>
        </div>
        <div
          className="things_you_can_section"
          style={{
            order: `${componentOrder.indexOf("things_you_can_section")}`,
          }}
        >
          <p>{bottomTextSection}</p>
          <div className="things_you_can_section_box">
            <ul>
              {colA.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
            <ul>
              {colB.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="support_help_text"
          style={{ order: `${componentOrder.indexOf("support_help_text")}` }}
        >
          <p>{supportHelpText}</p>
        </div>
        <div
          className="bottom_image"
          style={{
            order: `${componentOrder.indexOf("bottom_image")}`,
          }}
        >
          <img
            src={bottomImgUrl}
            title={bottomImgTitle}
            alt={bottomImgAltText}
            style={{ backgroundColor: `${bottomImgBgColor}` }}
          />
        </div>
        <div
          className="footer_text"
          style={{
            order: `${componentOrder.indexOf("footer_text")}`,
          }}
        >
          {footerText.split('\n').map((text, index) => (
            <p key={index}>
              {text}
              <br/>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
export default EmailTemplate;
