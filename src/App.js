import React, { useEffect, useState } from "react";
import "./App.css";
import EmailTemplate from "./components/emailTemplate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onEntryChange } from "./contentstack-sdk/utils";

function App() {
  const [data, setData] = useState({});
  const [isApproved, setOnApprove] = useState(false);
  const [isToaster, setToaster] = useState(false);
  const splitNewLineCharacter = (splitValue, text) => {
    return text.split(splitValue).filter(Boolean);
  };

  async function getData() {
    var myHeaders = new Headers();
    myHeaders.append(
      "api_key",
      `${process.env.REACT_APP_CONTENTSTACK_API_KEY}`
    );
    myHeaders.append("access_token", `${process.env.REACT_APP_ACCESS_TOKEN}`);
    myHeaders.append("Cookie", `${process.env.REACT_APP_COOKIE}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      "https://cdn.contentstack.io/v3/content_types/email_template_new_account/entries/bltc11a6f9ad5f78b24?environment=staging&include[]=account_cta&include[]=bottom_image&include[]=footer_text&include[]=things_you_can_section&include[]=top_image",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const {
          entry: {
            email_background_image_url: bgURL,
            top_image: [
              {
                image_background_color: bgColor,
                image_url: headerImage,
                title: topImgTitle,
                alt_text: topImgAltText,
              },
            ],
            heading: topHeading,
            custom_welcome_message: welcomeMsg,
            email_text: emailText,
            primary_message: primaryMsg,
            account_cta: [
              {
                title: titleText,
                cta_background_color: accountBgImage,
                cta_text_color: accountColor,
                cta_text: accountCtaText,
              },
            ],
            things_you_can_section: [
              {
                heading: bottomTextSection,
                column_text_box: [colA, colB],
              },
            ],
            support_help_text: supportHelpText,
            bottom_image: [
              {
                title: bottomImgTitle,
                image_url: bottomImgUrl,
                image_background_color: bottomImgBgColor,
                alt_text: bottomImgAltText,
              },
            ],
            footer_text: [{ footer_text: footerText }],
            components_order: componentOrder,
          },
        } = result;
        setData({
          bgURL,
          bgColor,
          componentOrder,
          headerImage,
          topImgTitle,
          topImgAltText,
          topHeading: splitNewLineCharacter("\n", topHeading),
          welcomeMsg: splitNewLineCharacter("\n", welcomeMsg),
          emailText,
          primaryMsg,
          titleText,
          accountBgImage,
          accountColor,
          accountCtaText,
          bottomTextSection,
          colA: splitNewLineCharacter("\n", colA),
          colB: splitNewLineCharacter("\n", colB),
          supportHelpText,
          bottomImgTitle,
          bottomImgUrl,
          bottomImgBgColor,
          bottomImgAltText,
          footerText,
        });
      })
      .catch((error) => error);
  }
  const onApprove = () => {
    setOnApprove(true);
  };
  useEffect(() => {
    if (isApproved) {
      let uId = "";

      let uniqueTitle = `EmailTemplate_${Math.floor(
        Math.random() * Date.now()
      ).toString(16)}`;

      let data = {
        entry: {
          title: uniqueTitle,
          multi_line: document.documentElement.outerHTML,
        },
      };

      //POST API to create an entry
      fetch(
        "https://cdn.contentstack.io/v3/content_types/emails_html/entries?locale=en-us",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            api_key: "blt1296339e7a1850e0",
            "Content-Type": "application/json",
            authtoken: "blt6ef29d498b447896",
            Cookie: "authtoken=33vFwLoeSchjMRX8mCxrbdqXgEWMPmYuwTcVtST0VTo=",
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          uId = result?.entry?.uid;
          let data = {
            entry: {
              environments: ["sapient"],
              locales: ["en-us"],
            },
            locale: "en-us",
          };

          //POST API to Publish the content
          fetch(
            `https://cdn.contentstack.io/v3/content_types/emails_html/entries/${uId}/publish`,
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                api_key: "blt1296339e7a1850e0",
                authtoken: "blt6ef29d498b447896",
                "Content-Type": "application/json",
                Cookie:
                  "authtoken=33vFwLoeSchjMRX8mCxrbdqXgEWMPmYuwTcVtST0VTo=",
              },
            }
          ).then((res) => {
            fetch(
              `https://8c6e-49-36-218-79.ngrok-free.app/api/triggerEmailNotificationsForEntryId/${uId}`,
              {
                method: "GET",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "ngrok-skip-browser-warning": true,
                },
              }
            )
              .then((res) => {
                toast.success("Successfully published");
                setToaster(true);
              })
              .catch((err) => err);
          });
        });
    }
  }, [isApproved]);
  const onEmailTemplateChangeHandler = () => {
    onEntryChange(getData);
  };
  return (
    <div className="template-container">
      <div className="template-container-info">
        {!isApproved && (
          <div className="template-info-section1">
            <p className="section2-para-1">Please select the template</p>
            <div className="template-info-section1-1">
              <select
                className="select"
                onChange={onEmailTemplateChangeHandler}
              >
                <option style={{ display: "none" }}>
                  Select account email template
                </option>
                <option>New account email template</option>
              </select>
            </div>
            <div className="template-info-section1-2">
              <button
                className="button-approve"
                onClick={() => onApprove()}
                disabled={Object.keys(data).length === 0 ? true : false}
              >
                Approve
              </button>
              <button
                className="button-reject"
                disabled={Object.keys(data).length === 0 ? true : false}
              >
                Reject
              </button>
            </div>
          </div>
        )}
        {Object.keys(data).length === 0 ? null : <EmailTemplate {...data} />}
      </div>
      {isToaster && (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      )}
    </div>
  );
}

export default App;
